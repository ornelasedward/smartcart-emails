
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckCircle, ChevronRight } from "lucide-react";

interface SenderFormValues {
  domain: string;
  senderName: string;
}

interface OnboardingStepsProps {
  open: boolean;
  onCompleteOnboarding: () => void;
}

const OnboardingSteps = ({ open, onCompleteOnboarding }: OnboardingStepsProps) => {
  const [step, setStep] = useState<number>(1);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const totalSteps = 3;

  const senderForm = useForm<SenderFormValues>({
    defaultValues: {
      domain: "",
      senderName: ""
    }
  });

  const handleNextStep = () => {
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBackStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleConnectStripe = () => {
    if (stripeApiKey.trim()) {
      toast.success("Stripe API key saved successfully");
      handleNextStep();
    } else {
      toast.error("Please enter your Stripe API key");
    }
  };

  const handleStripeConnect = () => {
    toast.info("Redirecting to Stripe Connect...");
    // In a real implementation, this would redirect to Stripe Connect flow
    setTimeout(() => {
      toast.success("Stripe account connected successfully");
      handleNextStep();
    }, 1500);
  };

  const onSubmitSenderInfo = (data: SenderFormValues) => {
    toast.success("Sender information saved successfully");
    handleNextStep();
  };

  const getFullEmailAddress = () => {
    const domain = senderForm.watch("domain");
    const senderName = senderForm.watch("senderName");
    
    if (!domain && !senderName) return "";
    if (!domain) return senderName;
    if (!senderName) return `${domain}@SmartCart.com`;
    
    return `${senderName} <${domain}@SmartCart.com>`;
  };

  const finishOnboarding = () => {
    onCompleteOnboarding();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-2xl">
              {step === 1 && "Configure Your Sender Identity"}
              {step === 2 && "Connect with Stripe"}
              {step === 3 && "You're All Set!"}
            </DialogTitle>
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-10 rounded-full transition-colors duration-300 ${
                    i + 1 <= step ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <DialogDescription>
            {step === 1 && "Let's start by setting up your email sender identity"}
            {step === 2 && "Connect your Stripe account to enable payments"}
            {step === 3 && "Your SmartCart is now ready to use"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <Form {...senderForm}>
            <form onSubmit={senderForm.handleSubmit(onSubmitSenderInfo)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={senderForm.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Edward from Woodworking" {...field} />
                      </FormControl>
                      <FormDescription>
                        This name will appear as the sender of your emails
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={senderForm.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain Prefix</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input placeholder="ornelasedward" {...field} />
                          <span className="whitespace-nowrap text-sm text-muted-foreground">@SmartCart.com</span>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Your custom email domain prefix
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-md bg-muted p-4 mt-4">
                <div className="text-sm font-medium">Preview:</div>
                <div className="mt-1 text-sm">
                  {getFullEmailAddress() || "Please enter sender name and domain"}
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="submit" className="w-full">
                  Continue <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Button 
              onClick={handleStripeConnect}
              className="flex items-center gap-2 w-full"
            >
              <svg width="20" height="20" viewBox="0 0 32 32">
                <path d="M26.88 7.52c0-2.24-1.12-4-3.2-4s-3.36 1.76-3.36 3.84c0 2.56 1.44 3.84 3.68 3.84 1.072 0 1.84-0.256 2.4-0.608v-1.984c-0.544 0.32-1.184 0.512-2.016 0.512-0.8 0-1.504-0.288-1.6-1.28h4.064c0-0.16 0.032-0.576 0.032-0.832zM22.72 8.16c0-0.96 0.576-1.344 1.088-1.344 0.496 0 1.024 0.384 1.024 1.344h-2.112zM18.4 11.04c0-0.704-0.576-0.96-1.488-0.96-0.992 0-1.904 0.304-1.904 0.304l0.288 1.44c0 0 0.592-0.24 1.152-0.24 0.384 0 0.544 0.16 0.544 0.32 0 0.544-2.528 0.464-2.528 2.256 0 1.008 0.704 1.648 1.888 1.648 0.736 0 1.184-0.16 1.488-0.384l0.112 0.224h1.632v-3.344c0.032-1.344-0.128-1.264-0.192-1.264zM18.4 12.608v0.864c-0.128 0.096-0.384 0.16-0.608 0.16-0.448 0-0.704-0.16-0.704-0.48 0-0.48 0.544-0.544 1.312-0.544zM12.16 6.208l-1.728 0.288 0.032 5.376c0 1.312 0.96 2.272 2.24 2.272 0.704 0 1.216-0.128 1.504-0.288v-1.664c-0.288 0.128-1.728 0.544-1.728-0.8v-1.984h1.728v-1.664h-1.728l-0.32-1.536zM8.544 7.36h1.76v6.528h-1.76v-6.528zM8.544 5.792h1.76v1.472h-1.76v-1.472zM5.408 5.6l-1.728 0.288 0.032 6.048c0 1.28 0.896 2.144 2.112 2.144 0.672 0 1.152-0.128 1.408-0.288v-1.632c-0.256 0.128-0.576 0.192-0.864 0.192-0.384 0-0.576-0.16-0.576-0.608v-2.592h1.472v-1.664h-1.472l-0.384-1.888z" fill="#6772e5"></path>
              </svg>
              Connect with Stripe
            </Button>
            
            <div className="text-center text-sm text-muted-foreground my-4">Or</div>
            
            <div className="space-y-4">
              <Input 
                placeholder="Enter your Stripe API key" 
                value={stripeApiKey}
                onChange={(e) => setStripeApiKey(e.target.value)}
              />
              <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                <Button 
                  variant="outline" 
                  onClick={handleBackStep}
                  className="w-full sm:w-auto order-1 sm:order-none"
                >
                  Back
                </Button>
                <Button onClick={handleConnectStripe} className="w-full sm:w-auto">
                  Connect API Key
                </Button>
              </DialogFooter>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-primary/10 p-6 mb-6">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Setup Complete!</h3>
            <p className="text-center text-muted-foreground mb-8">
              You've successfully configured your SmartCart. You're ready to start creating email rules.
            </p>
            <Button onClick={finishOnboarding} className="w-full">
              Get Started
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingSteps;
