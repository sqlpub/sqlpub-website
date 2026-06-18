import Link from "next/link";

import { blogPosts } from "@/config/blog";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
}

function PostItem({
  slug,
  title,
  date,
  description,
  category,
  readTime,
  featured = false,
}: {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  readTime: number;
  featured?: boolean;
}) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span className="font-medium text-primary">{category}</span>
        <time dateTime={date}>{formatDate(date)}</time>
        <span>· {readTime} 分钟阅读</span>
      </div>
      <h2
        className={cn(
          "mt-3 font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary",
          featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
        )}
      >
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {description}
      </p>
    </Link>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="flex flex-col">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          博客
        </p>
        <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
          我们在发布什么。
          <br />
          <span className="text-muted-foreground">你们在构建什么。</span>
        </h1>
      </header>

      <div className="mt-12 divide-y divide-border">
        <article className="py-10 md:py-12">
          <PostItem {...featured} featured />
        </article>

        {rest.map((post) => (
          <article key={post.slug} className="py-8 md:py-10">
            <PostItem {...post} />
          </article>
        ))}
      </div>

      <footer className="mt-4 border-t border-border pt-8 text-sm text-muted-foreground">
        想系统学习 SQLPub？{" "}
        <Link
          href="/docs/introduction"
          className="font-medium text-primary hover:underline"
        >
          查看完整文档
        </Link>
      </footer>
    </div>
  );
}
