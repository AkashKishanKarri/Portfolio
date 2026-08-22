import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users, Database, UserCheck, LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  users: Users,
  database: Database,
  mentor: UserCheck,
};

export default function StatCard({
  icon,
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  fill = 80,
}: {
  icon: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  fill?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const dur = 1400;
          const start = performance.now();
          function tick(now: number) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay((value * eased).toFixed(decimals));
            setBarWidth(fill * eased);
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, decimals, fill]);

  const Icon = icons[icon] ?? Users;

  return (
    <div ref={ref} className="py-9 px-6 md:px-7">
      <div className="w-10 h-10 rounded-full bg-accentDim flex items-center justify-center mb-5">
        <Icon size={18} strokeWidth={1.75} className="text-accent" />
      </div>
      <div className="font-disp text-[clamp(1.8rem,4vw,2.4rem)] font-semibold text-ink leading-none">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="font-mono text-[11.5px] text-muted mt-2.5 mb-4 leading-snug">{label}</div>
      <div className="h-[3px] w-full bg-line rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-[width] duration-100 ease-out"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}
