import { useState } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { toast } from "sonner";
import emailjs from "emailjs-com";

export default function Communication() {
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message before sending!");
      return;
    }
    
    setSending(true);

    try {
      // Note: Users need to configure EmailJS with their service ID, template ID, and user ID
      // This is a placeholder implementation
      toast.info("Email service not configured. Please set up EmailJS credentials.");
      
      // Uncomment and configure when EmailJS is set up:
      // await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   {
      //     audience: audience,
      //     message: message,
      //   },
      //   'YOUR_USER_ID'
      // );
      
      toast.success(`Notification sent to ${audience === "all" ? "all students" : audience}!`);
      setMessage("");
    } catch (error) {
      toast.error("Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Communication"
        description="Send bulk notifications to students"
      />

      <Card className="p-6 max-w-3xl">
        <div className="space-y-6">
          {/* Audience Selection */}
          <div className="space-y-2">
            <Label htmlFor="audience">Select Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger id="audience">
                <SelectValue placeholder="Choose audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
                <SelectItem value="verified">Verified Students Only</SelectItem>
                <SelectItem value="unverified">Unverified Students</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your notification message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <p className="text-sm text-mint-cream">
              {message.length} / 500 characters
            </p>
          </div>

          {/* Send Button */}
          <Button onClick={handleSend} className="w-full sm:w-auto" disabled={sending}>
            <Send className="w-4 h-4 mr-2" />
            {sending ? "Sending..." : "Send Notification"}
          </Button>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">
              Notification Channels
            </h4>
            <ul className="text-sm text-mint-cream space-y-1">
              <li>• Email notifications will be sent to registered email addresses</li>
              <li>• SMS alerts (if phone numbers are verified)</li>
              <li>• In-app notifications (if student portal is active)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Recent Notifications */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recent Notifications
        </h3>
        <div className="space-y-3">
          {[
            { message: "Placement drive scheduled for Tech Corp on Nov 15", audience: "All Students", time: "2 hours ago" },
            { message: "Document verification deadline extended to Nov 10", audience: "Unverified Students", time: "1 day ago" },
            { message: "New job posting: Software Engineer at InnovateX", audience: "Computer Science", time: "2 days ago" },
          ].map((notification, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-mint-cream">{notification.message}</p>
                  <p className="text-sm text-mint-cream mt-1">
                    Sent to: {notification.audience}
                  </p>
                </div>
                <span className="text-sm text-mint-cream whitespace-nowrap ml-4">
                  {notification.time}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
