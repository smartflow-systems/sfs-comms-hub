import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, Paperclip, Smile } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import avatarImage from "@assets/generated_images/Professional_avatar_headshot_19fe0aa4.png";

interface Message {
  id: string;
  sender: "user" | "contact";
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
}

export function ChatInterface() {
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const conversations: Conversation[] = [
    { id: "1", name: "Sarah Johnson", lastMessage: "Thanks for the update!", timestamp: "2m ago", unread: 2 },
    { id: "2", name: "Mike Chen", lastMessage: "Can we schedule a call?", timestamp: "1h ago", unread: 0 },
    { id: "3", name: "Emily Davis", lastMessage: "Sounds great!", timestamp: "3h ago", unread: 1 },
  ];

  const [messages] = useState<Message[]>([
    { id: "1", sender: "contact", content: "Hi! How can I help you today?", timestamp: "10:30 AM" },
    { id: "2", sender: "user", content: "I have a question about the pricing", timestamp: "10:32 AM" },
    { id: "3", sender: "contact", content: "I'd be happy to help! What would you like to know?", timestamp: "10:33 AM" },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      <Card className="col-span-3 p-4 flex flex-col">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-conversations"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="p-3 rounded-lg hover-elevate active-elevate-2 cursor-pointer"
                data-testid={`conversation-${conv.id}`}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={avatarImage} />
                    <AvatarFallback>{conv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm truncate">{conv.name}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{conv.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="col-span-6 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatarImage} />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`message-${msg.id}`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" data-testid="button-attach">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-emoji">
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
              data-testid="input-message"
            />
            <Button onClick={handleSend} data-testid="button-send">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="col-span-3 p-4">
        <h3 className="font-semibold mb-4">Contact Details</h3>
        <div className="space-y-4">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-3">
              <AvatarImage src={avatarImage} />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <p className="font-medium">Sarah Johnson</p>
            <p className="text-sm text-muted-foreground">sarah@example.com</p>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium">Tags</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Customer</Badge>
                <Badge variant="secondary">VIP</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
