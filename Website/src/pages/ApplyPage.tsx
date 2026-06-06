import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react"; // Added Loader2 for loading states

// Import Firebase Firestore tools
import { db } from "@/lib/firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ApplyPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Controlled form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    sport: "",
    currentSituation: [] as string[],
    primaryGoal: [] as string[],
    injuryHistory: "",
    commitmentLevel: "",
    reasonsForApplying: [] as string[],
    whyNow: "",
    trainingDays: "",
    additionalInfo: "",
  });

  // Handle standard input, select, and textarea changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle multi-select checkboxes
  const handleCheckboxChange = (category: "currentSituation" | "primaryGoal" | "reasonsForApplying", option: string) => {
    setFormData((prev) => {
      const currentList = prev[category];
      const updatedList = currentList.includes(option)
        ? currentList.filter((item) => item !== option)
        : [...currentList, option];
      return { ...prev, [category]: updatedList };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save data to a "applications" collection in Firestore
      await addDoc(collection(db, "applications"), {
        ...formData,
        age: Number(formData.age), // convert age to number
        createdAt: serverTimestamp(), // stores submission time automatically
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error saving application to Firebase:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
            This is not an open program. We work with a limited number of athletes. Not everyone gets accepted.
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
                Your application has been received. If your profile fits the Reforge system, you will be contacted shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" placeholder="First name" />
                </div>
                <div>
                  <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" placeholder="Last name" />
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Age</label>
                <input required name="age" value={formData.age} onChange={handleChange} type="number" className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" placeholder="Your age" />
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Sport</label>
                <select required name="sport" value={formData.sport} onChange={handleChange} className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors">
                  <option value="" className="bg-card">Select your sport</option>
                  <option value="football" className="bg-card">Football</option>
                  <option value="basketball" className="bg-card">Basketball</option>
                  <option value="tennis" className="bg-card">Tennis</option>
                  <option value="running" className="bg-card">Running</option>
                  <option value="other" className="bg-card">Other</option>
                </select>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Current Situation</label>
                <div className="space-y-2">
                  {["I train regularly", "I compete", "I've had injuries", "My performance is inconsistent", "I feel below my real level"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 border border-border hover:border-primary/30 transition-colors cursor-pointer">
                      <input type="checkbox" checked={formData.currentSituation.includes(opt)} onChange={() => handleCheckboxChange("currentSituation", opt)} className="accent-primary" />
                      <span className="font-body text-sm text-foreground/80">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Primary Goal</label>
                <div className="space-y-2">
                  {["Return from injury", "Improve performance", "Regain confidence", "Build structure", "Compete at a higher level"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 border border-border hover:border-primary/30 transition-colors cursor-pointer">
                      <input type="checkbox" checked={formData.primaryGoal.includes(opt)} onChange={() => handleCheckboxChange("primaryGoal", opt)} className="accent-primary" />
                      <span className="font-body text-sm text-foreground/80">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Injury History</label>
                <select required name="injuryHistory" value={formData.injuryHistory} onChange={handleChange} className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors">
                  <option value="" className="bg-card">Select</option>
                  <option value="none" className="bg-card">No major injuries</option>
                  <option value="minor" className="bg-card">Minor injuries</option>
                  <option value="major" className="bg-card">Major injury in the past</option>
                  <option value="current" className="bg-card">Currently recovering from injury</option>
                </select>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">How serious are you?</label>
                <select required name="commitmentLevel" value={formData.commitmentLevel} onChange={handleChange} className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors">
                  <option value="" className="bg-card">Select commitment level</option>
                  <option value="exploring" className="bg-card">I'm just exploring</option>
                  <option value="interested" className="bg-card">I'm interested</option>
                  <option value="serious" className="bg-card">I'm serious</option>
                  <option value="committed" className="bg-card">I'm fully committed</option>
                </select>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">What made you apply?</label>
                <div className="space-y-2">
                  {[
                    "I want to improve my athletic performance",
                    "I want to return to competition after injury",
                    "I feel I haven't reached my physical potential",
                    "I want stronger discipline in training and lifestyle",
                    "I want guidance from someone who understands competitive sports",
                  ].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 border border-border hover:border-primary/30 transition-colors cursor-pointer">
                      <input type="checkbox" checked={formData.reasonsForApplying.includes(opt)} onChange={() => handleCheckboxChange("reasonsForApplying", opt)} className="accent-primary" />
                      <span className="font-body text-sm text-foreground/80">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Why now?</label>
                <textarea
                  name="whyNow"
                  value={formData.whyNow}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                  placeholder="What made you decide to apply now?"
                />
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">How many days per week can you train?</label>
                <select name="trainingDays" value={formData.trainingDays} onChange={handleChange} className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors">
                  <option value="" className="bg-card">Select</option>
                  <option value="2-3" className="bg-card">2-3 days</option>
                  <option value="4-5" className="bg-card">4-5 days</option>
                  <option value="6+" className="bg-card">6+ days</option>
                </select>
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Anything else? (Optional)</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                  placeholder="Anything else you want us to know..."
                />
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full mt-4" disabled={loading}>
                {loading ? (
                  <>Sending Application... <Loader2 className="ml-2 animate-spin" size={16} /></>
                ) : (
                  <>Start Your Reforge <ArrowRight className="ml-2" size={16} /></>
                )}
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