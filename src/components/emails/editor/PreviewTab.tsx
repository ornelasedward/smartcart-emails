
import React from "react";
import { EmailTemplateStyle } from "./EmailTemplateStyles";

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
    
    switch(templateStyle) {
      case "modern":
        return renderModernTemplate(processedContent);
      case "minimal":
        return renderMinimalTemplate(processedContent);
      case "classic":
        return renderClassicTemplate(processedContent);
      case "promotional":
        return renderPromotionalTemplate(processedContent);
      default:
        return renderModernTemplate(processedContent);
    }
  };
  
  const renderModernTemplate = (processedContent: string) => {
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: ${backgroundColor}; color: #333;">
        ${logoUrl ? `<div style="text-align: center; padding: 20px;"><img src="${logoUrl}" alt="Company Logo" style="max-height: 80px; max-width: 200px;" /></div>` : ''}
        
        <div style="background-color: ${primaryColor}; color: white; padding: 30px 20px; text-align: center; border-radius: 8px; margin: 0 15px;">
          <h1 style="margin: 0; font-size: 28px; color: white; font-weight: 300;">${heroTitle}</h1>
          ${subtitle ? `<p style="margin-top: 10px; font-size: 16px; color: white; font-weight: 300;">${subtitle}</p>` : ''}
        </div>
        
        <div style="padding: 30px 20px; background-color: white; text-align: center; margin: 15px;">
          <p style="line-height: 1.6; font-size: 16px; margin-bottom: 20px;">Hello John,</p>
          <p style="line-height: 1.6; font-size: 16px;">${processedContent}</p>
          
          ${showCta ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: ${primaryColor}; color: white; padding: 12px 25px; text-decoration: none; font-weight: 500; display: inline-block; border-radius: 4px;">${ctaText}</a>
            </div>
          ` : ''}
          
          <p style="line-height: 1.6; font-size: 16px;">Best regards,<br>ACME Store Team</p>
        </div>
        
        <div style="padding: 20px; text-align: center; font-size: 12px; color: #777;">
          <p>© ${new Date().getFullYear()} ACME Store. All rights reserved.</p>
          <p>This email was sent to john.doe@example.com</p>
        </div>
      </div>
    `;
    
    return emailHtml;
  };
  
  const renderMinimalTemplate = (processedContent: string) => {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: ${backgroundColor}; color: #333; padding: 20px;">
        ${logoUrl ? `<div style="text-align: center; padding: 10px 0;"><img src="${logoUrl}" alt="Company Logo" style="max-height: 40px; max-width: 150px;" /></div>` : ''}
        
        <div style="border-top: 3px solid ${primaryColor}; padding-top: 20px; margin-top: 10px;">
          <h1 style="margin: 0; font-size: 24px; color: ${primaryColor};">${heroTitle}</h1>
          ${subtitle ? `<p style="margin-top: 5px; font-size: 14px; color: #666;">${subtitle}</p>` : ''}
        </div>
        
        <div style="padding: 20px 0;">
          <p style="line-height: 1.5; font-size: 14px;">Hello John,</p>
          <p style="line-height: 1.5; font-size: 14px;">${processedContent}</p>
          
          ${showCta ? `
            <div style="margin: 25px 0;">
              <a href="#" style="background-color: ${primaryColor}; color: white; padding: 8px 16px; text-decoration: none; font-size: 14px;">${ctaText}</a>
            </div>
          ` : ''}
          
          <p style="line-height: 1.5; font-size: 14px;">Regards,<br>ACME Team</p>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 15px; margin-top: 15px; font-size: 11px; color: #999;">
          <p>© ${new Date().getFullYear()} ACME Store. All rights reserved.</p>
          <p>This email was sent to john.doe@example.com</p>
        </div>
      </div>
    `;
    
    return emailHtml;
  };
  
  const renderClassicTemplate = (processedContent: string) => {
    const emailHtml = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background-color: ${backgroundColor}; color: #333;">
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px; text-align: center; border-bottom: 1px solid #ddd;">
              ${logoUrl ? `<img src="${logoUrl}" alt="Company Logo" style="max-height: 60px; max-width: 180px;" />` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 26px; color: ${primaryColor};">${heroTitle}</h1>
              ${subtitle ? `<p style="margin-top: 10px; font-size: 16px; color: #555; font-style: italic;">${subtitle}</p>` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <p style="line-height: 1.6; font-size: 16px; margin-bottom: 15px;">Dear John,</p>
              <p style="line-height: 1.6; font-size: 16px;">${processedContent}</p>
              
              ${showCta ? `
                <div style="text-align: center; margin: 30px 0;">
                  <a href="#" style="background-color: ${primaryColor}; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">${ctaText}</a>
                </div>
              ` : ''}
              
              <p style="line-height: 1.6; font-size: 16px; margin-top: 15px;">Sincerely,<br>ACME Store</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd;">
              <p>© ${new Date().getFullYear()} ACME Store. All rights reserved.</p>
              <p>This email was sent to john.doe@example.com</p>
            </td>
          </tr>
        </table>
      </div>
    `;
    
    return emailHtml;
  };
  
  const renderPromotionalTemplate = (processedContent: string) => {
    const emailHtml = `
      <div style="font-family: 'Trebuchet MS', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: ${backgroundColor}; color: #333;">
        ${logoUrl ? `<div style="text-align: center; padding: 15px; background-color: #f8f8f8;"><img src="${logoUrl}" alt="Company Logo" style="max-height: 70px; max-width: 180px;" /></div>` : ''}
        
        <div style="background-color: ${primaryColor}; background-image: linear-gradient(45deg, ${primaryColor}, ${adjustColor(primaryColor, 40)}); color: white; padding: 40px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; color: white; text-transform: uppercase; letter-spacing: 1px;">${heroTitle}</h1>
          ${subtitle ? `<p style="margin-top: 15px; font-size: 18px; color: white;">${subtitle}</p>` : ''}
          
          ${showCta ? `
            <div style="text-align: center; margin: 30px 0 10px 0;">
              <a href="#" style="background-color: white; color: ${primaryColor}; padding: 15px 30px; text-decoration: none; font-weight: bold; display: inline-block; border-radius: 50px; font-size: 16px; text-transform: uppercase;">${ctaText}</a>
            </div>
          ` : ''}
        </div>
        
        <div style="padding: 30px 20px; background-color: white; border-radius: 0 0 8px 8px;">
          <p style="line-height: 1.7; font-size: 16px;">Hi John,</p>
          <p style="line-height: 1.7; font-size: 16px;">${processedContent}</p>
          
          ${!showCta ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: ${primaryColor}; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; display: inline-block; border-radius: 4px;">${ctaText || 'Learn More'}</a>
            </div>
          ` : ''}
          
          <p style="line-height: 1.7; font-size: 16px; margin-top: 25px;">Cheers,<br>The ACME Team</p>
        </div>
        
        <div style="padding: 20px; text-align: center; font-size: 12px; color: #777; background-color: #f8f8f8;">
          <p>© ${new Date().getFullYear()} ACME Store. All rights reserved.</p>
          <p>This email was sent to john.doe@example.com</p>
        </div>
      </div>
    `;
    
    return emailHtml;
  };
  
  // Helper function to adjust colors for gradients
  const adjustColor = (color: string, amount: number): string => {
    // Only support hex colors for simplicity
    if (!color.startsWith('#')) return color;
    
    let hex = color.slice(1);
    
    // Convert to RGB
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    
    // Adjust the brightness
    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));
    
    // Convert back to hex
    const newHex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    return `#${newHex}`;
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
