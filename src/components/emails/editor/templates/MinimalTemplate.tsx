
import { EmailTemplateProps } from "./EmailTemplateProps";

export const renderMinimalTemplate = (props: EmailTemplateProps, processedContent: string): string => {
  const { logoUrl, primaryColor, backgroundColor, heroTitle, subtitle, showCta, ctaText } = props;
  
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
