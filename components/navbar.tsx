"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import NextLink from "next/link";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, Logo2 as Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <NextLink className="flex items-center gap-2.5 group" href="/">
            <Logo />
            <span className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">SQLPUB</span>
          </NextLink>

          {/* Desktop Navigation */}
          <NavigationMenuPrimitive.Root className="hidden lg:flex">
            <NavigationMenuPrimitive.List className="flex items-center gap-1">
              {siteConfig.navItems.map((item) => (
                <NavigationMenuPrimitive.Item key={item.href}>
                  <NavigationMenuPrimitive.Link asChild>
                    <NextLink
                      href={item.href}
                      className={cn(
                        "px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg transition-all duration-200",
                        "hover:text-foreground hover:bg-secondary",
                        "data-[active]:text-primary data-[active]:bg-primary/10"
                      )}
                    >
                      {item.label}
                    </NextLink>
                  </NavigationMenuPrimitive.Link>
                </NavigationMenuPrimitive.Item>
              ))}
            </NavigationMenuPrimitive.List>
          </NavigationMenuPrimitive.Root>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeSwitch />
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href={siteConfig.links.login}>登录</a>
            </Button>
            <Button size="sm" asChild>
              <a href={siteConfig.links.signup}>免费开始</a>
            </Button>
          </div>
        </div>

        {/* Mobile Right Actions */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <GithubIcon className="h-5 w-5 text-muted-foreground" />
          </a>
          <ThemeSwitch />
          
          {/* Mobile Menu Button */}
          <DialogPrimitive.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogPrimitive.Trigger asChild>
              <button
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-sm border-l border-border bg-background p-6 shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
                <div className="flex items-center justify-between">
                  <NextLink className="flex items-center gap-2" href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Logo />
                    <span className="font-bold">SQLPUB</span>
                  </NextLink>
                  <DialogPrimitive.Close asChild>
                    <button
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </DialogPrimitive.Close>
                </div>
                <nav className="mt-8 flex flex-col gap-2">
                  {siteConfig.navItems.map((item) => (
                    <NextLink
                      key={item.href}
                      href={item.href}
                      className="px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NextLink>
                  ))}
                  <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3">
                    <Button variant="outline" asChild>
                      <a href={siteConfig.links.login}>登录</a>
                    </Button>
                    <Button asChild>
                      <a href={siteConfig.links.signup}>免费开始</a>
                    </Button>
                  </div>
                </nav>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
};
