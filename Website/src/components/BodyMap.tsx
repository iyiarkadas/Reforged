import React, { useState } from "react";
import { X, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

// Type definitions ensuring type-safety with external state updates
interface Injury {
  type: string;
  date: string;
}

interface InjuryMap {
  [key: string]: Injury;
}

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

// Comprehensive ergonomic path maps aligned with a viewBox="10 10 60 92"
const bodyParts: BodyPart[] = [
  { id: "head", label: "Head / Cranium", svgPath: "M36,16 C36,13 38,11 40,11 C42,11 44,13 44,16 C44,19 42,21 40,21 C38,21 36,19 36,16 Z" },
  { id: "neck", label: "Neck / Cervical", svgPath: "M38,21 L42,21 L42,23 L38,23 Z" },
  { id: "torso", label: "Torso / Core", svgPath: "M32,23 L48,23 L46,42 L34,42 Z" },
  { id: "left_shoulder", label: "Left Shoulder", svgPath: "M24,23 C26,21 31,23 32,24 L30,29 L23,26 Z" },
  { id: "right_shoulder", label: "Right Shoulder", svgPath: "M56,23 C54,21 49,23 48,24 L50,29 L57,26 Z" },
  { id: "left_arm", label: "Left Upper Arm", svgPath: "M23,26 L19,35 L23,37 L26,30 Z" },
  { id: "left_elbow", label: "Left Elbow", svgPath: "M19,35 L18,38 L22,40 L23,37 Z" },
  { id: "left_forearm", label: "Left Forearm", svgPath: "M18,38 L16,45 L20,46 L22,40 Z" },
  { id: "left_hand", label: "Left Hand", svgPath: "M16,45 L14,48 L18,49 L20,46 Z" },
  { id: "right_arm", label: "Right Upper Arm", svgPath: "M57,26 L61,35 L57,37 L54,30 Z" },
  { id: "right_elbow", label: "Right Elbow", svgPath: "M61,35 L62,38 L58,40 L57,37 Z" },
  { id: "right_forearm", label: "Right Forearm", svgPath: "M62,38 L64,45 L60,46 L58,40 Z" },
  { id: "right_hand", label: "Right Hand", svgPath: "M64,45 L66,48 L62,49 L60,46 Z" },
  { id: "hips", label: "Hips / Pelvis", svgPath: "M34,42 L46,42 L48,50 L32,50 Z" },
  { id: "left_upper_leg", label: "Left Upper Leg", svgPath: "M32,50 L40,50 L38,68 L31,68 Z" },
  { id: "right_upper_leg", label: "Right Upper Leg", svgPath: "M40,50 L48,50 L49,68 L42,68 Z" },
  { id: "left_knee", label: "Left Knee", svgPath: "M31,68 L38,68 L38,74 L31,74 Z" },
  { id: "right_knee", label: "Right Knee", svgPath: "M42,68 L49,68 L49,74 L42,74 Z" },
  { id: "left_lower_leg", label: "Left Lower Leg", svgPath: "M31,74 L38,74 L36,91 L32,91 Z" },
  { id: "right_lower_leg", label: "Right Lower Leg", svgPath: "M42,74 L49,74 L48,91 L44,91 Z" },
  { id: "left_ankle", label: "Left Ankle", svgPath: "M32,91 L36,91 L36,94 L32,94 Z" },
  { id: "right_ankle", label: "Right Ankle", svgPath: "M44,91 L48,91 L48,94 L44,94 Z" },
  { id: "left_foot", label: "Left Foot", svgPath: "M32,94 L36,94 L38,99 L29,99 Z" },
  { id: "right_foot", label: "Right Foot", svgPath: "M44,94 L48,94 L51,99 L42,99 Z" },
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
      setDate(new Date().toISOString().split("T")[0]);
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
      <div className="flex flex-col items-center justify-center border border-border bg-card/40 p-4 rounded-xl">
        <p className="mb-4 font-heading text-xs uppercase tracking-widest text-muted-foreground">
          Interactive Anatomy Picker
        </p>
        <svg
          viewBox="10 10 60 92"
          className="h-[440px] w-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]"
        >
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
                strokeWidth="0.75"
                onClick={() => handlePartClick(part)}
              >
                <title>{part.label}</title>
              </path>
            );
          })}
        </svg>
      </div>

      {/* Entry Modal / Detail Monitor side pane */}
      <div className="flex flex-col justify-between border border-border bg-card p-5 rounded-xl">
        {selectedPart ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="font-heading text-lg uppercase text-primary font-bold">
                Configuring: {selectedPart.label}
              </h3>
              <button 
                type="button" 
                onClick={() => setSelectedPart(null)} 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="block mb-1 font-heading text-xs uppercase tracking-wider text-muted-foreground">
                Injury Diagnosis / Notes
              </label>
              <input
                type="text"
                className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary rounded-md"
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
                className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary rounded-md"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" variant="default" className="w-full">
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
              <h3 className="font-heading text-lg uppercase border-b border-border pb-2 mb-4 font-bold">
                Active Medical Log
              </h3>
              {Object.keys(injuries).length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  No tracking restrictions logged. Select anatomy segment to flag localized trauma.
                </p>
              ) : (
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                  {Object.entries(injuries).map(([key, value]) => {
                    const label = bodyParts.find((p) => p.id === key)?.label || key;
                    return (
                      <div key={key} className="flex items-start justify-between border border-border/60 bg-background/50 p-2.5 text-xs rounded-lg">
                        <div>
                          <p className="font-heading uppercase text-primary font-bold">{label}</p>
                          <p className="text-foreground mt-0.5 font-medium">{value.type}</p>
                        </div>
                        <p className="text-muted-foreground shrink-0 text-[10px] uppercase font-mono bg-muted px-1.5 py-0.5 rounded">
                          {value.date}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-2 bg-primary/5 p-3 border border-primary/10 rounded-lg">
              <Activity size={14} className="text-primary shrink-0" />
              Interactive points map direct tracking flags to your designated database profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};