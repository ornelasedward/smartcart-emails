
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { SchedulingProps } from "../types/CampaignComposerTypes";

const SchedulingOptions: React.FC<SchedulingProps> = ({
  isScheduled,
  setIsScheduled,
  scheduleDate,
  setScheduleDate
}) => {
  return (
    <div className="flex items-center space-x-2 py-2">
      <Switch 
        id="schedule" 
        checked={isScheduled}
        onCheckedChange={setIsScheduled}
      />
      <Label htmlFor="schedule">Schedule for later</Label>
      
      {isScheduled && (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-auto ml-4 flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              {scheduleDate ? format(scheduleDate, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={scheduleDate}
              onSelect={setScheduleDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default SchedulingOptions;
