import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/lib/hooks";
import { stats } from "@/lib/data";

function Line({ s, run }: { s: (typeof stats)[number]; run: boolean }) {
  const v = useCountUp(s.value, run, s.decimals, 2200);
  const unit = s.prefix === "+" ? "+" : s.suffix.replace(" / 10", "");
  return (
    <div className="py-1.5">
      <div className="flex items-baseline gap-2">
        <span className="uppercase">{s.label}</span>
        <span className="flex-1 border-b border-dotted border-ink/40 translate-y-[-3px]" />
        <span className="font-bold tabular-nums">
          {v}
          {unit}
        </span>
      </div>
      <div className="text-ink/50 text-[10px]">&nbsp;&nbsp;{s.note}</div>
    </div>
  );
}

const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

// The numbers as a thermal-printer receipt that feeds out of a slot when it scrolls into view.
export default function Receipt() {
  const root = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = paper.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) el.style.transform = "translateY(-100%)";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setRun(true);
        if (reduce) return;
        // feed in short jerks, like a print head stepping down the line
        el.style.transition = "transform 2.6s steps(26)";
        el.style.transform = "translateY(0)";
      },
      { threshold: 0.35 }
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className="relative w-full max-w-[380px] mx-auto">
      {/* printer slot */}
      <div className="relative z-10 h-5 -mx-4 rounded-full bg-[linear-gradient(#2c2c2c,#111)] border border-edge shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
        <span className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-black" />
      </div>
      <div className="overflow-hidden -mt-2.5 pt-2.5">
        <div ref={paper} className="origin-top rotate-[-1deg]">
          <div className="bg-card text-ink font-mono text-[11.5px] leading-snug px-6 pt-6 pb-4 shadow-[0_40px_60px_-30px_rgba(0,0,0,0.9)]">
            <div className="text-center">
              <div className="font-bold text-sm tracking-[0.2em]">AKASH KISHAN KARRI</div>
              <div className="text-ink/60 mt-1">FULL-STACK DEV · VISAKHAPATNAM</div>
              <div className="text-ink/60">{today} · TXN #2027</div>
            </div>
            <div className="border-t border-dashed border-ink/50 my-3" />
            <div className="flex justify-between text-ink/50 text-[10px]">
              <span>ITEM</span>
              <span>QTY</span>
            </div>
            {stats.map((s) => (
              <Line key={s.label} s={s} run={run} />
            ))}
            <div className="py-1.5 flex items-baseline gap-2">
              <span>HACKATHONS WON</span>
              <span className="flex-1 border-b border-dotted border-ink/40 translate-y-[-3px]" />
              <span className="font-bold">1</span>
            </div>
            <div className="border-t border-dashed border-ink/50 my-3" />
            <div className="flex justify-between">
              <span>STATUS</span>
              <span>OPEN TO INTERNSHIPS</span>
            </div>
            <div className="flex justify-between font-bold text-[13px] mt-2 border-y-2 border-ink py-1.5">
              <span>TOTAL</span>
              <span>WORTH A CALL</span>
            </div>
            <div className="mt-4 h-10 bg-[repeating-linear-gradient(90deg,#161616_0_2px,transparent_2px_4px,#161616_4px_5px,transparent_5px_8px,#161616_8px_11px,transparent_11px_12px)]" />
            <div className="text-center text-ink/60 mt-2 tracking-[0.2em]">THANK YOU · COME AGAIN</div>
          </div>
          {/* torn edge */}
          <div className="h-2 bg-[conic-gradient(from_-45deg_at_50%_100%,#FBF8F1_90deg,transparent_0)] bg-[length:12px_8px] bg-repeat-x" />
        </div>
      </div>
    </div>
  );
}
