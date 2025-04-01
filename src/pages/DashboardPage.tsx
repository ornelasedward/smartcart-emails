
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import CreateRuleModal from "@/components/emails/CreateRuleModal";
import EmailEditor from "@/components/emails/EmailEditor";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import CreditsDisplay from "@/components/emails/CreditsDisplay";
import PurchaseCreditsModal from "@/components/emails/PurchaseCreditsModal";
import EmailRuleList from "@/components/dashboard/EmailRuleList";
import EmptyRuleState from "@/components/dashboard/EmptyRuleState";
import StatusBanner from "@/components/dashboard/StatusBanner";

type EmailRuleType = "confirmation" | "abandoned-cart" | "cancellation" | "refund";

interface EmailRule {
  id: string;
  type: EmailRuleType;
  name: string;
  subject: string;
  content: string;
  logoUrl?: string;
  primaryColor: string;
  createdAt: string;
  active: boolean;
}

const DashboardPage = () => {
  const [connected, setConnected] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [createRuleModalOpen, setCreateRuleModalOpen] = useState(false);
  const [emailEditorOpen, setEmailEditorOpen] = useState(false);
  const [currentTemplateType, setCurrentTemplateType] = useState<EmailRuleType | null>(null);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [emailRules, setEmailRules] = useState<EmailRule[]>([]);
  const [purchaseCreditsModalOpen, setPurchaseCreditsModalOpen] = useState(false);
  
  // Mock credit data - in a real app, you would fetch this from your backend
  const [usedCredits, setUsedCredits] = useState(500);
  const [totalCredits, setTotalCredits] = useState(2000);

  const handleCompleteOnboarding = () => {
    setConnected(true);
    setOnboardingComplete(true);
    setShowOnboarding(false);
    toast.success("Setup complete! You can now create email rules.");
  };

  const handleCreateRule = () => {
    setCreateRuleModalOpen(true);
  };

  const handleSelectTemplateType = (templateType: EmailRuleType) => {
    setCurrentTemplateType(templateType);
    setEditingRuleId(null);
    setEmailEditorOpen(true);
  };

  const handleEditRule = (rule: EmailRule) => {
    setCurrentTemplateType(rule.type);
    setEditingRuleId(rule.id);
    setEmailEditorOpen(true);
  };

  const handleToggleRule = (id: string) => {
    setEmailRules(rules => 
      rules.map(rule => 
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
    toast.success("Rule status updated");
  };

  const handleDeleteRule = (id: string) => {
    setEmailRules(rules => rules.filter(rule => rule.id !== id));
    toast.success("Rule deleted successfully");
  };

  const handleSaveTemplate = (templateData: any) => {
    if (editingRuleId) {
      // Update existing rule
      setEmailRules(rules => 
        rules.map(rule => 
          rule.id === editingRuleId 
            ? { 
                ...rule, 
                ...templateData,
                name: getRuleName(templateData.type)
              } 
            : rule
        )
      );
    } else {
      // Create new rule
      const newRule: EmailRule = {
        id: `rule-${Date.now()}`,
        type: templateData.type,
        name: getRuleName(templateData.type),
        subject: templateData.subject,
        content: templateData.content,
        logoUrl: templateData.logoUrl,
        primaryColor: templateData.primaryColor,
        createdAt: templateData.createdAt,
        active: true
      };
      
      setEmailRules(prevRules => [...prevRules, newRule]);
    }
    
    setEditingRuleId(null);
  };

  const getRuleName = (type: EmailRuleType): string => {
    switch (type) {
      case "confirmation": return "Purchase Confirmation";
      case "abandoned-cart": return "Abandoned Cart";
      case "cancellation": return "Cancellation";
      case "refund": return "Refund";
      default: return "Email Rule";
    }
  };

  return (
    <DashboardLayout>
      <OnboardingSteps 
        open={showOnboarding && !onboardingComplete}
        onCompleteOnboarding={handleCompleteOnboarding}
      />
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Welcome to SmartCart</h1>
        <p className="text-muted-foreground">
          Automate your email workflows with Stripe integration
        </p>
      </div>

      {connected && (
        <div className="mt-8 space-y-6">
          <StatusBanner />
          
          <CreditsDisplay 
            usedCredits={usedCredits}
            totalCredits={totalCredits}
            onPurchaseClick={() => setPurchaseCreditsModalOpen(true)}
          />
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Email Rules</h2>
            <Button onClick={handleCreateRule}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Rule
            </Button>
          </div>

          {emailRules.length === 0 ? (
            <EmptyRuleState onCreateRule={handleCreateRule} />
          ) : (
            <EmailRuleList 
              emailRules={emailRules}
              onToggleRule={handleToggleRule}
              onEditRule={handleEditRule}
              onDeleteRule={handleDeleteRule}
            />
          )}
        </div>
      )}

      <CreateRuleModal 
        open={createRuleModalOpen} 
        onOpenChange={setCreateRuleModalOpen} 
        onCreateTemplate={handleSelectTemplateType} 
      />
      
      <EmailEditor 
        open={emailEditorOpen}
        onOpenChange={setEmailEditorOpen}
        templateType={currentTemplateType}
        onSaveTemplate={handleSaveTemplate}
      />

      <PurchaseCreditsModal
        open={purchaseCreditsModalOpen}
        onOpenChange={setPurchaseCreditsModalOpen}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
