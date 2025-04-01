
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDefaultContent, getDefaultHeroTitle, getDefaultSubtitle } from "./editor/EmailEditorUtils";
import { CampaignComposerProps } from "./types/CampaignComposerTypes";
import CampaignTabContainer from "./campaign/CampaignTabContainer";
import SchedulingOptions from "./campaign/SchedulingOptions";
import { sendCampaignNow, scheduleCampaign } from "@/services/emailCampaignService";

const CampaignComposer: React.FC<CampaignComposerProps> = ({
  open,
  onOpenChange,
  subscribers
}) => {
  const [activeTab, setActiveTab] = useState("content");
  const [campaignData, setCampaignData] = useState({
    subject: "",
    content: getDefaultContent("confirmation"),
    logoUrl: "",
    primaryColor: "#4f46e5",
    backgroundColor: "#ffffff",
    heroTitle: getDefaultHeroTitle("confirmation"),
    subtitle: getDefaultSubtitle("confirmation"),
    showCta: false,
    ctaText: "Shop Now",
    templateStyle: "modern" as const,
    isScheduled: false,
    scheduleDate: undefined as Date | undefined
  });
  
  const { isScheduled, scheduleDate } = campaignData;

  const setIsScheduled = (value: boolean) => {
    setCampaignData(prev => ({ ...prev, isScheduled: value }));
  };

  const setScheduleDate = (date: Date | undefined) => {
    setCampaignData(prev => ({ ...prev, scheduleDate: date }));
  };

  const handleSendNow = () => {
    const success = sendCampaignNow(campaignData, subscribers);
    if (success) {
      onOpenChange(false);
    }
  };

  const handleSchedule = () => {
    const success = scheduleCampaign(campaignData, subscribers);
    if (success) {
      onOpenChange(false);
    }
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
          
          <CampaignTabContainer
            campaignData={campaignData}
            setCampaignData={setCampaignData}
            activeTab={activeTab}
          />
        </Tabs>
        
        <SchedulingOptions
          isScheduled={isScheduled}
          setIsScheduled={setIsScheduled}
          scheduleDate={scheduleDate}
          setScheduleDate={setScheduleDate}
        />
        
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
