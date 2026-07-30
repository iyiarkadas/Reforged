import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Facebook, Linkedin, Mail, ShieldCheck } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BodyMap } from "@/components/BodyMap";
import { Button } from "@/components/ui/button";
import { auth, db, type InjuryMap } from "@/lib/firebase";

const programOptions = ["Performance", "Rebuild", "Return"];

const SignupPage = () => {
  const navigate = useNavigate();
  const [injuries, setInjuries] = useState<InjuryMap>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    phone: "",
    primarySport: "",
    competitionLevel: "",
    sportHistory: "",
    goals: "",
    preferredProgram: "Rebuild",
    emergencyContact: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const saveProfile = async (uid: string, email: string) => {
    await setDoc(doc(db, "users", uid), {
      ...formData,
      email,
      injuries,
      role: "user",
      emailVerified: false,
      createdAt: new Date().toISOString(),
    }, { merge: true });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const cleanedEmail = formData.email.trim().toLowerCase();
      const credential = await createUserWithEmailAndPassword(auth, cleanedEmail, formData.password);
      await updateProfile(credential.user, { displayName: `${formData.firstName} ${formData.lastName}`.trim() });
      await saveProfile(credential.user.uid, cleanedEmail);
      await sendEmailVerification(credential.user);
      localStorage.setItem("reforged-session-role", "user");
      navigate("/products", { state: { verifiedNotice: true } });
    } catch (err: any) {
      setError(err.message?.replace("Firebase: ", "") || "Sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (providerName: "google" | "facebook" | "linkedin") => {
    setError(null);
    setLoading(true);

    try {
      const provider =
        providerName === "google"
          ? new GoogleAuthProvider()
          : providerName === "facebook"
          ? new FacebookAuthProvider()
          : new OAuthProvider("oidc.linkedin");
      const credential = await signInWithPopup(auth, provider);
      const [firstName = "", ...lastNameParts] = (credential.user.displayName || "").split(" ");

      await setDoc(doc(db, "users", credential.user.uid), {
        firstName,
        lastName: lastNameParts.join(" "),
        email: credential.user.email,
        role: "user",
        provider: providerName,
        emailVerified: credential.user.emailVerified,
        createdAt: new Date().toISOString(),
      }, { merge: true });
      localStorage.setItem("reforged-session-role", "user");
      navigate("/account/edit");
    } catch (err: any) {
      setError(err.message?.replace("Firebase: ", "") || "Social sign-up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />

      <section className="border-b border-border py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:sticky lg:top-28">
            <p className="mb-4 font-heading text-xs uppercase tracking-[0.5em] text-primary">Athlete Intake</p>
            <h1 className="font-heading text-5xl font-bold uppercase leading-none text-foreground md:text-7xl">
              Start Your<br /><span className="text-primary">Return Plan</span>
            </h1>
            <div className="mt-8 space-y-5 text-muted-foreground">
              <p>
                Reforged is built for athletes who need more than a generic workout plan. Your intake creates a baseline across sport history,
                injury status, training goals, and the recovery habits that shape performance.
              </p>
              <p>
                Inspired by high-touch performance therapy and data-led coaching models, the system treats injury as part of the athlete story:
                what you played, what changed, what still feels uncertain, and what has to be rebuilt before competition feels natural again.
              </p>
              <p>
                Once your account is created, your coach can connect programming, scheduling, blogs, exercise media, and injury notes inside one portal.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Assess", "Rebuild", "Return"].map((step) => (
                <div key={step} className="border border-border bg-card p-4">
                  <ShieldCheck className="mb-3 text-primary" size={20} />
                  <p className="font-heading text-sm uppercase tracking-[0.2em]">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-border bg-card p-5 md:p-7">
            <div className="grid gap-3 sm:grid-cols-3">
              <Button type="button" variant="heroOutline" onClick={() => handleSocialSignup("google")} disabled={loading}>
                <Mail className="mr-2" size={16} /> Google
              </Button>
              <Button type="button" variant="heroOutline" onClick={() => handleSocialSignup("linkedin")} disabled={loading}>
                <Linkedin className="mr-2" size={16} /> LinkedIn
              </Button>
              <Button type="button" variant="heroOutline" onClick={() => handleSocialSignup("facebook")} disabled={loading}>
                <Facebook className="mr-2" size={16} /> Facebook
              </Button>
            </div>

            {error && <div className="mt-4 border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-7 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                <Field label="Surname" name="lastName" value={formData.lastName} onChange={handleChange} required />
                <Field label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" required />
                <Field label="Email" name="email" value={formData.email} onChange={handleChange} type="email" required />
                <Field label="Password" name="password" value={formData.password} onChange={handleChange} type="password" required minLength={6} />
                <Field label="Phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Primary Sport" name="primarySport" value={formData.primarySport} onChange={handleChange} required />
                <label className="block">
                  <span className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">Competition Level</span>
                  <select name="competitionLevel" value={formData.competitionLevel} onChange={handleChange} className="w-full border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary">
                    <option value="">Select level</option>
                    <option>Recreational</option>
                    <option>Club</option>
                    <option>Academy</option>
                    <option>College</option>
                    <option>Professional</option>
                  </select>
                </label>
              </div>

              <TextArea label="Sport History" name="sportHistory" value={formData.sportHistory} onChange={handleChange} placeholder="Teams, years played, position, current training week, and major milestones." />
              <TextArea label="Goals" name="goals" value={formData.goals} onChange={handleChange} placeholder="Return date, performance target, confidence barrier, or upcoming competition." />

              <label className="block">
                <span className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">Preferred Program</span>
                <select name="preferredProgram" value={formData.preferredProgram} onChange={handleChange} className="w-full border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary">
                  {programOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>

              <Field label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />

              <div>
                <h2 className="font-heading text-lg uppercase tracking-widest text-primary">Injury Recording System</h2>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Tap the body map to log current or previous injuries with dates before creating the account.</p>
                <BodyMap
                  injuries={injuries}
                  onUpdateInjury={(partId, type, date) => setInjuries((current) => ({ ...current, [partId]: { type, date } }))}
                  onClearInjury={(partId) => setInjuries((current) => {
                    const next = { ...current };
                    delete next[partId];
                    return next;
                  })}
                />
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="ml-2" size={16} />
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account? <Link to="/auth" className="text-primary">Log in</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Field = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <label className="block">
    <span className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    <input className="w-full border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary" {...props} />
  </label>
);

const TextArea = ({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <label className="block">
    <span className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    <textarea className="min-h-[110px] w-full resize-none border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary" {...props} />
  </label>
);

export default SignupPage;
