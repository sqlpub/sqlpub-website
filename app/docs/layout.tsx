"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

function TableOfContents({
  contentRef,
}: {
  contentRef: React.RefObject<HTMLElement>;
}) {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const extractHeadings = () => {
      const elements = Array.from(
        contentRef.current!.querySelectorAll("h1, h2, h3"),
      ) as HTMLElement[];
      const extracted = elements.map((el) => {
        if (!el.id)
          el.id = el.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
        return { id: el.id, text: el.textContent || "" };
      });
      setHeadings(extracted);
    };

    // Initial extraction on page load
    extractHeadings();

    // Observe DOM changes
    const observer = new MutationObserver(() => {
      extractHeadings();
    });

    observer.observe(contentRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [contentRef]);

  if (headings.length === 0) return null;

  return (
    <aside className="w-48 flex-shrink-0 sticky top-20 self-start hidden lg:flex">
      <nav className="flex flex-col gap-2 text-sm text-default-700">
        {headings.map((h) => (
          <a
            key={h.id}
            className="hover:text-primary text-right cursor-pointer"
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(h.id);

              if (el) {
                const rect = el.getBoundingClientRect();
                const targetY =
                  window.scrollY + rect.top - window.innerHeight / 5;

                window.scrollTo({
                  top: targetY,
                  behavior: "smooth",
                });
                history.pushState(null, "", `#${h.id}`);
              }
            }}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = {
    intro: [
      { label: "概览", slug: "overview" },
      { label: "架构", slug: "architecture" },
      /*{ label: "快速开始", slug: "getting-started" },*/
    ],
    "getting-started": [
      { label: "创建数据库", slug: "create-database" },
      { label: "连接数据库", slug: "connect-database" },
      { label: "扩展数据库", slug: "scale-database" },
    ],
    reference: [
      { label: "API文档", slug: "api" },
      { label: "使用限制", slug: "limits" },
    ],
  };

  const sectionLabels: Record<string, string> = {
    intro: "介绍",
    "getting-started": "入门指南",
    reference: "参考",
  };

  const contentRef = useRef<HTMLElement>(null);

  return (
    <div className="flex max-w-7xl mx-auto py-10 gap-8">
      {/* Left sidebar navigation */}
      <aside className="w-64 flex-shrink-0 sticky top-20 self-start">
        <nav className="flex flex-col gap-4 text-base text-default-700">
          {Object.entries(nav).map(([section, items]) => (
            <div key={section}>
              <div className="font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 mb-1">
                {sectionLabels[section]}
              </div>

              <div className="flex flex-col ml-3 gap-1">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    className="hover:text-primary font-medium text-left"
                    href={`/docs/${item.slug}`}
                    prefetch={true}
                    scroll={false}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Right sidebar anchors */}
      <div className="w-48 flex-shrink-0 order-last">
        <TableOfContents contentRef={contentRef} />
      </div>

      {/* Main content area */}
      <main ref={contentRef} className="flex-1 prose dark:prose-invert">
        {children}
      </main>
    </div>
  );
}
