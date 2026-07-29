import { Check, Info } from "lucide-react";

import { title, subtitle } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import {
  findPlan,
  formatOverageTip,
  formatPriceYear,
  formatQueriesPerHour,
  formatStorageFromMb,
  fetchUserDbPlansCatalog,
  type UserDbPlanItem,
} from "@/lib/user-db-plans";
import { cn } from "@/lib/utils";

export const revalidate = 300;

type Feature = {
  text: string;
  tip?: string;
};

type Meter = {
  label: string;
  price: string;
  note: string;
};

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  cta: string;
  variant: "outline" | "default";
  featured?: boolean;
  meters?: Meter[];
};

const serverlessPlan: Plan = {
  name: "Serverless 版",
  price: "按量付费",
  period: "",
  description: "生产级弹性伸缩，用多少付多少",
  cta: "去体验",
  variant: "outline",
  meters: [
    {
      label: "计算费用",
      price: "0.045元 / CU / 小时",
      note: "自动伸缩按秒计费",
    },
    {
      label: "存储费用",
      price: "0.5元 / GB / 月",
      note: "按实际使用",
    },
    {
      label: "流量费用",
      price: "0.5元 / GB",
      note: "50GB 免费/月，当前免费",
    },
  ],
  features: [
    { text: "独享实例", tip: "独立 MySQL 实例，无数据库个数限制" },
    { text: "最大 3000 个连接" },
    { text: "自动扩展至 2CU", tip: "2 个 vCPU，8 GB RAM" },
    { text: "2 小时不使用自动缩放到 0" },
    { text: "私有网络 / IP 限制", tip: "后续支持" },
    { text: "99.9% SLA", tip: "服务等级协议" },
  ],
};

function buildFreePlan(plan: UserDbPlanItem): Plan {
  return {
    name: plan.displayName || "免费版",
    price: formatPriceYear(plan.priceYear),
    period: "/ 月",
    description: plan.description || "",
    cta: "开始使用",
    variant: "outline",
    features: [
      { text: "共享实例", tip: "申请获得 1 个独立 schema" },
      {
        text: `${formatStorageFromMb(plan.limitSizeMb)} 存储空间`,
        tip: "超出锁定，升级开发版自动解锁",
      },
      { text: `${plan.limitConnSize ?? "-"} 个连接` },
      { text: formatQueriesPerHour(plan.maxQueriesPerHour) },
      { text: "5G 公网流量 / 月" },
    ],
  };
}

function buildDeveloperPlan(plan: UserDbPlanItem): Plan {
  const overageTip = formatOverageTip(plan.overagePricePerGibMonth);
  return {
    name: plan.displayName || "开发版",
    price: formatPriceYear(plan.priceYear),
    period: "/ 年",
    description: plan.description || "",
    cta: "立即购买",
    variant: "default",
    featured: true,
    features: [
      { text: "共享实例", tip: "申请获得 1 个独立 schema" },
      {
        text: `${formatStorageFromMb(plan.limitSizeMb)} 存储空间`,
        tip: overageTip || "超出按量计费，需保持余额充足",
      },
      { text: `${plan.limitConnSize ?? "-"} 个连接` },
      { text: formatQueriesPerHour(plan.maxQueriesPerHour) },
      { text: "10G 公网流量", tip: "超出 0.7元/GB (当前免费)" },
      { text: "优质共享资源池", tip: "稳定性和性能优于免费版" },
      { text: "自动备份", tip: "1次 / 天，保留3个" },
    ],
  };
}

export default async function PricingPage() {
  const catalog = await fetchUserDbPlansCatalog();
  const free = findPlan(catalog?.plans, "Free");
  const developer = findPlan(catalog?.plans, "Developer");
  const sharedUnavailable = !free || !developer;

  const plans: Plan[] = [
    ...(free ? [buildFreePlan(free)] : []),
    ...(developer ? [buildDeveloperPlan(developer)] : []),
    serverlessPlan,
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          简单透明的定价
        </span>
        <h1 className={cn(title({ size: "md" }), "mt-4 block")}>
          选择适合你的
          <span className={title({ color: "green" })}> 方案</span>
        </h1>
        <p className={cn(subtitle(), "mx-auto text-center")}>
          从免费起步，随业务增长无缝升级。所有方案均支持标准 MySQL 协议。
        </p>
      </div>

      {sharedUnavailable && (
        <p className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-center text-sm text-muted-foreground">
          共享实例套餐信息暂时无法加载，请稍后刷新；Serverless 方案仍可查看。
        </p>
      )}

      <div className="mt-12 grid w-full grid-cols-1 items-start gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex h-full flex-col rounded-2xl border bg-card p-6 text-left transition-all",
              plan.featured
                ? "border-primary shadow-glow md:-mt-4 md:mb-4"
                : "border-border hover:border-primary/40"
            )}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                推荐
              </span>
            )}

            <div className="pb-6">
              <h2 className="text-lg font-semibold text-foreground">
                {plan.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-4 flex items-end gap-1">
                <span
                  className={cn(
                    "font-extrabold tracking-tight text-foreground",
                    plan.meters ? "text-2xl" : "text-4xl"
                  )}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="pb-1 text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>
            </div>

            {plan.meters && (
              <div className="mb-6 space-y-4 border-y border-border py-4">
                {plan.meters.map((meter) => (
                  <div key={meter.label}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {meter.label}
                      </span>
                      <span className="text-right text-sm font-semibold text-foreground">
                        {meter.price}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {meter.note}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <ul className="mb-8 flex-1 space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="flex items-center gap-1 text-muted-foreground">
                    {feature.text}
                    {feature.tip && (
                      <SimpleTooltip content={feature.tip}>
                        <Info className="h-3.5 w-3.5 cursor-pointer text-muted-foreground/60" />
                      </SimpleTooltip>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.variant}
              className="w-full"
              radius="lg"
              asChild
            >
              <a href={siteConfig.links.login}>{plan.cta}</a>
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        需要更高规格或企业定制方案？{" "}
        <a
          href="/contact-sales"
          className="font-medium text-primary hover:underline"
        >
          联系销售
        </a>
      </p>
    </div>
  );
}
