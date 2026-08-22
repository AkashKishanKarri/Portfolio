import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import ProgressRing from "@/components/ProgressRing";
import { GraduationCap, School, BookOpen } from "lucide-react";
import { projects, skillGroups, education } from "@/lib/data";

const eduIcons = [GraduationCap, BookOpen, School];

export default function Work() {
  return (
    <div className="wrap py-20">
      <div className="eyebrow">
        <span className="text-muted mr-1.5">02</span>Work
      </div>
      <h1 className="font-disp font-semibold text-[clamp(2rem,6vw,3.4rem)] tracking-tight max-w-2xl mb-16">
        Projects &amp; systems I&apos;ve built.
      </h1>

      <div className="flex flex-col mb-24">
        {projects.map((p, i) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>

      <div className="eyebrow">
        <span className="text-muted mr-1.5">//</span>Skills
      </div>
      <h2 className="font-disp font-semibold text-2xl mb-10">Full technical toolkit.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-24">
        {skillGroups.map((g) => (
          <Reveal key={g.label}>
            <div className="font-mono text-[11.5px] text-muted uppercase tracking-wide mb-3">{g.label}</div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="eyebrow">
        <span className="text-muted mr-1.5">//</span>Education
      </div>
      <h2 className="font-disp font-semibold text-2xl mb-10">Academic record.</h2>
      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line hidden md:block" />
        <div className="flex flex-col gap-3">
          {education.map((e, i) => {
            const Icon = eduIcons[i] ?? GraduationCap;
            return (
              <Reveal key={e.school}>
                <div className="relative flex flex-col md:flex-row gap-5 md:gap-8 border border-line bg-surface p-6 md:pl-8 hover:border-accent/40 transition-colors">
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-bg border border-line absolute -left-[1px] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                    <Icon size={16} className="text-accent" strokeWidth={1.75} />
                  </div>
                  <div className="flex items-center gap-3 md:hidden">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-accentDim shrink-0">
                      <Icon size={16} className="text-accent" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] text-accent uppercase tracking-wide">{e.level}</span>
                  </div>
                  <div className="flex-1 md:pl-6">
                    <div className="hidden md:block font-mono text-[10.5px] text-accent uppercase tracking-wide mb-1.5">
                      {e.level}
                    </div>
                    <div className="font-mono text-[11.5px] text-muted mb-1">{e.when}</div>
                    <h3 className="font-medium text-[16px] text-ink">{e.school}</h3>
                    <div className="text-muted text-sm mt-0.5">{e.degree}</div>
                  </div>
                  <div className="flex items-center justify-center md:justify-end">
                    <ProgressRing percent={e.percent} label={e.score} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
