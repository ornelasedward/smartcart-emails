
import { EmailTemplateStyle } from "../editor/EmailTemplateStyles";
import { SubscriberType } from "../editor/templates/EmailTemplateProps";

export interface CampaignComposerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscribers: SubscriberType[];
}

export interface CampaignData {
  subject: string;
  content: string;
  logoUrl: string;
  primaryColor: string;
  backgroundColor: string;
  heroTitle: string;
  subtitle: string;
  showCta: boolean;
  ctaText: string;
  templateStyle: EmailTemplateStyle;
  isScheduled: boolean;
  scheduleDate?: Date;
}

export interface TabBaseProps {
  campaignData: CampaignData;
  setCampaignData: React.Dispatch<React.SetStateAction<CampaignData>>;
}

export interface SchedulingProps {
  isScheduled: boolean;
  setIsScheduled: (isScheduled: boolean) => void;
  scheduleDate?: Date;
  setScheduleDate: (date: Date | undefined) => void;
}
