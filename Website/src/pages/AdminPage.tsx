import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Users, ArrowLeft, ArrowUpDown, Download } from "lucide-react";

// Import Firebase tools
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  sport: string;
  currentSituation: string[];
  primaryGoal: string[];
  injuryHistory: string;
  commitmentLevel: string;
  reasonsForApplying: string[];
  whyNow: string;
  trainingDays: string;
  additionalInfo: string;
  createdAt: any;
  score?: number;
}

const AdminPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(false);

  // Scoring algorithm updated to perfectly parse your explicit strings
  const calculateScore = (app: Application): number => {
    let score = 0;
    
    if (app.trainingDays === "6+") score += 30;
    else if (app.trainingDays === "4-5") score += 20;
    else if (app.trainingDays === "2-3") score += 10;

    if (app.commitmentLevel === "committed" || app.commitmentLevel === "serious") score += 40;
    else if (app.commitmentLevel === "interested") score += 20;

    if (app.primaryGoal?.includes("Improve performance")) score += 15;
    if (app.currentSituation?.includes("I compete")) score += 15;

    return score;
  };

   useEffect(() => {
    const fetchApplications = async () => {
      try {
        // 1. Force a visible alert immediately to confirm the function is running
        alert("PROD DEBUG: fetchApplications has started executing!");

        const querySnapshot = await getDocs(collection(db, "applications"));
        
        // 2. Alert the explicit state of the data returned from the server
        alert(`PROD DEBUG: Request finished!\n- Is empty? ${querySnapshot.empty}\n- Total documents found: ${querySnapshot.size}`);

        const rawApps: Application[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          rawApps.push({ 
            id: doc.id, 
            ...data,
            firstName: data.firstName || "Unknown",
            lastName: data.lastName || "",
            primaryGoal: data.primaryGoal || [],
            currentSituation: data.currentSituation || [],
            reasonsForApplying: data.reasonsForApplying || []
          } as Application);
        });

        if (rawApps.length > 0) {
          alert(`PROD DEBUG: First parsed app name: ${rawApps[0].firstName}`);
        }

        const scoredApps = rawApps.map(app => ({ 
          ...app, 
          score: calculateScore(app) 
        }));

        scoredApps.sort((a, b) => (b.score || 0) - (a.score || 0));
        setApplications(scoredApps);
      } catch (error: any) {
        // 3. Catch structural or permission errors explicitly
        alert(`PROD CRASH:\nMessage: ${error.message}\nCode: ${error.code}`);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);
  const toggleSort = () => {
    const sorted = [...applications].sort((a, b) => {
      return sortAscending 
        ? (b.score || 0) - (a.score || 0) 
        : (a.score || 0) - (b.score || 0);
    });
    setApplications(sorted);
    setSortAscending(!sortAscending);
  };

  // Quick utility to download spreadsheet records straight to CSV Excel sheets
  const exportToCSV = () => {
    const headers = ["Score", "First Name", "Last Name", "Age", "Sport", "Days/Wk", "Commitment", "Injury", "Goals", "Situation", "Motivation"];
    const rows = applications.map(app => [
      app.score || 0,
      app.firstName,
      app.lastName,
      app.age,
      app.sport,
      app.trainingDays,
      app.commitmentLevel,
      app.injuryHistory,
      app.primaryGoal.join(" | "),
      app.currentSituation.join(" | "),
      app.whyNow
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reforged_applicants_sheet.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24" />

      {/* Control Header Area */}
      <section className="py-8 border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 max-w-[95%] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <button 
              onClick={() => navigate("/portal/dashboard")} 
              className="inline-flex items-center gap-2 text-[10px] font-heading uppercase text-muted-foreground hover:text-primary transition-colors mb-2 group"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> 
              Back to Dashboard
            </button>
            <h1 className="font-heading text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
              Application Master Sheet
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-xs uppercase tracking-wider px-4 py-2 hover:bg-primary/90 transition-colors"
            >
              <Download size={14} /> Export CSV
            </button>
            <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-muted-foreground">
              <Users size={16} className="text-primary" />
              Total Submissions: <strong className="text-foreground">{applications.length}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Spreadsheet Workspace Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-[95%]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="animate-spin text-primary" size={32} />
              <p className="text-muted-foreground font-body text-xs tracking-widest uppercase">Reading registry lines...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border bg-card/30">
              <p className="text-muted-foreground font-body text-sm">No records parsed successfully.</p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto border border-border bg-card text-xs shadow-sm">
              <table className="w-full border-collapse text-left min-w-[1800px] divide-y divide-border">
                <thead className="bg-muted/80 uppercase font-heading tracking-wider text-muted-foreground sticky top-0 select-none">
                  <tr className="divide-x divide-border">
                    <th scope="col" className="px-3 py-3 font-semibold text-center w-[60px]">Row</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground bg-primary/5 w-[100px]">
                      <button onClick={toggleSort} className="flex items-center gap-1.5 hover:text-primary transition-colors w-full justify-between">
                        Score <ArrowUpDown size={12} />
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold w-[140px]">First Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold w-[140px]">Last Name</th>
                    <th scope="col" className="px-3 py-3 font-semibold text-center w-[60px]">Age</th>
                    <th scope="col" className="px-4 py-3 font-semibold w-[130px]">Sport</th>
                    <th scope="col" className="px-3 py-3 font-semibold text-center w-[80px]">Days/Wk</th>
                    <th scope="col" className="px-4 py-3 font-semibold w-[130px]">Commitment</th>
                    <th scope="col" className="px-4 py-3 font-semibold w-[140px]">Injury Status</th>
                    <th scope="col" className="px-5 py-3 font-semibold w-[280px]">Primary Goals</th>
                    <th scope="col" className="px-5 py-3 font-semibold w-[250px]">Current Status</th>
                    <th scope="col" className="px-5 py-3 font-semibold w-[300px]">Motivation / Why Now</th>
                    <th scope="col" className="px-5 py-3 font-semibold w-[280px]">Reasons For Applying</th>
                    <th scope="col" className="px-5 py-3 font-semibold w-[250px]">Additional Notes</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border font-body text-foreground/90">
                  {applications.map((app, index) => (
                    <tr key={app.id} className="hover:bg-primary/5 transition-colors divide-x divide-border odd:bg-muted/5">
                      <td className="px-3 py-2.5 text-center text-muted-foreground font-mono bg-muted/20">{index + 1}</td>
                      <td className="px-4 py-2.5 font-bold font-mono text-primary bg-primary/5 text-center text-sm">{app.score || 0}</td>
                      <td className="px-4 py-2.5 font-medium uppercase truncate max-w-[140px]">{app.firstName}</td>
                      <td className="px-4 py-2.5 font-medium uppercase truncate max-w-[140px]">{app.lastName}</td>
                      <td className="px-3 py-2.5 text-center font-mono">{app.age}</td>
                      <td className="px-4 py-2.5 truncate max-w-[130px] uppercase tracking-wide text-muted-foreground">{app.sport}</td>
                      <td className="px-3 py-2.5 text-center font-semibold font-mono text-amber-500">{app.trainingDays}</td>
                      <td className="px-4 py-2.5 truncate max-w-[130px] font-medium text-emerald-500 uppercase text-[10px] tracking-wider">{app.commitmentLevel}</td>
                      <td className="px-4 py-2.5 truncate max-w-[140px] text-destructive/90 italic font-medium">{app.injuryHistory}</td>
                      
                      {/* Typo fixed here: title properties cleanly decoupled from className wrappers */}
                      <td className="px-5 py-2.5 max-w-[280px]">
                        <p className="line-clamp-2" title={app.primaryGoal?.join(", ")}>
                          {app.primaryGoal?.join(", ") || "—"}
                        </p>
                      </td>
                      <td className="px-5 py-2.5 max-w-[250px]">
                        <p className="line-clamp-2 text-muted-foreground" title={app.currentSituation?.join(", ")}>
                          {app.currentSituation?.join(", ") || "—"}
                        </p>
                      </td>
                      <td className="px-5 py-2.5 max-w-[300px]">
                        <p className="line-clamp-2 italic text-foreground/80" title={app.whyNow}>
                          {app.whyNow ? `"${app.whyNow}"` : "—"}
                        </p>
                      </td>
                      <td className="px-5 py-2.5 max-w-[280px]">
                        <p className="line-clamp-2 text-muted-foreground text-[11px]" title={app.reasonsForApplying?.join(", ")}>
                          {app.reasonsForApplying?.join(", ") || "—"}
                        </p>
                      </td>
                      <td className="px-5 py-2.5 max-w-[250px]">
                        <p className="line-clamp-2 text-muted-foreground/70" title={app.additionalInfo}>
                          {app.additionalInfo || "—"}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPage;