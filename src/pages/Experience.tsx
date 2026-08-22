import Reveal from "@/components/Reveal";
import ExpandableEntry from "@/components/ExpandableEntry";
import { internships, leadership, achievements, certifications } from "@/lib/data";

export default function Experience() {
  return (
    <div className="wrap py-20">
      <div className="eyebrow">
        <span className="text-muted mr-1.5">03</span>Experience
      </div>
      <h1 className="font-disp font-semibold text-[clamp(2rem,6vw,3.4rem)] tracking-tight max-w-2xl mb-4">
        Where I&apos;ve worked and led.
      </h1>
      <p className="text-muted text-[15px] max-w-lg mb-14">Click any entry for the full story.</p>

      <div className="mb-20">
        <div className="eyebrow">
          <span className="text-muted mr-1.5">//</span>Internships
        </div>
        <div className="flex flex-col">
          {internships.map((e) => (
            <Reveal key={e.title + e.org}>
              <ExpandableEntry when={e.when} location={e.location} title={e.title} org={e.org} logo={e.logo} desc={e.desc} details={e.details} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <div className="eyebrow">
          <span className="text-muted mr-1.5">//</span>Leadership
        </div>
        <div className="flex flex-col">
          {leadership.map((e) => (
            <Reveal key={e.title + e.org}>
              <ExpandableEntry when={e.when} location={e.location} title={e.title} org={e.org} logo={e.logo} desc={e.desc} details={e.details} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="eyebrow">
        <span className="text-muted mr-1.5">//</span>Achievements &amp; Certifications
      </div>
      <h2 className="font-disp font-semibold text-2xl mb-10">Recognition and credentials.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          {achievements.map((a) => (
            <Reveal key={a.title} className="border border-line bg-surface p-6 mb-4">
              <span className="font-mono text-xs text-accent block mb-2">{a.mark}</span>
              <h4 className="font-disp font-semibold text-[17px] mb-2">{a.title}</h4>
              <p className="text-muted text-sm">{a.desc}</p>
            </Reveal>
          ))}
        </div>
        <div>
          {certifications.map((c) => (
            <Reveal key={c} className="flex items-center gap-3 py-4 border-t border-line font-mono text-[13.5px] last:border-b">
              <span className="text-accent">✓</span>
              {c}
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
