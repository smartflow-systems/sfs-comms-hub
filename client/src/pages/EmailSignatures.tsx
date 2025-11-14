import { EmailSignatureForm } from "@/components/EmailSignatureForm";

export default function EmailSignatures() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Email Signatures</h1>
        <p className="text-muted-foreground mt-2">
          Create professional email signatures with ease
        </p>
      </div>
      <EmailSignatureForm />
    </div>
  );
}
