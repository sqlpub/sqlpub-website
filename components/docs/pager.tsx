import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { docsFlat } from "@/config/docs";

export function DocsPager({ slug }: { slug: string }) {
  const index = docsFlat.findIndex((item) => item.slug === slug);

  if (index === -1) return null;

  const prev = index > 0 ? docsFlat[index - 1] : null;
  const next = index < docsFlat.length - 1 ? docsFlat[index + 1] : null;

  return (
    <div className="not-prose mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex flex-col items-start gap-1 rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary/50 hover:bg-muted"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            上一篇
          </span>
          <span className="text-sm font-medium group-hover:text-primary">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border px-4 py-3 text-right transition-colors hover:border-primary/50 hover:bg-muted"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            下一篇
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-medium group-hover:text-primary">
            {next.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
