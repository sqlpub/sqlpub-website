"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

export function TableOfContents({
  contentRef,
}: {
  contentRef: React.RefObject<HTMLElement | null>;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = contentRef.current;

    if (!root) return;

    const extractHeadings = () => {
      const elements = Array.from(
        root.querySelectorAll("h1, h2, h3"),
      ) as HTMLElement[];

      const extracted = elements.map((el) => {
        if (!el.id)
          el.id = el.textContent?.toLowerCase().replace(/\s+/g, "-") || "";

        return {
          id: el.id,
          text: el.textContent || "",
          level: Number(el.tagName.substring(1)),
        };
      });

      setHeadings(extracted);
    };

    extractHeadings();

    const mutationObserver = new MutationObserver(extractHeadings);

    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => mutationObserver.disconnect();
  }, [contentRef]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "0% 0% -75% 0%", threshold: 1 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);

      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        本页目录
      </p>
      <nav className="flex flex-col gap-1 border-l border-border text-sm">
        {headings.map((h) => {
          const isActive = activeId === h.id;

          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={cn(
                "-ml-px border-l py-1 transition-colors",
                h.level === 3 ? "pl-6" : "pl-3",
                isActive
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);

                if (el) {
                  const rect = el.getBoundingClientRect();
                  const targetY =
                    window.scrollY + rect.top - window.innerHeight / 5;

                  window.scrollTo({ top: targetY, behavior: "smooth" });
                  history.pushState(null, "", `#${h.id}`);
                }
              }}
            >
              {h.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
