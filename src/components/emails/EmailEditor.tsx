import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HexColorPicker } from "react-colorful";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, ImageIcon, PlusCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeColorType, setActiveColorType] = useState<"primary" | "background">("primary");
  const [activeTab, setActiveTab] = useState("content");
  const [heroTitle, setHeroTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [showCta, setShowCta] = useState(false);
  const [ctaText, setCtaText] = useState("Shop Now");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const productImageInputRef = useRef<HTMLInputElement>(null);
  
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
        return `Thank you for your order. We'll send you another email when your order ships.`;
      case "abandoned-cart":
        return `We noticed you left some items in your cart. Use code COMEBACK for 10% off your purchase if you complete your order within the next 24 hours.`;
      case "cancellation":
        return `We're sorry to see you go. Your subscription has been canceled as requested.`;
      case "refund":
        return `We've processed your refund. It may take 5-10 business days to appear on your statement.`;
      default:
        return "";
    }
  };

  const getDefaultHeroTitle = () => {
    switch (templateType) {
      case "confirmation":
        return "ORDER CONFIRMED";
      case "abandoned-cart":
        return "YOU'RE IN LUCK!";
      case "cancellation":
        return "SUBSCRIPTION CANCELLED";
      case "refund":
        return "REFUND PROCESSED";
      default:
        return "";
    }
  };

  const getDefaultSubtitle = () => {
    switch (templateType) {
      case "confirmation":
        return "Your order has been confirmed and is being processed";
      case "abandoned-cart":
        return "That item you loved is still waiting for you";
      case "cancellation":
        return "We hope to see you again soon";
      case "refund":
        return "Your money is on its way back to you";
      default:
        return "";
    }
  };
  
  React.useEffect(() => {
    if (open && templateType) {
      setSubject(getDefaultSubject());
      setContent(getDefaultContent());
      setHeroTitle(getDefaultHeroTitle());
      setSubtitle(getDefaultSubtitle());
      setShowCta(templateType === "abandoned-cart");
      setCtaText(templateType === "abandoned-cart" ? "Complete Your Order" : "Shop Now");
    }
  }, [open, templateType]);

  const handleSave = () => {
    if (!subject || !heroTitle) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    onSaveTemplate({
      type: templateType,
      subject,
      content,
      logoUrl,
      primaryColor,
      backgroundColor,
      heroTitle,
      subtitle,
      showCta,
      ctaText,
      productImageUrl,
      productTitle,
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'logo') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const localUrl = URL.createObjectURL(file);
      
      if (type === 'logo') {
        setLogoUrl(localUrl);
        toast.success("Logo uploaded successfully");
      }
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
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: ${backgroundColor}; color: #333;">
        ${logoUrl ? `<div style="text-align: center; padding: 20px;"><img src="${logoUrl}" alt="Company Logo" style="max-height: 80px; max-width: 200px;" /></div>` : ''}
        
        <div style="background-color: ${primaryColor}; color: white; padding: 30px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; color: white;">${heroTitle}</h1>
          ${subtitle ? `<p style="margin-top: 10px; font-size: 16px; color: white;">${subtitle}</p>` : ''}
        </div>
        
        <div style="padding: 30px 20px; background-color: white; text-align: center;">
          <p style="line-height: 1.6; font-size: 16px; margin-bottom: 20px;">Hello John,</p>
          <p style="line-height: 1.6; font-size: 16px;">${processedContent}</p>
          
          ${showCta ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: ${primaryColor}; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; display: inline-block;">${ctaText}</a>
            </div>
          ` : ''}
          
          <p style="line-height: 1.6; font-size: 16px;">Best regards,<br>ACME Store Team</p>
        </div>
        
        <div style="padding: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee; background-color: #f8f8f8;">
          <p>© ${new Date().getFullYear()} ACME Store. All rights reserved.</p>
          <p>This email was sent to john.doe@example.com</p>
        </div>
      </div>
    `;
    
    return (
      <div className="border rounded-md p-4 mt-4 overflow-auto max-h-[500px]">
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
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input 
                id="heroTitle" 
                value={heroTitle} 
                onChange={(e) => setHeroTitle(e.target.value)} 
                placeholder="Enter hero title" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input 
                id="subtitle" 
                value={subtitle} 
                onChange={(e) => setSubtitle(e.target.value)} 
                placeholder="Enter subtitle" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Email Content</Label>
              <Textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Enter email content"
                className="min-h-[150px]"
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
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <Switch 
                  id="show-cta" 
                  checked={showCta} 
                  onCheckedChange={setShowCta} 
                />
                <Label htmlFor="show-cta">Add Call-to-Action Button</Label>
              </div>
              
              {showCta && (
                <div className="pl-6 space-y-2 border-l-2 border-gray-200">
                  <Label htmlFor="ctaText">Button Text</Label>
                  <Input 
                    id="ctaText" 
                    value={ctaText} 
                    onChange={(e) => setCtaText(e.target.value)} 
                    placeholder="Enter button text" 
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="design" className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Colors</h3>
              
              <div className="space-y-2">
                <Label>Primary Color (Hero Background)</Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-10 h-10 rounded-md border cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                    onClick={() => {
                      setActiveColorType("primary");
                      setShowColorPicker(!showColorPicker);
                    }}
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-32"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-10 h-10 rounded-md border cursor-pointer"
                    style={{ backgroundColor: backgroundColor }}
                    onClick={() => {
                      setActiveColorType("background");
                      setShowColorPicker(!showColorPicker);
                    }}
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-32"
                  />
                </div>
              </div>
              
              {showColorPicker && (
                <div className="mt-2">
                  <HexColorPicker 
                    color={activeColorType === "primary" ? primaryColor : backgroundColor} 
                    onChange={(color) => {
                      if (activeColorType === "primary") {
                        setPrimaryColor(color);
                      } else {
                        setBackgroundColor(color);
                      }
                    }} 
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Logo</h3>
              
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
                  onDrop={(e) => handleDrop(e, 'logo')}
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
