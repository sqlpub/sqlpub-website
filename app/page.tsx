import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={cn(title())}>免费的&nbsp;</span>
        <span className={cn(title({ color: "logo" }))}>MySQL&nbsp;</span>
        <br />
        <span className={cn(title())}>无服务器数据库平台</span>
        <div className={cn(subtitle({ class: "mt-4" }))}>
          深受开发者信赖，助您快速构建可靠性、可扩展的现代应用。
        </div>
      </div>

      <div className="flex gap-3">
        <Button size="lg" radius="full" asChild>
          <a href={siteConfig.links.signup} target="_blank" rel="noopener noreferrer">
            免费开始
          </a>
        </Button>
        <Button variant="outline" size="lg" radius="full" asChild>
          <Link href="/contact-sales">
            联系我们
          </Link>
        </Button>
      </div>
      
      <div className="mt-12 flex flex-col gap-12 text-center">
        <FeatureCard
          image="/free-plan.png"
          title="免费计划"
          description="永久免费额度，无需付费即可使用"
        />
        
        <FeatureCard
          image="/billing.png"
          title="按使用量计费"
          description="只为使用量付费，无需包年包月"
        />
        
        <FeatureCard
          image="/autoscale.png"
          title="自动伸缩"
          description="负载变化时自动扩缩容（Serverless实例）"
        />
        
        <FeatureCard
          image="/no-ops.png"
          title="免运维"
          description="无需管理数据库，由专业团队管理"
        />
        
        <FeatureCard
          image="/auto-add-index.png"
          title="SQL自动优化"
          description="索引自动添加，提高查询效率"
        />
        
        <FeatureCard
          image="/rw-separation.png"
          title="读写分离"
          description="读取负载自动分配到OLAP实例，提高查询效率"
        />
        
        <FeatureCard
          image="/auto-backup.png"
          title="数据安全"
          description="提供数据自动备份，保障数据安全（付费实例）"
        />
        
        <FeatureCard
          image="/sql-web-client.png"
          title="Web在线SQL工具"
          description="在线SQL工具，无需下载，快速查询数据，支持AI增强"
        />
      </div>
    </section>
  );
}

function FeatureCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative w-full overflow-hidden">
        <Image
          priority
          alt={title}
          className="w-full h-auto object-cover max-h-[70vh] md:max-h-[420px] lg:max-h-[480px]"
          height={960}
          sizes="100vw"
          src={image}
          width={1690}
        />
      </div>

      <div className="flex w-full items-center justify-between gap-6 px-6 py-4 text-center">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold">{title}</span>
        </div>

        <div className="shrink-0 text-sm text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  );
}
