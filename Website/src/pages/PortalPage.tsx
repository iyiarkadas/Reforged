import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Activity,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Dumbbell,
  Home,
  LogOut,
  Play,
  Save,
  Target,
  UserCog,
  Video,
  Zap,
} from "lucide-react";
import { auth, saveUserInjuries, getUserInjuries, getUserProfile, type InjuryMap, type UserProfile } from "@/lib/firebase";
import { BodyMap } from "@/components/BodyMap";

type Role = "user" | "admin";
type Section = "dashboard" | "schedule" | "programs" | "blogs" | "exercises" | "profile";

const sections: { id: Section; label: string; icon: typeof Home }[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "schedule", label: "Scheduling", icon: CalendarDays },
  { id: "programs", label: "Assigned Programs", icon: Dumbbell },
  { id: "blogs", label: "Blogs", icon: BookOpen },
  { id: "exercises", label: "Exercise List", icon: Video },
  { id: "profile", label: "User Info", icon: UserCog },
];

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);

const activityLog: Record<number, { label: string; tone: string }> = {
  2: { label: "Run", tone: "bg-primary/15 text-primary" },
  5: { label: "PT", tone: "bg-secondary text-foreground" },
  9: { label: "Lift", tone: "bg-primary/15 text-primary" },
  14: { label: "Mobility", tone: "bg-secondary text-foreground" },
  18: { label: "Game", tone: "bg-primary text-primary-foreground" },
  23: { label: "Bike", tone: "bg-secondary text-foreground" },
  27: { label: "Recovery", tone: "bg-primary/15 text-primary" },
};

const activityDetails: Record<number, { label: string; load: number; readiness: number; focus: string; notes: string }> = {
  2: { label: "Run", load: 68, readiness: 82, focus: "Aerobic rhythm", notes: "Easy mileage with knee response check after 24 hours." },
  5: { label: "PT", load: 45, readiness: 76, focus: "Strength assessment", notes: "Single-leg force screen and manual range check." },
  9: { label: "Lift", load: 72, readiness: 84, focus: "Posterior chain", notes: "Progressive loading with controlled tempo work." },
  14: { label: "Mobility", load: 28, readiness: 88, focus: "Hip access", notes: "Low-intensity regeneration and tissue prep." },
  18: { label: "Game", load: 91, readiness: 79, focus: "Competition exposure", notes: "Minutes capped; response tracked for next block." },
  23: { label: "Bike", load: 52, readiness: 86, focus: "Conditioning", notes: "Non-impact conditioning while maintaining output." },
  27: { label: "Recovery", load: 18, readiness: 92, focus: "Regeneration", notes: "Breathing, mobility, and soreness audit." },
};

const programs = [
  { title: "ACL return-to-cut progression", phase: "Phase 3", due: "Today" },
  { title: "Upper body strength rebuild", phase: "Block B", due: "Tomorrow" },
  { title: "Hamstring sprint exposure", phase: "Week 2", due: "Friday" },
];

const adminQueue = [
  "Review Deniz's knee pain note",
  "Assign next sprint block to Maya",
  "Approve 4 one-on-one requests",
];

const exercises = [
  { title: "Split Squat ISO", meta: "Photo + coaching video", icon: Dumbbell },
  { title: "Lateral Decel", meta: "3 angles, 2 progressions", icon: Video },
  { title: "Shoulder CARs", meta: "Mobility photo sequence", icon: Activity },
  { title: "Acceleration Wall Drill", meta: "Slow motion breakdown", icon: Play },
];

const blogPosts = [
  "How to read soreness during return to sport",
  "Nutrition for heavy training weeks",
  "Confidence after injury: exposure over hype",
];

const PortalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { section = "dashboard" } = useParams<{ section: Section }>();
  const [role, setRole] = useState<Role>(() => (localStorage.getItem("reforged-session-role") === "admin" ? "admin" : "user"));
  const [adminViewAsUser, setAdminViewAsUser] = useState(false);
  const [showIntro, setShowIntro] = useState(() => sessionStorage.getItem("reforged-portal-intro-seen") !== "true");
  
  // Track authenticated user's email
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!showIntro) return;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("reforged-portal-intro-seen", "true");
      setShowIntro(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [showIntro]);

  const activeSection = sections.some((item) => item.id === section) ? section : "dashboard";
  const visibleRole: Role = role === "admin" && adminViewAsUser ? "user" : role;
  const subtitle = visibleRole === "admin" ? "Trainer control room" : "Private athlete program";

  const logout = () => {
    localStorage.removeItem("reforged-session-role");
    sessionStorage.removeItem("reforged-portal-intro-seen");
    auth.signOut();
    navigate("/auth");
  };

  if (!sections.some((item) => item.id === section)) {
    return <Navigate to="/portal/dashboard" replace />;
  }

  // Strictly permit "Review Applicants" button only for mur4t3rdogan1999@gmail.com
  const isTargetAdmin = userEmail?.toLowerCase() === "mur4t3rdogan1999@gmail.com";

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.img
                src="/images/reforged-logo.png"
                alt="Reforged"
                className="h-20 w-auto"
                animate={{ filter: ["drop-shadow(0 0 0 hsl(var(--primary)))", "drop-shadow(0 0 28px hsl(var(--primary)))", "drop-shadow(0 0 0 hsl(var(--primary)))"] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <div className="h-px w-56 overflow-hidden bg-border">
                <motion.div className="h-full bg-primary" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
              </div>
              <p className="font-heading text-xs uppercase tracking-[0.5em] text-primary">Access Granted</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3">
          <Link to="/portal/dashboard" className="flex items-center gap-3">
            <img src="/images/reforged-icon.png" alt="Reforged" className="h-9 w-auto" />
            <div>
              <p className="font-heading text-xl font-bold uppercase tracking-wider">
                <span className="text-foreground">RE</span><span className="text-primary">FORGED</span>
              </p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{subtitle}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {sections.map((item) => (
              <PortalNavLink key={item.id} item={item} isActive={location.pathname === `/portal/${item.id}`} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isTargetAdmin && (
              <Button 
                variant="heroOutline" 
                size="sm" 
                onClick={() => navigate("/admin/applications")}
                className="border-primary/40 text-primary hover:bg-primary/10 font-heading text-xs uppercase tracking-wider"
              >
                Review Applicants
              </Button>
            )}

            {role === "admin" && (
              <Button variant="heroOutline" size="sm" onClick={() => setAdminViewAsUser((current) => !current)}>
                {adminViewAsUser ? "View Admin" : "View As User"}
              </Button>
            )}
            <ThemeToggle />
            <button onClick={logout} className="text-muted-foreground transition-colors hover:text-primary" aria-label="Log out">
              <LogOut size={19} />
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1600px] gap-2 overflow-x-auto border-t border-border px-4 py-2 lg:hidden">
          {sections.map((item) => (
            <PortalNavLink key={item.id} item={item} isActive={location.pathname === `/portal/${item.id}`} compact />
          ))}
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 xl:grid-cols-[1fr]">
        <motion.section
          key={activeSection + visibleRole}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {activeSection === "dashboard" && <DashboardHome visibleRole={visibleRole} />}
          {activeSection === "schedule" && <SchedulePage visibleRole={visibleRole} />}
          {activeSection === "programs" && <ProgramsPage visibleRole={visibleRole} />}
          {activeSection === "blogs" && <BlogsPage />}
          {activeSection === "exercises" && <ExercisesPage />}
          {activeSection === "profile" && <ProfilePage visibleRole={visibleRole} />}
        </motion.section>
      </main>
    </div>
  );
};

const PortalNavLink = ({
  item,
  isActive,
  compact = false,
}: {
  item: { id: Section; label: string; icon: typeof Home };
  isActive: boolean;
  compact?: boolean;
}) => (
  <Link
    to={`/portal/${item.id}`}
    className={`inline-flex shrink-0 items-center gap-2 px-3 py-2 font-heading text-xs uppercase tracking-[0.14em] transition-colors ${
      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-background hover:text-foreground"
    } ${compact ? "text-[11px]" : ""}`}
  >
    <item.icon size={15} />
    {item.label}
  </Link>
);

const DashboardHome = ({ visibleRole }: { visibleRole: Role }) => (
  <div className="space-y-6">
    <PortalHero
      eyebrow={visibleRole === "admin" ? "Admin Dashboard" : "Athlete Dashboard"}
      title={visibleRole === "admin" ? "Control the program floor." : "Welcome to your private performance room."}
      copy={visibleRole === "admin" ? "Monitor athlete status, scheduling demand, and programming work from one premium console." : "Track training, review assigned work, and stay connected to your trainer without leaving the system."}
    />
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <DashboardPanel icon={CalendarDays} title="Monthly Activity">
        <CalendarGrid />
      </DashboardPanel>
      <div className="space-y-6">
        <Metric label={visibleRole === "admin" ? "Athletes Active" : "Sessions Completed"} value={visibleRole === "admin" ? "16" : "12"} />
        <Metric label={visibleRole === "admin" ? "Program Reviews" : "Readiness Score"} value={visibleRole === "admin" ? "7" : "84%"} />
      </div>
    </div>
  </div>
);

const SchedulePage = ({ visibleRole }: { visibleRole: Role }) => (
  <div className="space-y-6">
    <PortalHero eyebrow="Scheduling" title="One-on-one trainer sessions." copy={visibleRole === "admin" ? "Approve requests, manage availability, and keep athlete sessions moving." : "Book the next session and see upcoming trainer availability."} />
    <div className="grid gap-4 md:grid-cols-3">
      {["Tuesday 2:00 PM", "Thursday 4:30 PM", "Saturday 10:15 AM"].map((slot) => (
        <DashboardPanel key={slot} icon={CalendarDays} title={slot}>
          <p className="text-sm text-muted-foreground">Performance review, pain check-in, and next block planning.</p>
          <Button className="mt-4 w-full" variant="accent">{visibleRole === "admin" ? "Approve Slot" : "Book Session"}</Button>
        </DashboardPanel>
      ))}
    </div>
  </div>
);

const ProgramsPage = ({ visibleRole }: { visibleRole: Role }) => (
  <div className="space-y-6">
    <PortalHero eyebrow="Assigned Programs" title={visibleRole === "admin" ? "Programming command center." : "Your trainer-assigned work."} copy={visibleRole === "admin" ? "Review athlete queues and assign next blocks." : "See the blocks your trainer has assigned and what is due next."} />
    <div className="grid gap-4 lg:grid-cols-3">
      {(visibleRole === "admin" ? adminQueue.map((item) => ({ title: item, phase: "Admin queue", due: "Review" })) : programs).map((program) => (
        <DashboardPanel key={program.title} icon={Dumbbell} title={program.title}>
          <p className="text-sm text-muted-foreground">{program.phase}</p>
          <p className="mt-4 inline-flex bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{program.due}</p>
        </DashboardPanel>
      ))}
    </div>
  </div>
);

const BlogsPage = () => (
  <div className="space-y-6">
    <PortalHero eyebrow="Blogs" title="Education library." copy="Return-to-play articles, nutrition notes, and mindset work curated for the private program." />
    <div className="grid gap-4 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <DashboardPanel key={post} icon={BookOpen} title={post}>
          <p className="text-sm text-muted-foreground">Premium member article · 6 minute read</p>
        </DashboardPanel>
      ))}
    </div>
  </div>
);

const ExercisesPage = () => (
  <div className="space-y-6">
    <PortalHero eyebrow="Exercise List" title="Photos, videos, and coaching cues." copy="A searchable movement library for your current program and injury status." />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {exercises.map((exercise) => (
        <DashboardPanel key={exercise.title} icon={exercise.icon} title={exercise.title}>
          <div className="mb-4 aspect-video border border-border bg-background p-4">
            <div className="flex h-full items-center justify-center bg-primary/10 text-primary">
              <exercise.icon size={34} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{exercise.meta}</p>
        </DashboardPanel>
      ))}
    </div>
  </div>
);

const ProfilePage = ({ visibleRole }: { visibleRole: Role }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [injuries, setInjuries] = useState<InjuryMap>({});
  const [pendingInjuries, setPendingInjuries] = useState<InjuryMap>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setProfile((prev) => ({
          ...prev,
          email: user.email || "",
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          profilePic: user.photoURL || "",
        }));
      } else {
        setUserId(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchProfileInjuries = async () => {
      try {
        setLoading(true);
        const savedData = await getUserInjuries(userId);
        const savedProfile = await getUserProfile(userId);
        if (savedData) {
          setInjuries(savedData);
          setPendingInjuries(savedData);
        }
        if (savedProfile) {
          setProfile((prev) => ({
            ...prev,
            firstName: savedProfile.firstName || prev.firstName,
            lastName: savedProfile.lastName || prev.lastName,
          }));
        }
      } catch (error) {
        console.error("Firestore sync error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileInjuries();
  }, [userId]);

  const handleStageInjury = (partId: string, type: string, date: string) => {
    setPendingInjuries((prev) => ({
      ...prev,
      [partId]: { type, date },
    }));
  };

  const handleStageClear = (partId: string) => {
    setPendingInjuries((prev) => {
      const updated = { ...prev };
      delete updated[partId];
      return updated;
    });
  };

  const handleSaveToDatabase = async () => {
    if (!userId) return;
    setIsSaving(true);
    try {
      await saveUserInjuries(userId, pendingInjuries);
      setInjuries(pendingInjuries);
    } catch (error) {
      console.error("Failed to save updates:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!loading && !userId) {
    return (
      <div className="border border-destructive/30 bg-destructive/5 p-6 text-center max-w-md mx-auto">
        <p className="text-sm text-destructive uppercase tracking-wider font-heading mb-3">Secure Session Required</p>
        <Link to="/auth">
          <Button variant="heroOutline" size="sm">Go to Login Screen</Button>
        </Link>
      </div>
    );
  }

  const activeTraumaCount = Object.keys(pendingInjuries).length;
  const hasChanges = JSON.stringify(injuries) !== JSON.stringify(pendingInjuries);

  return (
    <div className="space-y-6">
      <PortalHero
        eyebrow="User Info"
        title="Profile and injury status."
        copy={visibleRole === "admin" ? "Inspect athlete information and trauma markers." : "Edit your personal information, profile photo, and managed injuries."}
      />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <div className="border border-border bg-card p-5 text-center">
            <div className="relative mx-auto h-24 w-24 mb-4 rounded-full border border-border bg-background overflow-hidden flex items-center justify-center">
              {profile.profilePic ? (
                <img src={profile.profilePic} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <UserCog size={40} className="text-muted-foreground" />
              )}
            </div>
            <h2 className="font-heading text-xl uppercase tracking-wide truncate">
              {profile.firstName || profile.lastName ? `${profile.firstName} ${profile.lastName}` : "Athlete Profile"}
            </h2>
            <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
          </div>

          <div className="border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="text-primary" size={18} />
              <h3 className="font-heading text-sm uppercase">Trauma Status</h3>
            </div>
            <p className="text-sm font-medium border border-border bg-background p-3 text-center">
              {loading ? "Syncing profile logs..." : `${activeTraumaCount} parts flagged under care`}
            </p>
          </div>
        </div>

        <div className="border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <ChevronDown className="text-primary" size={18} />
            <h2 className="font-heading text-xl uppercase">Account Details</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div>
              <span className="mb-2 block font-heading text-xs uppercase tracking-wider text-muted-foreground">First Name</span>
              <input
                className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                disabled={visibleRole === "admin"}
              />
            </div>
            <div>
              <span className="mb-2 block font-heading text-xs uppercase tracking-wider text-muted-foreground">Last Name</span>
              <input
                className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                disabled={visibleRole === "admin"}
              />
            </div>
            <div>
              <span className="mb-2 block font-heading text-xs uppercase tracking-wider text-muted-foreground">Email</span>
              <input
                className="w-full border border-border bg-background px-3 py-2 text-sm outline-none opacity-60"
                value={profile.email}
                disabled
              />
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h3 className="font-heading text-sm uppercase tracking-widest text-primary">Anatomical Injury Map</h3>
                <p className="text-xs text-muted-foreground">Select coordinates directly to stage markers.</p>
              </div>

              {hasChanges && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Button onClick={handleSaveToDatabase} disabled={isSaving} size="sm" variant="accent" className="gap-2">
                    <Save size={14} />
                    {isSaving ? "Saving..." : "Save Injury Configuration"}
                  </Button>
                </motion.div>
              )}
            </div>

            {loading ? (
              <div className="h-48 flex items-center justify-center border border-border border-dashed text-sm text-muted-foreground animate-pulse">
                Retrieving cloud maps...
              </div>
            ) : (
              <BodyMap
                injuries={pendingInjuries}
                onUpdateInjury={handleStageInjury}
                onClearInjury={handleStageClear}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PortalHero = ({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) => (
  <section className="relative overflow-hidden border border-border bg-card p-6 md:p-8">
    <div className="absolute inset-y-0 right-0 w-1/3 bg-primary/10" />
    <div className="relative max-w-3xl">
      <p className="font-heading text-xs uppercase tracking-[0.45em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 font-heading text-4xl font-bold uppercase leading-none md:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">{copy}</p>
    </div>
  </section>
);

const DashboardPanel = ({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof CalendarDays;
  title: string;
  children: ReactNode;
}) => (
  <div className="border border-border bg-card p-5">
    <div className="mb-4 flex items-start gap-3">
      <Icon className="mt-1 shrink-0 text-primary" size={22} />
      <h2 className="font-heading text-2xl uppercase leading-tight">{title}</h2>
    </div>
    {children}
  </div>
);

const CalendarGrid = () => (
  <InteractiveCalendar />
);

const InteractiveCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(18);
  const selected = activityDetails[selectedDay] || {
    label: "Open day",
    load: 0,
    readiness: 90,
    focus: "No assigned activity",
    notes: "Use this day for optional mobility, walking, or coach-requested logging.",
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
      <div className="grid grid-cols-7 border-l border-t border-border">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="border-b border-r border-border p-2 text-xs text-muted-foreground">
            {day}
          </div>
        ))}
        {calendarDays.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`min-h-20 border-b border-r border-border p-2 text-left transition-colors hover:bg-primary/10 ${
                isSelected ? "bg-primary/15 ring-1 ring-inset ring-primary" : ""
              }`}
            >
              <p className="font-heading text-sm">{day}</p>
              {activityLog[day] && (
                <p className={`mt-3 inline-flex px-2 py-1 text-xs ${activityLog[day].tone}`}>
                  {activityLog[day].label}
                </p>
              )}
            </button>
          );
        })}
      </div>
      <div className="border border-border bg-background p-4">
        <p className="font-heading text-xs uppercase tracking-[0.25em] text-primary">Day {selectedDay}</p>
        <h3 className="mt-2 font-heading text-2xl uppercase">{selected.label}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{selected.notes}</p>
        <div className="mt-5 space-y-4">
          <ActivityMeter icon={Zap} label="Training Load" value={selected.load} />
          <ActivityMeter icon={Target} label="Readiness" value={selected.readiness} />
        </div>
        <p className="mt-5 border border-border bg-card p-3 text-sm">
          <span className="font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">Focus</span><br />
          {selected.focus}
        </p>
      </div>
    </div>
  );
};

const ActivityMeter = ({ icon: Icon, label, value }: { icon: typeof Zap; label: string; value: number }) => (
  <div>
    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="flex items-center gap-2"><Icon size={14} className="text-primary" /> {label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-card">
      <div className="h-full bg-primary transition-all" style={{ width: `${value}%` }} />
    </div>
  </div>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-border bg-card p-5">
    <p className="font-heading text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
    <p className="mt-4 font-heading text-5xl font-bold text-primary">{value}</p>
  </div>
);

export default PortalPage;