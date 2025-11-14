import { ChangelogManager } from "../ChangelogManager";
import { Toaster } from "@/components/ui/toaster";

export default function ChangelogManagerExample() {
  return (
    <div className="p-6">
      <ChangelogManager />
      <Toaster />
    </div>
  );
}
