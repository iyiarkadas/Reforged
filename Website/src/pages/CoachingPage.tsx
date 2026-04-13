import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CoachingPage = () => {
  const { t, language } = useLanguage();

  const packages = language === "en" ? [
    {
      name: "Performance",
      desc: "Athletic performance development",
      features: [
        "Individualized program design",
        "Weekly performance check-in",
        "Daily communication (WhatsApp)",
        "Tournament preparation",
        "Supplement guidance",
      ],
    },
    {
      name: "Rebuild",
      desc: "Post-injury strengthening",
      featured: true,
      features: [
        "Everything in Performance",
        "Injury history analysis",
        "Movement pattern restoration",
        "Stability chain optimization",
        "Progressive load management",
      ],
    },
    {
      name: "Return",
      desc: "Major injury comeback",
      features: [
        "Everything in Rebuild",
        "Active injury management",
        "Sport-specific return protocol",
        "Mental discipline framework",
        "Priority communication access",
      ],
    },
  ] : [
    {
      name: "Performans",
      desc: "Atletik performans gelistirme",
      features: [
        "Bireysel program tasarimi",
        "Haftalik performans degerlendirmesi",
        "Gunluk iletisim (WhatsApp)",
        "Turnuva hazirlik",
        "Takviye rehberligi",
      ],
    },
    {
      name: "Yeniden Insa",
      desc: "Sakatlik sonrasi guclendirme",
      featured: true,
      features: [
        "Performans paketindeki her sey",
        "Sakatlik gecmisi analizi",
        "Hareket kalıbi restorasyonu",
        "Stabilite zinciri optimizasyonu",
        "Progresif yuk yonetimi",
      ],
    },
    {
      name: "Donus",
      desc: "Buyuk sakatlik donus",
      features: [
        "Yeniden Insa paketindeki her sey",
        "Aktif sakatlik yonetimi",
        "Spora ozel donus protokolu",
        "Zihinsel disiplin cercevesi",
        "Oncelikli iletisim erisimi",
      ],
    },
  ];

  const features = language === "en" ? [
    "Individualized programming",
    "Injury management",
    "Sport planning",
    "Tournament preparation",
    "Supplement guidance",
    "Mental discipline",
    "Continuous communication",
    "Adaptive weekly plans",
  ] : [
    "Bireysel programlama",
    "Sakatlik yonetimi",
    "Spor planlamasi",
    "Turnuva hazirlik",
    "Takviye rehberligi",
    "Zihinsel disiplin",
    "Surekli iletisim",
    "Uyumlu haftalik planlar",
  ];

  const onboarding = language === "en" ? [
    { day: "Day 1", action: "Short phone consultation" },
    { day: "Day 2", action: "Detailed assessment" },
    { day: "Day 3", action: "First program delivered" },
    { day: "Day 4", action: "First training feedback" },
    { day: "Week 1 End", action: "45-minute evaluation" },
  ] : [
    { day: "Gun 1", action: "Kisa telefon gorusmesi" },
    { day: "Gun 2", action: "Detayli degerlendirme" },
    { day: "Gun 3", action: "Ilk program teslimi" },
    { day: "Gun 4", action: "Ilk antrenman geri bildirimi" },
    { day: "Hafta 1 Sonu", action: "45 dakika degerlendirme" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Carousel */}
      <HeroCarousel showControls={false}>
        <div className="text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-6"
          >
            {t("coaching.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            {t("coaching.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-2xl mx-auto"
          >
            {t("coaching.description")}
          </motion.p>
        </div>
      </HeroCarousel>

      {/* Model Explanation */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase">{t("coaching.advisor.title")}</h2>
          <div className="mt-8 space-y-4 font-body text-muted-foreground leading-relaxed">
            <p>{t("coaching.advisor.p1")} <span className="text-foreground">{language === "en" ? "system" : "sistem"}</span>.</p>
            <p>{t("coaching.advisor.p2")}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 border border-border">
                <Check size={14} className="text-primary shrink-0" />
                <span className="font-body text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-xs tracking-[0.5em] text-primary uppercase text-center mb-12">{t("coaching.packages")}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 border ${pkg.featured ? "border-primary bg-card" : "border-border"} flex flex-col`}
              >
                {pkg.featured && (
                  <span className="font-heading text-[10px] tracking-[0.3em] text-primary uppercase mb-4">{t("coaching.popular")}</span>
                )}
                <h3 className="font-heading text-2xl font-bold text-foreground uppercase">{pkg.name}</h3>
                <p className="font-body text-muted-foreground text-sm mt-2">{pkg.desc}</p>
                <ul className="mt-8 space-y-3 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/apply" className="mt-8">
                  <Button variant={pkg.featured ? "accent" : "heroOutline"} className="w-full">
                    {t("nav.apply")} <ArrowRight className="ml-2" size={14} />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase">{t("coaching.howItStarts")}</h2>
          <div className="mt-10 space-y-0">
            {onboarding.map((step) => (
              <div key={step.day} className="flex items-center gap-6 py-4 border-b border-border">
                <span className="font-heading text-sm text-primary w-24 shrink-0 uppercase tracking-wider">{step.day}</span>
                <span className="font-body text-foreground/80">{step.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoachingPage;
