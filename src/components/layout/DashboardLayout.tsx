
import React from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "sonner";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default DashboardLayout;
