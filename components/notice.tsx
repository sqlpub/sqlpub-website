"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const notices = [
  {
    id: 1,
    text: "【赞助】【风铃云】专业的云计算服务提供商，价格便宜实惠，欢迎大家体验。",
    href: "https://www.aeoliancloud.com",
  },
  {
    id: 2,
    text: "【赞助】【察言观数】领先的企业级 AI 数据表格智能体平台，欢迎大家体验。",
    href: "https://www.asktable.com",
  },
];

export const Notice = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (notices.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notices.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentNotice = notices[currentIndex];

  return (
    <div className="relative w-full overflow-hidden border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="relative flex items-center justify-center py-2.5">
        {/* Indicator dots */}
        {notices.length > 1 && (
          <div className="absolute left-4 flex items-center gap-1.5">
            {notices.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsAnimating(false);
                  }, 300);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-4 bg-primary"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`切换到通知 ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Notice content */}
        <Link
          href={currentNotice.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center gap-2 px-12 text-center text-sm font-medium transition-all duration-300 ${
            isAnimating
              ? "translate-y-2 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <span className="text-primary">
            {currentNotice.text}
          </span>
          <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Counter */}
        {notices.length > 1 && (
          <div className="absolute right-4 text-xs text-muted-foreground font-mono">
            {String(currentIndex + 1).padStart(2, "0")} / {String(notices.length).padStart(2, "0")}
          </div>
        )}
      </div>
    </div>
  );
};
