import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();

  // Dynamic nav links based on admin status
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Problem Statements", path: "/problems" },
    { name: "Event Structure", path: "/event-structure" },
    { name: "Resources", path: "/resources" },
    // Show Dashboard for admins, Registration for regular users
    isAdmin 
      ? { name: "Dashboard", path: "/admin" }
      : { name: "Registration", path: "/registration" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-poppins font-bold text-lg">C</span>
            </div>
            <span className="font-poppins font-semibold text-lg text-foreground hidden sm:block">
              Campuspreneurs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  {isAdmin && <Shield className="w-4 h-4 text-secondary" />}
                  <User className="w-4 h-4" />
                  {user.email?.split("@")[0]}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button asChild variant="orange" size="sm" className="ml-2 gap-1">
                <Link to="/auth">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-2 border-t border-border mt-2">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <span className="px-4 text-sm text-muted-foreground flex items-center gap-1">
                      {isAdmin && <Shield className="w-4 h-4 text-secondary" />}
                      <User className="w-4 h-4" />
                      {user.email}
                    </span>
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="mx-4 gap-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    asChild
                    variant="orange"
                    className="mx-4 gap-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/auth">
                      <LogIn className="w-4 h-4" />
                      Login / Sign Up
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
