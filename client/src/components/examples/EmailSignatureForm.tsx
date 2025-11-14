import { EmailSignatureForm } from "../EmailSignatureForm";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function EmailSignatureFormExample() {
  return (
    <TooltipProvider>
      <div className="p-6">
        <EmailSignatureForm />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}
