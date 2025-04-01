
export interface EmailTemplateProps {
  content: string;
  logoUrl: string;
  primaryColor: string;
  backgroundColor: string;
  heroTitle: string;
  subtitle: string;
  showCta: boolean;
  ctaText: string;
  templateStyle?: string;
}

export interface SubscriberType {
  id: number;
  email: string;
  name: string;
  date?: string;
  status?: string;
}
