
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail, BarChart, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type SidebarItemProps = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ path, label, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link to={path}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start mb-1",
          isActive && "bg-accent text-accent-foreground font-medium"
        )}
      >
        <div className="flex items-center">
          <span className="mr-2">{icon}</span>
          {label}
        </div>
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const { signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <aside className="h-screen border-r w-64 fixed top-0 left-0 bg-background">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full smartcart-gradient"></div>
            <h1 className="text-xl font-bold">Vibe Sends</h1>
          </Link>
        </div>
        
        <div className="py-4 px-3 flex-1 overflow-auto">
          <nav className="space-y-1">
            <SidebarItem path="/dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} />
            <SidebarItem path="/emails" label="Email Templates" icon={<Mail size={18} />} />
            <SidebarItem path="/email-lists" label="Email Lists" icon={<Mail size={18} />} />
            <SidebarItem path="/analytics" label="Analytics" icon={<BarChart size={18} />} />
            <SidebarItem path="/settings" label="Settings" icon={<Settings size={18} />} />
          </nav>
        </div>
        
        <div className="p-4 border-t mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
