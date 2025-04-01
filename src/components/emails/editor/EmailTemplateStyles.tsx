
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
  return (
    <Card
      className={`cursor-pointer transition-all hover:border-primary ${
        selected ? "border-2 border-primary bg-primary/5" : ""
      }`}
      onClick={() => onSelect(style)}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div className="text-muted-foreground">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-primary" />}
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
      <div className="grid grid-cols-1 gap-3">
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
