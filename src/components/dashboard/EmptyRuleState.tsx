
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyRuleStateProps {
  onCreateRule: () => void;
}

const EmptyRuleState: React.FC<EmptyRuleStateProps> = ({ onCreateRule }) => {
  return (
    <Card>
      <CardContent className="py-12 flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <PlusCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">No Email Rules Yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Create your first email rule to start automating emails for purchase confirmations, abandoned carts, and more.
        </p>
        <Button onClick={onCreateRule}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Rule
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyRuleState;
