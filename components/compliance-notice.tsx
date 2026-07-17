"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, X } from "lucide-react";

const STORAGE_KEY = "sqlpub-compliance-notice-dismissed";

export function ComplianceNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage errors
    }
  }

  if (!visible) return null;

  return (
    <section
      aria-label="合规使用提示"
      className="relative border-y border-amber-500/25 bg-amber-500/5 py-5 md:py-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 pr-12 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
        <ShieldAlert
          aria-hidden="true"
          className="mt-0.5 h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400"
        />
        <div className="space-y-1.5">
          <p className="text-base font-semibold text-foreground">
            严禁非法使用
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            SQLPub
            仅供合法合规用途。严禁利用本平台从事诈骗、传销、赌博、色情、黑客攻击、数据窃取、侵犯隐私或其他任何违法违规活动。一经发现，我们将立即封禁相关账号与资源，并依法配合监管与执法部门调查。
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="关闭提示"
        className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-amber-500/10 hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </section>
  );
}
