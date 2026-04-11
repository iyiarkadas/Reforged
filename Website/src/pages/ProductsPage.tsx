import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import productSocks from "@/assets/product-socks.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";

const products = [
  {
    name: "Performance Crew Socks",
    desc: "Real performance sock. Low cotton, high durability, built for high-intensity sports. Basketball, tennis, hard-surface sports.",
    image: productSocks,
    tag: "Performance",
    details: ["Dense weave — slight resistance on first wear", "Arch support", "8-10% elastane", "S/M & L/XL"],
  },
  {
    name: "Daily Crew Socks",
    desc: "Everyday athletic sock. Higher cotton ratio, softer feel. Lifestyle + gym ready.",
    image: productSocks,
    tag: "Lifestyle",
    details: ["Soft, comfortable fit", "Higher cotton ratio", "4-6% elastane", "S/M & L/XL"],
  },
  {
    name: "REFORGE Tee",
    desc: "Sport culture product. Minimal design. The mark of an athlete who chose to come back.",
    image: productTshirt,
    tag: "Coming Soon",
    details: ["Premium cotton", "Minimal branding", "Athletic fit", "Unisex sizing"],
  },
];

const ProductsPage = () => {
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
            Every product carries the REFORGE identity. Not just gear — a statement. The difference is invisible from outside. The user knows.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
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
                  <ul className="mt-6 space-y-2">
                    {product.details.map((d) => (
                      <li key={d} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        <span className="font-body text-sm text-foreground/70">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 bg-card border-t border-border">
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
