import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { auth, getUserProfile, queueProfileChangeEmail, saveUserProfile, type UserProfile } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";

const EditAccountPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [initialProfile, setInitialProfile] = useState<UserProfile>({});
  const [formData, setFormData] = useState<UserProfile>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/auth");
        return;
      }

      setUserId(user.uid);
      setEmail(user.email || "");
      const profile = await getUserProfile(user.uid);
      const nextProfile = {
        firstName: profile?.firstName || user.displayName?.split(" ")[0] || "",
        lastName: profile?.lastName || user.displayName?.split(" ").slice(1).join(" ") || "",
        dateOfBirth: profile?.dateOfBirth || "",
        phone: profile?.phone || "",
        primarySport: profile?.primarySport || "",
        sportHistory: profile?.sportHistory || "",
        competitionLevel: profile?.competitionLevel || "",
        goals: profile?.goals || "",
        preferredProgram: profile?.preferredProgram || "",
        emergencyContact: profile?.emergencyContact || "",
      };
      setInitialProfile(nextProfile);
      setFormData(nextProfile);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const changedFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      const field = key as keyof UserProfile;
      return (formData[field] || "") !== (initialProfile[field] || "");
    });
  }, [formData, initialProfile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userId) return;

    if (changedFields.length === 0) {
      toast({ title: "No changes to save", description: "Your account details are already up to date." });
      return;
    }

    const confirmed = window.confirm("Are you sure you want to save these account information changes?");
    if (!confirmed) return;

    await saveUserProfile(userId, formData);
    if (email) {
      await queueProfileChangeEmail({ userId, to: email, changedFields });
    }
    toast({ title: "Account updated", description: "Your changes were saved and a confirmation email was queued." });
    navigate("/portal/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />

      <section className="border-b border-border py-16">
        <div className="container mx-auto px-4">
          <Link to="/portal/profile" className="mb-8 inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">
            <ArrowLeft size={16} /> Back to profile
          </Link>
          <p className="mb-4 font-heading text-xs uppercase tracking-[0.5em] text-primary">Account Details</p>
          <h1 className="font-heading text-5xl font-bold uppercase leading-none text-foreground md:text-7xl">Edit User Information</h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">Names and personal profile fields are locked inside the portal. Review changes here, confirm them, and the system will queue a confirmation email.</p>
        </div>
      </section>

      <section className="py-16">
        <form onSubmit={handleSubmit} className="container mx-auto grid max-w-4xl gap-5 px-4">
          {loading ? (
            <div className="border border-border bg-card p-8 text-muted-foreground">Loading account details...</div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name" name="firstName" value={formData.firstName || ""} onChange={handleChange} required />
                <Field label="Surname" name="lastName" value={formData.lastName || ""} onChange={handleChange} required />
                <Field label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth || ""} onChange={handleChange} type="date" />
                <Field label="Phone" name="phone" value={formData.phone || ""} onChange={handleChange} type="tel" />
                <Field label="Primary Sport" name="primarySport" value={formData.primarySport || ""} onChange={handleChange} />
                <label className="block">
                  <span className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">Preferred Program</span>
                  <select name="preferredProgram" value={formData.preferredProgram || ""} onChange={handleChange} className="w-full border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary">
                    <option value="">Select program</option>
                    <option>Performance</option>
                    <option>Rebuild</option>
                    <option>Return</option>
                  </select>
                </label>
              </div>
              <TextArea label="Sport History" name="sportHistory" value={formData.sportHistory || ""} onChange={handleChange} />
              <TextArea label="Goals" name="goals" value={formData.goals || ""} onChange={handleChange} />
              <Field label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact || ""} onChange={handleChange} />
              <Button type="submit" variant="accent" size="lg" className="mt-4 justify-self-start">
                <Save className="mr-2" size={16} /> Save Changes
              </Button>
            </>
          )}
        </form>
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
    <textarea className="min-h-[120px] w-full resize-none border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary" {...props} />
  </label>
);

export default EditAccountPage;
