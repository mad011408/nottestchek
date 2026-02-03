"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import type {
  ChatMode,
  SidebarContent,
  QueuedMessage,
  QueueBehavior,
  SandboxPreference,
} from "@/types/chat";
import type { Todo } from "@/types";
import {
  mergeTodos as mergeTodosUtil,
  computeReplaceAssistantTodos,
} from "@/lib/utils/todo-utils";
import type { UploadedFileState } from "@/types/file";
import { useIsMobile } from "@/hooks/use-mobile";
import { chatSidebarStorage } from "@/lib/utils/sidebar-storage";
import type { SubscriptionTier } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import {
  readChatMode,
  writeChatMode,
  cleanupExpiredDrafts,
} from "@/lib/utils/client-storage";

type Id<T extends string> = string;
type Doc<T extends string> = any;

interface GlobalStateType {
  // Input state
  input: string;
  setInput: (value: string) => void;
  user: { id: string; email: string };

  // File upload state
  uploadedFiles: UploadedFileState[];
  setUploadedFiles: (files: UploadedFileState[]) => void;
  addUploadedFile: (file: UploadedFileState) => void;
  removeUploadedFile: (index: number) => void;
  updateUploadedFile: (
    index: number,
    updates: Partial<UploadedFileState>,
  ) => void;

  // Token tracking function
  getTotalTokens: () => number;

  // File upload status tracking
  isUploadingFiles: boolean;

  // Chat mode state
  chatMode: ChatMode;
  setChatMode: (mode: ChatMode) => void;

  // Chat title state
  chatTitle: string | null;
  setChatTitle: (title: string | null) => void;

  // Current chat ID state
  currentChatId: string | null;
  setCurrentChatId: (chatId: string | null) => void;

  // User chats state
  chats: Doc<"chats">[];
  setChats: (chats: Doc<"chats">[]) => void;

  // Chat switching state
  isSwitchingChats: boolean;
  setIsSwitchingChats: (switching: boolean) => void;

  // Computer sidebar state (right side)
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarContent: SidebarContent | null;
  setSidebarContent: (content: SidebarContent | null) => void;

  // Chat sidebar state (left side)
  chatSidebarOpen: boolean;
  setChatSidebarOpen: (open: boolean) => void;

  // Todos state
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  mergeTodos: (todos: Todo[]) => void;
  replaceAssistantTodos: (todos: Todo[], sourceMessageId?: string) => void;

  // UI state
  isTodoPanelExpanded: boolean;
  setIsTodoPanelExpanded: (expanded: boolean) => void;

  // Subscription state
  subscription: SubscriptionTier;
  isCheckingProPlan: boolean;

  // Rate limit warning dismissal state
  hasUserDismissedRateLimitWarning: boolean;
  setHasUserDismissedRateLimitWarning: (dismissed: boolean) => void;

  // Message queue state (for Agent mode)
  messageQueue: QueuedMessage[];
  queueMessage: (
    text: string,
    files?: Array<{ file: File; fileId: Id<"files">; url: string }>,
  ) => void;
  removeQueuedMessage: (id: string) => void;
  clearQueue: () => void;
  dequeueNext: () => QueuedMessage | null;

  // Queue behavior preference
  queueBehavior: QueueBehavior;
  setQueueBehavior: (behavior: QueueBehavior) => void;

  // Sandbox preference (for Agent mode)
  sandboxPreference: SandboxPreference;
  setSandboxPreference: (preference: SandboxPreference) => void;

  // Utility methods
  clearInput: () => void;
  clearUploadedFiles: () => void;
  openSidebar: (content: SidebarContent) => void;
  updateSidebarContent: (updates: Partial<SidebarContent>) => void;
  closeSidebar: () => void;
  toggleChatSidebar: () => void;
  initializeChat: (chatId: string, fromRoute?: boolean) => void;
  initializeNewChat: () => void;
  activateChat: (chatId: string) => void;

  // Temporary chats preference
  temporaryChatsEnabled: boolean;
  setTemporaryChatsEnabled: (enabled: boolean) => void;

  // Team pricing dialog state
  teamPricingDialogOpen: boolean;
  setTeamPricingDialogOpen: (open: boolean) => void;

  // Team welcome dialog state
  teamWelcomeDialogOpen: boolean;
  setTeamWelcomeDialogOpen: (open: boolean) => void;

  // PentestGPT migration confirm dialog state
  migrateFromPentestgptDialogOpen: boolean;
  setMigrateFromPentestgptDialogOpen: (open: boolean) => void;

  // Register a chat reset function that will be invoked on initializeNewChat
  setChatReset: (fn: (() => void) | null) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  customSystemPrompt: string;
  setCustomSystemPrompt: (prompt: string) => void;
}

const GlobalStateContext = createContext<GlobalStateType | undefined>(
  undefined,
);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const isMobile = useIsMobile();
  const prevIsMobile = useRef(isMobile);
  const [input, setInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileState[]>([]);
  const [chatMode, setChatMode] = useState<ChatMode>(() => {
    const saved = readChatMode();
    return saved === "ask" || saved === "agent" ? saved : "ask";
  });
  const [chatTitle, setChatTitle] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isSwitchingChats, setIsSwitchingChats] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState<SidebarContent | null>(
    null,
  );

  const [chatSidebarOpen, setChatSidebarOpen] = useState(() =>
    chatSidebarStorage.get(isMobile),
  );
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodoPanelExpanded, setIsTodoPanelExpanded] = useState(false);
  const [chats, setChats] = useState<any[]>([]);
  const [subscription] = useState<SubscriptionTier>("ultra");
  const [isCheckingProPlan] = useState(false);
  const chatResetRef = useRef<(() => void) | null>(null);

  const user = { 
    id: "default-user", 
    email: "user@example.com",
    firstName: "Default",
    lastName: "User",
    profilePictureUrl: null
  };

  const [
    hasUserDismissedRateLimitWarning,
    setHasUserDismissedRateLimitWarning,
  ] = useState(false);

  const [messageQueue, setMessageQueue] = useState<QueuedMessage[]>([]);

  const [queueBehavior, setQueueBehaviorState] = useState<QueueBehavior>(() => {
    if (typeof window === "undefined") return "queue";
    const saved = localStorage.getItem("queue-behavior");
    return (saved === "queue" || saved === "stop-and-send") ? saved : "queue";
  });

  const [sandboxPreference, setSandboxPreferenceState] =
    useState<SandboxPreference>(() => {
      if (typeof window === "undefined") return "e2b";
      return (localStorage.getItem("sandbox-preference") as SandboxPreference) || "e2b";
    });

  const [temporaryChatsEnabled, setTemporaryChatsEnabledState] = useState(false);
  const [teamPricingDialogOpen, setTeamPricingDialogOpen] = useState(false);
  const [teamWelcomeDialogOpen, setTeamWelcomeDialogOpenState] = useState(false);
  const [migrateFromPentestgptDialogOpen, setMigrateFromPentestgptDialogOpenState] = useState(false);

  const [selectedModel, setSelectedModel] = useState("gpt-5.2-pro-2025-12-11");
  const [customSystemPrompt, setCustomSystemPrompt] = useState("");

  const mergeTodos = useCallback((newTodos: Todo[]) => {
    setTodos((currentTodos) => mergeTodosUtil(currentTodos, newTodos));
  }, []);

  const replaceAssistantTodos = useCallback(
    (incoming: Todo[], sourceMessageId?: string) => {
      setTodos((current) =>
        computeReplaceAssistantTodos(current, incoming, sourceMessageId),
      );
    },
    [],
  );

  const getTotalTokens = useCallback((): number => {
    return uploadedFiles.reduce((total, file) => {
      return file.tokens ? total + file.tokens : total;
    }, 0);
  }, [uploadedFiles]);

  const isUploadingFiles = uploadedFiles.some(
    (file) => file.uploading || file.error,
  );

  const addUploadedFile = useCallback((file: UploadedFileState) => {
    setUploadedFiles((prev) => [...prev, file]);
  }, []);

  const removeUploadedFile = useCallback((index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateUploadedFile = useCallback(
    (index: number, updates: Partial<UploadedFileState>) => {
      setUploadedFiles((prev) =>
        prev.map((file, i) => (i === index ? { ...file, ...updates } : file)),
      );
    },
    [],
  );

  const queueMessage = useCallback(
    (
      text: string,
      files?: Array<{ file: File; fileId: string; url: string }>,
    ) => {
      setMessageQueue((prev) => {
        if (prev.length >= 10) {
          toast.error("Queue is full");
          return prev;
        }
        const newMessage: QueuedMessage = {
          id: uuidv4() as any,
          text,
          files: files as any,
          timestamp: Date.now(),
        };
        return [...prev, newMessage];
      });
    },
    [],
  );

  const removeQueuedMessage = useCallback((id: string) => {
    setMessageQueue((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const clearQueue = useCallback(() => setMessageQueue([]), []);

  const dequeueNext = useCallback((): QueuedMessage | null => {
    let nextMessage: QueuedMessage | null = null;
    setMessageQueue((prev) => {
      if (prev.length === 0) return prev;
      nextMessage = prev[0];
      return prev.slice(1);
    });
    return nextMessage;
  }, []);

  const initializeChat = useCallback((chatId: string) => {
    setIsSwitchingChats(true);
    setCurrentChatId(chatId);
    setTodos([]);
    setIsTodoPanelExpanded(false);
  }, []);

  const initializeNewChat = useCallback(() => {
    if (chatResetRef.current) chatResetRef.current();
    setCurrentChatId(null);
    setTodos([]);
    setIsTodoPanelExpanded(false);
    setChatTitle(null);
  }, []);

  const setChatReset = useCallback((fn: (() => void) | null) => {
    chatResetRef.current = fn;
  }, []);

  const activateChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId);
  }, []);

  const openSidebar = (content: SidebarContent) => {
    setSidebarContent(content);
    setSidebarOpen(true);
  };

  const updateSidebarContent = (updates: Partial<SidebarContent>) => {
    setSidebarContent((current) => current ? { ...current, ...updates } : current);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarContent(null);
  };

  const toggleChatSidebar = () => setChatSidebarOpen((prev: boolean) => !prev);

  const value: GlobalStateType = {
    input, setInput,
    uploadedFiles, setUploadedFiles, addUploadedFile, removeUploadedFile, updateUploadedFile,
    getTotalTokens, isUploadingFiles,
    chatMode, setChatMode,
    chatTitle, setChatTitle,
    currentChatId, setCurrentChatId,
    chats, setChats,
    isSwitchingChats, setIsSwitchingChats,
    sidebarOpen, setSidebarOpen, sidebarContent, setSidebarContent,
    chatSidebarOpen, setChatSidebarOpen,
    todos, setTodos, mergeTodos, replaceAssistantTodos,
    isTodoPanelExpanded, setIsTodoPanelExpanded,
    subscription, isCheckingProPlan,
    hasUserDismissedRateLimitWarning, setHasUserDismissedRateLimitWarning,
    messageQueue, queueMessage, removeQueuedMessage, clearQueue, dequeueNext,
    queueBehavior, setQueueBehavior: setQueueBehaviorState,
    sandboxPreference, setSandboxPreference: setSandboxPreferenceState,
    clearInput: () => setInput(""),
    clearUploadedFiles: () => setUploadedFiles([]),
    openSidebar, updateSidebarContent, closeSidebar, toggleChatSidebar,
    initializeChat, initializeNewChat, activateChat,
    temporaryChatsEnabled, setTemporaryChatsEnabled: setTemporaryChatsEnabledState,
    teamPricingDialogOpen, setTeamPricingDialogOpen,
    teamWelcomeDialogOpen, setTeamWelcomeDialogOpen: setTeamWelcomeDialogOpenState,
    migrateFromPentestgptDialogOpen, setMigrateFromPentestgptDialogOpen: setMigrateFromPentestgptDialogOpenState,
    setChatReset,
    selectedModel, setSelectedModel,
    customSystemPrompt, setCustomSystemPrompt,
    user,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
