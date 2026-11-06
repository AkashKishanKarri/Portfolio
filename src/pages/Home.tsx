import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import VariableName from "@/components/VariableName";
import Reveal from "@/components/Reveal";
import { TLink, useGo } from "@/components/Transition";
import { projects as allProjects, previewOf, internships, leadership } from "@/lib/data";
import Scramble from "@/components/Scramble";
import { createHoverGL, type HoverGL } from "@/lib/hoverGL";

import { span } from "@/lib/dates";
import Receipt from "@/components/Receipt";
import { BadgeRail, type BadgeItem } from "@/components/Badges";

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

const statement = [
  "I'm Akash, a CS student at GITAM ('27) and Vice President of MDC.",
  "I build *things people actually use,* then stick around to *run them.*",
];

function About() {
  const ref = useRef<HTMLParagraphElement>(null);
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
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-20 items-start">
        <div>
          <div className="label text-mute mb-8">(About)</div>
          <p ref={ref} className="text-[clamp(1.7rem,3.4vw,3.1rem)] leading-[1.12] tracking-[-0.01em] font-medium">
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
          <p className="mt-10 max-w-[44ch] text-chalk/60 text-lg">
            The short version is on the receipt. Prices are negotiable, internships especially.
          </p>
        </div>
        <Receipt />
      </div>
    </section>
  );
}

// Every org as the ID badge that came with it, hanging on a rail, oldest on the left.
function ExperienceTeaser() {
  const go = useGo();
  const items: BadgeItem[] = [...internships, ...leadership]
    .map((e) => ({
      id: e.title + e.org,
      org: e.org.split(",")[0],
      role: e.title,
      when: e.when,
      accent: e.accent,
      logo: e.logo,
      kind: (leadership.includes(e as (typeof leadership)[number]) ? "community" : "work") as BadgeItem["kind"],
      ...span(e.when),
    }))
    .sort((a, b) => a.start - b.start);

  return (
    <section className="px-5 md:px-10 py-24 md:py-32 border-t border-edge overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
        <div>
          <h2 className="font-semibold semi text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.015em]">
            Where I&apos;ve <span className="font-serif italic font-normal text-saffron">been</span>
          </h2>
          <p className="mt-4 text-chalk/60">Every ID card I&apos;ve been handed so far. Give them a push.</p>
        </div>
        <TLink to="/experience" className="label hover:text-saffron">Full experience →</TLink>
      </div>
      <BadgeRail items={items} onPick={(id) => go(`/experience#${encodeURIComponent(id)}`)} />
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
