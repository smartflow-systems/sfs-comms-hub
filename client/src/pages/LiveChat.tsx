import { ChatInterface } from "@/components/ChatInterface";

export default function LiveChat() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Live Chat</h1>
        <p className="text-muted-foreground mt-2">
          Communicate with your customers in real-time
        </p>
      </div>
      <ChatInterface />
    </div>
  );
}
