import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { title } from "@/components/primitives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  return (
    <div className="text-center">
      <h1 className={cn(title())}>定价</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        选择最适合您需求的 SQLPub 计划。
      </p>

      <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
        {/* 免费计划 */}
        <Card className="p-6 hover:shadow-lg transition">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl">免费版</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-3xl font-extrabold mb-4">¥0 / 月</p>
            <ul className="mb-6 space-y-2 text-muted-foreground text-left">
              <li className="flex items-center gap-1">
                1 个数据库
                <SimpleTooltip content="schema">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li className="flex items-center gap-1">
                0.5GB 存储空间
                <SimpleTooltip content="超出锁定，可升级到开发版">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li>30 个连接</li>
              <li>3.6万次请求 / 小时</li>
              <li>5G 公网流量 / 月</li>
            </ul>
            <Button className="w-full">开始使用</Button>
          </CardContent>
        </Card>

        {/* 标准计划 */}
        <Card className="p-6 hover:shadow-lg transition">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl">开发版</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-3xl font-extrabold mb-4">¥9.9 / 年</p>
            <ul className="mb-6 space-y-2 text-muted-foreground text-left">
              <li className="flex items-center gap-1">
                1 个数据库
                <SimpleTooltip content="schema">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li className="flex items-center gap-1">
                1GB 存储空间
                <SimpleTooltip content="超出 0.35元/GB/月">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li>50 个连接</li>
              <li>7.2万次请求 / 小时</li>
              <li className="flex items-center gap-1">
                10G 公网流量
                <SimpleTooltip content="超出 0.7元/GB (当前免费)">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li className="flex items-center gap-1">
                专属共享服务器
                <SimpleTooltip content="稳定性和性能优于免费版">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li className="flex items-center gap-1">
                自动备份
                <SimpleTooltip content="1次 / 天，保留3个">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
            </ul>
            <Button className="w-full">立即购买</Button>
          </CardContent>
        </Card>

        {/* 企业计划 */}
        <Card className="p-6 hover:shadow-lg transition">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl">Serverless版</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-3xl font-extrabold mb-4">¥9.9 / 月</p>
            <ul className="mb-6 space-y-2 text-muted-foreground text-left">
              <li className="flex items-center gap-1">
                1 个完整版实例
                <SimpleTooltip content="没有数据库个数限制">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li className="flex items-center gap-1">
                5GB 存储空间
                <SimpleTooltip content="超出 0.5元/GB/月">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li>最大 3000 个连接</li>
              <li className="flex items-center gap-1">
                10G 公网流量 / 月
                <SimpleTooltip content="超出 0.7元/GB (当前免费)">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li className="flex items-center gap-1">
                自动扩展至 2CU
                <SimpleTooltip content="2 个 vCPU，8 GB RAM">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li>2 小时不使用自动缩放到 0</li>
              <li className="flex items-center gap-1">
                私有网络 / IP 限制
                <SimpleTooltip content="后续支持">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
              <li className="flex items-center gap-1">
                99.9% SLA
                <SimpleTooltip content="服务等级协议">
                  <InformationCircleIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </SimpleTooltip>
              </li>
            </ul>
            <Button className="w-full">去体验</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
