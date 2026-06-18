import { Check, Info } from "lucide-react";

import { title, subtitle } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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

const plans: Plan[] = [
  {
    name: "免费版",
    price: "¥0",
    period: "/ 月",
    description: "适合个人项目与学习尝鲜",
    cta: "开始使用",
    variant: "outline",
    features: [
      { text: "1 个数据库", tip: "schema" },
      { text: "0.5GB 存储空间", tip: "超出锁定，可升级到开发版" },
      { text: "30 个连接" },
      { text: "3.6万次请求 / 小时" },
      { text: "5G 公网流量 / 月" },
    ],
  },
  {
    name: "开发版",
    price: "¥9.9",
    period: "/ 年",
    description: "性价比之选，适合个人开发者长期使用",
    cta: "立即购买",
    variant: "outline",
    features: [
      { text: "1 个数据库", tip: "schema" },
      { text: "1GB 存储空间", tip: "超出 0.35元/GB/月" },
      { text: "50 个连接" },
      { text: "7.2万次请求 / 小时" },
      { text: "10G 公网流量", tip: "超出 0.7元/GB (当前免费)" },
      { text: "专属共享服务器", tip: "稳定性和性能优于免费版" },
      { text: "自动备份", tip: "1次 / 天，保留3个" },
    ],
  },
  {
    name: "Serverless 版",
    price: "¥9.9",
    period: "/ 月",
    description: "生产级弹性伸缩，按需自动扩缩容",
    cta: "去体验",
    variant: "default",
    featured: true,
    features: [
      { text: "1 个完整版实例", tip: "没有数据库个数限制" },
      { text: "5GB 存储空间", tip: "超出 0.5元/GB/月" },
      { text: "最大 3000 个连接" },
      { text: "10G 公网流量 / 月", tip: "超出 0.7元/GB (当前免费)" },
      { text: "自动扩展至 2CU", tip: "2 个 vCPU，8 GB RAM" },
      { text: "2 小时不使用自动缩放到 0" },
      { text: "私有网络 / IP 限制", tip: "后续支持" },
      { text: "99.9% SLA", tip: "服务等级协议" },
    ],
  },
];

export default function PricingPage() {
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
                <span className="text-4xl font-extrabold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="pb-1 text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>
            </div>

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
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        需要更高规格或企业定制方案？{" "}
        <a href="/contact-sales" className="font-medium text-primary hover:underline">
          联系销售
        </a>
      </p>
    </div>
  );
}
