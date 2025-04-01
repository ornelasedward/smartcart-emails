
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface LogoUploaderProps {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ logoUrl, setLogoUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a storage service
      // For now, we'll use a local URL
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
      toast.success("Logo uploaded successfully");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
      toast.success("Logo uploaded successfully");
    } else {
      toast.error("Please upload an image file");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Logo</h3>
      
      <div className="space-y-2">
        <Label>Company Logo</Label>
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/*" 
          className="hidden" 
          onChange={handleLogoUpload} 
        />
        <div 
          className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {logoUrl ? (
            <div className="flex flex-col items-center">
              <img src={logoUrl} alt="Logo preview" className="max-h-20 mb-2" />
              <Button variant="outline" size="sm" onClick={(e) => {
                e.stopPropagation();
                setLogoUrl("");
              }}>
                Remove Logo
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-2 p-2 rounded-full bg-muted">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG or SVG (max 2MB)</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoUploader;
