import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ApplyPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">
            Limited Capacity
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]"
          >
            Apply
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-body text-muted-foreground text-lg mt-8 max-w-2xl leading-relaxed"
          >
            REFORGE works with a maximum of 10-12 athletes at a time. This ensures full attention, real adaptation, and genuine results.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">Application Received</p>
              <h2 className="font-heading text-3xl font-bold text-foreground uppercase">We'll Be in Touch.</h2>
              <p className="font-body text-muted-foreground mt-4">
                Your application has been submitted. We review every application personally.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Full Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Age</label>
                <input
                  required
                  type="number"
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your age"
                />
              </div>
              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Sport</label>
                <input
                  required
                  type="text"
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Basketball, Tennis, Running"
                />
              </div>
              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Goal</label>
                <select
                  required
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="" className="bg-background">Select your goal</option>
                  <option value="performance" className="bg-background">Performance Development</option>
                  <option value="rebuild" className="bg-background">Post-Injury Rebuild</option>
                  <option value="return" className="bg-background">Return to Competition</option>
                </select>
              </div>
              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Injury History</label>
                <textarea
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                  placeholder="Any past or current injuries..."
                />
              </div>
              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">What Drives You?</label>
                <div className="space-y-2">
                  {["I want to compete at a higher level", "I want to come back from injury stronger", "I want to prevent future injuries", "I want structured athletic guidance"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 border border-border hover:border-primary/30 transition-colors cursor-pointer">
                      <input type="checkbox" className="accent-primary" />
                      <span className="font-body text-sm text-foreground/80">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Message</label>
                <textarea
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors min-h-[120px] resize-none"
                  placeholder="Anything else you want us to know..."
                />
              </div>
              <Button type="submit" variant="accent" size="lg" className="w-full mt-4">
                Start Your Reforge <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApplyPage;
