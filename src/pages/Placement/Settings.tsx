import { useState } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [officerName, setOfficerName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [apiUrl, setApiUrl] = useState("");

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Settings"
        description="Configure placement cell profile and preferences"
      />

      <Card className="p-6 max-w-2xl">
        <div className="space-y-6">
          {/* Officer Name */}
          <div className="space-y-2">
            <Label htmlFor="officerName">Placement Officer Name</Label>
            <Input
              id="officerName"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              placeholder="Enter officer name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Official Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Team Access Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="coordinator">Placement Coordinator</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* API URL */}
          <div className="space-y-2">
            <Label htmlFor="apiUrl">API URL</Label>
            <Input
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="Enter API endpoint URL"
            />
            <p className="text-xs text-mint-cream">
              Used for integrations with student portal and recruiter systems
            </p>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </Card>

      {/* Additional Settings */}
      <Card className="p-6 max-w-2xl mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          System Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-mint-cream">
                Receive updates about new registrations
              </p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Auto-Verification</p>
              <p className="text-sm text-mint-cream">
                Automatically verify students with complete documents
              </p>
            </div>
            <Button variant="outline" size="sm">
              Disabled
            </Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-foreground">Data Backup</p>
              <p className="text-sm text-mint-cream">
                Weekly automatic backup to cloud storage
              </p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
