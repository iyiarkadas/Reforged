import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Heart, Award } from "lucide-react";

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Shield, titleKey: "about.values.discipline", descKey: "about.values.discipline.desc" },
    { icon: Zap, titleKey: "about.values.structure", descKey: "about.values.structure.desc" },
    { icon: Heart, titleKey: "about.values.honesty", descKey: "about.values.honesty.desc" },
    { icon: Award, titleKey: "about.values.excellence", descKey: "about.values.excellence.desc" },
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
            {t("about.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            {t("about.title")}
          </motion.h1>
        </div>
      </HeroCarousel>

      {/* Introduction */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-xl text-foreground/80 leading-relaxed"
          >
            {t("about.intro")}
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-border hover:border-primary/40 transition-colors"
            >
              <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">{t("about.mission.title")}</p>
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase mb-4">{t("about.mission.title")}</h2>
              <p className="font-body text-muted-foreground leading-relaxed">{t("about.mission.desc")}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-border hover:border-primary/40 transition-colors"
            >
              <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase mb-4">{t("about.vision.title")}</p>
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase mb-4">{t("about.vision.title")}</h2>
              <p className="font-body text-muted-foreground leading-relaxed">{t("about.vision.desc")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-xs tracking-[0.5em] text-primary uppercase text-center mb-12"
          >
            {t("about.values.title")}
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border border-border bg-background hover:border-primary/40 transition-colors group text-center"
              >
                <value.icon className="w-8 h-8 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-lg font-semibold text-foreground uppercase tracking-wider">{t(value.titleKey)}</h3>
                <p className="font-body text-muted-foreground text-sm mt-3">{t(value.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">{t("about.team.title")}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase">{t("about.team.title")}</h2>
            <p className="font-body text-muted-foreground mt-6 leading-relaxed">{t("about.team.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">{t("filter.subtitle")}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground uppercase leading-tight">
              {t("filter.title1")}<br />{t("filter.title2")}
            </h2>
            <p className="font-body text-muted-foreground mt-6">{t("filter.desc")}</p>
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

export default AboutPage;
