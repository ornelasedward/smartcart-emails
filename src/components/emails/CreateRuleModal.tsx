
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, ShoppingCart, X, RefreshCcw, AlertCircle } from "lucide-react";

type EmailRuleType = "confirmation" | "abandoned-cart" | "cancellation" | "refund";

type EmailTemplate = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  type: EmailRuleType;
};

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "confirmation",
    name: "Purchase Confirmation",
    description: "Send an email when a customer completes a purchase",
    icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    type: "confirmation",
  },
  {
    id: "abandoned-cart",
    name: "Abandoned Cart",
    description: "Send an email when a customer abandons their cart",
    icon: <ShoppingCart className="h-8 w-8 text-blue-500" />,
    type: "abandoned-cart",
  },
  {
    id: "cancellation",
    name: "Cancellation",
    description: "Send an email when a customer cancels their subscription",
    icon: <X className="h-8 w-8 text-red-500" />,
    type: "cancellation",
  },
  {
    id: "refund",
    name: "Refund",
    description: "Send an email when a customer is refunded",
    icon: <RefreshCcw className="h-8 w-8 text-yellow-500" />,
    type: "refund",
  },
];

interface CreateRuleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTemplate: (templateType: EmailRuleType) => void;
}

const CreateRuleModal: React.FC<CreateRuleModalProps> = ({
  open,
  onOpenChange,
  onCreateTemplate,
}) => {
  const handleSelectTemplate = (template: EmailTemplate) => {
    onCreateTemplate(template.type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Select Email Template</DialogTitle>
          <DialogDescription>
            Choose a template for your automated email
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {EMAIL_TEMPLATES.map((template) => (
            <Card 
              key={template.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleSelectTemplate(template)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">{template.icon}</div>
                <h3 className="text-lg font-medium mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRuleModal;
