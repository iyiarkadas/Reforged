import { motion } from "framer-motion";
import productMassageGun from "@/assets/product-massage-gun.jpg";
import productColdPlunge from "@/assets/product-cold-plunge.jpg";
import productSauna from "@/assets/product-sauna.jpg";
import productCompression from "@/assets/product-compression.jpg";

const products = [
  { name: "Pro Massage Gun", price: "$299.99", image: productMassageGun, badge: "Best Seller" },
  { name: "Ice Plunge Tub", price: "$1,499.99", image: productColdPlunge, badge: "New" },
  { name: "Infrared Sauna Pod", price: "$2,199.99", image: productSauna, badge: null },
  { name: "Compression Boots", price: "$599.99", image: productCompression, badge: "Popular" },
];

const BestSellers = () => {
  return (
    <section className="py-20 bg-background" id="shop">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-foreground uppercase tracking-tight">
          Best Sellers
        </h2>
        <p className="font-body text-muted-foreground text-center mt-3 text-lg">
          Trusted by professional athletes and weekend warriors alike.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative aspect-square bg-secondary overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={512}
                  height={512}
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-heading text-lg font-semibold text-card-foreground uppercase">
                  {product.name}
                </h3>
                <p className="font-body text-accent font-bold text-lg mt-1">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;