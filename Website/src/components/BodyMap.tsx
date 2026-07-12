import React, { useState } from "react";
import { X, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InjuryMap } from "@/lib/firebase";

interface BodyMapProps {
  injuries: InjuryMap;
  onUpdateInjury: (partId: string, type: string, date: string) => void;
  onClearInjury: (partId: string) => void;
}

interface BodyPart {
  id: string;
  label: string;
  svgPath: string;
}

// Simplified ergonomic path maps for a modular silhouette human asset
const bodyParts: BodyPart[] = [
  { id: "torso", label: "Torso / Core", svgPath: "M32,22 L48,22 L46,42 L34,42 Z" },
  { id: "left_shoulder", label: "Left Shoulder", svgPath: "M24,22 C26,20 31,22 32,23 L30,29 L23,26 Z" },
  { id: "right_shoulder", label: "Right Shoulder", svgPath: "M56,22 C54,20 49,22 48,23 L50,29 L57,26 Z" },
  { id: "left_arm", label: "Left Arm", svgPath: "M23,26 L17,44 L21,46 L26,30 Z" },
  { id: "right_arm", label: "Right Arm", svgPath: "M57,26 L63,44 L59,46 L54,30 Z" },
  { id: "hips", label: "Hips / Pelvis", svgPath: "M34,42 L46,42 L48,50 L32,50 Z" },
  { id: "left_upper_leg", label: "Left Upper Leg", svgPath: "M32,50 L40,50 L38,68 L31,68 Z" },
  { id: "right_upper_leg", label: "Right Upper Leg", svgPath: "M40,50 L48,50 L49,68 L42,68 Z" },
  { id: "left_knee", label: "Left Knee", svgPath: "M31,68 L38,68 L38,74 L31,74 Z" },
  { id: "right_knee", label: "Right Knee", svgPath: "M42,68 L49,68 L49,74 L42,74 Z" },
  { id: "left_lower_leg", label: "Left Lower Leg", svgPath: "M31,74 L38,74 L36,92 L32,92 Z" },
  { id: "right_lower_leg", label: "Right Lower Leg", svgPath: "M42,74 L49,74 L48,92 L44,92 Z" },
  { id: "left_ankle", label: "Left Ankle", svgPath: "M32,92 L36,92 L36,95 L32,95 Z" },
  { id: "right_ankle", label: "Right Ankle", svgPath: "M44,92 L48,92 L48,95 L44,95 Z" },
  { id: "left_foot", label: "Left Foot", svgPath: "M32,95 L36,95 L38,99 L29,99 Z" },
  { id: "right_foot", label: "Right Foot", svgPath: "M44,95 L48,95 L51,99 L42,99 Z" },
];

export const BodyMap: React.FC<BodyMapProps> = ({ injuries, onUpdateInjury, onClearInjury }) => {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");

  const handlePartClick = (part: BodyPart) => {
    setSelectedPart(part);
    if (injuries[part.id]) {
      setType(injuries[part.id].type);
      setDate(injuries[part.id].date);
    } else {
      setType("");
      setDate(new Date().toISOString().split("T")[0]); // default to today
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPart) return;
    if (!type.trim() || !date) {
      onClearInjury(selectedPart.id);
    } else {
      onUpdateInjury(selectedPart.id, type, date);
    }
    setSelectedPart(null);
  };

  return (
    <div className="relative grid gap-6 md:grid-cols-2">
      {/* Dynamic Graphic UI Box */}
      <div className="flex flex-col items-center justify-center border border-border bg-card/40 p-4">
        <p className="mb-4 font-heading text-xs uppercase tracking-widest text-muted-foreground">
          Interactive Anatomy Picker
        </p>
        <svg
          viewBox="10 10 60 92"
          className="h-[420px] w-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]"
        >
          {/* Head & Neck (Static Illustration Node) */}
          <circle cx="40" cy="16" r="5" className="fill-muted/40 stroke-border" strokeWidth="0.5" />
          <path d="M38,21 L42,21 L41,23 L39,23 Z" className="fill-muted/40" />

          {/* Map Selectable Paths */}
          {bodyParts.map((part) => {
            const hasInjury = !!injuries[part.id];
            return (
              <path
                key={part.id}
                d={part.svgPath}
                className={`cursor-pointer transition-all duration-200 stroke-background/60 ${
                  hasInjury
                    ? "fill-primary hover:fill-primary/80 animate-pulse"
                    : "fill-muted/30 hover:fill-accent-foreground/20"
                }`}
                strokeWidth="1"
                onClick={() => handlePartClick(part)}
              >
                <title>{part.label}</title>
              </path>
            );
          })}
        </svg>
      </div>

      {/* Entry Modal / Detail Monitor side pane */}
      <div className="flex flex-col justify-between border border-border bg-card p-5">
        {selectedPart ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="font-heading text-lg uppercase text-primary">
                Configuring: {selectedPart.label}
              </h3>
              <button type="button" onClick={() => setSelectedPart(null)} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="block mb-1 font-heading text-xs uppercase tracking-wider text-muted-foreground">
                Injury Diagnosis / Notes
              </label>
              <input
                type="text"
                className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                placeholder="e.g., Grade II Meniscus Tear"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-heading text-xs uppercase tracking-wider text-muted-foreground">
                Onset / Assessment Date
              </label>
              <input
                type="date"
                className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" variant="accent" className="w-full">
                Save Diagnostics
              </Button>
              {injuries[selectedPart.id] && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    onClearInjury(selectedPart.id);
                    setSelectedPart(null);
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </form>
        ) : (
          <div className="flex h-full flex-col justify-between space-y-6">
            <div>
              <h3 className="font-heading text-lg uppercase border-b border-border pb-2 mb-4">
                Active Medical Log
              </h3>
              {Object.keys(injuries).length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  No tracking restrictions logged. Select anatomy segment to flag localized trauma.
                </p>
              ) : (
                <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                  {Object.entries(injuries).map(([key, value]) => {
                    const label = bodyParts.find((p) => p.id === key)?.label || key;
                    return (
                      <div key={key} className="flex items-start justify-between border border-border/60 bg-background/50 p-2.5 text-xs">
                        <div>
                          <p className="font-heading uppercase text-primary font-bold">{label}</p>
                          <p className="text-foreground mt-0.5 font-medium">{value.type}</p>
                        </div>
                        <p className="text-muted-foreground shrink-0 text-[10px] uppercase font-mono bg-muted px-1.5 py-0.5">
                          {value.date}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-2 bg-primary/5 p-3 border border-primary/10">
              <Activity size={14} className="text-primary shrink-0" />
              Interactive points map direct tracking flags to your designated database profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};