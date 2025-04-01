
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./editor/ContentTab";
import DesignTab from "./editor/DesignTab";
import PreviewTab from "./editor/PreviewTab";
import { getDefaultSubject, getDefaultContent, getDefaultHeroTitle, getDefaultSubtitle, getTemplateTitle } from "./editor/EmailEditorUtils";

export type EmailRuleType = "confirmation" | "abandoned-cart" | "cancellation" | "refund";

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
  
  React.useEffect(() => {
    if (open && templateType) {
      setSubject(getDefaultSubject(templateType));
      setContent(getDefaultContent(templateType));
      setHeroTitle(getDefaultHeroTitle(templateType));
      setSubtitle(getDefaultSubtitle(templateType));
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
      createdAt: new Date().toISOString(),
    });
    
    toast.success("Email template saved successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{getTemplateTitle(templateType)}</DialogTitle>
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
          
          <TabsContent value="content">
            <ContentTab
              subject={subject}
              setSubject={setSubject}
              heroTitle={heroTitle}
              setHeroTitle={setHeroTitle}
              subtitle={subtitle}
              setSubtitle={setSubtitle}
              content={content}
              setContent={setContent}
              showCta={showCta}
              setShowCta={setShowCta}
              ctaText={ctaText}
              setCtaText={setCtaText}
            />
          </TabsContent>
          
          <TabsContent value="design">
            <DesignTab
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              showColorPicker={showColorPicker}
              setShowColorPicker={setShowColorPicker}
              activeColorType={activeColorType}
              setActiveColorType={setActiveColorType}
              logoUrl={logoUrl}
              setLogoUrl={setLogoUrl}
            />
          </TabsContent>

          <TabsContent value="preview">
            <PreviewTab
              content={content}
              logoUrl={logoUrl}
              primaryColor={primaryColor}
              backgroundColor={backgroundColor}
              heroTitle={heroTitle}
              subtitle={subtitle}
              showCta={showCta}
              ctaText={ctaText}
            />
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
