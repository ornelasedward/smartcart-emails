
import { EmailTemplateProps } from "./EmailTemplateProps";
import { adjustColor } from "./utils";

export const renderPromotionalTemplate = (props: EmailTemplateProps, processedContent: string): string => {
  const { logoUrl, primaryColor, backgroundColor, heroTitle, subtitle, showCta, ctaText } = props;
  
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
