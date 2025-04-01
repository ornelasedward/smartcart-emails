
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight, PlusCircle, CheckCircle, Trash2, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import CreateRuleModal from "@/components/emails/CreateRuleModal";
import EmailEditor from "@/components/emails/EmailEditor";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import CreditsDisplay from "@/components/emails/CreditsDisplay";
import PurchaseCreditsModal from "@/components/emails/PurchaseCreditsModal";

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

  const getRuleIcon = (type: EmailRuleType) => {
    switch (type) {
      case "confirmation": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "abandoned-cart": return <ArrowRight className="h-5 w-5 text-blue-500" />;
      case "cancellation": return <Trash2 className="h-5 w-5 text-red-500" />;
      case "refund": return <ArrowRight className="h-5 w-5 text-yellow-500" />;
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
          <div className="flex items-center gap-2 mb-6 bg-green-50 text-green-700 px-4 py-3 rounded-md">
            <CheckCircle className="h-5 w-5" />
            <span>Stripe account successfully connected!</span>
          </div>
          
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
            <Card>
              <CardContent className="py-12 flex flex-col items-center justify-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <PlusCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Email Rules Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Create your first email rule to start automating emails for purchase confirmations, abandoned carts, and more.
                </p>
                <Button onClick={handleCreateRule}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Rule
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {emailRules.map(rule => (
                <Card key={rule.id} className={rule.active ? "" : "opacity-70"}>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        {getRuleIcon(rule.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{rule.name}</h3>
                        <p className="text-sm text-muted-foreground">{rule.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleToggleRule(rule.id)}>
                        {rule.active ? (
                          <ToggleRight className="h-5 w-5" />
                        ) : (
                          <ToggleLeft className="h-5 w-5" />
                        )}
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEditRule(rule)}>
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteRule(rule.id)}>
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
