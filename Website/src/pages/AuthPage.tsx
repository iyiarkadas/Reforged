import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

// Added Firestore tools along with standard authentication imports
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

type AuthMode = "login" | "signup";

// Secure internal whitelist fallback array
const ADMIN_LIST = [
  "admin@reforged.com.tr",
  "murat@reforged.com.tr" // Add any additional admin emails here
];

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Custom states for handling actions and notifications
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      let finalRole = "user";
      const cleanedEmail = email.trim().toLowerCase();

      if (mode === "login") {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Fetch user data metadata details directly from Firestore
        const userDoc = await getDoc(doc(db, "users", uid));
        
        if (userDoc.exists()) {
          finalRole = userDoc.data().role || "user";
        } else if (ADMIN_LIST.includes(cleanedEmail)) {
          // Fallback mechanism if the document wasn't generated yet
          finalRole = "admin";
          
          // Self-heal profile records inside the DB collection tracking layer
          await setDoc(doc(db, "users", uid), {
            email: cleanedEmail,
            role: "admin",
            createdAt: new Date().toISOString()
          }, { merge: true });
        }
        
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Check if the signing up email qualifies for structural elevation privileges
        if (ADMIN_LIST.includes(cleanedEmail)) {
          finalRole = "admin";
        }

        // Generate the matching profile record values structure
        await setDoc(doc(db, "users", uid), {
          email: cleanedEmail,
          role: finalRole,
          createdAt: new Date().toISOString()
        });
      }

      // Save role authorization parameters directly into localStorage
      localStorage.setItem("reforged-session-role", finalRole);
      
      sessionStorage.removeItem("reforged-portal-intro-seen");
      navigate("/portal/dashboard");
      
    } catch (err: any) {
      console.error(err);
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  // Handler for Forgot Password link
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Please enter your email address first so we can send a reset link.");
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccessMessage("A password reset link has been dispatched to your email inbox.");
    } catch (err: any) {
      console.error(err);
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
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
                type="button"
                onClick={() => { setMode("login"); setError(null); setSuccessMessage(null); }}
                className={`flex-1 py-3 font-heading text-sm tracking-[0.2em] uppercase transition-colors ${
                  mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setMode("signup"); setError(null); setSuccessMessage(null); }}
                className={`flex-1 py-3 font-heading text-sm tracking-[0.2em] uppercase transition-colors ${
                  mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Notification Messages */}
            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs tracking-wide uppercase">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs tracking-wide uppercase">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/30"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Password</label>
                <div className="relative">
                  <input
                    required={mode === "signup" || mode === "login"}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 pr-12 text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/30"
                    placeholder="Password"
                    minLength={6}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Trigger Button Link */}
              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-heading text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                    disabled={loading}
                  >
                    Forgot Your Password?
                  </button>
                </div>
              )}

              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
                {loading ? "Processing..." : mode === "login" ? "Login" : "Sign Up"} 
                {!loading && <ArrowRight className="ml-2" size={16} />}
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