import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Marcus J.", role: "NFL Athlete", text: "The cold plunge changed my recovery game completely. I'm back on the field faster than ever.", rating: 5 },
  { name: "Sarah L.", role: "Marathon Runner", text: "These compression boots are a game changer. My legs feel brand new after every session.", rating: 5 },
  { name: "David K.", role: "CrossFit Coach", text: "I recommend RecoveryPro to all my athletes. Professional grade equipment at fair prices.", rating: 5 },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center uppercase tracking-tight">
          What Athletes Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-highlight text-highlight" />
                ))}
              </div>
              <p className="font-body text-primary-foreground/90 italic leading-relaxed">"{t.text}"</p>
              <div className="mt-4">
                <p className="font-heading font-semibold text-primary-foreground uppercase">{t.name}</p>
                <p className="font-body text-sm text-primary-foreground/60">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
