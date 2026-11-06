import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import VariableName from "@/components/VariableName";
import Reveal from "@/components/Reveal";
import { TLink } from "@/components/Transition";
import { projects as allProjects, previewOf, stats, internships, leadership } from "@/lib/data";
import Scramble from "@/components/Scramble";
import { createHoverGL, type HoverGL } from "@/lib/hoverGL";

import { useCountUp, useInView } from "@/lib/hooks";
import { NOW, duration, span } from "@/lib/dates";

const roles = ["Full-stack developer", "Vice President at MDC", "CS at GITAM, class of '27", "Building web, ML & tools"];

// The current role rolls up into a mask every few seconds. The list ends with a copy of
// the first role so the loop can snap back to the top without a visible jump.
function RoleRoll() {
  const [i, setI] = useState(0);
  const [snap, setSnap] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => n + 1), 2800);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (i < roles.length) return;
    const t = setTimeout(() => {
      setSnap(true);
      setI(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setSnap(false)));
    }, 900);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-xs text-saffron tabular-nums">{String((i % roles.length) + 1).padStart(2, "0")}</span>
      <span className="relative block h-[1.25em] overflow-hidden text-xl md:text-2xl font-medium" aria-live="off">
        <span
          className={`block ${snap ? "" : "transition-transform duration-[900ms] ease-expo"}`}
          style={{ transform: `translateY(${-i * 1.25}em)` }}
        >
          {[...roles, roles[0]].map((r, k) => (
            <span key={k} className="block h-[1.25em] leading-[1.25em] whitespace-nowrap" aria-hidden={k % roles.length !== i % roles.length}>
              {r}
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between px-5 md:px-10 pt-24 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 label text-mute">
        <span className="whitespace-nowrap">(Namaste — I&apos;m Akash)</span>
        <span className="hidden md:block text-center">CS &amp; Engineering · GITAM · Class of 2027</span>
        <span className="text-right whitespace-nowrap">Open to internships</span>
      </div>

      <VariableName
        lines={["AKASH", "KISHAN KARRI"]}
        align={["text-[25vw] md:text-[19vw]", "text-right text-[12.6vw] md:text-[11.2vw] -mt-[0.04em]"]}
        className="uppercase leading-[0.84] tracking-[-0.01em] my-8 md:my-6 select-none"
      />

      <div className="grid md:grid-cols-3 gap-8 items-end">
        <p className="text-lg md:text-xl leading-snug max-w-[34ch]">
          I build and ship full-stack products, from web platforms to ML pipelines, and I help run a 100+ member developer community
          on the side.
        </p>
        <div className="md:justify-self-center">
          <div className="label text-mute mb-2">Currently</div>
          <RoleRoll />
        </div>
        <div className="md:justify-self-end flex flex-col items-start md:items-end gap-3">
          <span className="label text-mute hidden md:block">(Psst, hover my name)</span>
          <TLink to="/work" className="group inline-flex items-center gap-3 rounded-full border border-chalk/30 pl-6 pr-2 py-2 hover:bg-chalk hover:text-night transition-colors">
            See the work
            <span className="w-9 h-9 rounded-full bg-saffron text-night flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
          </TLink>
        </div>
      </div>
    </section>
  );
}

// Featured work as a stack of huge outlined names. Hovering one fills it, flips it like a
// split-flap and floats a WebGL screenshot after the cursor; clicking opens the case study.
function SelectedWork() {
  const featured = allProjects.filter((p) => p.featured);
  const [hover, setHover] = useState<string | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const gl = useRef<HoverGL | null>(null);

  useEffect(() => {
    if (!canvas.current || window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    gl.current = createHoverGL(canvas.current, { w: 440, h: 275 });
    return () => gl.current?.destroy();
  }, []);
  useEffect(() => {
    const p = featured.find((q) => q.slug === hover);
    gl.current?.show(p ? previewOf(p) : null);
  }, [hover]);

  return (
    <section className="px-5 md:px-10 py-24 md:py-32 border-t border-edge">
      <div className="flex justify-between label text-mute mb-10 md:mb-14">
        <span>(Selected work)</span>
        <TLink to="/work" className="hover:text-saffron">
          All {String(allProjects.length).padStart(2, "0")} projects →
        </TLink>
      </div>

      <Reveal as="ul">
        {featured.map((p, i) => (
          <li key={p.slug} data-r onMouseLeave={() => setHover(null)}>
            <TLink
              to={`/work/${p.slug}`}
              onMouseEnter={() => setHover(p.slug)}
              className="group flex items-end justify-between gap-6 py-2 md:py-1"
            >
              <span
                className={`font-black semi uppercase text-[clamp(2.6rem,8.6vw,9rem)] leading-[0.92] tracking-[-0.01em] whitespace-nowrap transition-[color,opacity,-webkit-text-stroke-color] duration-500 ${
                  hover === p.slug ? "text-saffron" : "outline-text"
                } ${hover && hover !== p.slug ? "opacity-30" : ""}`}
              >
                <Scramble text={p.short} run={hover === p.slug} />
              </span>
              <span className="hidden md:flex flex-col items-end gap-1 pb-[1.2vw] shrink-0 text-right">
                <span className="font-mono text-sm text-saffron">({String(i + 1).padStart(2, "0")})</span>
                <span className="label text-mute">
                  {p.category} · {p.year}
                </span>
              </span>
            </TLink>
          </li>
        ))}
      </Reveal>

      <canvas ref={canvas} className="hidden lg:block fixed left-0 top-0 z-[60] pointer-events-none" aria-hidden />
    </section>
  );
}

function Stat({ s, i, run }: { s: (typeof stats)[number]; i: number; run: boolean }) {
  const v = useCountUp(s.value, run, s.decimals);
  const outOf = s.suffix.includes("/ 10");
  return (
    <div data-r className="group relative flex flex-col justify-between gap-10 bg-night p-5 md:p-7 min-h-[13rem] md:min-h-[16rem]">
      <div className="flex justify-between label text-mute">
        <span className="text-saffron">{String(i + 1).padStart(2, "0")}</span>
        <span className="hidden sm:block text-right">{s.note}</span>
      </div>
      <div>
        <div className="font-semibold semi text-[clamp(3rem,6vw,5.75rem)] leading-[0.85] tracking-[-0.025em] tabular-nums">
          {s.prefix === "+" ? "" : s.prefix}
          {v}
          <span className="text-saffron">{s.prefix === "+" ? "+" : s.suffix.replace(" / 10", "")}</span>
          {outOf && <span className="text-mute text-[0.32em] ml-1.5 tracking-normal font-normal">/ 10</span>}
        </div>
        <div className="mt-4 text-chalk/70 text-[15px]">{s.label}</div>
      </div>
      <span className="absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-saffron transition-transform duration-700 ease-expo group-hover:scale-x-100" />
    </div>
  );
}

const facts = [
  ["Based in", "Visakhapatnam, India"],
  ["Studying", "B.Tech CSE, GITAM"],
  ["Leading", "MDC, 100+ members"],
  ["Status", "Open to internships"],
];

const statement = [
  "I'm Akash, a CS student at GITAM ('27) and Vice President of MDC.",
  "I build *things people actually use,* then stick around to *run them.*",
];

function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [statsRef, statsOn] = useInView<HTMLDivElement>(0.3);
  useEffect(() => {
    const el = ref.current!;
    const words = el.querySelectorAll(".w");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    words.forEach((w) => ((w as HTMLElement).style.opacity = "0.12"));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        animate(words, { opacity: [0.12, 1], duration: 600, delay: stagger(28), ease: "outQuad" });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" className="px-5 md:px-10 py-24 md:py-32 border-t border-edge">
      <div className="grid md:grid-cols-[1fr_3fr] gap-8">
        <div className="flex flex-col justify-between gap-10">
          <div className="label text-mute pt-3">(About)</div>
          <dl className="hidden md:block text-[14px]">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-t border-edge py-2.5 pr-8">
                <dt className="text-mute">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p ref={ref} className="text-[clamp(1.7rem,3.6vw,3.3rem)] leading-[1.12] tracking-[-0.015em] font-medium">
          {statement.map((line, li) => (
            // *starred* phrases are set in the italic serif
            <span key={li} className="block">
              {line.split("*").map((part, pi) =>
                part
                  .split(" ")
                  .filter(Boolean)
                  .map((w, wi) => (
                    <span key={`${pi}-${wi}`} className={`w ${pi % 2 ? "font-serif italic text-saffron font-normal" : ""}`}>
                      {w}{" "}
                    </span>
                  ))
              )}
            </span>
          ))}
        </p>
      </div>
      <div ref={statsRef}>
        <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-px bg-edge border-y border-edge mt-16 md:mt-24">
          {stats.map((s, i) => (
            <Stat key={s.label} s={s} i={i} run={statsOn} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// Each role is a bar on one shared time axis, so overlaps and the current roles read at a glance.
const AX0 = 2025;
const AX1 = 2027.5;
const ax = (t: number) => ((Math.min(Math.max(t, AX0), AX1) - AX0) / (AX1 - AX0)) * 100;

function ExperienceTeaser() {
  const rows = [...internships, ...leadership]
    .map((e) => ({ ...e, ...span(e.when) }))
    .sort((a, b) => b.start - a.start);
  const [ref, on] = useInView<HTMLUListElement>(0.2);

  return (
    <section className="px-5 md:px-10 py-24 md:py-32 border-t border-edge">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <h2 className="font-semibold semi text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.015em]">
          Where I&apos;ve <span className="font-serif italic font-normal text-saffron">been</span>
        </h2>
        <TLink to="/experience" className="label hover:text-saffron">Full experience →</TLink>
      </div>

      <div className="hidden lg:grid grid-cols-[3rem_1.1fr_1.6fr_9rem] gap-x-8 label text-mute pb-3">
        <span>No.</span>
        <span>Role</span>
        <span className="relative h-4">
          {[2025, 2026, 2027].map((y) => (
            <span key={y} className="absolute -translate-x-1/2" style={{ left: `${ax(y)}%` }}>{y}</span>
          ))}
        </span>
        <span className="text-right">Dates</span>
      </div>

      <ul ref={ref}>
        {rows.map((e, i) => {
          const ongoing = e.end > NOW;
          return (
            <li key={e.title + e.org}>
              <TLink
                to="/experience"
                className="group grid grid-cols-[2rem_1fr] lg:grid-cols-[3rem_1.1fr_1.5fr_11rem] items-center gap-x-4 lg:gap-x-8 gap-y-3 py-6 border-t border-edge"
              >
                <span className="font-mono text-xs text-mute group-hover:text-saffron transition-colors">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-4 min-w-0">
                  <img src={e.logo} alt="" className="w-10 h-10 rounded-lg object-cover bg-chalk shrink-0" />
                  <span className="min-w-0">
                    <span className="block font-semibold semi text-2xl md:text-3xl leading-none tracking-[-0.01em] transition-transform duration-500 ease-expo group-hover:translate-x-1.5">
                      {e.org.split(",")[0]}
                    </span>
                    <span className="block text-chalk/60 text-[15px] mt-1.5 truncate">{e.title}</span>
                  </span>
                </span>
                <span className="relative hidden lg:block h-2.5">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-edge" />
                  {[2026, 2027].map((y) => (
                    <span key={y} className="absolute top-0 bottom-0 w-px bg-edge" style={{ left: `${ax(y)}%` }} />
                  ))}
                  <span className="absolute -top-3 -bottom-3 w-px bg-saffron/60" style={{ left: `${ax(NOW)}%` }} />
                  <span
                    className="absolute top-0 bottom-0 rounded-full bg-chalk/80 group-hover:bg-saffron origin-left transition-[transform,background-color] duration-[1200ms] ease-expo"
                    style={{
                      left: `${ax(e.start)}%`,
                      width: `${Math.max(1.5, ax(Math.min(e.end, NOW)) - ax(e.start))}%`,
                      transform: on ? "scaleX(1)" : "scaleX(0)",
                      transitionDelay: on ? `${i * 90}ms, 0ms` : "0ms",
                    }}
                  />
                  {ongoing && (
                    <span
                      className="absolute top-0 bottom-0 rounded-r-full border border-dashed border-chalk/40"
                      style={{ left: `${ax(NOW)}%`, width: `${ax(e.end) - ax(NOW)}%` }}
                    />
                  )}
                </span>
                <span className="col-start-2 lg:col-start-auto label text-mute lg:text-right whitespace-nowrap">
                  {e.when.replace(" - ", " – ")}
                  <span className={`block mt-1 ${ongoing ? "text-saffron" : ""}`}>{ongoing ? "Ongoing" : duration(e.start, e.end)}</span>
                </span>
              </TLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function PostcardCTA() {
  return (
    <section className="px-5 md:px-10 py-24 md:py-36 border-t border-edge grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
      <div>
        <div className="label text-mute mb-6">(Say hello)</div>
        <h2 className="font-bold semi text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.92] tracking-[-0.01em]">
          Got an internship, a project, or a <span className="font-serif italic font-normal text-saffron">hard problem?</span>
        </h2>
        <TLink to="/contact" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-saffron text-night font-semibold pl-6 pr-2 py-2">
          Write me a postcard
          <span className="w-9 h-9 rounded-full bg-night text-saffron flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
        </TLink>
      </div>
      <TLink to="/contact" aria-label="Open the postcard" className="group relative block mx-auto w-full max-w-[420px] aspect-[1.55]">
        <span className="absolute inset-0 rounded-xl bg-card rotate-6 translate-x-4 translate-y-3 transition-transform duration-700 ease-expo group-hover:rotate-12 group-hover:translate-x-8" />
        <span
          className="absolute inset-0 rounded-xl overflow-hidden -rotate-3 transition-transform duration-700 ease-expo group-hover:rotate-0 group-hover:-translate-y-2 flex flex-col justify-between p-5"
          style={{ background: "repeating-conic-gradient(from 0deg at 50% 120%, #F2B544 0deg 6deg, #F6D27A 6deg 12deg)" }}
        >
          <span className="font-hand text-3xl text-ink -rotate-3">Greetings from</span>
          <span
            className="font-black wide text-[4.6rem] leading-none text-center text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(180deg,#E5432D 0 30%,#18A05E 30% 60%,#2E5BE6 60%)", WebkitTextStroke: "2px #161616" }}
          >
            VIZAG
          </span>
          <span className="label text-ink/70">Flip me →</span>
        </span>
      </TLink>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SelectedWork />
      <ExperienceTeaser />
      <PostcardCTA />
    </>
  );
}
