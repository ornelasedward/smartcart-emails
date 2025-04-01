
import React from "react";
import ColorPicker from "./ColorPicker";
import LogoUploader from "./LogoUploader";

interface DesignTabProps {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  showColorPicker: boolean;
  setShowColorPicker: (show: boolean) => void;
  activeColorType: "primary" | "background";
  setActiveColorType: (type: "primary" | "background") => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
}

const DesignTab: React.FC<DesignTabProps> = ({
  primaryColor,
  setPrimaryColor,
  backgroundColor,
  setBackgroundColor,
  showColorPicker,
  setShowColorPicker,
  activeColorType,
  setActiveColorType,
  logoUrl,
  setLogoUrl
}) => {
  return (
    <div className="space-y-6 py-4">
      <ColorPicker
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        activeColorType={activeColorType}
        setActiveColorType={setActiveColorType}
      />
      
      <LogoUploader
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
      />
    </div>
  );
};

export default DesignTab;
