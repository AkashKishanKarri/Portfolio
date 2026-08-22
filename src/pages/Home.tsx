import { Link } from "react-router-dom";
import KeypointCanvas from "@/components/KeypointCanvas";
import StatCard from "@/components/StatCard";
import { stats, profile } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="relative wrap min-h-[calc(100svh-64px)] flex flex-col justify-center py-16">
        <KeypointCanvas className="absolute inset-0 z-0 opacity-55 pointer-events-none" />

        <div className="relative z-10 border border-line bg-white/90 backdrop-blur-[2px] px-6 py-12 md:px-10 md:py-14">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />

          <div className="flex justify-between items-baseline flex-wrap gap-2 font-mono text-xs text-muted mb-7">
            <span>Cooking or Cooked</span>
            <span className="text-accent">confidence 0.98</span>
          </div>

          <h1 className="font-disp font-semibold text-[clamp(2.4rem,8vw,5.6rem)] leading-[0.95] tracking-tight">
            AKASH KISHAN KARRI
          </h1>
          <div className="font-mono text-accent mt-5 text-[clamp(13px,2vw,16px)]">
            <span className="text-muted">class → </span>full-stack developer
          </div>
          <p className="max-w-xl mt-6 text-[17px] text-muted">
            CS &amp; Engineering undergrad at GITAM University. I build and ship
            full-stack systems making from React front ends, Firebase backends, and the occasional
            deep-learning pipeline when a project calls for it.
          </p>

          <div className="flex gap-4 mt-9 flex-wrap">
            <Link to="/work" className="btn btn-primary">
              View work →
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <div className="border-y border-line bg-surface">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`${i !== 0 ? "border-l border-line" : ""} ${i === 2 ? "md:border-l border-l-0" : ""
                }`}
            >
              <StatCard
                icon={s.icon}
                value={s.value}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                label={s.label}
                fill={s.fill}
              />
            </div>
          ))}
        </div>
      </div>

      <section className="py-28">
        <div className="wrap grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/work" className="border border-line bg-surface p-7 hover:border-accent transition-colors">
            <div className="font-mono text-xs text-muted mb-2">01</div>
            <div className="font-disp font-semibold text-lg mb-2">Work</div>
            <div className="text-muted text-sm">Projects, skills, and education - from FaceNet to Firebase.</div>
          </Link>
          <Link to="/experience" className="border border-line bg-surface p-7 hover:border-accent transition-colors">
            <div className="font-mono text-xs text-muted mb-2">02</div>
            <div className="font-disp font-semibold text-lg mb-2">Experience</div>
            <div className="text-muted text-sm">Accenture, CXR, DoER, Chitti, and leading MDC as Vice President.</div>
          </Link>
          <Link to="/contact" className="border border-line bg-surface p-7 hover:border-accent transition-colors">
            <div className="font-mono text-xs text-muted mb-2">03</div>
            <div className="font-disp font-semibold text-lg mb-2">Let&apos;s talk</div>
            <div className="text-muted text-sm">{profile.email}</div>
          </Link>
        </div>
      </section>
    </>
  );
}
