import { Check } from "lucide-react";

import { title, subtitle } from "@/components/primitives";
import { cn } from "@/lib/utils";

const advantages = [
  "极速启动，无需等待实例初始化",
  "按秒计费，节约成本",
  "自动扩缩容，应对负载波动",
  "安全可靠，内置数据备份和访问控制",
];

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-l-2 border-primary/40 pl-5 md:pl-6">
      <h2 className="text-lg font-semibold text-foreground">{heading}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <h1 className={cn(title({ size: "md" }), "block")}>
          关于
          <span className={title({ color: "green" })}> SQLPub</span>
        </h1>
        <p className={cn(subtitle(), "mx-auto mt-4 text-center")}>
          SQLPub 是一个 Serverless MySQL 平台，旨在让数据库管理更加简单、高效和灵活。
        </p>
      </div>

      <div className="mt-12 w-full space-y-10">
        <Section heading="我们的使命">
          <p className="leading-relaxed text-muted-foreground">
            提供无需管理服务器的数据库服务，让开发者专注于业务而非运维。
          </p>
        </Section>

        <Section heading="核心优势">
          <ul className="grid gap-3 sm:grid-cols-2">
            {advantages.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section heading="我们的团队">
          <p className="leading-relaxed text-muted-foreground">
            我们是一支热衷于数据库技术和云计算的团队，致力于为开发者提供最优秀的
            Serverless MySQL 服务。
          </p>
        </Section>
      </div>
    </div>
  );
}
