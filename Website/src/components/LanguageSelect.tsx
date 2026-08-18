import { Globe2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelect = ({ compact = false }: { compact?: boolean }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <label
      className={`flex h-9 items-center gap-1.5 border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground ${compact ? "px-2" : "px-3"}`}
      aria-label={language === "en" ? "Switch language to Turkish" : "Dili İngilizce yap"}
    >
      <Globe2 size={15} aria-hidden="true" />
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as "en" | "tr")}
        className="cursor-pointer bg-transparent font-heading text-xs uppercase text-foreground outline-none"
        aria-label={language === "en" ? "Language" : "Dil"}
      >
        <option value="en">EN</option>
        <option value="tr">TR</option>
      </select>
    </label>
  );
};

export default LanguageSelect;
