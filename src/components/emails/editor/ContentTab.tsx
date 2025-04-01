
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ContentTabProps {
  subject: string;
  setSubject: (subject: string) => void;
  heroTitle: string;
  setHeroTitle: (title: string) => void;
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
  content: string;
  setContent: (content: string) => void;
  showCta: boolean;
  setShowCta: (show: boolean) => void;
  ctaText: string;
  setCtaText: (text: string) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({
  subject,
  setSubject,
  heroTitle,
  setHeroTitle,
  subtitle,
  setSubtitle,
  content,
  setContent,
  showCta,
  setShowCta,
  ctaText,
  setCtaText,
}) => {
  return (
    <div className="space-y-4 py-4">
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
    </div>
  );
};

export default ContentTab;
