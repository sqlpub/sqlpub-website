import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { title } from "@/components/primitives";

export default function PricingPage() {
  return (
    <div className="text-center">
      <h1 className={title()}>定价</h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        选择最适合您需求的 SQLPub 计划。
      </p>

      <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
        {/* 免费计划 */}
        <Card className="p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-4">免费版</h2>
          <p className="text-3xl font-extrabold mb-4">¥0 / 月</p>
          <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              1 个数据库{" "}
              <Tooltip content="schema">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>
              0.5GB 存储空间{" "}
              <Tooltip content="超出锁定，可升级到开发版">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>30 个连接</li>
            <li>3.6万次请求 / 小时</li>
            <li>5G 公网流量 / 月</li>
          </ul>
          <Button className="w-full">开始使用</Button>
        </Card>

        {/* 标准计划 */}
        <Card className="p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-4">开发版</h2>
          <p className="text-3xl font-extrabold mb-4">¥9.9 / 年</p>
          <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              1 个数据库{" "}
              <Tooltip content="schema">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>
              1GB 存储空间{" "}
              <Tooltip content="超出 0.35元/GB/月">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>50 个连接</li>
            <li>7.2万次请求 / 小时</li>
            <li>
              10G 公网流量{" "}
              <Tooltip content="超出 0.7元/GB (当前免费)">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>
              专属共享服务器{" "}
              <Tooltip content="稳定性和性能优于免费版">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>
              自动备份{" "}
              <Tooltip content="1次 / 天，保留3个">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
          </ul>
          <Button className="w-full">立即购买</Button>
        </Card>

        {/* 企业计划 */}
        <Card className="p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-4">Serverless版</h2>
          <p className="text-3xl font-extrabold mb-4">¥9.9 / 月</p>
          <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              1 个完整版实例{" "}
              <Tooltip content="没有数据库个数限制">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>
              5GB 存储空间{" "}
              <Tooltip content="超出 0.5元/GB/月">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>最大 3000 个连接</li>
            <li>
              10G 公网流量 / 月{" "}
              <Tooltip content="超出 0.7元/GB (当前免费)">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>
              自动扩展至 2CU{" "}
              <Tooltip content="2 个 vCPU，8 GB RAM">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>2 小时不使用自动缩放到 0</li>
            <li>
              私有网络 / IP 限制{" "}
              <Tooltip content="后续支持">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
            <li>
              99.9% SLA{" "}
              <Tooltip content="服务等级协议">
                <InformationCircleIcon className="inline h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"/>
              </Tooltip>
            </li>
          </ul>
          <Button className="w-full">去体验</Button>
        </Card>
      </div>
    </div>
  );
}
