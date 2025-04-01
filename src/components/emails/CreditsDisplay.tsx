
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface CreditsDisplayProps {
  usedCredits: number;
  totalCredits: number;
  onPurchaseClick: () => void;
}

const CreditsDisplay = ({ 
  usedCredits, 
  totalCredits, 
  onPurchaseClick 
}: CreditsDisplayProps) => {
  const percentageUsed = Math.min(100, (usedCredits / totalCredits) * 100);
  
  return (
    <div className="bg-card border rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1 w-full">
        <div className="flex justify-between mb-2 items-center">
          <span className="text-sm font-medium">
            {usedCredits} emails out of {totalCredits} used
          </span>
          <span className="text-sm text-muted-foreground">
            {totalCredits - usedCredits} remaining
          </span>
        </div>
        <Progress value={percentageUsed} className="h-2" />
      </div>
      <Button onClick={onPurchaseClick} className="whitespace-nowrap w-full md:w-auto">
        <CreditCard className="mr-2 h-4 w-4" /> Buy Credits
      </Button>
    </div>
  );
};

export default CreditsDisplay;
