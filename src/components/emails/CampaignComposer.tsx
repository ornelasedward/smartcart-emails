import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Send } from "lucide-react";
import ContentTab from "./editor/ContentTab";
import DesignTab from "./editor/DesignTab";
import PreviewTab from "./editor/PreviewTab";
import { getDefaultContent, getDefaultHeroTitle, getDefaultSubtitle } from "./editor/EmailEditorUtils";
import EmailTemplateStyles, { EmailTemplateStyle } from "./editor/EmailTemplateStyles";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface CampaignComposerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscribers: { id: number; email: string; name: string; date?: string; status?: string; };
}

const CampaignComposer: React.FC<CampaignComposerProps> = ({
  open,
  onOpenChange,
  subscribers
}) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState(getDefaultContent("confirmation"));
  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeColorType, setActiveColorType] = useState<"primary" | "background">("primary");
  const [activeTab, setActiveTab] = useState("content");
  const [heroTitle, setHeroTitle] = useState(getDefaultHeroTitle("confirmation"));
  const [subtitle, setSubtitle] = useState(getDefaultSubtitle("confirmation"));
  const [showCta, setShowCta] = useState(false);
  const [ctaText, setCtaText] = useState("Shop Now");
  const [templateStyle, setTemplateStyle] = useState<EmailTemplateStyle>("modern");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);

  const handleSendNow = () => {
    if (!subject.trim()) {
      toast.error("Please provide a subject for your email");
      return;
    }

    const recipients = subscribers.map(sub => sub.email).join(", ");
    
    toast.success("Campaign sent successfully!");
    console.log("Sending campaign to:", recipients);
    console.log("Email data:", { 
      subject, content, heroTitle, subtitle, 
      templateStyle, primaryColor, backgroundColor,
      logoUrl, showCta, ctaText 
    });
    
    onOpenChange(false);
  };

  const handleSchedule = () => {
    if (!subject.trim()) {
      toast.error("Please provide a subject for your email");
      return;
    }

    if (!scheduleDate) {
      toast.error("Please select a date to schedule your campaign");
      return;
    }

    const recipients = subscribers.map(sub => sub.email).join(", ");
    const scheduledTime = format(scheduleDate, "PPP 'at' p");
    
    toast.success(`Campaign scheduled for ${scheduledTime}`);
    console.log("Scheduling campaign for:", scheduledTime);
    console.log("Recipients:", recipients);
    console.log("Email data:", { 
      subject, content, heroTitle, subtitle, 
      templateStyle, primaryColor, backgroundColor,
      logoUrl, showCta, ctaText 
    });
    
    onOpenChange(false);
  };

  const recipientCount = subscribers.filter(s => s.status !== "Inactive").length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Email Campaign</DialogTitle>
          <DialogDescription>
            Compose your email and send it to {recipientCount} active subscribers.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="content" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
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
          
          <TabsContent value="style">
            <div className="py-4">
              <EmailTemplateStyles
                selectedStyle={templateStyle}
                onSelectStyle={setTemplateStyle}
              />
            </div>
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
              templateStyle={templateStyle}
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center space-x-2 py-2">
          <Switch 
            id="schedule" 
            checked={isScheduled}
            onCheckedChange={setIsScheduled}
          />
          <Label htmlFor="schedule">Schedule for later</Label>
          
          {isScheduled && (
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-auto ml-4 flex items-center gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  {scheduleDate ? format(scheduleDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={scheduleDate}
                  onSelect={setScheduleDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {isScheduled ? (
            <Button onClick={handleSchedule}>
              Schedule Campaign
            </Button>
          ) : (
            <Button onClick={handleSendNow}>
              <Send className="mr-2 h-4 w-4" />
              Send Now
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignComposer;
