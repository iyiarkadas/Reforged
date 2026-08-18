import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import athleteRunning from "@/assets/athlete-running.jpg";
import athletePower from "@/assets/athlete-power.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Shield, Zap, Target, RotateCcw } from "lucide-react";

const pillars = [
  { icon: Zap, title: "Performance", desc: "Athletic performance development for competitive sports." },
  { icon: RotateCcw, title: "Rebuild", desc: "Structured recovery and rebuilding after injuries." },
  { icon: Target, title: "Return", desc: "Return to competitive sports — stronger than before." },
  { icon: Shield, title: "Mentality", desc: "Build the discipline and mindset required to compete." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={athleteRunning} alt="Athlete in motion" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-6"
          >
            Athlete Management System
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl font-bold text-foreground uppercase leading-[0.9]"
          >
            Built Like<br />
            <span className="text-primary">An Athlete</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-xl mx-auto"
          >
            A performance and injury return system built for competitive athletes who refuse to step away from competition.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/apply">
              <Button variant="accent" size="lg">
                Start Your Journey <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/system">
              <Button variant="heroOutline" size="lg">
                system'
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div {...fadeInUp}>
            <p className="font-heading text-3xl md:text-4xl font-semibold text-foreground uppercase leading-tight">
              You train. You compete.<br />
              <span className="text-primary">But you're not reaching your full potential.</span>
            </p>
            <p className="font-body text-muted-foreground mt-6">
              The problem isn't the motivation, it's the lack of a consistent system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.h2
            {...fadeInUp}
            className="font-heading text-4xl md:text-5xl font-bold text-primary uppercase text-center mb-12"
          >
            The Reforged System
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="p-8 border border-border bg-background hover:border-primary/40 transition-colors group"
              >
                <p.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-xl font-semibold text-foreground uppercase tracking-wider">{p.title}</h3>
                <p className="font-body text-muted-foreground text-sm mt-3">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">Reforged Methodology</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground uppercase leading-tight">
                We Don't Fix Injuries.<br />
                <span className="text-primary">We Reorganize the System.</span>
              </h2>
              <p className="font-body text-muted-foreground mt-6 leading-relaxed">
                You don't need more exercises. You need structure. You don't need more motivation. You need direction.
              </p>
              <p className="font-body text-muted-foreground mt-4 leading-relaxed">
                You do not possess lack of strength. It's the unorganized nature of your life. Reforged turns this into your advantage.
              </p>
              <Link to="/system" className="inline-block mt-8">
                <Button variant="heroOutline" size="default">
                  Learn More <ArrowRight className="ml-2" size={14} />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src={athletePower} alt="Athlete training" className="w-full aspect-[3/2] object-cover" loading="lazy" width={960} height={640} />
              <div className="absolute inset-0 border border-primary/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div {...fadeInUp}>
            <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">Not For Everyone</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground uppercase leading-tight">
              Your Injury Becomes<br />Your Advantage
            </h2>
            <p className="font-body text-muted-foreground mt-6">
              Our aim is to use your injury as an inflection point to restructure your approach to sports. This is not an open program. We work with a limited number of athletes. If you're not serious on your own development, the system won't work.
            </p>
            <Link to="/apply" className="inline-block mt-8">
              <Button variant="accent" size="lg">
                Start Your Journey <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
