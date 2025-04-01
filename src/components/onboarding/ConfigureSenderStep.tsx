
import React from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { SenderFormValues } from "./types";
import { ChevronRight } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";

interface ConfigureSenderStepProps {
  senderForm: UseFormReturn<SenderFormValues>;
  onSubmit: (data: SenderFormValues) => void;
  getFullEmailAddress: () => string;
}

const ConfigureSenderStep: React.FC<ConfigureSenderStepProps> = ({
  senderForm,
  onSubmit,
  getFullEmailAddress,
}) => {
  return (
    <Form {...senderForm}>
      <form onSubmit={senderForm.handleSubmit(onSubmit)} className="space-y-4">
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
                    <span className="whitespace-nowrap text-sm text-muted-foreground">@vibesends.com</span>
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
  );
};

export default ConfigureSenderStep;
