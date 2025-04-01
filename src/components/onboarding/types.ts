
export interface OnboardingStepsProps {
  open: boolean;
  onCompleteOnboarding: () => void;
}

export interface SenderFormValues {
  domain: string;
  senderName: string;
}
