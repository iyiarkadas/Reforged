import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CartSheet from "@/components/CartSheet";

const navLinks = [
  { label: "System", href: "/system" },
  { label: "Coaching", href: "/coaching" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Apply", href: "/apply" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold tracking-wider text-foreground uppercase">
          RE<span className="text-primary">FORGE</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-heading text-sm tracking-[0.2em] uppercase transition-colors ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <CartSheet />
          <Link to="/auth" className="text-foreground hover:text-primary transition-colors" aria-label="Account">
            <User size={20} />
          </Link>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-background border-t border-border px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block py-3 font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground border-b border-border last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/auth"
            className="block py-3 font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Account
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
