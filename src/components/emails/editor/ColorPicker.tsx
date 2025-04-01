
import React from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  showColorPicker: boolean;
  setShowColorPicker: (show: boolean) => void;
  activeColorType: "primary" | "background";
  setActiveColorType: (type: "primary" | "background") => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  primaryColor,
  setPrimaryColor,
  backgroundColor,
  setBackgroundColor,
  showColorPicker,
  setShowColorPicker,
  activeColorType,
  setActiveColorType,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Colors</h3>
      
      <div className="space-y-2">
        <Label>Primary Color (Hero Background)</Label>
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-md border cursor-pointer"
            style={{ backgroundColor: primaryColor }}
            onClick={() => {
              setActiveColorType("primary");
              setShowColorPicker(!showColorPicker);
            }}
          />
          <Input
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-32"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Background Color</Label>
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-md border cursor-pointer"
            style={{ backgroundColor: backgroundColor }}
            onClick={() => {
              setActiveColorType("background");
              setShowColorPicker(!showColorPicker);
            }}
          />
          <Input
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-32"
          />
        </div>
      </div>
      
      {showColorPicker && (
        <div className="mt-2">
          <HexColorPicker 
            color={activeColorType === "primary" ? primaryColor : backgroundColor} 
            onChange={(color) => {
              if (activeColorType === "primary") {
                setPrimaryColor(color);
              } else {
                setBackgroundColor(color);
              }
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
