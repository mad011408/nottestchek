import { useRoute } from "wouter";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatInterface } from "@/components/chat-interface";
import { useSession } from "@/hooks/use-chat";
import { Loader2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Session() {
  const [, params] = useRoute("/session/:id");
  const sessionId = params ? parseInt(params.id) : null;
  const { data: session, isLoading, error } = useSession(sessionId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4 bg-background">
        <h2 className="text-2xl font-bold font-display">Session Not Found</h2>
        <p className="text-muted-foreground">The conversation you are looking for does not exist.</p>
        <Button variant="secondary" onClick={() => window.location.href = "/"}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 h-full border-r border-border/40">
        <ChatSidebar currentSessionId={sessionId} />
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-md">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <ChatSidebar currentSessionId={sessionId} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Chat Interface */}
      <main className="flex-1 h-full relative">
        <ChatInterface sessionId={sessionId!} />
      </main>
    </div>
  );
}
