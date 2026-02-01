import { useEffect } from "react";
import { useSessions, useCreateSession } from "@/hooks/use-chat";
import { useLocation } from "wouter";
import { Loader2, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/chat-sidebar";

export default function Home() {
  const { data: sessions, isLoading } = useSessions();
  const createSession = useCreateSession();
  const [, setLocation] = useLocation();

  const handleCreateSession = () => {
    createSession.mutate(
      { title: "New Conversation" },
      {
        onSuccess: (newSession) => {
          setLocation(`/session/${newSession.id}`);
        },
      }
    );
  };

  // If we have sessions, redirect to the most recent one automatically? 
  // Or show a nice welcome screen. Let's do welcome screen.

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block w-72 h-full">
        <ChatSidebar currentSessionId={null} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-gradient">
              Welcome to AI Chat
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your intelligent companion for coding, writing, and creative problem solving.
              Start a new conversation to begin.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 text-left">
            <div className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors">
              <h3 className="font-semibold text-foreground mb-1">Advanced Models</h3>
              <p className="text-sm text-muted-foreground">Access GPT-4, Claude Opus, and more.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors">
              <h3 className="font-semibold text-foreground mb-1">Code Optimized</h3>
              <p className="text-sm text-muted-foreground">Enhanced markdown and syntax highlighting.</p>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={handleCreateSession}
            disabled={createSession.isPending || isLoading}
            className="w-full sm:w-auto min-w-[200px] h-14 text-lg rounded-xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            {createSession.isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <MessageSquarePlus className="mr-2 h-5 w-5" />
            )}
            Start New Chat
          </Button>

          {/* Mobile Sidebar Trigger Hint */}
          <p className="md:hidden text-xs text-muted-foreground">
            Tap the menu icon to view previous conversations
          </p>
        </div>
      </main>
    </div>
  );
}
