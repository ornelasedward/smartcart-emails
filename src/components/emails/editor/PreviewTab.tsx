
import React from "react";

interface PreviewTabProps {
  content: string;
  logoUrl: string;
  primaryColor: string;
  backgroundColor: string;
  heroTitle: string;
  subtitle: string;
  showCta: boolean;
  ctaText: string;
}

const PreviewTab: React.FC<PreviewTabProps> = ({
  content,
  logoUrl,
  primaryColor,
  backgroundColor,
  heroTitle,
  subtitle,
  showCta,
  ctaText
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
    <div className="space-y-4 py-4">
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="font-medium mb-2">Email Preview</h3>
        {renderEmailPreview()}
      </div>
    </div>
  );
};

export default PreviewTab;
