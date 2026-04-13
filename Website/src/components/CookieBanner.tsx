import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="font-body text-sm text-muted-foreground max-w-3xl leading-relaxed">
                {t("cookie.message")}{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  {t("cookie.learnMore")}
                </a>
              </p>
              <div className="flex gap-3 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecline}
                  className="border-border text-foreground hover:bg-muted"
                >
                  {t("cookie.decline")}
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={handleAccept}
                >
                  {t("cookie.accept")}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
