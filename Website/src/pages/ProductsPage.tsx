import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const ProductsPage = () => {
  const { addItem } = useCart();
  const { t, language } = useLanguage();

  const products = language === "en" ? [
    {
      id: "daily-crew",
      name: "Daily Crew Socks",
      desc: "Everyday athletic sock. Higher cotton ratio, softer feel. Lifestyle + gym ready. The entry point to the REFORGE system.",
      image: "/images/hero-1.jpg",
      tag: "Available",
      price: 239,
      type: "product" as const,
      details: ["Soft, comfortable fit", "Higher cotton ratio", "4-6% elastane", "Crew length", "S/M & L/XL"],
    },
    {
      id: "performance-crew",
      name: "Performance Crew Socks",
      desc: "Real performance sock. Low cotton, high durability, built for high-intensity sports. Basketball, tennis, hard-surface sports. Not available to everyone.",
      image: "/images/hero-2.jpg",
      tag: "Restricted",
      price: 349,
      type: "product" as const,
      details: ["Dense weave — slight resistance on first wear", "Arch support", "8-10% elastane", "Low cotton for performance", "S/M & L/XL"],
    },
    {
      id: "reforge-tee",
      name: "REFORGE Tee",
      desc: "Sport culture product. Minimal design. The mark of an athlete who chose to come back.",
      image: "/images/hero-3.jpg",
      tag: "Coming Soon",
      price: 0,
      type: "product" as const,
      details: ["Premium cotton", "Minimal branding", "Athletic fit", "Unisex sizing"],
    },
  ] : [
    {
      id: "daily-crew",
      name: "Gunluk Crew Corap",
      desc: "Her gun atletik corap. Yuksek pamuk orani, yumusak his. Yasam tarzi + spor salonu icin hazir. REFORGE sistemine giris noktasi.",
      image: "/images/hero-1.jpg",
      tag: "Mevcut",
      price: 239,
      type: "product" as const,
      details: ["Yumusak, rahat kesim", "Yuksek pamuk orani", "%4-6 elastan", "Crew boy", "S/M & L/XL"],
    },
    {
      id: "performance-crew",
      name: "Performans Crew Corap",
      desc: "Gercek performans corabi. Dusuk pamuk, yuksek dayaniklilik, yogun sporlar icin uretildi. Basketbol, tenis, sert zemin sporlari. Herkese acik degil.",
      image: "/images/hero-2.jpg",
      tag: "Kisitli",
      price: 349,
      type: "product" as const,
      details: ["Yogun dokuma — ilk giyiste hafif direnç", "Kemer destegi", "%8-10 elastan", "Performans icin dusuk pamuk", "S/M & L/XL"],
    },
    {
      id: "reforge-tee",
      name: "REFORGE Tisort",
      desc: "Spor kulturu urunu. Minimal tasarim. Geri donmeyi secen bir sporcunun isareti.",
      image: "/images/hero-3.jpg",
      tag: "Cok Yakinda",
      price: 0,
      type: "product" as const,
      details: ["Premium pamuk", "Minimal markalama", "Atletik kesim", "Unisex bedenler"],
    },
  ];

  const programs = language === "en" ? [
    {
      id: "prog-performance",
      name: "Performance Package",
      desc: "Athletic performance development. Individualized programming, weekly check-ins, daily communication, tournament prep.",
      price: 4999,
      type: "program" as const,
      features: ["Individualized program design", "Weekly performance check-in", "Daily communication", "Tournament preparation", "Supplement guidance"],
    },
    {
      id: "prog-rebuild",
      name: "Rebuild Package",
      desc: "Post-injury strengthening. Everything in Performance plus injury analysis, movement pattern restoration, stability chain optimization.",
      price: 7499,
      type: "program" as const,
      features: ["Everything in Performance", "Injury history analysis", "Movement pattern restoration", "Stability chain optimization", "Progressive load management"],
    },
    {
      id: "prog-return",
      name: "Return Package",
      desc: "Major injury comeback. The full system. Active injury management, sport-specific return protocol, mental discipline framework.",
      price: 9999,
      type: "program" as const,
      features: ["Everything in Rebuild", "Active injury management", "Sport-specific return protocol", "Mental discipline framework", "Priority communication"],
    },
  ] : [
    {
      id: "prog-performance",
      name: "Performans Paketi",
      desc: "Atletik performans gelistirme. Bireysel programlama, haftalik kontroller, gunluk iletisim, turnuva hazirlik.",
      price: 4999,
      type: "program" as const,
      features: ["Bireysel program tasarimi", "Haftalik performans degerlendirmesi", "Gunluk iletisim", "Turnuva hazirlik", "Takviye rehberligi"],
    },
    {
      id: "prog-rebuild",
      name: "Yeniden Insa Paketi",
      desc: "Sakatlik sonrasi guclendirme. Performanstaki her sey arti sakatlik analizi, hareket kalıbi restorasyonu, stabilite zinciri optimizasyonu.",
      price: 7499,
      type: "program" as const,
      features: ["Performanstaki her sey", "Sakatlik gecmisi analizi", "Hareket kalıbi restorasyonu", "Stabilite zinciri optimizasyonu", "Progresif yuk yonetimi"],
    },
    {
      id: "prog-return",
      name: "Donus Paketi",
      desc: "Buyuk sakatlik donus. Tam sistem. Aktif sakatlik yonetimi, spora ozel donus protokolu, zihinsel disiplin cercevesi.",
      price: 9999,
      type: "program" as const,
      features: ["Yeniden Insadaki her sey", "Aktif sakatlik yonetimi", "Spora ozel donus protokolu", "Zihinsel disiplin cercevesi", "Oncelikli iletisim"],
    },
  ];

  const handleAddToCart = (item: { id: string; name: string; price: number; type: "product" | "program"; image?: string }) => {
    addItem(item);
    toast({ title: language === "en" ? "Added to basket" : "Sepete eklendi", description: `${item.name} ${language === "en" ? "has been added." : "eklendi."}` });
  };

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
            {t("products.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            {t("products.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-2xl mx-auto"
          >
            {t("products.description")}
          </motion.p>
        </div>
      </HeroCarousel>

      {/* Physical Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-12 text-center">
            {language === "en" ? "Equipment" : "Ekipman"}
          </p>
          <div className="space-y-24">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-12 items-center`}
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="relative bg-card overflow-hidden aspect-square">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" width={640} height={640} />
                    <span className="absolute top-4 left-4 font-heading text-[10px] tracking-[0.3em] uppercase text-primary bg-background/80 px-3 py-1">
                      {product.tag}
                    </span>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <h2 className="font-heading text-3xl font-bold text-foreground uppercase">{product.name}</h2>
                  <p className="font-body text-muted-foreground mt-4 leading-relaxed">{product.desc}</p>
                  {product.price > 0 && (
                    <p className="font-heading text-2xl text-primary mt-4">₺{product.price}</p>
                  )}
                  <ul className="mt-6 space-y-2">
                    {product.details.map((d) => (
                      <li key={d} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        <span className="font-body text-sm text-foreground/70">{d}</span>
                      </li>
                    ))}
                  </ul>
                  {product.price > 0 && product.tag !== "Restricted" && product.tag !== "Kisitli" && (
                    <Button
                      variant="accent"
                      className="mt-6"
                      onClick={() => handleAddToCart({ id: product.id, name: product.name, price: product.price, type: product.type, image: product.image })}
                    >
                      <ShoppingBag className="mr-2" size={16} /> {language === "en" ? "Add to Basket" : "Sepete Ekle"}
                    </Button>
                  )}
                  {(product.tag === "Restricted" || product.tag === "Kisitli") && (
                    <p className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground mt-6">
                      {language === "en" ? "Available through the REFORGE system only" : "Sadece REFORGE sistemi araciligiyla mevcut"}
                    </p>
                  )}
                  {(product.tag === "Coming Soon" || product.tag === "Cok Yakinda") && (
                    <p className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground mt-6">
                      {language === "en" ? "Coming soon" : "Cok yakinda"}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4 text-center">
            {language === "en" ? "Athlete Management" : "Sporcu Yonetimi"}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase text-center mb-12">
            {language === "en" ? "Training Programs" : "Antrenman Programlari"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {programs.map((prog, i) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 border flex flex-col ${i === 1 ? "border-primary" : "border-border"}`}
              >
                {i === 1 && (
                  <span className="font-heading text-[10px] tracking-[0.3em] text-primary uppercase mb-4">{t("coaching.popular")}</span>
                )}
                <h3 className="font-heading text-xl font-bold text-foreground uppercase">{prog.name}</h3>
                <p className="font-body text-muted-foreground text-sm mt-2">{prog.desc}</p>
                <p className="font-heading text-2xl text-primary mt-4">₺{prog.price.toLocaleString()}<span className="text-sm text-muted-foreground">/{language === "en" ? "mo" : "ay"}</span></p>
                <ul className="mt-6 space-y-2 flex-1">
                  {prog.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                      <span className="font-body text-sm text-foreground/70">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={i === 1 ? "accent" : "heroOutline"}
                  className="mt-6 w-full"
                  onClick={() => handleAddToCart({ id: prog.id, name: prog.name, price: prog.price, type: prog.type })}
                >
                  <ShoppingBag className="mr-2" size={16} /> {language === "en" ? "Add to Basket" : "Sepete Ekle"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-6">
            {language === "en" ? "Brand Principle" : "Marka Prensibi"}
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase leading-tight">
            {language === "en" ? (
              <>The invisible detail = premium.<br />The product = experience.<br />The user = part of the system.</>
            ) : (
              <>Gorunmeyen detay = premium.<br />Urun = deneyim.<br />Kullanici = sistemin parcasi.</>
            )}
          </h2>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
