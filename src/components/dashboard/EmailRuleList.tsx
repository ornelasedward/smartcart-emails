
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

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

interface EmailRuleListProps {
  emailRules: EmailRule[];
  onToggleRule: (id: string) => void;
  onEditRule: (rule: EmailRule) => void;
  onDeleteRule: (id: string) => void;
}

const EmailRuleList: React.FC<EmailRuleListProps> = ({ 
  emailRules, 
  onToggleRule, 
  onEditRule, 
  onDeleteRule 
}) => {
  const getRuleIcon = (type: EmailRuleType) => {
    switch (type) {
      case "confirmation": return <div className="h-5 w-5 text-green-500">✓</div>;
      case "abandoned-cart": return <div className="h-5 w-5 text-blue-500">→</div>;
      case "cancellation": return <div className="h-5 w-5 text-red-500">✕</div>;
      case "refund": return <div className="h-5 w-5 text-yellow-500">↺</div>;
    }
  };

  return (
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
              <Button variant="outline" size="icon" onClick={() => onToggleRule(rule.id)}>
                {rule.active ? (
                  <ToggleRight className="h-5 w-5" />
                ) : (
                  <ToggleLeft className="h-5 w-5" />
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={() => onEditRule(rule)}>
                <Edit className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => onDeleteRule(rule.id)}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EmailRuleList;
