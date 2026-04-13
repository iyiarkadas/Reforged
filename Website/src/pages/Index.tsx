import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Shield, Zap, Target, RotateCcw } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Index = () => {
  const { t } = useLanguage();

  const pillars = [
    { icon: Zap, titleKey: "pillars.performance.title", descKey: "pillars.performance.desc" },
    { icon: RotateCcw, titleKey: "pillars.rebuild.title", descKey: "pillars.rebuild.desc" },
    { icon: Target, titleKey: "pillars.return.title", descKey: "pillars.return.desc" },
    { icon: Shield, titleKey: "pillars.mentality.title", descKey: "pillars.mentality.desc" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero with Carousel */}
      <HeroCarousel>
        <div className="text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-6"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl font-bold text-foreground uppercase leading-[0.9]"
          >
            {t("hero.title1")}<br />
            <span className="text-primary">{t("hero.title2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-xl mx-auto"
          >
            {t("hero.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/apply">
              <Button variant="accent" size="lg">
                {t("hero.cta")} <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/system">
              <Button variant="heroOutline" size="lg">
                {t("hero.cta2")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </HeroCarousel>

      {/* Problem Statement */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div {...fadeInUp}>
            <p className="font-heading text-3xl md:text-4xl font-semibold text-foreground uppercase leading-tight">
              {t("problem.title1")}<br />
              <span className="text-primary">{t("problem.title2")}</span>
            </p>
            <p className="font-body text-muted-foreground mt-6">
              {t("problem.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.h2
            {...fadeInUp}
            className="font-heading text-xs tracking-[0.5em] text-primary uppercase text-center mb-12"
          >
            {t("pillars.title")}
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="p-8 border border-border bg-background hover:border-primary/40 transition-colors group"
              >
                <p.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-xl font-semibold text-foreground uppercase tracking-wider">{t(p.titleKey)}</h3>
                <p className="font-body text-muted-foreground text-sm mt-3">{t(p.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">{t("system.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground uppercase leading-tight">
                {t("system.title1")}<br />
                <span className="text-primary">{t("system.title2")}</span>
              </h2>
              <p className="font-body text-muted-foreground mt-6 leading-relaxed">
                {t("system.p1")}
              </p>
              <p className="font-body text-muted-foreground mt-4 leading-relaxed">
                {t("system.p2")}
              </p>
              <Link to="/system" className="inline-block mt-8">
                <Button variant="heroOutline" size="default">
                  {t("system.learnMore")} <ArrowRight className="ml-2" size={14} />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src="/images/hero-2.jpg" alt="Athlete training" className="w-full aspect-[3/2] object-cover" loading="lazy" width={960} height={640} />
              <div className="absolute inset-0 border border-primary/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div {...fadeInUp}>
            <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">{t("filter.subtitle")}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground uppercase leading-tight">
              {t("filter.title1")}<br />{t("filter.title2")}
            </h2>
            <p className="font-body text-muted-foreground mt-6">
              {t("filter.desc")}
            </p>
            <Link to="/apply" className="inline-block mt-8">
              <Button variant="accent" size="lg">
                {t("hero.cta")} <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
