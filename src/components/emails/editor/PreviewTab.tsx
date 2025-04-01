
import React from "react";
import { EmailTemplateStyle } from "./EmailTemplateStyles";
import { renderModernTemplate } from "./templates/ModernTemplate";
import { renderMinimalTemplate } from "./templates/MinimalTemplate";
import { renderClassicTemplate } from "./templates/ClassicTemplate";
import { renderPromotionalTemplate } from "./templates/PromotionalTemplate";
import { EmailTemplateProps } from "./templates/EmailTemplateProps";

interface PreviewTabProps {
  content: string;
  logoUrl: string;
  primaryColor: string;
  backgroundColor: string;
  heroTitle: string;
  subtitle: string;
  showCta: boolean;
  ctaText: string;
  templateStyle: EmailTemplateStyle;
}

const PreviewTab: React.FC<PreviewTabProps> = ({
  content,
  logoUrl,
  primaryColor,
  backgroundColor,
  heroTitle,
  subtitle,
  showCta,
  ctaText,
  templateStyle
}) => {
  const renderEmailPreview = () => {
    // Parse content and replace placeholders with example data
    let processedContent = content
      .replace(/{customer_name}/g, "John Doe")
      .replace(/{order_id}/g, "#12345")
      .replace(/{order_total}/g, "$99.99")
      .replace(/{cart_items}/g, "1x Product ($49.99)")
      .replace(/{refund_amount}/g, "$99.99")
      .replace(/{company_name}/g, "ACME Store");
    
    // Common props for all templates
    const templateProps: EmailTemplateProps = {
      content,
      logoUrl,
      primaryColor,
      backgroundColor,
      heroTitle,
      subtitle,
      showCta,
      ctaText
    };
    
    switch(templateStyle) {
      case "modern":
        return renderModernTemplate(templateProps, processedContent);
      case "minimal":
        return renderMinimalTemplate(templateProps, processedContent);
      case "classic":
        return renderClassicTemplate(templateProps, processedContent);
      case "promotional":
        return renderPromotionalTemplate(templateProps, processedContent);
      default:
        return renderModernTemplate(templateProps, processedContent);
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="font-medium mb-2">Email Preview</h3>
        <div className="border rounded-md p-4 mt-4 overflow-auto max-h-[500px] bg-white">
          <div dangerouslySetInnerHTML={{ __html: renderEmailPreview() }} />
        </div>
      </div>
    </div>
  );
};

export default PreviewTab;
