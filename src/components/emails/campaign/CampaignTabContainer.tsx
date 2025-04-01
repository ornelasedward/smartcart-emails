
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ContentTab from "../editor/ContentTab";
import DesignTab from "../editor/DesignTab";
import PreviewTab from "../editor/PreviewTab";
import EmailTemplateStyles, { EmailTemplateStyle } from "../editor/EmailTemplateStyles";
import { TabBaseProps } from "../types/CampaignComposerTypes";

interface CampaignTabContainerProps extends TabBaseProps {
  activeTab: string;
}

const CampaignTabContainer: React.FC<CampaignTabContainerProps> = ({
  campaignData,
  setCampaignData,
  activeTab
}) => {
  const {
    subject,
    content,
    logoUrl,
    primaryColor,
    backgroundColor,
    heroTitle,
    subtitle,
    showCta,
    ctaText,
    templateStyle
  } = campaignData;

  const setContent = (value: string) => {
    setCampaignData(prev => ({ ...prev, content: value }));
  };

  const setSubject = (value: string) => {
    setCampaignData(prev => ({ ...prev, subject: value }));
  };

  const setHeroTitle = (value: string) => {
    setCampaignData(prev => ({ ...prev, heroTitle: value }));
  };

  const setSubtitle = (value: string) => {
    setCampaignData(prev => ({ ...prev, subtitle: value }));
  };

  const setShowCta = (value: boolean) => {
    setCampaignData(prev => ({ ...prev, showCta: value }));
  };

  const setCtaText = (value: string) => {
    setCampaignData(prev => ({ ...prev, ctaText: value }));
  };

  const setPrimaryColor = (value: string) => {
    setCampaignData(prev => ({ ...prev, primaryColor: value }));
  };

  const setBackgroundColor = (value: string) => {
    setCampaignData(prev => ({ ...prev, backgroundColor: value }));
  };

  const setLogoUrl = (value: string) => {
    setCampaignData(prev => ({ ...prev, logoUrl: value }));
  };

  const setTemplateStyle = (value: EmailTemplateStyle) => {
    setCampaignData(prev => ({ ...prev, templateStyle: value }));
  };

  // State for color picker UI
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [activeColorType, setActiveColorType] = React.useState<"primary" | "background">("primary");

  return (
    <>
      <TabsContent value="content">
        <ContentTab
          subject={subject}
          setSubject={setSubject}
          heroTitle={heroTitle}
          setHeroTitle={setHeroTitle}
          subtitle={subtitle}
          setSubtitle={setSubtitle}
          content={content}
          setContent={setContent}
          showCta={showCta}
          setShowCta={setShowCta}
          ctaText={ctaText}
          setCtaText={setCtaText}
        />
      </TabsContent>
      
      <TabsContent value="design">
        <DesignTab
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          showColorPicker={showColorPicker}
          setShowColorPicker={setShowColorPicker}
          activeColorType={activeColorType}
          setActiveColorType={setActiveColorType}
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
        />
      </TabsContent>
      
      <TabsContent value="style">
        <div className="py-4">
          <EmailTemplateStyles
            selectedStyle={templateStyle}
            onSelectStyle={setTemplateStyle}
          />
        </div>
      </TabsContent>

      <TabsContent value="preview">
        <PreviewTab
          content={content}
          logoUrl={logoUrl}
          primaryColor={primaryColor}
          backgroundColor={backgroundColor}
          heroTitle={heroTitle}
          subtitle={subtitle}
          showCta={showCta}
          ctaText={ctaText}
          templateStyle={templateStyle}
        />
      </TabsContent>
    </>
  );
};

export default CampaignTabContainer;
