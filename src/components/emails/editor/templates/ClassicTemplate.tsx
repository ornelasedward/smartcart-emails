
import { EmailTemplateProps } from "./EmailTemplateProps";

export const renderClassicTemplate = (props: EmailTemplateProps, processedContent: string): string => {
  const { logoUrl, primaryColor, backgroundColor, heroTitle, subtitle, showCta, ctaText } = props;
  
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
