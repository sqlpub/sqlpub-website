"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { docsNav, docsFlat } from "@/config/docs";
import { cn } from "@/lib/utils";

export function DocsMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = docsFlat.find((item) => `/docs/${item.slug}` === pathname);

  return (
    <div className="mb-6 md:hidden">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{current?.label ?? "文档导航"}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <nav className="mt-2 flex flex-col gap-5 rounded-lg border border-border bg-card p-4">
          {docsNav.map((section) => (
            <div key={section.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const href = `/docs/${item.slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        prefetch={true}
                        className={cn(
                          "block rounded-md px-3 py-1.5 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      )}
    </div>
  );
}
