import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  changes: {
    type: "feature" | "fix" | "improvement";
    description: string;
  }[];
}

export function ChangelogManager() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [version, setVersion] = useState("");
  const [changeDescription, setChangeDescription] = useState("");
  
  const [changelogs] = useState<ChangelogEntry[]>([
    {
      id: "1",
      version: "2.1.0",
      date: "2024-01-15",
      changes: [
        { type: "feature", description: "Added WhatsApp Business API integration" },
        { type: "feature", description: "New email signature templates" },
        { type: "improvement", description: "Enhanced chat interface with typing indicators" },
      ],
    },
    {
      id: "2",
      version: "2.0.0",
      date: "2024-01-01",
      changes: [
        { type: "feature", description: "Live chat functionality" },
        { type: "feature", description: "Changelog management system" },
        { type: "fix", description: "Fixed mobile responsiveness issues" },
      ],
    },
  ]);

  const handleSave = () => {
    if (version && changeDescription) {
      console.log("Saving changelog:", { version, changeDescription });
      toast({
        title: "Changelog saved",
        description: "Your changelog entry has been created.",
      });
      setDialogOpen(false);
      setVersion("");
      setChangeDescription("");
    }
  };

  const getChangeBadgeVariant = (type: string) => {
    switch (type) {
      case "feature":
        return "default";
      case "fix":
        return "destructive";
      case "improvement":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Changelogs</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-changelog">
              <Plus className="mr-2 h-4 w-4" />
              Create Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Changelog Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  placeholder="2.2.0"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  data-testid="input-version"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="changes">Changes</Label>
                <Textarea
                  id="changes"
                  placeholder="Describe the changes..."
                  rows={5}
                  value={changeDescription}
                  onChange={(e) => setChangeDescription(e.target.value)}
                  data-testid="input-changes"
                />
              </div>
              <Button onClick={handleSave} className="w-full" data-testid="button-save-changelog">
                Save Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="max-w-3xl space-y-6">
        {changelogs.map((entry) => (
          <Card key={entry.id} data-testid={`changelog-${entry.id}`}>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-base px-3 py-1">
                    v{entry.version}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <Button variant="ghost" size="icon" data-testid={`button-edit-${entry.id}`}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {entry.changes.map((change, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge variant={getChangeBadgeVariant(change.type)} className="mt-0.5">
                      {change.type}
                    </Badge>
                    <p className="text-sm flex-1">{change.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
