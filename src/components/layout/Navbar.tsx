
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full smartcart-gradient"></div>
          <h1 className="text-xl font-bold">Vibe Sends</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full w-10 h-10 p-0">
                  {user.email?.charAt(0).toUpperCase() || <User size={18} />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
