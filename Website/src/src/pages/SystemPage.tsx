import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import systemImg from "@/assets/system-section.jpg";

const SystemPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />

      {/* Hero */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">
            RF Forge Protocol
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            The System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-2xl leading-relaxed"
          >
            Performance isn't just about strength. It's about control under load. REFORGE is built on the principle: stability first, capacity second.
          </motion.p>
        </div>
      </section>

      {/* Stability Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground uppercase">Why Stability is the Foundation</h2>
              <div className="mt-8 space-y-6 font-body text-muted-foreground leading-relaxed">
                <p>Performance is often confused with strength. But uncontrolled strength turns into injury.</p>
                <p>Stability is the capacity to maintain control under load — when an athlete jumps, changes direction, or stops suddenly, the body distributes force within milliseconds.</p>
                <p>If that distribution fails:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span>The ankle absorbs excess load</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span>The knee compensates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span>The hip activates too late</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span>The lower back starts carrying load</span>
                  </li>
                </ul>
                <p className="text-foreground font-medium">The problem is rarely where the pain is. The problem is the loss of control at the start of the chain.</p>
              </div>
            </div>
            <div className="sticky top-32">
              <img src={systemImg} alt="Athletic training" className="w-full aspect-[3/2] object-cover" loading="lazy" width={960} height={640} />
            </div>
          </div>
        </div>
      </section>

      {/* Load Distribution */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase">Load Distribution</h2>
          <div className="mt-8 space-y-6 font-body text-muted-foreground leading-relaxed">
            <p>Injury is rarely an event. It's a process. And that process begins when the body can't share load equally.</p>
            <p>When running, jumping, or stopping, the body transfers load across a chain: Foot → Ankle → Knee → Hip → Core.</p>
            <p>If one link doesn't do its job, another takes over. The body is smart — but this solution is temporary.</p>
            <div className="border-l-2 border-primary pl-6 my-8">
              <p className="font-heading text-xl text-foreground uppercase">
                "When the body distributes load correctly, performance rises naturally."
              </p>
              <p className="text-sm text-primary mt-2">— REFORGE Principle</p>
            </div>
            <p>The question isn't "where does it hurt?" — it's <span className="text-foreground">"where is the load accumulating?"</span></p>
          </div>
        </div>
      </section>

      {/* REFORGE Approach */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase">The REFORGE Approach</h2>
          <div className="mt-8 grid gap-6">
            {[
              { step: "01", title: "Base Control", desc: "Foot-ankle stability assessment and restoration" },
              { step: "02", title: "Unilateral Balance", desc: "Single-leg balance capacity under varying conditions" },
              { step: "03", title: "Load Alignment", desc: "Joint alignment under progressive load" },
              { step: "04", title: "Speed Control", desc: "Maintaining control at game speed" },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 p-6 border border-border hover:border-primary/30 transition-colors"
              >
                <span className="font-heading text-4xl font-bold text-primary/30">{item.step}</span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground uppercase">{item.title}</h3>
                  <p className="font-body text-muted-foreground text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/apply">
              <Button variant="accent" size="lg">
                Apply Now <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SystemPage;
