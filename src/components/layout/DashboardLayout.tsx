
import React from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar />
        <div className="flex-1">
          <main className="p-6 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
