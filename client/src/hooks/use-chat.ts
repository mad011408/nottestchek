import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type ModelType } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { MODELS } from "@shared/schema";

// Type definitions based on API schemas
export type ChatSession = z.infer<typeof api.sessions.get.responses[200]>;
export type Message = z.infer<typeof api.messages.list.responses[200]>[number];

// ==========================================
// SESSION HOOKS
// ==========================================

export function useSessions() {
  return useQuery({
    queryKey: [api.sessions.list.path],
    queryFn: async () => {
      const res = await fetch(api.sessions.list.path);
      if (!res.ok) throw new Error("Failed to fetch sessions");
      return api.sessions.list.responses[200].parse(await res.json());
    },
  });
}

export function useSession(id: number | null) {
  return useQuery({
    queryKey: [api.sessions.get.path, id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) return null;
      const url = buildUrl(api.sessions.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch session");
      return api.sessions.get.responses[200].parse(await res.json());
    },
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { title?: string } = {}) => {
      const res = await fetch(api.sessions.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create session");
      return api.sessions.create.responses[201].parse(await res.json());
    },
    onSuccess: (newSession) => {
      queryClient.invalidateQueries({ queryKey: [api.sessions.list.path] });
      // Optional: Don't auto-toast for new sessions to keep it clean
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create a new chat session.",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.sessions.delete.path, { id });
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete session");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.sessions.list.path] });
      toast({ title: "Deleted", description: "Chat session removed." });
    },
  });
}

// ==========================================
// MESSAGE HOOKS
// ==========================================

export function useMessages(sessionId: number | null) {
  return useQuery({
    queryKey: [api.messages.list.path, sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      if (!sessionId) return [];
      const url = buildUrl(api.messages.list.path, { sessionId });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return api.messages.list.responses[200].parse(await res.json());
    },
  });
}

// ==========================================
// CHAT COMPLETION HOOK
// ==========================================

export function useChatCompletion() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: {
      message: string;
      model: ModelType;
      sessionId?: number;
      systemPrompt?: string;
      history?: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
    }) => {
      const res = await fetch(api.chat.completion.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to get response");
      }
      
      return api.chat.completion.responses[200].parse(await res.json());
    },
    onMutate: async ({ sessionId, message }) => {
      // Optimistic update if we have a session ID
      if (sessionId) {
        await queryClient.cancelQueries({ queryKey: [api.messages.list.path, sessionId] });
        
        const previousMessages = queryClient.getQueryData([api.messages.list.path, sessionId]);
        
        // Optimistically add user message
        queryClient.setQueryData([api.messages.list.path, sessionId], (old: Message[] | undefined) => {
          const optimisticUserMsg: Message = {
            id: -1, // Temp ID
            sessionId,
            role: "user",
            content: message,
            model: null,
            createdAt: new Date(),
          };
          return old ? [...old, optimisticUserMsg] : [optimisticUserMsg];
        });
        
        return { previousMessages };
      }
    },
    onError: (err, variables, context) => {
      if (variables.sessionId && context?.previousMessages) {
        queryClient.setQueryData(
          [api.messages.list.path, variables.sessionId],
          context.previousMessages
        );
      }
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess: (data, variables) => {
      if (variables.sessionId) {
        // Invalidate to get the real DB messages (both user's persisted one and assistant's response)
        queryClient.invalidateQueries({ queryKey: [api.messages.list.path, variables.sessionId] });
      }
    },
  });
}
