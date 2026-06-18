import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Logo2 as Logo } from "@/components/icons";
import { Notice } from "@/components/notice";
import { cn } from "@/lib/utils";

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
    { media: "(prefers-color-scheme: light)", color: "#016FEE" },
    { media: "(prefers-color-scheme: dark)", color: "#016FEE" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="zh-CN">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <Notice />
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full border-t border-border mt-8">
              <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
                <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-8">
                  <div className="flex flex-col gap-6 md:max-w-xs md:justify-between">
                    <Link
                      className="flex w-fit items-center gap-1.5"
                      href="/"
                    >
                      <Logo />
                      <span className="font-bold text-inherit">SQLPUB</span>
                    </Link>
                    <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
                        <Link
                          className="w-fit text-muted-foreground hover:text-primary"
                          href="https://beian.miit.gov.cn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          浙ICP备2021006423号-1
                        </Link>
                        <Link
                          className="flex w-fit items-center gap-1 text-muted-foreground hover:text-primary"
                          href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602011631"
                          target="_blank"
                          rel="noopener noreferrer"
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
                      <p>
                        © 2021-{new Date().getFullYear()} SQLPub Team. All
                        rights reserved.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-10 md:grid-cols-4 md:gap-x-12 lg:gap-x-16">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">联系我们</h4>
                    <Link
                      className="text-muted-foreground hover:text-primary"
                      href={siteConfig.links.feedback}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      问题留言
                    </Link>
                    <Link
                      className="text-muted-foreground hover:text-primary"
                      href={siteConfig.links.investment}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      寻找投资
                    </Link>
                    <Link
                      className="text-muted-foreground hover:text-primary"
                      href={siteConfig.links.sponsor}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      赞助支持
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">常见问题</h4>
                    <Link
                      className="text-muted-foreground hover:text-primary"
                      href={siteConfig.links.forgotPassword}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      密码重置
                    </Link>
                    <Link
                      className="text-muted-foreground hover:text-primary"
                      href={siteConfig.links.logoff}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      账号注销
                    </Link>
                    <Link
                      className="text-muted-foreground hover:text-primary"
                      href={siteConfig.links.useQuery}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      用量查询
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">社区</h4>
                    <Link
                      className="text-muted-foreground hover:text-primary"
                      href="https://qm.qq.com/cgi-bin/qm/qr?k=YOqds7o7SoLvDhYQ91PmNNfA2d696ZNc&jump_from=webapi&authKey=Y0pm7LgIWdc+pMg2ll6E6stKgJR3DmUtd0gup56WsqVIlouQGBuMI/XB2UZXP+lN"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      QQ交流群
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">工具推荐</h4>
                    <Link
                      className="text-muted-foreground hover:text-primary"
                      href="https://github.com/sqlpub/qin-cdc"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      数据同步组件
                    </Link>
                  </div>
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
