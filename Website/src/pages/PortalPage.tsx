import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  ShieldCheck,
  UserCog,
  Video,
} from "lucide-react";

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
    navigate("/auth");
  };

  if (!sections.some((item) => item.id === section)) {
    return <Navigate to="/portal/dashboard" replace />;
  }

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
            {role === "admin" && (
              <Button variant="heroOutline" size="sm" onClick={() => setAdminViewAsUser((current) => !current)}>
                {adminViewAsUser ? "View Admin" : "View As User"}
              </Button>
            )}
            <ThemeToggle />
            <Link to="/portal/profile" aria-label="Profile" className="hidden sm:block">
              <FitnessAvatar compact />
            </Link>
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

      <main className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 xl:grid-cols-[260px_1fr]">
        <aside className="hidden border border-border bg-card p-5 xl:block">
          <div className="flex items-center gap-4">
            <FitnessAvatar />
            <div>
              <p className="font-heading text-xl uppercase">{visibleRole === "admin" ? "Coach Admin" : "Serkan Y."}</p>
              <p className="text-sm text-muted-foreground">{visibleRole === "admin" ? "Performance staff" : "Soccer athlete"}</p>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              {visibleRole === "admin" ? "16 assigned athletes" : "Left knee: monitored"}
            </p>
            <p className="flex items-center gap-2">
              <Activity size={16} className="text-primary" />
              {visibleRole === "admin" ? "3 program updates due" : "Current phase: rebuild"}
            </p>
          </div>
        </aside>

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

const ProfilePage = ({ visibleRole }: { visibleRole: Role }) => (
  <div className="space-y-6">
    <PortalHero eyebrow="User Info" title="Profile, subscription, and injury status." copy={visibleRole === "admin" ? "Inspect athlete information, plan access, and account status." : "Edit your personal information, avatar status, injuries, and subscription."} />
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <DashboardPanel icon={UserCog} title="Avatar">
        <div className="flex items-center gap-5">
          <FitnessAvatar />
          <div>
            <p className="font-heading text-xl uppercase">{visibleRole === "admin" ? "Athlete Preview" : "Serkan Y."}</p>
            <p className="text-sm text-muted-foreground">Left knee support active</p>
          </div>
        </div>
      </DashboardPanel>
      <DashboardPanel icon={ChevronDown} title="Account Details">
        <div className="grid gap-3 md:grid-cols-2">
          {["Name", "Email", "Primary Sport", "Current Injury", "Subscription", "Billing Status"].map((field) => (
            <label key={field} className="block">
              <span className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">{field}</span>
              <input className="w-full border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary" defaultValue={field === "Subscription" ? "Premium Return Program" : field === "Billing Status" ? "Active" : ""} placeholder={field} />
            </label>
          ))}
        </div>
        <Button className="mt-5" variant="accent">Save Profile</Button>
      </DashboardPanel>
    </div>
  </div>
);

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
  <div className="grid grid-cols-7 border-l border-t border-border">
    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
      <div key={day} className="border-b border-r border-border p-2 text-xs text-muted-foreground">
        {day}
      </div>
    ))}
    {calendarDays.map((day) => (
      <div key={day} className="min-h-20 border-b border-r border-border p-2">
        <p className="font-heading text-sm">{day}</p>
        {activityLog[day] && (
          <p className={`mt-3 inline-flex px-2 py-1 text-xs ${activityLog[day].tone}`}>
            {activityLog[day].label}
          </p>
        )}
      </div>
    ))}
  </div>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-border bg-card p-5">
    <p className="font-heading text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
    <p className="mt-4 font-heading text-5xl font-bold text-primary">{value}</p>
  </div>
);

const FitnessAvatar = ({ compact = false }: { compact?: boolean }) => (
  <div className={`relative shrink-0 rounded-full border border-border bg-background ${compact ? "h-11 w-11" : "h-20 w-20"}`}>
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-label="Fitness avatar with left knee support">
      <circle cx="40" cy="18" r="9" className="fill-primary/80" />
      <path d="M31 32h18l5 22H26z" className="fill-foreground/75" />
      <path d="M28 34 16 49" className="stroke-foreground/75" strokeWidth="6" strokeLinecap="round" />
      <path d="M52 34 64 47" className="stroke-foreground/75" strokeWidth="6" strokeLinecap="round" />
      <path d="M33 54 27 70" className="stroke-foreground/75" strokeWidth="7" strokeLinecap="round" />
      <path d="M47 54 54 70" className="stroke-foreground/75" strokeWidth="7" strokeLinecap="round" />
      <rect x="21" y="56" width="14" height="7" className="fill-primary" rx="2" />
    </svg>
  </div>
);

export default PortalPage;
