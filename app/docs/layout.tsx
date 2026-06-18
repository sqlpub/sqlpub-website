"use client";

import { useRef } from "react";

import { DocsSidebar } from "@/components/docs/sidebar";
import { DocsMobileNav } from "@/components/docs/mobile-nav";
import { TableOfContents } from "@/components/docs/toc";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLElement>(null);

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-10 lg:px-6">
      {/* Left sidebar navigation */}
      <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 flex-shrink-0 overflow-y-auto pr-2 md:block">
        <DocsSidebar />
      </aside>

      {/* Main content area */}
      <main
        ref={contentRef}
        className="prose prose-neutral min-w-0 max-w-none flex-1 dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
      >
        <div className="not-prose">
          <DocsMobileNav />
        </div>
        {children}
      </main>

      {/* Right sidebar anchors */}
      <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 flex-shrink-0 overflow-y-auto xl:block">
        <TableOfContents contentRef={contentRef} />
      </aside>
    </div>
  );
}
