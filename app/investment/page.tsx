import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import type { Metadata } from "next";

import { title, subtitle } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import {
  findPlan,
  formatPriceYear,
  fetchUserDbPlansCatalog,
} from "@/lib/user-db-plans";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "寻求投资",
  description:
    "SQLPub 是面向开发者的 Serverless MySQL 平台，欢迎投资机构与战略合作伙伴与我们联系。",
};

export const revalidate = 300;

const highlights = [
  {
    label: "产品定位",
    value: "Serverless MySQL 数据库即服务",
  },
  {
    label: "目标用户",
    value: "个人开发者、初创团队、中小企业",
  },
  {
    label: "商业模式",
    value: "免费获客 + 订阅 + 按量付费",
  },
  {
    label: "核心能力",
    value: "共享实例与独享实例双模式",
  },
];

const advantages = [
  "免费版与开发版降低使用门槛，共享实例模式适合个人项目快速起步",
  "Serverless 独享实例支持按秒计费与自动伸缩，覆盖生产级场景",
  "标准 MySQL 协议兼容，开发者无需改变现有技术栈",
  "控制台、Web SQL 客户端、REST API 与 AI 助手形成完整产品闭环",
  "国内节点 + 海外节点（新加坡）布局，服务出海开发者",
];

const fundUses = [
  "基础设施扩容与多区域部署",
  "Serverless 引擎与监控体系持续研发",
  "开发者社区运营与品牌建设",
  "企业级功能（私有网络、SLA、合规）",
];

const investorFit = [
  "关注开发者工具、云数据库、Serverless 赛道",
  "认同「免费起步、按量增长」的 PLG 增长模式",
  "可提供产业资源、渠道或云服务协同",
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
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function InvestmentPage() {
  const catalog = await fetchUserDbPlansCatalog();
  const developer = findPlan(catalog?.plans, "Developer");
  const developerPriceLabel = developer
    ? `${formatPriceYear(developer.priceYear)} / 年订阅 + 存储超量`
    : "年订阅 + 存储超量（价格加载失败）";

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          开放融资洽谈
        </span>
        <h1 className={cn(title({ size: "md" }), "mt-4 block")}>
          寻求
          <span className={title({ color: "green" })}> 投资合作</span>
        </h1>
        <p className={cn(subtitle(), "mx-auto mt-4 text-center")}>
          SQLPub 致力于打造简单易用、成本可控的 Serverless MySQL 平台，欢迎投资机构与战略合作伙伴加入。
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-card px-5 py-4"
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-10">
        <Section heading="我们在做什么">
          <p className="leading-relaxed text-muted-foreground">
            SQLPub 提供从免费试用到生产部署的 MySQL 数据库服务。用户可通过控制台快速创建数据库，支持
            <strong className="text-foreground">共享实例</strong>（免费版 / 开发版）与{" "}
            <strong className="text-foreground">Serverless 独享实例</strong>（按量付费）两种模式，配套 Web
            SQL 客户端、自动备份、账单体系与 API 能力。
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            我们服务个人开发者练手与 side project，也支持长期运行的应用与需要弹性伸缩的生产业务。详见{" "}
            <Link href="/pricing" className="font-medium text-primary hover:underline">
              价格方案
            </Link>{" "}
            与{" "}
            <Link href="/docs/overview" className="font-medium text-primary hover:underline">
              产品文档
            </Link>
            。
          </p>
        </Section>

        <Section heading="市场机会">
          <p className="leading-relaxed text-muted-foreground">
            云数据库市场持续增长，开发者对「开箱即用、按量付费、免运维」的数据库需求日益强烈。Serverless
            架构降低了初创团队与个人开发者的基础设施门槛，MySQL 作为最广泛使用的关系型数据库，在
            DBaaS 赛道仍有大片蓝海，尤其在中文开发者市场。
          </p>
        </Section>

        <Section heading="核心优势">
          <ul className="space-y-3">
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

        <Section heading="商业模式">
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/40">
                <tr>
                  <th className="px-4 py-3 font-medium text-foreground">方案</th>
                  <th className="px-4 py-3 font-medium text-foreground">模式</th>
                  <th className="px-4 py-3 font-medium text-foreground">收入方式</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr>
                  <td className="px-4 py-3">免费版</td>
                  <td className="px-4 py-3">共享实例</td>
                  <td className="px-4 py-3">获客与转化漏斗</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">开发版</td>
                  <td className="px-4 py-3">共享实例</td>
                  <td className="px-4 py-3">{developerPriceLabel}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Serverless 版</td>
                  <td className="px-4 py-3">独享实例</td>
                  <td className="px-4 py-3">计算 / 存储 / 流量按量付费</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section heading="融资用途">
          <ul className="space-y-2">
            {fundUses.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section heading="期望的合作方">
          <ul className="space-y-3">
            {investorFit.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section heading="联系我们">
          <p className="leading-relaxed text-muted-foreground">
            如果您对 SQLPub 感兴趣，欢迎通过邮件与我们联系。请在邮件标题注明
            <strong className="text-foreground">「投资洽谈」</strong>
            ，并附上机构简介、投资阶段与联系方式，以便我们更快回复。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button size="lg" radius="full" asChild>
              <a href="mailto:sqlpub@foxmail.com?subject=SQLPub%20投资洽谈">
                <Mail className="mr-2 h-4 w-4" />
                sqlpub@foxmail.com
              </a>
            </Button>
            <Button variant="outline" size="lg" radius="full" asChild>
              <Link href="/contact-sales">
                企业合作咨询
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
