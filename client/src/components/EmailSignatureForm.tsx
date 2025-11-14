import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignatureData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  linkedin: string;
  twitter: string;
}

export function EmailSignatureForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SignatureData>({
    fullName: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    linkedin: "",
    twitter: "",
  });

  const handleChange = (field: keyof SignatureData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateHTML = () => {
    return `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <strong style="font-size: 16px; color: #1a73e8;">${formData.fullName}</strong><br/>
        ${formData.jobTitle ? `<span style="color: #666;">${formData.jobTitle}</span><br/>` : ""}
        ${formData.company ? `<strong>${formData.company}</strong><br/>` : ""}
        ${formData.email ? `<a href="mailto:${formData.email}" style="color: #1a73e8;">${formData.email}</a><br/>` : ""}
        ${formData.phone ? `<span>${formData.phone}</span><br/>` : ""}
        ${formData.website ? `<a href="${formData.website}" style="color: #1a73e8;">${formData.website}</a><br/>` : ""}
        ${formData.address ? `<span style="color: #666;">${formData.address}</span>` : ""}
      </div>
    `.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateHTML());
    toast({
      title: "Copied to clipboard",
      description: "Email signature HTML has been copied.",
    });
  };

  const downloadHTML = () => {
    const blob = new Blob([generateHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-signature.html";
    a.click();
    toast({
      title: "Downloaded",
      description: "Email signature saved as HTML file.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Signature Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="John Doe"
              data-testid="input-fullname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              placeholder="Product Manager"
              data-testid="input-jobtitle"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Acme Corp"
              data-testid="input-company"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@acme.com"
              data-testid="input-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              data-testid="input-phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://acme.com"
              data-testid="input-website"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="123 Main St, San Francisco, CA 94105"
              data-testid="input-address"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="p-4 border rounded-lg bg-card"
              dangerouslySetInnerHTML={{ __html: generateHTML() }}
              data-testid="preview-signature"
            />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={copyToClipboard} className="flex-1" data-testid="button-copy">
            <Copy className="mr-2 h-4 w-4" />
            Copy HTML
          </Button>
          <Button onClick={downloadHTML} variant="secondary" className="flex-1" data-testid="button-download">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
