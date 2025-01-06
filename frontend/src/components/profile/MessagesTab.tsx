import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const MessagesTab = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to view messages",
        });
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
        toast({
          title: "Success",
          description: "Messages loaded successfully",
        });
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load messages",
      });
    }
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Messages</CardTitle>
        <CardDescription className="text-white/60">
          View your messages
        </CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length > 0 ? (
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li key={index} className="p-3 rounded bg-white/10 text-white">
                {message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/60">No messages to display. Click the Messages tab to load them.</p>
        )}
      </CardContent>
    </Card>
  );
};