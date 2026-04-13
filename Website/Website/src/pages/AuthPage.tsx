import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

type AuthMode = "login" | "signup";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4 text-center">
              {mode === "login" ? "Welcome Back" : "Join Reforge"}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground uppercase text-center leading-[0.9]">
              {mode === "login" ? "Log In" : "Create Account"}
            </h1>

            {/* Toggle */}
            <div className="flex mt-8 border border-border">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-3 font-heading text-sm tracking-[0.2em] uppercase transition-colors ${
                  mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-3 font-heading text-sm tracking-[0.2em] uppercase transition-colors ${
                  mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            {submitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 border border-primary/30 bg-primary/5 text-center">
                <p className="font-body text-sm text-foreground">
                  {mode === "login" ? "Login successful." : "Account created successfully."}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">First Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Last Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Email</label>
                <input
                  required
                  type="email"
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Password</label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-transparent border border-border px-4 py-3 pr-12 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••"
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {mode === "signup" && (
                <>
                  <div>
                    <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Instagram (Optional)</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      placeholder="@yourusername"
                    />
                  </div>
                </>
              )}

              <Button type="submit" variant="accent" size="lg" className="w-full mt-2">
                {mode === "login" ? "Log In" : "Create Account"} <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>

            {mode === "login" && (
              <p className="font-body text-sm text-muted-foreground text-center mt-6">
                Don't have an account?{" "}
                <button onClick={() => setMode("signup")} className="text-primary hover:underline">
                  Sign up
                </button>
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthPage;
