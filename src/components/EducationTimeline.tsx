import { GraduationCap, School, BookOpen } from "lucide-react";

const icons: Record<string, typeof GraduationCap> = {
  Undergraduate: GraduationCap,
  "Higher Secondary": School,
  Secondary: BookOpen,
};

export default function EducationTimeline({
  education,
}: {
  education: { when: string; school: string; degree: string; score: string; percent: number; level: string }[];
}) {
  return (
    <div className="relative pl-10 md:pl-12">
      <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px bg-line" />
      <div className="flex flex-col gap-8">
        {education.map((e) => {
          const Icon = icons[e.level] ?? GraduationCap;
          return (
            <div key={e.school} className="relative">
              <div className="absolute -left-10 md:-left-12 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface border-2 border-accent flex items-center justify-center">
                <Icon size={16} strokeWidth={1.75} className="text-accent" />
              </div>

              <div className="border border-line bg-surface p-6 md:p-7">
                <div className="flex justify-between items-start gap-4 flex-wrap mb-1">
                  <div className="font-mono text-[11px] text-muted uppercase tracking-wide">{e.level}</div>
                  <div className="font-mono text-[11.5px] text-muted">{e.when}</div>
                </div>
                <h3 className="font-disp font-semibold text-lg mt-1">{e.school}</h3>
                <div className="text-muted text-[14px] mt-1">{e.degree}</div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="font-mono text-accent text-lg font-semibold">{e.score}</div>
                  <div className="flex-1 h-[3px] bg-line rounded-full overflow-hidden max-w-[180px]">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${e.percent}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
