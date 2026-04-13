import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import CookieBanner from "@/components/CookieBanner";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) {
      setSubscribed(true);
      setEmail("");
      setConsent(false);
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground uppercase tracking-wider">
              {t("newsletter.title")}
            </h2>
            <p className="font-body text-primary-foreground/80 mt-4">
              {t("newsletter.subtitle")}
            </p>

            {subscribed ? (
              <div className="mt-8 p-4 bg-black/20 inline-flex items-center gap-3">
                <Check className="text-primary-foreground" size={20} />
                <span className="font-body text-primary-foreground">{t("newsletter.success")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-8 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter.placeholder")}
                    className="flex-1 bg-black/20 border border-primary-foreground/30 px-4 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground transition-colors"
                    required
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary shrink-0"
                  >
                    {t("newsletter.button")}
                  </Button>
                </div>
                <label className="flex items-center gap-3 justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 accent-primary-foreground"
                    required
                  />
                  <span className="font-body text-sm text-primary-foreground/80">
                    {t("newsletter.consent")}
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wider">
                RE<span className="text-primary">FORGE</span>
              </h3>
              <p className="font-body text-muted-foreground text-sm mt-4 leading-relaxed max-w-xs">
                {t("footer.tagline")}
              </p>
              <p className="font-heading text-xs tracking-[0.3em] text-primary mt-4 uppercase">
                {t("footer.motto")}
              </p>
              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-6">{t("footer.navigate")}</h4>
              <ul className="space-y-3 font-body text-sm text-foreground/60">
                <li><Link to="/system" className="hover:text-primary transition-colors">{t("nav.system")}</Link></li>
                <li><Link to="/coaching" className="hover:text-primary transition-colors">{t("nav.coaching")}</Link></li>
                <li><Link to="/products" className="hover:text-primary transition-colors">{t("nav.products")}</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors">{t("nav.blog")}</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">{t("nav.about")}</Link></li>
                <li><Link to="/apply" className="hover:text-primary transition-colors">{t("nav.apply")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-6">{t("footer.contact")}</h4>
              <ul className="space-y-3 font-body text-sm text-foreground/60">
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary shrink-0" />
                  Sariyer, Istanbul, Turkey
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-primary shrink-0" />
                  +90 212 XXX XX XX
                </li>
                <li>info@reforge.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-6">{t("footer.location")}</h4>
              <div className="aspect-video w-full border border-border overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48124.33878832432!2d29.0071!3d41.1677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409fe1e1a0e1e9a7%3A0x7c8b6e3c3b4c3c0e!2sSar%C4%B1yer%2C%20Istanbul%2C%20Turkey!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="REFORGE Location - Sariyer, Istanbul"
                />
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-6 text-center font-body text-xs text-muted-foreground">
            &copy; 2026 REFORGE. {t("footer.copyright")}
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      <CookieBanner />
    </>
  );
};

export default Footer;
