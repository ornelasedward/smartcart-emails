
import { EmailTemplateProps } from "./EmailTemplateProps";

export const renderModernTemplate = (props: EmailTemplateProps, processedContent: string): string => {
  const { logoUrl, primaryColor, backgroundColor, heroTitle, subtitle, showCta, ctaText } = props;
  
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
