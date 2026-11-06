import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { NOW } from "@/lib/dates";

export type BadgeItem = {
  id: string;
  org: string;
  role: string;
  when: string;
  start: number;
  end: number;
  accent: string;
  logo?: string;
  kind: "work" | "community" | "education";
};

// Barcode bars derived from a string, so every badge gets its own stable pattern.
function Barcode({ seed, className = "" }: { seed: string; className?: string }) {
  let h = 2166136261;
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; x < 120; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i % seed.length), 16777619) >>> 0;
    const w = 1 + (h % 3);
    if (i % 2 === 0) bars.push({ x, w });
    x += w + ((h >> 4) % 2);
  }
  return (
    <svg viewBox="0 0 120 20" preserveAspectRatio="none" className={className} aria-hidden>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={20} fill="currentColor" />
      ))}
    </svg>
  );
}

const fmt = (t: number) => {
  const y = Math.floor(t + 1e-6);
  const m = Math.round((t - y) * 12) + 1;
  return `${String(m).padStart(2, "0")}/${String(y).slice(2)}`;
};

export function Badge({ it, n, selected }: { it: BadgeItem; n: number; selected?: boolean }) {
  const active = it.end > NOW;
  const student = it.kind === "education";
  return (
    <div
      className={`relative w-[188px] md:w-[208px] h-[284px] md:h-[304px] rounded-[14px] bg-card text-ink overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-[outline-color] duration-300 outline outline-2 outline-offset-4 ${
        selected ? "" : "outline-transparent"
      }`}
      style={selected ? { outlineColor: it.accent } : undefined}
    >
      {/* header band */}
      <div className="relative h-[86px] px-4 pt-7 flex items-start justify-between" style={{ background: it.accent }}>
        <span className="absolute left-1/2 top-2.5 -translate-x-1/2 w-11 h-2.5 rounded-full bg-night/80" />
        {it.logo ? (
          <img src={it.logo} alt="" className="w-10 h-10 rounded-lg object-cover bg-white" />
        ) : (
          <span className="w-10 h-10 rounded-lg bg-white/95 flex items-center justify-center font-serif italic text-2xl" style={{ color: it.accent }}>
            {it.org[0]}
          </span>
        )}
        <span className="text-right text-white leading-tight">
          <span className="block font-mono text-[9px] tracking-[0.18em] opacity-80">{student ? "STUDENT ID" : it.kind === "community" ? "MEMBER ID" : "STAFF ID"}</span>
          <span className="block font-semibold text-[15px] mt-0.5 max-w-[110px] truncate">{it.org}</span>
        </span>
      </div>

      {/* body */}
      <div className="px-4 pt-4">
        <div className="flex gap-3">
          <span
            className="w-[58px] h-[70px] rounded-md shrink-0 flex items-end justify-center overflow-hidden"
            style={{ background: `linear-gradient(160deg, ${it.accent}22, ${it.accent}55)` }}
          >
            <span className="font-serif italic text-[2.6rem] leading-[0.9] -mb-1" style={{ color: it.accent }}>
              AK
            </span>
          </span>
          <span className="min-w-0 pt-0.5">
            <span className="block font-mono text-[8px] tracking-[0.16em] text-ink/50">NAME</span>
            <span className="block font-semibold text-[13px] leading-tight">Akash Kishan Karri</span>
            <span className="block font-mono text-[8px] tracking-[0.16em] text-ink/50 mt-2">{student ? "PROGRAMME" : "ROLE"}</span>
            <span className="block text-[11.5px] leading-tight line-clamp-2">{it.role}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-[9.5px] leading-tight">
          <span>
            <span className="block text-ink/50 tracking-[0.14em] text-[8px]">ISSUED</span>
            {fmt(it.start)}
          </span>
          <span>
            <span className="block text-ink/50 tracking-[0.14em] text-[8px]">VALID THRU</span>
            {fmt(it.end)}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-3.5">
        <div className="flex items-end justify-between gap-3">
          <Barcode seed={it.id} className="h-7 w-24" />
          <span className="font-mono text-[9px] text-ink/50">No. {String(n).padStart(3, "0")}</span>
        </div>
      </div>

      {active ? (
        <span
          className="absolute left-14 bottom-6 rotate-[-12deg] bg-card/70 border-2 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.18em] stamp"
          style={{ color: it.accent, borderColor: it.accent }}
        >
          ACTIVE
        </span>
      ) : null}

      {/* plastic sheen */}
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.35)_45%,transparent_55%)] mix-blend-soft-light" />
    </div>
  );
}

// Badges hanging from a rail on lanyards. Moving the pointer across them pushes them like a
// hand brushing past; each one is a damped pendulum pivoting at the rail.
export function BadgeRail({
  items,
  selected,
  onPick,
  numberFrom = 1,
}: {
  items: BadgeItem[];
  selected?: string | null;
  onPick: (id: string) => void;
  numberFrom?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const drops = el.querySelectorAll<HTMLElement>("[data-drop]");
    const swings = [...el.querySelectorAll<HTMLElement>("[data-swing]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const st = swings.map(() => ({ a: 0, v: 0 }));
    drops.forEach((d) => (d.style.transform = "translateY(-120%)"));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        animate(drops, { translateY: ["-120%", "0%"], duration: 1600, delay: stagger(110), ease: "outElastic(1, .55)" });
        // a little settle-in sway after the drop
        swings.forEach((_, i) => (st[i].v += (i % 2 ? 1 : -1) * (1.2 + Math.random())));
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    let px = -1;
    let pt = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (px >= 0 && now - pt < 100) {
        const vx = (e.clientX - px) / Math.max(8, now - pt); // px per ms
        swings.forEach((s, i) => {
          const r = s.getBoundingClientRect();
          if (e.clientY < r.top + 40 || e.clientY > r.bottom) return;
          const d = Math.abs(e.clientX - (r.left + r.width / 2));
          if (d > r.width * 0.7) return;
          // pushing lower on the card gives more leverage
          const lever = (e.clientY - r.top) / r.height;
          st[i].v += vx * 1.4 * lever * (1 - d / (r.width * 0.7));
        });
      }
      px = e.clientX;
      pt = now;
    };
    let raf = 0;
    const tick = () => {
      st.forEach((s, i) => {
        s.v += -0.035 * s.a;
        s.v *= 0.955;
        s.a = Math.max(-28, Math.min(28, s.a + s.v));
        swings[i].style.transform = `rotate(${s.a.toFixed(2)}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [items.map((i) => i.id).join()]);

  return (
    <div ref={root} className="relative overflow-x-auto overflow-y-hidden -mx-5 px-5 md:mx-0 md:px-0 pb-10" data-lenis-prevent-horizontal>
      {/* the rail */}
      <div className="absolute z-10 left-0 right-0 top-0 h-2.5 rounded-full bg-[linear-gradient(#5a5a5a,#2a2a2a)] shadow-[0_2px_0_#000]" />
      <ul className="relative flex gap-5 md:gap-8 md:justify-between w-max md:w-auto min-w-full md:px-2">
        {items.map((it, i) => {
          const strap = 54 + ((i * 37) % 4) * 18;
          const dim = selected && selected !== it.id;
          return (
            <li key={it.id} data-drop className="shrink-0">
              <button
                data-swing
                onClick={() => onPick(it.id)}
                aria-label={`${it.org}, ${it.role}`}
                aria-pressed={selected === it.id}
                className={`group block origin-top text-left transition-opacity duration-500 ${dim ? "opacity-45 hover:opacity-100" : ""}`}
              >
                {/* lanyard */}
                <span className="relative mx-auto block w-4 overflow-hidden" style={{ height: strap, background: it.accent }}>
                  <span className="absolute inset-0 [writing-mode:vertical-rl] font-mono text-[7px] tracking-[0.3em] text-white/70 leading-4 whitespace-nowrap">
                    {`${it.org.toUpperCase()} · `.repeat(8)}
                  </span>
                </span>
                {/* clip */}
                <span className="relative mx-auto -mt-0.5 block w-7 h-5 rounded-[4px] bg-[linear-gradient(#d4d4d4,#7a7a7a)] shadow-inner">
                  <span className="absolute left-1/2 top-1.5 -translate-x-1/2 w-3.5 h-1.5 rounded-sm bg-night/70" />
                </span>
                <span className={`block -mt-1 transition-transform duration-500 ease-expo ${selected === it.id ? "-translate-y-1" : "group-hover:-translate-y-1"}`}>
                  <Badge it={it} n={numberFrom + i} selected={selected === it.id} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
