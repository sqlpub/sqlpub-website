import Image from "next/image";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>免费的&nbsp;</span>
        <span className={title({ color: "logo" })}>MySQL&nbsp;</span>
        <br />
        <span className={title()}>无服务器数据库平台</span>
        <div className={subtitle({ class: "mt-4" })}>
          深受开发者信赖，助您快速构建可靠性、可扩展的现代应用。
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.signup}
        >
          免费开始
        </Link>
        <Link
          // isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={"/contact-sales"}
        >
          联系我们
        </Link>
      </div>
      <div className="mt-12 flex flex-col gap-12 text-center">
        <div className="flex flex-col items-center overflow-hidden rounded-xl border border-default-200 bg-background">
          <div className="relative w-full overflow-hidden">
            <Image
              priority
              alt="免费计划"
              className="
                w-full
                h-auto
                object-cover
                max-h-[70vh]
                md:max-h-[420px]
                lg:max-h-[480px]
              "
              height={960}
              sizes="100vw"
              src="/free-plan.png"
              width={1690}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-6 px-6 py-4 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">免费计划</span>
            </div>

            <div className="shrink-0 text-sm text-default-400">
              永久免费额度，无需付费即可使用
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center overflow-hidden rounded-xl border border-default-200 bg-background">
          <div className="relative w-full overflow-hidden">
            <Image
              priority
              alt="按量计费"
              className="
                w-full
                h-auto
                object-cover
                max-h-[70vh]
                md:max-h-[420px]
                lg:max-h-[480px]
              "
              height={960}
              sizes="100vw"
              src="/billing.png"
              width={1690}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-6 px-6 py-4 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">按使用量计费</span>
            </div>

            <div className="shrink-0 text-sm text-default-400">
              只为使用量付费，无需包年包月
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center overflow-hidden rounded-xl border border-default-200 bg-background">
          <div className="relative w-full overflow-hidden">
            <Image
              priority
              alt="自动伸缩"
              className="
                w-full
                h-auto
                object-cover
                max-h-[70vh]
                md:max-h-[420px]
                lg:max-h-[480px]
              "
              height={960}
              sizes="100vw"
              src="/autoscale.png"
              width={1690}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-6 px-6 py-4 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">自动伸缩</span>
            </div>

            <div className="shrink-0 text-sm text-default-400">
              负载变化时自动扩缩容（Serverless实例）
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center overflow-hidden rounded-xl border border-default-200 bg-background">
          <div className="relative w-full overflow-hidden">
            <Image
              priority
              alt="免运维"
              className="
                w-full
                h-auto
                object-cover
                max-h-[70vh]
                md:max-h-[420px]
                lg:max-h-[480px]
              "
              height={960}
              sizes="100vw"
              src="/no-ops.png"
              width={1690}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-6 px-6 py-4 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">免运维</span>
            </div>

            <div className="shrink-0 text-sm text-default-400">
              无需管理数据库，由专业团队管理
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center overflow-hidden rounded-xl border border-default-200 bg-background">
          <div className="relative w-full overflow-hidden">
            <Image
              priority
              alt="SQL自动优化"
              className="
                w-full
                h-auto
                object-cover
                max-h-[70vh]
                md:max-h-[420px]
                lg:max-h-[480px]
              "
              height={960}
              sizes="100vw"
              src="/auto-add-index.png"
              width={1690}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-6 px-6 py-4 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">SQL自动优化</span>
            </div>

            <div className="shrink-0 text-sm text-default-400">
              索引自动添加，提高查询效率
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center overflow-hidden rounded-xl border border-default-200 bg-background">
          <div className="relative w-full overflow-hidden">
            <Image
              priority
              alt="读写分离"
              className="
                w-full
                h-auto
                object-cover
                max-h-[70vh]
                md:max-h-[420px]
                lg:max-h-[480px]
              "
              height={960}
              sizes="100vw"
              src="/rw-separation.png"
              width={1690}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-6 px-6 py-4 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">读写分离</span>
            </div>

            <div className="shrink-0 text-sm text-default-400">
              读取负载自动分配到OLAP实例，提高查询效率
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center overflow-hidden rounded-xl border border-default-200 bg-background">
          <div className="relative w-full overflow-hidden">
            <Image
              priority
              alt="数据安全"
              className="
                w-full
                h-auto
                object-cover
                max-h-[70vh]
                md:max-h-[420px]
                lg:max-h-[480px]
              "
              height={960}
              sizes="100vw"
              src="/auto-backup.png"
              width={1690}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-6 px-6 py-4 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">数据安全</span>
            </div>

            <div className="shrink-0 text-sm text-default-400">
              提供数据自动备份，保障数据安全（付费实例）
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center overflow-hidden rounded-xl border border-default-200 bg-background">
          <div className="relative w-full overflow-hidden">
            <Image
              priority
              alt="Web在线SQL工具"
              className="
                w-full
                h-auto
                object-cover
                max-h-[70vh]
                md:max-h-[420px]
                lg:max-h-[480px]
              "
              height={960}
              sizes="100vw"
              src="/sql-web-client.png"
              width={1690}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-6 px-6 py-4 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">Web在线SQL工具</span>
            </div>

            <div className="shrink-0 text-sm text-default-400">
              在线SQL工具，无需下载，快速查询数据，支持AI增强
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
