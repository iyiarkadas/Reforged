import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-2xl font-bold uppercase tracking-wider">
              RE<span className="text-primary">FORGE</span>
            </h3>
            <p className="font-body text-muted-foreground text-sm mt-4 leading-relaxed max-w-xs">
              Athlete management system for competitive athletes. 
              Injury → Advantage.
            </p>
            <p className="font-heading text-xs tracking-[0.3em] text-primary mt-4 uppercase">
              Stronger where you once broke.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-6">Navigate</h4>
            <ul className="space-y-3 font-body text-sm text-foreground/60">
              <li><Link to="/system" className="hover:text-primary transition-colors">The System</Link></li>
              <li><Link to="/coaching" className="hover:text-primary transition-colors">Coaching</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/apply" className="hover:text-primary transition-colors">Apply</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-6">Contact</h4>
            <ul className="space-y-3 font-body text-sm text-foreground/60">
              <li>Istanbul, Turkey</li>
              <li>info@reforge.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-6 text-center font-body text-xs text-muted-foreground">
          © 2026 REFORGE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;