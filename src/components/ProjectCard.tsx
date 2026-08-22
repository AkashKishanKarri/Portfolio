import { useState } from "react";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import PhotoStack from "@/components/PhotoStack";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-line py-10 last:border-b px-2 -mx-2">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center">
        <PhotoStack photos={project.photos} alt={project.title} />
        <div>
          <div className="font-mono text-[13px] text-muted mb-2">{String(index + 1).padStart(2, "0")}</div>
          <h3 className="font-disp font-semibold text-xl mb-3">{project.title}</h3>
          <ul className="text-muted text-[14.5px] flex flex-col gap-2 max-w-xl list-disc pl-5 mb-4">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] border border-ink px-3.5 py-2 hover:bg-ink hover:text-bg transition-colors"
              >
                <ExternalLink size={13} />
                View link
              </a>
            )}
            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] border border-line px-3.5 py-2 text-muted hover:border-accent hover:text-accent transition-colors"
              >
                <FileText size={13} />
                Documentation
              </a>
            )}
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 font-mono text-[12px] text-accent"
          >
            {open ? "− show less" : "+ the full story"}
            <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          <div
            className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
              }`}
          >
            <div className="overflow-hidden">
              <p className="text-muted text-[14px] max-w-xl border-l-2 border-accentDim2 pl-4 leading-relaxed">
                {project.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
