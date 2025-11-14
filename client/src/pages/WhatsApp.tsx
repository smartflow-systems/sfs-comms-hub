import { WhatsAppDashboard } from "@/components/WhatsAppDashboard";

export default function WhatsApp() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">WhatsApp Integration</h1>
        <p className="text-muted-foreground mt-2">
          Manage your WhatsApp Business communications
        </p>
      </div>
      <WhatsAppDashboard />
    </div>
  );
}
