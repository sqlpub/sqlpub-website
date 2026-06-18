"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <button
        className={cn(
          "p-2 rounded-lg transition-opacity hover:opacity-80 cursor-pointer",
          className
        )}
        aria-label="Toggle theme"
      >
        <SunFilledIcon size={22} className="text-muted-foreground" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-lg transition-opacity hover:opacity-80 cursor-pointer",
        className
      )}
      aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
    >
      {resolvedTheme === "light" ? (
        <SunFilledIcon size={22} className="text-muted-foreground" />
      ) : (
        <MoonFilledIcon size={22} className="text-muted-foreground" />
      )}
    </button>
  );
};
