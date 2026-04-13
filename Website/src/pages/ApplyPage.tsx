import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ApplyPage = () => {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const currentSituationOptions = language === "en" 
    ? ["I train regularly", "I compete", "I've had injuries", "My performance is inconsistent", "I feel below my real level"]
    : ["Duzenli antrenman yapiyorum", "Yarisiyorum", "Sakatliklar gecirdim", "Performansim tutarsiz", "Gercek seviyemin altinda hissediyorum"];

  const goalOptions = language === "en"
    ? ["Return from injury", "Improve performance", "Regain confidence", "Build structure", "Compete at a higher level"]
    : ["Sakatliktan donus", "Performansi gelistirme", "Guveni yeniden kazanma", "Yapi olusturma", "Daha ust seviyede yarisma"];

  const applyReasonOptions = language === "en"
    ? [
        "I want to improve my athletic performance",
        "I want to return to competition after injury",
        "I feel I haven't reached my physical potential",
        "I want stronger discipline in training and lifestyle",
        "I want guidance from someone who understands competitive sports",
      ]
    : [
        "Atletik performansimi gelistirmek istiyorum",
        "Sakatlik sonrasi yarismaya donmek istiyorum",
        "Fiziksel potansiyelime ulasamadigimi hissediyorum",
        "Antrenman ve yasam tarzinda daha guclu disiplin istiyorum",
        "Rekabetci sporlari anlayan birinden rehberlik istiyorum",
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
            {t("apply.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            {t("apply.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-2xl mx-auto"
          >
            {t("apply.description")}
          </motion.p>
        </div>
      </HeroCarousel>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">{t("apply.received")}</p>
              <h2 className="font-heading text-3xl font-bold text-foreground uppercase">{t("apply.touch")}</h2>
              <p className="font-body text-muted-foreground mt-4">
                {t("apply.receivedDesc")}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                    {language === "en" ? "First Name" : "Ad"}
                  </label>
                  <input required type="text" className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" placeholder={language === "en" ? "First name" : "Adiniz"} />
                </div>
                <div>
                  <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                    {language === "en" ? "Last Name" : "Soyad"}
                  </label>
                  <input required type="text" className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" placeholder={language === "en" ? "Last name" : "Soyadiniz"} />
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "Age" : "Yas"}
                </label>
                <input required type="number" className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" placeholder={language === "en" ? "Your age" : "Yasiniz"} />
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "Sport" : "Spor"}
                </label>
                <select required className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors">
                  <option value="" className="bg-card">{language === "en" ? "Select your sport" : "Spor seciniz"}</option>
                  <option value="football" className="bg-card">{language === "en" ? "Football" : "Futbol"}</option>
                  <option value="basketball" className="bg-card">{language === "en" ? "Basketball" : "Basketbol"}</option>
                  <option value="tennis" className="bg-card">{language === "en" ? "Tennis" : "Tenis"}</option>
                  <option value="running" className="bg-card">{language === "en" ? "Running" : "Kosu"}</option>
                  <option value="other" className="bg-card">{language === "en" ? "Other" : "Diger"}</option>
                </select>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "Current Situation" : "Mevcut Durum"}
                </label>
                <div className="space-y-2">
                  {currentSituationOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 border border-border hover:border-primary/30 transition-colors cursor-pointer">
                      <input type="checkbox" className="accent-primary" />
                      <span className="font-body text-sm text-foreground/80">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "Primary Goal" : "Ana Hedef"}
                </label>
                <div className="space-y-2">
                  {goalOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 border border-border hover:border-primary/30 transition-colors cursor-pointer">
                      <input type="checkbox" className="accent-primary" />
                      <span className="font-body text-sm text-foreground/80">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "Injury History" : "Sakatlik Gecmisi"}
                </label>
                <select required className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors">
                  <option value="" className="bg-card">{language === "en" ? "Select" : "Seciniz"}</option>
                  <option value="none" className="bg-card">{language === "en" ? "No major injuries" : "Buyuk sakatlik yok"}</option>
                  <option value="minor" className="bg-card">{language === "en" ? "Minor injuries" : "Kucuk sakatliklar"}</option>
                  <option value="major" className="bg-card">{language === "en" ? "Major injury in the past" : "Gecmiste buyuk sakatlik"}</option>
                  <option value="current" className="bg-card">{language === "en" ? "Currently recovering from injury" : "Su anda sakatliktan iyilesiyorum"}</option>
                </select>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "How serious are you?" : "Ne kadar ciddisiniz?"}
                </label>
                <select required className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors">
                  <option value="" className="bg-card">{language === "en" ? "Select commitment level" : "Baglilik seviyesi seciniz"}</option>
                  <option value="exploring" className="bg-card">{language === "en" ? "I'm just exploring" : "Sadece arastiriyorum"}</option>
                  <option value="interested" className="bg-card">{language === "en" ? "I'm interested" : "Ilgileniyorum"}</option>
                  <option value="serious" className="bg-card">{language === "en" ? "I'm serious" : "Ciddiyim"}</option>
                  <option value="committed" className="bg-card">{language === "en" ? "I'm fully committed" : "Tamamen bagliim"}</option>
                </select>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "What made you apply?" : "Neden basvurdunuz?"}
                </label>
                <div className="space-y-2">
                  {applyReasonOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 border border-border hover:border-primary/30 transition-colors cursor-pointer">
                      <input type="checkbox" className="accent-primary" />
                      <span className="font-body text-sm text-foreground/80">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "Why now?" : "Neden simdi?"}
                </label>
                <textarea
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                  placeholder={language === "en" ? "What made you decide to apply now?" : "Simdi basvurmaya ne karar verdirdi?"}
                />
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "How many days per week can you train?" : "Haftada kac gun antrenman yapabilirsiniz?"}
                </label>
                <select className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors">
                  <option value="" className="bg-card">{language === "en" ? "Select" : "Seciniz"}</option>
                  <option value="2-3" className="bg-card">{language === "en" ? "2-3 days" : "2-3 gun"}</option>
                  <option value="4-5" className="bg-card">{language === "en" ? "4-5 days" : "4-5 gun"}</option>
                  <option value="6+" className="bg-card">{language === "en" ? "6+ days" : "6+ gun"}</option>
                </select>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  {language === "en" ? "Anything else? (Optional)" : "Baska bir sey? (Istege bagli)"}
                </label>
                <textarea
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                  placeholder={language === "en" ? "Anything else you want us to know..." : "Bilmemizi istediginiz baska bir sey..."}
                />
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full mt-4">
                {t("hero.cta")} <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApplyPage;
