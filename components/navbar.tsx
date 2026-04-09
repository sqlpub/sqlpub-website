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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-14 items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <NextLink className="flex items-center gap-2" href="/">
            <Logo />
            <span className="font-bold text-inherit">SQLPUB</span>
          </NextLink>

          {/* Desktop Navigation */}
          <NavigationMenuPrimitive.Root className="hidden lg:flex">
            <NavigationMenuPrimitive.List className="flex items-center gap-6">
              {siteConfig.navItems.map((item) => (
                <NavigationMenuPrimitive.Item key={item.href}>
                  <NavigationMenuPrimitive.Link asChild>
                    <NextLink
                      href={item.href}
                      className={cn(
                        "text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80",
                        "data-[active]:text-foreground data-[active]:font-semibold"
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
        <div className="hidden sm:flex items-center gap-4">
          <ThemeSwitch />
          <div className="hidden md:flex items-center gap-2">
            <Button variant="flat" size="sm" asChild>
              <a href={siteConfig.links.login}>登 录</a>
            </Button>
            <Button size="sm" asChild>
              <a href={siteConfig.links.signup}>注 册</a>
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
          >
            <GithubIcon className="h-5 w-5 text-muted-foreground" />
          </a>
          <ThemeSwitch />
          
          {/* Mobile Menu Button */}
          <DialogPrimitive.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogPrimitive.Trigger asChild>
              <button
                className="p-2 hover:bg-accent rounded-md"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-sm border-l bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
                <div className="flex items-center justify-between">
                  <NextLink className="flex items-center gap-2" href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Logo />
                    <span className="font-bold">SQLPUB</span>
                  </NextLink>
                  <DialogPrimitive.Close asChild>
                    <button
                      className="p-2 hover:bg-accent rounded-md"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </DialogPrimitive.Close>
                </div>
                <nav className="mt-8 flex flex-col gap-4">
                  {siteConfig.navItems.map((item) => (
                    <NextLink
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NextLink>
                  ))}
                  <div className="mt-4 flex flex-col gap-2">
                    <Button variant="outline" asChild>
                      <a href={siteConfig.links.login}>登 录</a>
                    </Button>
                    <Button asChild>
                      <a href={siteConfig.links.signup}>注 册</a>
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
