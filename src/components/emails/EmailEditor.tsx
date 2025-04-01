
import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HexColorPicker } from "react-colorful";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, ImageIcon } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("content");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a storage service
      // For now, we'll use a local URL
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
      toast.success("Logo uploaded successfully");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
      toast.success("Logo uploaded successfully");
    } else {
      toast.error("Please upload an image file");
    }
  };

  const renderEmailPreview = () => {
    // Parse content and replace placeholders with example data
    let processedContent = content
      .replace(/{customer_name}/g, "John Doe")
      .replace(/{order_id}/g, "#12345")
      .replace(/{order_total}/g, "$99.99")
      .replace(/{cart_items}/g, "1x Product ($49.99)")
      .replace(/{refund_amount}/g, "$99.99")
      .replace(/{company_name}/g, "ACME Store");
    
    // Convert new lines to <br> tags
    processedContent = processedContent.split('\n').map(line => line.trim()).join('<br />');
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        ${logoUrl ? `<div style="text-align: center; margin-bottom: 20px;"><img src="${logoUrl}" alt="Company Logo" style="max-height: 80px; max-width: 200px;" /></div>` : ''}
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px;">
          <h2 style="color: ${primaryColor};">${subject}</h2>
          <div style="color: #333; line-height: 1.6;">
            ${processedContent}
          </div>
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; color: #777; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <p>This email was sent to john.doe@example.com</p>
          </div>
        </div>
      </div>
    `;
    
    return (
      <div className="border rounded-md p-4 mt-4 bg-white">
        <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
      </div>
    );
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
        
        <Tabs defaultValue="content" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
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
              <div className="text-sm text-muted-foreground">
                <p>Available placeholders:</p>
                <ul className="list-disc pl-5">
                  <li>{"{customer_name}"} - Customer's name</li>
                  <li>{"{order_id}"} - Order ID</li>
                  <li>{"{order_total}"} - Order total</li>
                  <li>{"{cart_items}"} - Items left in cart</li>
                  <li>{"{refund_amount}"} - Refund amount</li>
                  <li>{"{company_name}"} - Your company name</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="design" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                className="hidden" 
                onChange={handleLogoUpload} 
              />
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                onClick={triggerFileInput}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {logoUrl ? (
                  <div className="flex flex-col items-center">
                    <img src={logoUrl} alt="Logo preview" className="max-h-20 mb-2" />
                    <Button variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      setLogoUrl("");
                    }}>
                      Remove Logo
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-2 p-2 rounded-full bg-muted">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or SVG (max 2MB)</p>
                  </>
                )}
              </div>
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

          <TabsContent value="preview" className="space-y-4 py-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-medium mb-2">Email Preview</h3>
              {renderEmailPreview()}
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
