import { X, Check } from "lucide-react";
import { useEffect } from "react";

export type Project = {
  title: string;
  tag: string;
  description: string;
  longDescription: string;
  pillars: string[];
  features: string[];
  tech: string[];
};

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#161522]/95 p-8 shadow-[0_0_60px_-10px_rgba(0,210,255,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
        <span className="inline-block rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/10 px-3 py-1 text-xs font-medium text-[#00D2FF]">
          {project.tag}
        </span>
        <h3 className="mt-4 text-2xl font-bold text-white">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-gray-300">{project.longDescription}</p>

        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Pilares</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.pillars.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-200"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Principais Funcionalidades
          </h4>
          <ul className="mt-3 space-y-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                <Check size={18} className="mt-0.5 shrink-0 text-[#00D2FF]" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
