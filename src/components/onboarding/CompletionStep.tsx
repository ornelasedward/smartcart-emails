
import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompletionStepProps {
  onFinishOnboarding: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ onFinishOnboarding }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="rounded-full bg-primary/10 p-6 mb-6">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Setup Complete!</h3>
      <p className="text-center text-muted-foreground mb-8">
        You've successfully configured your Vibe Sends. You're ready to start creating email rules.
      </p>
      <Button onClick={onFinishOnboarding} className="w-full">
        Get Started
      </Button>
    </div>
  );
};

export default CompletionStep;
