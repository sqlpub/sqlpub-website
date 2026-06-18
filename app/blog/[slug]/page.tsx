import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { blogPosts } from "@/config/blog";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);
  const morePosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article>
      <Link
        href="/blog"
        className="text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        ← 返回博客
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span className="font-medium text-primary">{post.category}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>· {post.readTime} 分钟阅读</span>
      </div>

      <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
        {post.title}
      </h1>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        <Content />
      </div>

      {morePosts.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            更多文章
          </h2>
          <ul className="mt-6 divide-y divide-border">
            {morePosts.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="group block py-5"
                >
                  <div className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                    <span className="font-medium text-primary">
                      {item.category}
                    </span>
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary"
                    )}
                  >
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;
