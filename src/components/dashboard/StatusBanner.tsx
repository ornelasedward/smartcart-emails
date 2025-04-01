
import React from "react";
import { CheckCircle } from "lucide-react";

const StatusBanner: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-6 bg-green-50 text-green-700 px-4 py-3 rounded-md">
      <CheckCircle className="h-5 w-5" />
      <span>Stripe account successfully connected!</span>
    </div>
  );
};

export default StatusBanner;
