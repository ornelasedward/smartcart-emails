
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

const EMAIL_TEMPLATES = [
  {
    id: 1,
    name: "Purchase Confirmation",
    description: "Sent when a customer completes a purchase",
    subject: "Thank you for your purchase!",
    preview: "Your order has been confirmed and is being processed...",
  },
  {
    id: 2,
    name: "Abandoned Cart",
    description: "Sent when a customer abandons their cart",
    subject: "You forgot something in your cart!",
    preview: "We noticed you left some items in your cart. Use code COMEBACK for 10% off...",
  },
  {
    id: 3,
    name: "Cancellation",
    description: "Sent when a customer cancels their subscription",
    subject: "We're sorry to see you go",
    preview: "We're sad to see you go. Here's what you'll be missing...",
  },
  {
    id: 4,
    name: "Refund Confirmation",
    description: "Sent when a refund is processed",
    subject: "Your refund has been processed",
    preview: "We've processed your refund. Here are the details...",
  },
];

const EmailTemplateCard: React.FC<{
  template: typeof EMAIL_TEMPLATES[0];
}> = ({ template }) => {
  const handleEdit = () => {
    toast.info(`Editing template: ${template.name}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <span className="text-sm font-medium">Subject:</span>
            <p className="text-sm text-muted-foreground">{template.subject}</p>
          </div>
          <div>
            <span className="text-sm font-medium">Preview:</span>
            <p className="text-sm text-muted-foreground">{template.preview}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleEdit} variant="outline" className="w-full">Edit Template</Button>
      </CardFooter>
    </Card>
  );
};

const EmailTemplatesPage = () => {
  const handleCreateTemplate = () => {
    toast.info("Creating new email template");
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">
            Manage and customize your automated email templates
          </p>
        </div>
        <Button onClick={handleCreateTemplate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="transaction">Transaction</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMAIL_TEMPLATES.map((template) => (
              <EmailTemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="transaction" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMAIL_TEMPLATES.slice(0, 2).map((template) => (
              <EmailTemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="marketing" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EmailTemplateCard template={EMAIL_TEMPLATES[1]} />
          </div>
        </TabsContent>
        <TabsContent value="custom" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No custom templates yet</p>
            <Button onClick={handleCreateTemplate}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Custom Template
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default EmailTemplatesPage;
