
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, LayoutGrid, LayoutList, FileText, FileImage } from "lucide-react";

export type EmailTemplateStyle = "modern" | "minimal" | "classic" | "promotional";

interface TemplateStyleCardProps {
  style: EmailTemplateStyle;
  name: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: (style: EmailTemplateStyle) => void;
}

const TemplateStyleCard: React.FC<TemplateStyleCardProps> = ({
  style,
  name,
  description,
  icon,
  selected,
  onSelect,
}) => {
  // Generate a preview thumbnail based on the template style
  const renderPreviewThumbnail = () => {
    switch (style) {
      case "modern":
        return (
          <div className="bg-white rounded-md overflow-hidden border shadow-sm h-full">
            <div className="bg-blue-500 h-4" />
            <div className="p-2">
              <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
              <div className="w-3/4 h-2 bg-gray-200 rounded mb-2"></div>
              <div className="w-1/2 h-2 bg-gray-200 rounded mb-2"></div>
              <div className="w-full h-1 bg-gray-100 rounded mb-2"></div>
              <div className="w-3/4 h-1 bg-gray-100 rounded"></div>
            </div>
            <div className="h-4 flex justify-center items-center">
              <div className="w-1/3 h-2 bg-blue-200 rounded"></div>
            </div>
          </div>
        );
      case "minimal":
        return (
          <div className="bg-white rounded-md overflow-hidden border shadow-sm h-full">
            <div className="border-t-2 border-purple-500 pt-1 p-2">
              <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
              <div className="w-2/3 h-2 bg-gray-200 rounded mb-2"></div>
              <div className="w-full h-1 bg-gray-100 rounded mb-1"></div>
              <div className="w-2/3 h-1 bg-gray-100 rounded"></div>
            </div>
            <div className="border-t border-gray-100 h-4 flex items-center p-1">
              <div className="w-1/4 h-1 bg-gray-200 rounded"></div>
            </div>
          </div>
        );
      case "classic":
        return (
          <div className="bg-white rounded-md overflow-hidden border shadow-sm h-full">
            <div className="border-b border-gray-200 h-4 flex justify-center items-center">
              <div className="w-1/4 h-1 bg-gray-300 rounded"></div>
            </div>
            <div className="p-2 text-center">
              <div className="w-3/4 h-2 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
              <div className="w-2/3 h-2 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="w-full h-1 bg-gray-100 rounded mb-1"></div>
              <div className="w-2/3 h-1 bg-gray-100 rounded mx-auto"></div>
            </div>
            <div className="border-t border-gray-200 h-2"></div>
          </div>
        );
      case "promotional":
        return (
          <div className="bg-white rounded-md overflow-hidden border shadow-sm h-full">
            <div className="bg-gradient-to-r from-pink-500 to-orange-400 h-6 flex justify-center items-center">
              <div className="w-2/3 h-1 bg-white/60 rounded"></div>
            </div>
            <div className="p-2">
              <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
              <div className="w-3/4 h-2 bg-gray-200 rounded mb-2"></div>
              <div className="w-full h-1 bg-gray-100 rounded mb-1"></div>
              <div className="w-2/3 h-1 bg-gray-100 rounded"></div>
            </div>
            <div className="h-4 flex justify-center items-center">
              <div className="w-1/3 h-2 rounded bg-gradient-to-r from-pink-500 to-orange-400"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-all hover:border-primary h-full ${
        selected ? "border-2 border-primary bg-primary/5" : ""
      }`}
      onClick={() => onSelect(style)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="text-muted-foreground">{icon}</div>
          <div className="flex-1">
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          {selected && <Check className="w-5 h-5 text-primary" />}
        </div>
        
        {/* Preview thumbnail */}
        <div className="h-24">
          {renderPreviewThumbnail()}
        </div>
      </CardContent>
    </Card>
  );
};

interface EmailTemplateStylesProps {
  selectedStyle: EmailTemplateStyle;
  onSelectStyle: (style: EmailTemplateStyle) => void;
}

const EmailTemplateStyles: React.FC<EmailTemplateStylesProps> = ({
  selectedStyle,
  onSelectStyle,
}) => {
  const templateStyles: Array<{
    style: EmailTemplateStyle;
    name: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      style: "modern",
      name: "Modern",
      description: "Clean and contemporary design with ample white space",
      icon: <LayoutGrid className="w-6 h-6" />,
    },
    {
      style: "minimal",
      name: "Minimal",
      description: "Simple and straightforward with essential elements only",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      style: "classic",
      name: "Classic",
      description: "Traditional email layout with formal appearance",
      icon: <LayoutList className="w-6 h-6" />,
    },
    {
      style: "promotional",
      name: "Promotional",
      description: "Eye-catching design ideal for marketing emails",
      icon: <FileImage className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Template Style</h3>
      <div className="grid grid-cols-2 gap-3">
        {templateStyles.map((template) => (
          <TemplateStyleCard
            key={template.style}
            style={template.style}
            name={template.name}
            description={template.description}
            icon={template.icon}
            selected={selectedStyle === template.style}
            onSelect={onSelectStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default EmailTemplateStyles;
