"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";

type TocClientProps = {
  sections: { id: string; title: string }[];
  publishDate?: string;
  readingTime?: string;
};

export default function TocClient({
  sections,
  publishDate,
  readingTime,
}: TocClientProps) {
  const [activeId, setActiveId] = useState<string>(sections?.[0]?.id ?? "");
  const navRef = useRef<HTMLElement | null>(null);

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    if (history.replaceState) history.replaceState(null, "", `#${id}`);
    else window.location.hash = id;

    setActiveId(id);
  };

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const nextId = (visible[0]?.target as HTMLElement | undefined)?.id;
        if (nextId) setActiveId(nextId);
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0.08, 0.15, 0.25, 0.35, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <div>
      <div className="mb-4 py-">
        <div className="flex flex-col gap-3 text-sm text-slate-700">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-[#FF5A14]" />
            Publish Date :
            </div>
            <span>{publishDate || "No publish date"}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
            <Clock className="h-4 w-4 shrink-0 text-[#FF5A14]" />
            Read Time : 
            </div>
            <span>{readingTime || "No reading time"}</span>
          </div>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-slate-900">
                  Table of contents
                </h3>

      <nav
        ref={navRef}
        className="mt-3 space-y-2 max-h-[48vh] overflow-auto pr-1 overscroll-contain"
      >
        {sections.map((s) => {
          const isActive = s.id === activeId;

          return (
            <button
              key={s.id}
              data-toc-id={s.id}
              type="button"
              onClick={() => scrollToId(s.id)}
              className={[
                "w-full text-left group flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-sm transition",
                isActive
                  ? "border-[#FF5A14]/30 bg-[#FFF4EE] text-[#0B1220]"
                  : "border-slate-200 bg-white/70 text-slate-700 hover:border-[#FF5A14]/30 hover:bg-[#FFF4EE]",
              ].join(" ")}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="flex items-center gap-2 min-w-0">
                <span
                  className={[
                    "h-5 w-[3px] rounded-full transition",
                    isActive
                      ? "bg-[#FF5A14]"
                      : "bg-slate-200 group-hover:bg-[#FF5A14]/60",
                  ].join(" ")}
                />
                <span className="line-clamp-1">{s.title}</span>
              </span>

              <span
                className={[
                  "transition",
                  isActive
                    ? "text-[#FF5A14]"
                    : "text-slate-400 group-hover:text-[#FF5A14]",
                ].join(" ")}
              >
                →
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}