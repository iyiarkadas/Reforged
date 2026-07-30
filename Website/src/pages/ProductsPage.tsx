import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import productSocks from "@/assets/daily-socks.png";
import productTshirt from "@/assets/product-tshirt.jpg";
import { toast } from "@/hooks/use-toast";

const products = [
  {
    id: "daily-crew",
    name: "Daily Crew Socks",
    desc: "Everyday athletic sock. Higher cotton ratio, softer feel. Lifestyle + gym ready. The entry point to the REFORGED system.",
    image: productSocks,
    tag: "Available",
    price: 239,
    type: "product" as const,
    details: ["Soft, comfortable fit", "Higher cotton ratio", "4-6% elastane", "Crew length", "S/M & L/XL"],
  },
  {
    id: "performance-crew",
    name: "Performance Crew Socks",
    desc: "Real performance sock. Low cotton, high durability, built for high-intensity sports. Basketball, tennis, hard-surface sports. Not available to everyone.",
    image: productSocks,
    tag: "Restricted",
    price: 0,
    type: "product" as const,
    details: ["Dense weave — slight resistance on first wear", "Arch support", "8-10% elastane", "Low cotton for performance", "S/M & L/XL"],
  },
  {
    id: "reforge-tee",
    name: "REFORGED Tee",
    desc: "Sport culture product. Minimal design. The mark of an athlete who chose to come back.",
    image: productTshirt,
    tag: "Coming Soon",
    price: 0,
    type: "product" as const,
    details: ["Premium cotton", "Minimal branding", "Athletic fit", "Unisex sizing"],
  },
];

const programs = [
  {
    id: "prog-performance",
    slug: "performance",
    name: "Performance Package",
    desc: "Athletic performance development. Individualized programming, weekly check-ins, daily communication, tournament prep.",
    price: 0,
    type: "program" as const,
    features: ["Individualized program design", "Weekly performance check-in", "Daily communication", "Tournament preparation", "Supplement guidance"],
  },
  {
    id: "prog-rebuild",
    slug: "rebuild",
    name: "Rebuild Package",
    desc: "Post-injury strengthening. Everything in Performance plus injury analysis, movement pattern restoration, stability chain optimization.",
    price: 0,
    type: "program" as const,
    features: ["Everything in Performance", "Injury history analysis", "Movement pattern restoration", "Stability chain optimization", "Progressive load management"],
  },
  {
    id: "prog-return",
    slug: "return",
    name: "Return Package",
    desc: "Major injury comeback. The full system. Active injury management, sport-specific return protocol, mental discipline framework.",
    price: 0,
    type: "program" as const,
    features: ["Everything in Rebuild", "Active injury management", "Sport-specific return protocol", "Mental discipline framework", "Priority communication"],
  },
];

const ProductsPage = () => {
  const { addItem } = useCart();

  const handleAddToCart = (item: { id: string; name: string; price: number; type: "product" | "program"; image?: string }) => {
    addItem(item);
    toast({ title: "Added to basket", description: `${item.name} has been added.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">
            Built Different
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-2xl leading-relaxed"
          >
            Every product carries the REFORGED identity. Not just gear — a statement. The difference is invisible from outside. The user knows.
          </motion.p>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 font-heading text-xs uppercase tracking-[0.5em] text-primary">Company System</p>
            <h2 className="font-heading text-4xl font-bold uppercase leading-none text-foreground md:text-5xl">
              Built for the athlete between pain and performance.
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground">
            <p>
              Reforged is a performance company for athletes who do not want their injury to become their identity. The work starts with clear intake,
              a body-map injury record, and a realistic view of sport history, then turns that information into coaching decisions.
            </p>
            <p>
              The product line is intentionally connected to the system: daily gear for consistency, restricted performance gear for athletes inside
              the program, and coaching packages that address movement, rebuilding capacity, regeneration, confidence, and return demands.
            </p>
            <p>
              Coming back is rarely a straight line. The goal is to reduce confusion, track the details that matter, and give every athlete a visible
              path from assessment to progressive exposure to game-ready performance.
            </p>
          </div>
        </div>
      </section>

      {/* Physical Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-12 text-center">Equipment</p>
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
                  {product.price > 0 && product.tag !== "Restricted" && (
                    <Button
                      variant="accent"
                      className="mt-6"
                      onClick={() => handleAddToCart({ id: product.id, name: product.name, price: product.price, type: product.type, image: product.image })}
                    >
                      <ShoppingBag className="mr-2" size={16} /> Add to Basket
                    </Button>
                  )}
                  {product.tag === "Restricted" && (
                    <p className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground mt-6">
                      Available through the REFORGED system only
                    </p>
                  )}
                  {product.tag === "Coming Soon" && (
                    <p className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground mt-6">
                      Coming soon
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
          <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4 text-center">Athlete Management</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase text-center mb-12">Training Programs</h2>
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
                  <span className="font-heading text-[10px] tracking-[0.3em] text-primary uppercase mb-4">Most Popular</span>
                )}
                <h3 className="font-heading text-xl font-bold text-foreground uppercase">{prog.name}</h3>
                <p className="font-body text-muted-foreground text-sm mt-2">{prog.desc}</p>
                <ul className="mt-6 space-y-2 flex-1">
                  {prog.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                      <span className="font-body text-sm text-foreground/70">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={`/apply?program=${prog.slug}`} className="mt-6 w-full">
                  <Button variant={i === 1 ? "accent" : "heroOutline"} className="w-full">
                    Apply <ArrowRight className="ml-2" size={14} />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-6">Brand Principle</p>
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase leading-tight">
            The invisible detail = premium.<br />
            The product = experience.<br />
            The user = part of the system.
          </h2>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
