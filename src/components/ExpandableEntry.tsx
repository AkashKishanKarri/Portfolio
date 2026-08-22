import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

export default function ExpandableEntry({
  when,
  location,
  title,
  org,
  logo,
  desc,
  details,
}: {
  when: string;
  location?: string;
  title: string;
  org: string;
  logo?: string;
  desc: string;
  details: string[];
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const orgInitials = org
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    setCursor({ x: e.clientX, y: e.clientY });
  }

  return (
    <div className="border-t border-line py-7 last:border-b">
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className={`hidden md:flex fixed top-0 left-0 z-[999] w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-surface/95 backdrop-blur-sm overflow-hidden shadow-[0_6px_25px_rgba(0,0,0,0.18)] pointer-events-none transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-0"}`}
            style={{ left: cursor.x, top: cursor.y }}
          >
            {logo ? (
              <img src={logo} alt={`${org} logo`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-[12px] text-accent bg-accentDim">
                {orgInitials}
              </div>
            )}
          </div>,
          document.body
        )}

      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(false)}
        className="w-full text-left grid grid-cols-1 md:grid-cols-[150px_1fr_28px] gap-4 group"
      >
        <div className="font-mono text-[11.5px] text-muted pt-0.5">
          <div>{when}</div>
          {location && <div className="mt-1 text-[10.5px] text-muted/85">{location}</div>}
        </div>
        <div>
          <h3 className="font-semibold text-[16.5px]">{title}</h3>
          <div className="text-accent font-mono text-xs mt-1">{org}</div>
          <p className="text-muted text-[14.5px] mt-2 max-w-xl">{desc}</p>
        </div>
        <div className="hidden md:flex items-start justify-end pt-1">
          <ChevronDown
            size={18}
            className={`text-muted transition-transform duration-200 group-hover:text-accent ${open ? "rotate-180" : ""
              }`}
          />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden md:pl-[166px]">
          <ul className="text-muted text-[14px] flex flex-col gap-2.5 max-w-xl border-l-2 border-accentDim2 pl-4">
            {details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="md:hidden font-mono text-[11px] text-accent mt-3"
      >
        {open ? "− show less" : "+ read more"}
      </button>
    </div>
  );
}
