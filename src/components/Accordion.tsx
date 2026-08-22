import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({
  header,
  children,
  defaultOpen = false,
}: {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-start justify-between gap-4 group"
        aria-expanded={open}
      >
        <div className="flex-1">{header}</div>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-muted shrink-0 mt-1 transition-transform duration-300 group-hover:text-accent ${
            open ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
