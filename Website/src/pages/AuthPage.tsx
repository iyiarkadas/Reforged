import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

type AuthMode = "login" | "signup";

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const role = mode === "login" && email.trim() === "admin" && password === "password" ? "admin" : "user";

    localStorage.setItem("reforged-session-role", role);
    sessionStorage.removeItem("reforged-portal-intro-seen");
    navigate("/portal/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />

      <section className="py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_440px] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-heading text-xs tracking-[0.5em] text-primary uppercase mb-4">Reforged Portal</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.9]">
              Train, Track,<br />
              <span className="text-primary">Return Stronger</span>
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Enter the private athlete platform for trainer scheduling, assigned programs, sport activity tracking,
              education, and exercise media.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-border bg-card p-6">
            <div className="flex border border-border">
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

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Email</label>
                <input
                  required
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                  placeholder="Email or username"
                />
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Password</label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 pr-12 text-foreground focus:outline-none focus:border-primary"
                    placeholder="Password"
                    minLength={mode === "login" ? 1 : 8}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full">
                {mode === "login" ? "Login" : "Sign Up"} <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthPage;
