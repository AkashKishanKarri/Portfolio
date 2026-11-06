import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { internships, leadership, education, achievements, certifications, skillGroups } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { TLink } from "@/components/Transition";
import { NOW, duration, span } from "@/lib/dates";
import { BadgeRail } from "@/components/Badges";
import { useLocation } from "react-router-dom";

type Kind = "work" | "community" | "education";
type Item = { id: string; kind: Kind; org: string; role: string; when: string; location?: string; score?: string; accent: string; desc?: string; details: string[]; logo?: string; start: number; end: number };

const items: Item[] = [
  ...internships.map((e) => ({ id: e.title + e.org, kind: "work" as Kind, org: e.org.split(",")[0], role: e.title, when: e.when, location: e.location, desc: e.desc, details: e.details, logo: e.logo, accent: e.accent, ...span(e.when) })),
  ...leadership.map((e) => ({ id: e.title + e.org, kind: "community" as Kind, org: e.org.split(",")[0], role: e.title, when: e.when, location: e.location, desc: e.desc, details: e.details, logo: e.logo, accent: e.accent, ...span(e.when) })),
  ...education.map((e) => ({ id: e.school, kind: "education" as Kind, org: e.school.split(",")[0], role: e.degree, score: e.score, when: e.when, location: e.school.split(", ")[1], accent: e.accent, details: [], ...span(e.when) })),
];

const KIND: Record<Kind, { label: string; bar: string; dot: string }> = {
  work: { label: "Work", bar: "bg-saffron", dot: "bg-saffron" },
  community: { label: "Community", bar: "bg-chalk", dot: "bg-chalk" },
  education: { label: "Education", bar: "bg-[#5d5a55]", dot: "bg-[#5d5a55]" },
};

const T0 = 2020.4;
const T1 = 2027.6;
const pct = (t: number) => ((t - T0) / (T1 - T0)) * 100;

function Timeline({ hover, setHover, onPick }: { hover: string | null; setHover: (id: string | null) => void; onPick: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const rows = [...items].sort((a, b) => a.start - b.start);

  useEffect(() => {
    const el = ref.current!;
    const bars = el.querySelectorAll<HTMLElement>(".gbar");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    bars.forEach((b) => (b.style.transform = "scaleX(0)"));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        animate(bars, { scaleX: [0, 1], duration: 1400, delay: stagger(90), ease: "outExpo" });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mt-14 select-none" onMouseLeave={() => setHover(null)}>
      {/* year grid */}
      <div className="absolute inset-0 left-[30%] md:left-[22%]">
        {Array.from({ length: 7 }, (_, k) => 2021 + k).map((y) => (
          <div key={y} className="absolute top-0 bottom-0 border-l border-edge" style={{ left: `${pct(y)}%` }}>
            <span className="absolute -top-7 -translate-x-1/2 label text-mute">{`'${String(y).slice(2)}`}</span>
          </div>
        ))}
        <div className="absolute top-[-14px] bottom-[-14px] w-px bg-saffron z-10" style={{ left: `${pct(NOW)}%` }}>
          <span className="absolute -bottom-6 -translate-x-1/2 label text-saffron">Now</span>
        </div>
      </div>

      <div className="relative flex flex-col gap-2">
        {rows.map((it) => {
          const k = KIND[it.kind];
          const dim = hover && hover !== it.id;
          const future = it.end > NOW;
          return (
            <div
              key={it.id}
              onMouseEnter={() => setHover(it.id)}
              onClick={() => onPick(it.id)}
              className={`grid grid-cols-[30%_1fr] md:grid-cols-[22%_1fr] items-center cursor-pointer transition-opacity duration-300 ${dim ? "opacity-25" : ""}`}
            >
              <div className="pr-4 truncate">
                <span className="font-semibold text-[14px] md:text-[15px]">{it.org}</span>
                <span className="hidden md:inline text-mute text-[13px]"> · {it.kind === "education" ? "Education" : it.role}</span>
              </div>
              <div className="relative h-8 md:h-9">
                <div
                  className={`gbar absolute top-1 bottom-1 rounded-full ${k.bar} origin-left`}
                  style={{
                    left: `${pct(it.start)}%`,
                    width: `${Math.max(1.2, pct(Math.min(it.end, NOW)) - pct(it.start))}%`,
                  }}
                />
                {future && (
                  <div
                    className="absolute top-1 bottom-1 rounded-r-full border-2 border-dashed border-[#5d5a55]"
                    style={{ left: `${pct(NOW)}%`, width: `${pct(it.end) - pct(NOW)}%` }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-6 mt-12 label text-mute">
        {(Object.keys(KIND) as Kind[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-2">
            <span className={`w-5 h-2 rounded-full ${KIND[k].dot}`} /> {KIND[k].label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Detail({ it }: { it: Item }) {
  const ref = useRef<HTMLDivElement>(null);
  const ongoing = it.end > NOW;
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(ref.current!.querySelectorAll("[data-d]"), { opacity: [0, 1], translateY: [16, 0], duration: 700, delay: stagger(50), ease: "outExpo" });
  }, [it.id]);

  return (
    <div ref={ref} className="grid md:grid-cols-[1fr_1.4fr] gap-x-16 gap-y-6 border-t border-edge pt-10 mt-2">
      <div>
        <div data-d className="label text-saffron">
          {it.when.replace(" - ", " – ")} · {ongoing ? "Ongoing" : duration(it.start, it.end)}
        </div>
        <h3 data-d className="mt-4 font-semibold semi text-4xl md:text-5xl leading-none tracking-[-0.015em]">{it.org}</h3>
        <p data-d className="mt-3 text-lg text-chalk/75">{it.role}</p>
        {it.location && <p data-d className="label text-mute mt-4">{it.location.replace(", India", "")}</p>}
        {it.score && <p data-d className="mt-6 font-serif italic text-saffron text-5xl">{it.score}</p>}
      </div>
      <div>
        {it.desc && <p data-d className="text-xl leading-relaxed text-chalk/90">{it.desc}</p>}
        <ul className="mt-6 space-y-3 text-chalk/60 leading-relaxed">
          {it.details.map((d) => (
            <li data-d key={d} className="flex gap-3">
              <span className="text-saffron">—</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Rail({ title, note, list, selected, setSelected }: { title: string; note: string; list: Item[]; selected: string; setSelected: (id: string) => void }) {
  const mine = list.some((i) => i.id === selected);
  const [last, setLast] = useState(list[list.length - 1].id);
  useEffect(() => {
    if (mine) setLast(selected);
  }, [selected]);
  const current = list.find((i) => i.id === (mine ? selected : last))!;
  return (
    <section id={`rail-${title}`} className="mt-32 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
        <h2 className="font-semibold semi text-4xl md:text-6xl tracking-[-0.015em]">{title}</h2>
        <span className="label text-mute">{note}</span>
      </div>
      <BadgeRail items={list} selected={mine ? selected : null} onPick={setSelected} />
      <Detail it={current} />
    </section>
  );
}

export default function Experience() {
  const [hover, setHover] = useState<string | null>(null);
  const jobs = items.filter((i) => i.kind !== "education").sort((a, b) => a.start - b.start);
  const schools = items.filter((i) => i.kind === "education").sort((a, b) => a.start - b.start);
  const { hash } = useLocation();
  const [selected, setSelected] = useState(() => decodeURIComponent(hash.slice(1)) || jobs[jobs.length - 1].id);
  const pick = (id: string) => {
    setSelected(id);
    const rail = items.find((i) => i.id === id)?.kind === "education" ? "Education" : "Work & community";
    document.getElementById(`rail-${rail}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => pick(decodeURIComponent(hash.slice(1))), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="px-5 md:px-10 pt-28 md:pt-36 pb-24">
      <div className="label text-mute">(Experience)</div>
      <h1 className="mt-6 font-bold semi text-[clamp(3rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.015em] max-w-[14ch]">
        Six years, <span className="font-serif italic font-normal text-saffron">at a glance.</span>
      </h1>
      <p className="mt-6 max-w-[46ch] text-chalk/70 text-lg">
        School, college, internships and community work on one timeline. Click a bar, or a badge below, for
        the full story.
      </p>

      <Timeline hover={hover} setHover={setHover} onPick={pick} />

      <Rail title="Work & community" note="Tap a badge for the story" list={jobs} selected={selected} setSelected={setSelected} />
      <Rail title="Education" note="Student IDs, oldest first" list={schools} selected={selected} setSelected={setSelected} />

      <Reveal className="mt-28 grid md:grid-cols-[1fr_2fr] gap-8">
        <h2 data-r className="font-bold semi text-3xl md:text-4xl">Recognition</h2>
        <div>
          {achievements.map((a) => (
            <div data-r key={a.title} className="border-t border-edge py-6 grid sm:grid-cols-[9rem_1fr] gap-2">
              <span className="font-serif italic text-saffron text-2xl">Winner</span>
              <span>
                <span className="block font-semibold text-xl">{a.title}</span>
                <span className="block text-chalk/65 mt-1">{a.desc}</span>
              </span>
            </div>
          ))}
          {certifications.map((c) => (
            <div data-r key={c} className="border-t border-edge py-6 grid sm:grid-cols-[9rem_1fr] gap-2 last:border-b">
              <span className="font-serif italic text-saffron text-2xl">Certified</span>
              <span className="font-semibold text-xl">{c}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-28">
        <h2 data-r className="font-bold semi text-3xl md:text-4xl mb-10">Toolkit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {skillGroups.map((g) => (
            <div data-r key={g.label}>
              <div className="label text-saffron mb-4">{g.label}</div>
              <ul className="space-y-1.5 text-lg">
                {g.items.map((s) => (
                  <li key={s} className="hover:translate-x-1.5 hover:text-saffron transition-all duration-300">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <TLink to="/contact" className="group mt-32 flex items-end justify-between gap-6 border-t border-edge pt-10">
        <span>
          <span className="label text-mute">Next</span>
          <span className="block font-bold semi text-[clamp(2.6rem,7vw,6.5rem)] leading-none mt-3 tracking-[-0.015em] group-hover:text-saffron transition-colors">
            Say hello
          </span>
        </span>
        <span className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-saffron text-night text-3xl md:text-4xl flex items-center justify-center transition-transform duration-700 ease-expo group-hover:-rotate-45">
          →
        </span>
      </TLink>
    </div>
  );
}
