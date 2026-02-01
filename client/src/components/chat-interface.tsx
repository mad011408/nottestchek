import { useState, useRef, useEffect } from "react";
import { useMessages, useChatCompletion, type Message } from "@/hooks/use-chat";
import { ModelSelector } from "./ui/model-selector";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MODELS, type ModelType } from "@shared/schema";
import { Send, Bot, User, Loader2, Settings2, Paperclip } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInterfaceProps {
  sessionId: number;
}

export function ChatInterface({ sessionId }: ChatInterfaceProps) {
  const { data: messages, isLoading: loadingMessages } = useMessages(sessionId);
  const { mutate: sendMessage, isPending: isSending } = useChatCompletion();
  
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<ModelType>(MODELS[0]);
  const [systemPrompt, setSystemPrompt] = useState("");
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSending]);

  const handleSend = () => {
    if (!input.trim() || isSending) return;

    sendMessage({
      message: input,
      model: selectedModel,
      sessionId,
      systemPrompt: systemPrompt || undefined,
      // Pass history if needed for pure context, but backend usually pulls from DB
    });
    
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-background">
      {/* Top Bar */}
      <header className="h-16 border-b border-border/40 flex items-center justify-between px-6 bg-background/80 backdrop-blur-xl z-10">
        <div className="flex items-center gap-4">
          <ModelSelector value={selectedModel} onValueChange={setSelectedModel} />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings2 className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Chat Settings</SheetTitle>
              <SheetDescription>
                Configure the behavior of the AI assistant for this session.
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-4">
              <div className="space-y-2">
                <Label>System Prompt</Label>
                <Textarea 
                  placeholder="You are a helpful assistant..."
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  Instructions for how the AI should behave.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6 pb-4">
          {loadingMessages ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground animate-pulse">Loading conversation...</p>
            </div>
          ) : messages?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <SparklesIcon className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2 max-w-md">
                <h2 className="text-2xl font-bold font-display tracking-tight">How can I help you today?</h2>
                <p className="text-muted-foreground">
                  I can help you write code, draft emails, analyze data, or just chat. 
                  Select a model above and start typing.
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages?.map((msg) => (
                <MessageItem key={msg.id} message={msg} />
              ))}
              {isSending && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-secondary/30 rounded-2xl px-5 py-4 w-fit">
                    <div className="flex space-x-1.5 items-center h-6">
                      <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-background/80 backdrop-blur-xl border-t border-border/40">
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative bg-secondary/50 border border-border/50 rounded-2xl flex flex-col shadow-sm focus-within:shadow-lg focus-within:border-primary/30 transition-all duration-300">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              className="min-h-[60px] max-h-[200px] bg-transparent border-0 focus-visible:ring-0 resize-none py-4 px-4 text-base"
              rows={1}
            />
            <div className="flex justify-between items-center px-2 pb-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl h-9 w-9">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isSending}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-xl transition-all duration-300",
                  input.trim() 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2 opacity-60">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}

function MessageItem({ message }: { message: Message }) {
  const isUser = message.role === "user";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-4 group", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-sm",
        isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
      )}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      
      <div className={cn(
        "max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed",
        isUser 
          ? "bg-primary text-primary-foreground font-medium" 
          : "bg-card border border-border/40 text-foreground/90"
      )}>
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
