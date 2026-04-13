import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
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
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/apply" className="hover:text-primary transition-colors">Apply</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-6">Contact</h4>
            <ul className="space-y-3 font-body text-sm text-foreground/60">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-primary shrink-0" />
                Sarıyer, Istanbul, Turkey
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary shrink-0" />
                +90 212 XXX XX XX
              </li>
              <li>info@reforge.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-6">Location</h4>
            <div className="aspect-video w-full border border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48124.33878832432!2d29.0071!3d41.1677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409fe1e1a0e1e9a7%3A0x7c8b6e3c3b4c3c0e!2sSar%C4%B1yer%2C%20Istanbul%2C%20Turkey!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="REFORGE Location - Sarıyer, Istanbul"
              />
            </div>
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
