import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const packages = [
  {
    name: "Performance",
    slug: "performance",
    desc: "Athletic performance development",
    features: [
      "Individualized program design",
      "Weekly performance check-in",
      "Daily communication (WhatsApp)",
      "Tournament preparation",
      "Supplement guidance",
    ],
  },
  {
    name: "Rebuild",
    slug: "rebuild",
    desc: "Post-injury strengthening",
    featured: true,
    features: [
      "Everything in Performance",
      "Injury history analysis",
      "Movement pattern restoration",
      "Stability chain optimization",
      "Progressive load management",
    ],
  },
  {
    name: "Return",
    slug: "return",
    desc: "Major injury comeback",
    features: [
      "Everything in Rebuild",
      "Active injury management",
      "Sport-specific return protocol",
      "Mental discipline framework",
      "Priority communication access",
    ],
  },
];

const CoachingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">
            Athlete Management
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            Coaching
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-2xl leading-relaxed"
          >
            This isn't personal training. This is athlete management — your entire athletic life, systematically guided. Limited to 10-12 athletes at any time.
          </motion.p>
        </div>
      </section>

      {/* Model Explanation */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase">Not a PT. An Athlete Advisor.</h2>
          <div className="mt-8 space-y-4 font-body text-muted-foreground leading-relaxed">
            <p>You're not buying sessions. You're not buying a program. You're buying a <span className="text-foreground">system</span>.</p>
            <p>What you get:</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {[
              "Individualized programming",
              "Injury management",
              "Sport planning",
              "Tournament preparation",
              "Supplement guidance",
              "Mental discipline",
              "Continuous communication",
              "Adaptive weekly plans",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 border border-border">
                <Check size={14} className="text-primary shrink-0" />
                <span className="font-body text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-xs tracking-[0.5em] text-primary uppercase text-center mb-12">Packages</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 border ${pkg.featured ? "border-primary bg-card" : "border-border"} flex flex-col`}
              >
                {pkg.featured && (
                  <span className="font-heading text-[10px] tracking-[0.3em] text-primary uppercase mb-4">Most Popular</span>
                )}
                <h3 className="font-heading text-2xl font-bold text-foreground uppercase">{pkg.name}</h3>
                <p className="font-body text-muted-foreground text-sm mt-2">{pkg.desc}</p>
                <ul className="mt-8 space-y-3 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={`/apply?program=${pkg.slug}`} className="mt-8">
                  <Button variant={pkg.featured ? "accent" : "heroOutline"} className="w-full">
                    Apply <ArrowRight className="ml-2" size={14} />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase">How It Starts</h2>
          <div className="mt-10 space-y-0">
            {[
              { day: "Day 1", action: "Short phone consultation" },
              { day: "Day 2", action: "Detailed assessment" },
              { day: "Day 3", action: "First program delivered" },
              { day: "Day 4", action: "First training feedback" },
              { day: "Week 1 End", action: "45-minute evaluation" },
            ].map((step, i) => (
              <div key={step.day} className="flex items-center gap-6 py-4 border-b border-border">
                <span className="font-heading text-sm text-primary w-24 shrink-0 uppercase tracking-wider">{step.day}</span>
                <span className="font-body text-foreground/80">{step.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoachingPage;
