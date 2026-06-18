import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    image: "/free-plan.png",
    title: "免费计划",
    description: "永久免费额度，无需付费即可使用",
  },
  {
    image: "/billing.png",
    title: "按使用量计费",
    description: "只为使用量付费，无需包年包月",
  },
  {
    image: "/autoscale.png",
    title: "自动伸缩",
    description: "负载变化时自动扩缩容（Serverless 实例）",
  },
  {
    image: "/no-ops.png",
    title: "免运维",
    description: "无需管理数据库，由专业团队管理",
  },
  {
    image: "/auto-add-index.png",
    title: "SQL 自动优化",
    description: "索引自动添加，提高查询效率",
  },
  {
    image: "/rw-separation.png",
    title: "读写分离",
    description: "读取负载自动分配到 OLAP 实例，提高查询效率",
  },
  {
    image: "/auto-backup.png",
    title: "数据安全",
    description: "提供数据自动备份，保障数据安全（付费实例）",
  },
  {
    image: "/sql-web-client.png",
    title: "Web 在线 SQL 工具",
    description: "在线 SQL 工具，无需下载，快速查询数据，支持 AI 增强",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center gap-6 py-16 text-center md:py-24">
        {/* glow background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 h-[420px] w-[680px] max-w-full -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute inset-0 bg-grid-pattern bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          全新 AI 增强 SQL 工具已上线
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <div className="max-w-3xl">
          <h1 className="text-balance">
            <span className={cn(title({ size: "lg" }))}>免费的&nbsp;</span>
            <span className={cn(title({ color: "mysql", size: "lg" }))}>
              MySQL&nbsp;
            </span>
            <br />
            <span className={cn(title({ size: "lg" }))}>无服务器数据库平台</span>
          </h1>
          <p className={cn(subtitle({ class: "mx-auto mt-6" }))}>
            深受开发者信赖，助您快速构建可靠、可扩展的现代应用。
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" radius="full" className="shadow-glow-sm" asChild>
            <a
              href={siteConfig.links.signup}
              target="_blank"
              rel="noopener noreferrer"
            >
              免费开始
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" radius="full" asChild>
            <Link href="/contact-sales">联系我们</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className={cn(title({ size: "sm" }))}>为现代应用而生</h2>
          <p className={cn(subtitle({ class: "mx-auto mt-3" }))}>
            从开发到生产，提供你所需的一切数据库能力。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  image,
  title: cardTitle,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-glow">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-secondary/40">
        <Image
          alt={cardTitle}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          loading="lazy"
          src={image}
          unoptimized
        />
      </div>

      <div className="flex flex-col gap-1.5 px-5 py-4">
        <span className="text-base font-semibold text-foreground">
          {cardTitle}
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </span>
      </div>
    </div>
  );
}
