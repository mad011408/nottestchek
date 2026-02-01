import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSessions, useCreateSession, useDeleteSession } from "@/hooks/use-chat";
import { MessageSquarePlus, Trash2, MessageSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useLocation } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ChatSidebarProps {
  currentSessionId: number | null;
  className?: string;
}

export function ChatSidebar({ currentSessionId, className }: ChatSidebarProps) {
  const { data: sessions, isLoading } = useSessions();
  const createSession = useCreateSession();
  const deleteSession = useDeleteSession();
  const [, setLocation] = useLocation();

  const handleCreateNew = () => {
    createSession.mutate(
      { title: "New Conversation" },
      {
        onSuccess: (newSession) => {
          setLocation(`/session/${newSession.id}`);
        },
      }
    );
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    deleteSession.mutate(id, {
      onSuccess: () => {
        if (currentSessionId === id) {
          setLocation("/");
        }
      },
    });
  };

  return (
    <div className={cn("flex flex-col h-full bg-card/50 border-r border-border/40 backdrop-blur-xl", className)}>
      <div className="p-4 border-b border-border/40">
        <Button 
          onClick={handleCreateNew} 
          disabled={createSession.isPending}
          className="w-full justify-start gap-2 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
        >
          <MessageSquarePlus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 py-4">
        {isLoading ? (
          <div className="flex flex-col gap-2 px-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded-lg bg-secondary/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {sessions?.length === 0 && (
              <div className="text-center text-muted-foreground py-8 text-sm">
                No conversations yet.
                <br />
                Start a new one!
              </div>
            )}
            {sessions?.map((session) => (
              <div
                key={session.id}
                onClick={() => setLocation(`/session/${session.id}`)}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent",
                  currentSessionId === session.id
                    ? "bg-secondary text-foreground border-border/50 shadow-sm"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <MessageSquare className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  currentSessionId === session.id ? "text-primary" : "text-muted-foreground"
                )} />
                
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="truncate text-sm font-medium">
                    {session.title || "Untitled Chat"}
                  </span>
                  <span className="text-[10px] text-muted-foreground/70">
                    {session.createdAt && format(new Date(session.createdAt), 'MMM d, h:mm a')}
                  </span>
                </div>

                <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          chat history for this session.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => handleDelete(e as any, session.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                
                {currentSessionId === session.id && (
                  <ChevronRight className="w-3 h-3 text-muted-foreground absolute right-2 group-hover:opacity-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-border/40 text-xs text-center text-muted-foreground/60">
        AI Chat • v1.0.0
      </div>
    </div>
  );
}
