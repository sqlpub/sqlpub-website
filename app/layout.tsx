import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Link } from "@heroui/link";
import Image from "next/image";
import NextLink from "next/link";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Logo2 as Logo } from "@/components/icons";
import { Notice } from "@/components/notice";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            {/* 🚀 顶部公告条放这里 */}
            <Notice />
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full border-t border-default-200 dark:border-default-100 mt-8">
              <div className="container mx-auto max-w-7xl px-6 py-10 flex flex-col gap-8 md:flex-row md:justify-between">
                <div className="flex flex-col gap-3 flex-grow justify-between min-h-full">
                  <div>
                    <NextLink
                      className="flex justify-start items-center gap-1"
                      href="/"
                    >
                      <Logo />
                      <p className="font-bold text-inherit">SQLPUB</p>
                    </NextLink>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-default-500">
                    <div className="flex items-center gap-3">
                      <Link
                        isExternal
                        className="text-default-500 hover:text-primary flex items-center gap-1"
                        href="https://beian.miit.gov.cn"
                      >
                        浙ICP备2021006423号-1
                      </Link>
                      <Link
                        isExternal
                        className="text-default-500 hover:text-primary flex items-center gap-1"
                        href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602011631"
                      >
                        <Image
                          alt="beianLogo"
                          height={14}
                          src="/beian.png"
                          width={14}
                        />
                        浙公网安备 33010602011631号
                      </Link>
                    </div>
                    <div>
                      © 2021-{new Date().getFullYear()} SQLPub Team. All rights
                      reserved.
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-24 md:grid-cols-4">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">联系我们</h4>
                    <Link
                      isExternal
                      className="text-default-500 hover:text-primary"
                      href={siteConfig.links.feedback}
                    >
                      问题留言
                    </Link>
                    <Link
                      isExternal
                      className="text-default-500 hover:text-primary"
                      href={siteConfig.links.investment}
                    >
                      寻找投资
                    </Link>
                    <Link
                      isExternal
                      className="text-default-500 hover:text-primary"
                      href={siteConfig.links.sponsor}
                    >
                      赞助支持
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">常见问题</h4>
                    <Link
                      isExternal
                      className="text-default-500 hover:text-primary"
                      href={siteConfig.links.forgotPassword}
                    >
                      密码重置
                    </Link>
                    <Link
                      isExternal
                      className="text-default-500 hover:text-primary"
                      href={siteConfig.links.logoff}
                    >
                      账号注销
                    </Link>
                    <Link
                      isExternal
                      className="text-default-500 hover:text-primary"
                      href={siteConfig.links.useQuery}
                    >
                      用量查询
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">社区</h4>
                    <Link
                      isExternal
                      className="text-default-500 hover:text-primary"
                      href="https://qm.qq.com/cgi-bin/qm/qr?k=YOqds7o7SoLvDhYQ91PmNNfA2d696ZNc&jump_from=webapi&authKey=Y0pm7LgIWdc+pMg2ll6E6stKgJR3DmUtd0gup56WsqVIlouQGBuMI/XB2UZXP+lN"
                    >
                      QQ交流群
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">工具推荐</h4>
                    <Link
                      isExternal
                      className="text-default-500 hover:text-primary"
                      href="https://github.com/sqlpub/qin-cdc"
                    >
                      数据同步组件
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
