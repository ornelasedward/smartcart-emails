
import { toast } from "sonner";
import { format } from "date-fns";
import { CampaignData } from "@/components/emails/types/CampaignComposerTypes";
import { SubscriberType } from "@/components/emails/editor/templates/EmailTemplateProps";

export const sendCampaignNow = (
  campaignData: CampaignData,
  subscribers: SubscriberType[]
): boolean => {
  if (!campaignData.subject.trim()) {
    toast.error("Please provide a subject for your email");
    return false;
  }

  const recipients = subscribers
    .filter(sub => sub.status !== "Inactive")
    .map(sub => sub.email)
    .join(", ");

  toast.success("Campaign sent successfully!");
  console.log("Sending campaign to:", recipients);
  console.log("Email data:", { ...campaignData });

  return true;
};

export const scheduleCampaign = (
  campaignData: CampaignData,
  subscribers: SubscriberType[]
): boolean => {
  if (!campaignData.subject.trim()) {
    toast.error("Please provide a subject for your email");
    return false;
  }

  if (!campaignData.scheduleDate) {
    toast.error("Please select a date to schedule your campaign");
    return false;
  }

  const recipients = subscribers
    .filter(sub => sub.status !== "Inactive")
    .map(sub => sub.email)
    .join(", ");
    
  const scheduledTime = format(campaignData.scheduleDate, "PPP 'at' p");

  toast.success(`Campaign scheduled for ${scheduledTime}`);
  console.log("Scheduling campaign for:", scheduledTime);
  console.log("Recipients:", recipients);
  console.log("Email data:", { ...campaignData });

  return true;
};
