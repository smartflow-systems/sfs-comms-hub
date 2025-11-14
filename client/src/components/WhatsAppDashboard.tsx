import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function WhatsAppDashboard() {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState("");
  const [messageText, setMessageText] = useState("");

  const stats = [
    { label: "Messages Sent", value: "1,234", icon: Send, color: "text-blue-600" },
    { label: "Delivered", value: "1,189", icon: CheckCircle2, color: "text-green-600" },
    { label: "Pending", value: "23", icon: Clock, color: "text-yellow-600" },
    { label: "Failed", value: "22", icon: XCircle, color: "text-red-600" },
  ];

  const templates = [
    { id: "1", name: "Welcome Message", category: "Marketing", status: "approved" },
    { id: "2", name: "Order Confirmation", category: "Transactional", status: "approved" },
    { id: "3", name: "Appointment Reminder", category: "Utility", status: "pending" },
  ];

  const handleSendMessage = () => {
    if (recipient && messageText) {
      console.log("Sending WhatsApp message to:", recipient, messageText);
      toast({
        title: "Message queued",
        description: "Your WhatsApp message has been queued for delivery.",
      });
      setRecipient("");
      setMessageText("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">WhatsApp Business API</p>
              <p className="text-sm text-muted-foreground">Connected to +1 (555) 123-4567</p>
            </div>
            <Badge variant="default" className="bg-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Message Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 border rounded-lg hover-elevate"
                  data-testid={`template-${template.id}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                    <Badge variant={template.status === "approved" ? "default" : "secondary"}>
                      {template.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Phone Number</Label>
              <Input
                id="recipient"
                placeholder="+1 (555) 123-4567"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                data-testid="input-recipient"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message..."
                rows={5}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                data-testid="input-message-text"
              />
            </div>

            <Button onClick={handleSendMessage} className="w-full" data-testid="button-send-whatsapp">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
