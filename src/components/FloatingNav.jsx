import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { ROUTES } from "../lib/app-params";
import { Button } from "./ui/button";
import { useAuth } from "../lib/AuthContext";

const navItems = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.EXPERIENCE, label: "Experience" },
  { href: ROUTES.PROJECTS, label: "Projects" },
  { href: ROUTES.CONTACT, label: "Contact" },
];

export default function FloatingNav() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 rounded-full border bg-background/80 backdrop-blur-sm px-2 py-1 shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "px-3 py-2 text-sm rounded-full transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
        {isAuthenticated ? (
          <Button variant="ghost" size="sm" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
