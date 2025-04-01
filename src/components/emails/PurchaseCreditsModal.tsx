
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { toast } from "sonner";

interface PricingTier {
  id: string;
  emails: number;
  price: number;
}

interface PurchaseCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PurchaseCreditsModal = ({ 
  open, 
  onOpenChange 
}: PurchaseCreditsModalProps) => {
  const pricingTiers: PricingTier[] = [
    { id: "tier1", emails: 1000, price: 20 },
    { id: "tier2", emails: 5000, price: 50 },
    { id: "tier3", emails: 50000, price: 200 }
  ];

  const handlePurchase = (tier: PricingTier) => {
    // Here you would integrate with a payment provider like Stripe
    toast.success(`Purchasing ${tier.emails} emails for $${tier.price}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase Email Credits</DialogTitle>
          <DialogDescription>
            Add more email credits to your account to continue sending emails.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center text-sm font-medium text-center bg-muted py-2 rounded-md">
            <div>Email Credits</div>
            <div>Price</div>
            <div>Action</div>
          </div>
          
          {pricingTiers.map((tier) => (
            <div key={tier.id} className="grid grid-cols-3 items-center text-sm">
              <div className="font-medium">{tier.emails.toLocaleString()}</div>
              <div>${tier.price}</div>
              <div className="flex justify-end">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => handlePurchase(tier)}
                >
                  <DollarSign className="h-4 w-4 mr-1" />
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="sm:justify-start">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseCreditsModal;
