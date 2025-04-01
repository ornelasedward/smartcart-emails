
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Mail, BarChart, LayoutDashboard, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { state } = useSidebar();
  
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <UISidebar variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <Link to="/dashboard" className="flex items-center space-x-2 px-2">
            <div className="h-8 w-8 rounded-full smartcart-gradient"></div>
            <h1 className="text-xl font-bold">Vibe Sends</h1>
          </Link>
          <div className="flex justify-end pr-2">
            <SidebarTrigger>
              {state === "expanded" ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </SidebarTrigger>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Dashboard"
                isActive={location.pathname === "/dashboard"}
                asChild
              >
                <Link to="/dashboard">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Email Templates"
                isActive={location.pathname === "/emails"}
                asChild
              >
                <Link to="/emails">
                  <Mail size={18} />
                  <span>Email Templates</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Email Lists"
                isActive={location.pathname === "/email-lists"}
                asChild
              >
                <Link to="/email-lists">
                  <Mail size={18} />
                  <span>Email Lists</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Analytics"
                isActive={location.pathname === "/analytics"}
                asChild
              >
                <Link to="/analytics">
                  <BarChart size={18} />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Settings"
                isActive={location.pathname === "/settings"}
                asChild
              >
                <Link to="/settings">
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                tooltip="Logout"
                onClick={handleLogout} 
                asChild
              >
                <button className="w-full">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </UISidebar>
    </>
  );
};

export default Sidebar;
