
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, PlusCircle, CheckCircle, Trash2, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import CreateRuleModal from "@/components/emails/CreateRuleModal";
import EmailEditor from "@/components/emails/EmailEditor";

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
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [connected, setConnected] = useState(false);
  const [createRuleModalOpen, setCreateRuleModalOpen] = useState(false);
  const [emailEditorOpen, setEmailEditorOpen] = useState(false);
  const [currentTemplateType, setCurrentTemplateType] = useState<EmailRuleType | null>(null);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [emailRules, setEmailRules] = useState<EmailRule[]>([]);

  const handleConnectStripe = () => {
    if (stripeApiKey.trim()) {
      toast.success("Stripe API key saved successfully");
      setConnected(true);
    } else {
      toast.error("Please enter your Stripe API key");
    }
  };

  const handleStripeConnect = () => {
    toast.info("Redirecting to Stripe Connect...");
    // In a real implementation, this would redirect to Stripe Connect flow
    setTimeout(() => {
      setConnected(true);
      toast.success("Stripe account connected successfully");
    }, 1500);
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
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Welcome to SmartCart</h1>
        <p className="text-muted-foreground">
          Automate your email workflows with Stripe integration
        </p>
      </div>

      {!connected ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Connect your Stripe account to start automating emails
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Button 
                onClick={handleStripeConnect}
                className="flex items-center gap-2 mb-6"
              >
                <svg width="20" height="20" viewBox="0 0 32 32">
                  <path d="M26.88 7.52c0-2.24-1.12-4-3.2-4s-3.36 1.76-3.36 3.84c0 2.56 1.44 3.84 3.68 3.84 1.072 0 1.84-0.256 2.4-0.608v-1.984c-0.544 0.32-1.184 0.512-2.016 0.512-0.8 0-1.504-0.288-1.6-1.28h4.064c0-0.16 0.032-0.576 0.032-0.832zM22.72 8.16c0-0.96 0.576-1.344 1.088-1.344 0.496 0 1.024 0.384 1.024 1.344h-2.112zM18.4 11.04c0-0.704-0.576-0.96-1.488-0.96-0.992 0-1.904 0.304-1.904 0.304l0.288 1.44c0 0 0.592-0.24 1.152-0.24 0.384 0 0.544 0.16 0.544 0.32 0 0.544-2.528 0.464-2.528 2.256 0 1.008 0.704 1.648 1.888 1.648 0.736 0 1.184-0.16 1.488-0.384l0.112 0.224h1.632v-3.344c0.032-1.344-0.128-1.264-0.192-1.264zM18.4 12.608v0.864c-0.128 0.096-0.384 0.16-0.608 0.16-0.448 0-0.704-0.16-0.704-0.48 0-0.48 0.544-0.544 1.312-0.544zM12.16 6.208l-1.728 0.288 0.032 5.376c0 1.312 0.96 2.272 2.24 2.272 0.704 0 1.216-0.128 1.504-0.288v-1.664c-0.288 0.128-1.728 0.544-1.728-0.8v-1.984h1.728v-1.664h-1.728l-0.32-1.536zM8.544 7.36h1.76v6.528h-1.76v-6.528zM8.544 5.792h1.76v1.472h-1.76v-1.472zM5.408 5.6l-1.728 0.288 0.032 6.048c0 1.28 0.896 2.144 2.112 2.144 0.672 0 1.152-0.128 1.408-0.288v-1.632c-0.256 0.128-0.576 0.192-0.864 0.192-0.384 0-0.576-0.16-0.576-0.608v-2.592h1.472v-1.664h-1.472l-0.384-1.888z" fill="#6772e5"></path>
                </svg>
                Connect with Stripe
              </Button>
              
              <div className="text-center text-sm text-muted-foreground mb-6">Or</div>
              
              <div className="space-y-2">
                <Input 
                  placeholder="Enter your Stripe API key" 
                  value={stripeApiKey}
                  onChange={(e) => setStripeApiKey(e.target.value)}
                />
                <Button onClick={handleConnectStripe} className="w-full">
                  Connect API Key
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6 bg-green-50 text-green-700 px-4 py-3 rounded-md">
            <CheckCircle className="h-5 w-5" />
            <span>Stripe account successfully connected!</span>
          </div>
          
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
    </DashboardLayout>
  );
};

export default DashboardPage;
