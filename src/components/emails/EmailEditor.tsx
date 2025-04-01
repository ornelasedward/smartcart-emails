
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HexColorPicker } from "react-colorful";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type EmailRuleType = "confirmation" | "abandoned-cart" | "cancellation" | "refund";

interface EmailEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateType: EmailRuleType | null;
  onSaveTemplate: (templateData: any) => void;
}

const EmailEditor: React.FC<EmailEditorProps> = ({
  open,
  onOpenChange,
  templateType,
  onSaveTemplate,
}) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const getDefaultSubject = () => {
    switch (templateType) {
      case "confirmation":
        return "Thank you for your purchase!";
      case "abandoned-cart":
        return "You left something in your cart";
      case "cancellation":
        return "We're sorry to see you go";
      case "refund":
        return "Your refund has been processed";
      default:
        return "";
    }
  };
  
  const getDefaultContent = () => {
    switch (templateType) {
      case "confirmation":
        return `Hi {customer_name},\n\nThank you for your purchase! Your order has been confirmed and is being processed.\n\nOrder ID: {order_id}\nOrder Total: {order_total}\n\nWe'll send you another email when your order ships.\n\nBest regards,\n{company_name}`;
      case "abandoned-cart":
        return `Hi {customer_name},\n\nWe noticed you left some items in your cart.\n\nUse code COMEBACK for 10% off your purchase if you complete your order within the next 24 hours.\n\n{cart_items}\n\nBest regards,\n{company_name}`;
      case "cancellation":
        return `Hi {customer_name},\n\nWe're sorry to see you go. Your subscription has been canceled as requested.\n\nIf you have any feedback on how we could improve our service, please let us know.\n\nBest regards,\n{company_name}`;
      case "refund":
        return `Hi {customer_name},\n\nWe've processed your refund of {refund_amount}.\n\nIt may take 5-10 business days to appear on your statement.\n\nBest regards,\n{company_name}`;
      default:
        return "";
    }
  };
  
  React.useEffect(() => {
    if (open && templateType) {
      setSubject(getDefaultSubject());
      setContent(getDefaultContent());
    }
  }, [open, templateType]);

  const handleSave = () => {
    if (!subject || !content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    onSaveTemplate({
      type: templateType,
      subject,
      content,
      logoUrl,
      primaryColor,
      createdAt: new Date().toISOString(),
    });
    
    toast.success("Email template saved successfully");
    onOpenChange(false);
  };

  const getTemplateTitle = () => {
    switch (templateType) {
      case "confirmation":
        return "Purchase Confirmation Email";
      case "abandoned-cart":
        return "Abandoned Cart Email";
      case "cancellation":
        return "Cancellation Email";
      case "refund":
        return "Refund Email";
      default:
        return "Email Template";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{getTemplateTitle()}</DialogTitle>
          <DialogDescription>
            Customize your email template. You can use placeholders like {"{customer_name}"} that will be replaced with actual data.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input 
                id="subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Enter email subject" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Email Content</Label>
              <Textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Enter email content"
                className="min-h-[300px]"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="design" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input 
                id="logo" 
                value={logoUrl} 
                onChange={(e) => setLogoUrl(e.target.value)} 
                placeholder="https://example.com/logo.png" 
              />
              {logoUrl && (
                <div className="mt-2 p-2 border rounded-md inline-block">
                  <img src={logoUrl} alt="Logo preview" className="max-h-20" />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded-md border cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-32"
                />
              </div>
              
              {showColorPicker && (
                <div className="mt-2">
                  <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailEditor;
