import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const SystemPage = () => {
  const { t, language } = useLanguage();

  const steps = language === "en" ? [
    { step: "01", title: "Base Control", desc: "Foot-ankle stability assessment and restoration" },
    { step: "02", title: "Unilateral Balance", desc: "Single-leg balance capacity under varying conditions" },
    { step: "03", title: "Load Alignment", desc: "Joint alignment under progressive load" },
    { step: "04", title: "Speed Control", desc: "Maintaining control at game speed" },
  ] : [
    { step: "01", title: "Temel Kontrol", desc: "Ayak-ayak bilegi stabilite degerlendirmesi ve restorasyonu" },
    { step: "02", title: "Tek Tarafli Denge", desc: "Degisen kosullar altinda tek bacak denge kapasitesi" },
    { step: "03", title: "Yuk Hizalamasi", desc: "Artan yuk altinda eklem hizalamasi" },
    { step: "04", title: "Hiz Kontrolu", desc: "Oyun hizinda kontrolu koruma" },
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
            {t("systemPage.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            {t("systemPage.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-2xl mx-auto"
          >
            {t("systemPage.description")}
          </motion.p>
        </div>
      </HeroCarousel>

      {/* Stability Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground uppercase">{t("systemPage.stability.title")}</h2>
              <div className="mt-8 space-y-6 font-body text-muted-foreground leading-relaxed">
                <p>{language === "en" ? "Performance is often confused with strength. But uncontrolled strength turns into injury." : "Performans cogu zaman gucle karistirilir. Ancak kontrolsuz guc sakatliga donusur."}</p>
                <p>{language === "en" ? "Stability is the capacity to maintain control under load — when an athlete jumps, changes direction, or stops suddenly, the body distributes force within milliseconds." : "Stabilite, yuk altinda kontrolu koruma kapasitesidir — bir sporcu ziplarken, yon degistirirken veya aniden dururken, vucut mili saniyeler icinde kuvet dagitir."}</p>
                <p>{language === "en" ? "If that distribution fails:" : "Bu dagilim basarisiz olursa:"}</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span>{language === "en" ? "The ankle absorbs excess load" : "Ayak bilegi asiri yuku emer"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span>{language === "en" ? "The knee compensates" : "Diz telafi eder"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span>{language === "en" ? "The hip activates too late" : "Kalca cok gec aktive olur"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span>{language === "en" ? "The lower back starts carrying load" : "Bel yuk tasimaya baslar"}</span>
                  </li>
                </ul>
                <p className="text-foreground font-medium">{language === "en" ? "The problem is rarely where the pain is. The problem is the loss of control at the start of the chain." : "Sorun nadiren agrinin oldugu yerdedir. Sorun, zincirin basinda kontrolun kaybidir."}</p>
              </div>
            </div>
            <div className="sticky top-32">
              <img src="/images/hero-3.jpg" alt="Athletic training" className="w-full aspect-[3/2] object-cover" loading="lazy" width={960} height={640} />
            </div>
          </div>
        </div>
      </section>

      {/* Load Distribution */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase">{t("systemPage.load.title")}</h2>
          <div className="mt-8 space-y-6 font-body text-muted-foreground leading-relaxed">
            <p>{language === "en" ? "Injury is rarely an event. It's a process. And that process begins when the body can't share load equally." : "Sakatlik nadiren bir olaydir. Bu bir surectir. Ve bu surec, vucut yuku esit olarak paylasamadiginda baslar."}</p>
            <p>{language === "en" ? "When running, jumping, or stopping, the body transfers load across a chain: Foot → Ankle → Knee → Hip → Core." : "Kosu, ziplama veya durma sirasinda, vucut yuku bir zincir boyunca aktarir: Ayak → Ayak Bilegi → Diz → Kalca → Cekirdek."}</p>
            <p>{language === "en" ? "If one link doesn't do its job, another takes over. The body is smart — but this solution is temporary." : "Bir halka isini yapmazsa, digeri devralir. Vucut zekidir — ancak bu cozum gecicidir."}</p>
            <div className="border-l-2 border-primary pl-6 my-8">
              <p className="font-heading text-xl text-foreground uppercase">
                {language === "en" ? "\"When the body distributes load correctly, performance rises naturally.\"" : "\"Vucut yuku dogru dagittiginda, performans dogal olarak yukselir.\""}
              </p>
              <p className="text-sm text-primary mt-2">— REFORGE {language === "en" ? "Principle" : "Prensibi"}</p>
            </div>
            <p>{language === "en" ? "The question isn't \"where does it hurt?\" — it's " : "Soru \"nerede agriyor?\" degil — "}<span className="text-foreground">{language === "en" ? "\"where is the load accumulating?\"" : "\"yuk nerede birikiyor?\""}</span></p>
          </div>
        </div>
      </section>

      {/* REFORGE Approach */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase">{t("systemPage.approach.title")}</h2>
          <div className="mt-8 grid gap-6">
            {steps.map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 p-6 border border-border hover:border-primary/30 transition-colors"
              >
                <span className="font-heading text-4xl font-bold text-primary/30">{item.step}</span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground uppercase">{item.title}</h3>
                  <p className="font-body text-muted-foreground text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/apply">
              <Button variant="accent" size="lg">
                {t("systemPage.apply")} <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SystemPage;
