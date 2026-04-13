import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <img
        src={heroBanner}
        alt="Athletes training on mountain trail at sunrise"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-primary/60" />
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground uppercase leading-tight max-w-2xl"
        >
          Recover Faster. <br />
          <span className="text-accent">Perform Better.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-body text-primary-foreground/80 text-lg md:text-xl mt-4 max-w-lg"
        >
          Professional-grade recovery equipment trusted by elite athletes worldwide.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex gap-4"
        >
          <Button variant="accent" size="lg">
            Shop Now
          </Button>
          <Button variant="heroOutline" size="lg">
            Our Story
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;