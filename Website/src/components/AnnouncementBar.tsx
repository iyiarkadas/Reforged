import { X } from "lucide-react";
import { useState } from "react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-primary text-primary-foreground text-sm py-2 px-4 flex items-center justify-center relative">
      <span className="font-body tracking-wide">
        🏋️ Free Shipping on Orders Over $99 —{" "}
        <a href="#shop" className="underline font-medium hover:text-accent transition-colors">
          Shop Now
        </a>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        aria-label="Close banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
