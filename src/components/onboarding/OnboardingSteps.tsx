
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { OnboardingStepsProps, SenderFormValues } from "./types";
import ConfigureSenderStep from "./ConfigureSenderStep";
import StripeConnectionStep from "./StripeConnectionStep";
import CompletionStep from "./CompletionStep";
import StepProgress from "./StepProgress";

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

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Configure Your Sender Identity";
      case 2: return "Connect with Stripe";
      case 3: return "You're All Set!";
      default: return "";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return "Let's start by setting up your email sender identity";
      case 2: return "Connect your Stripe account to enable payments";
      case 3: return "Your SmartCart is now ready to use";
      default: return "";
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-2xl">{getStepTitle()}</DialogTitle>
            <StepProgress currentStep={step} totalSteps={totalSteps} />
          </div>
          <DialogDescription>{getStepDescription()}</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <ConfigureSenderStep 
            senderForm={senderForm} 
            onSubmit={onSubmitSenderInfo} 
            getFullEmailAddress={getFullEmailAddress} 
          />
        )}

        {step === 2 && (
          <StripeConnectionStep 
            stripeApiKey={stripeApiKey}
            onStripeApiKeyChange={(e) => setStripeApiKey(e.target.value)}
            onConnectStripe={handleConnectStripe}
            onStripeConnect={handleStripeConnect}
            onBackStep={handleBackStep}
          />
        )}

        {step === 3 && (
          <CompletionStep onFinishOnboarding={finishOnboarding} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingSteps;
