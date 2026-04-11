import { motion } from "framer-motion";
import { Snowflake, Flame, Zap, Dumbbell } from "lucide-react";

const categories = [
  { name: "Cold Therapy", icon: Snowflake, description: "Ice baths & cold plunges" },
  { name: "Heat Therapy", icon: Flame, description: "Saunas & infrared blankets" },
  { name: "Percussion", icon: Zap, description: "Massage guns & tools" },
  { name: "Compression", icon: Dumbbell, description: "Boots & sleeves" },
];

const Categories = () => {
  return (
    <section className="py-20 bg-secondary" id="recovery">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-foreground uppercase tracking-tight">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-background rounded-lg border border-border hover:border-accent hover:shadow-md transition-all group"
            >
              <cat.icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-xl font-semibold text-foreground mt-4 uppercase">{cat.name}</h3>
              <p className="font-body text-muted-foreground text-sm mt-2">{cat.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;