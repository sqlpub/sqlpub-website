"use client";

import { useState } from "react";

import { title, subtitle } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ContactSales() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setError(result.message || "提交失败，请稍后重试");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("提交失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className={cn(title({ size: "sm" }), "mb-4")}>感谢您的联系！</h1>
        <p className={subtitle({ fullWidth: true })}>
          我们已收到您的信息，会尽快与您取得联系。
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className={cn(title({ size: "sm" }), "mb-4 text-center")}>联系我们</h1>
      <p className={cn(subtitle({ fullWidth: true }), "mb-8 text-center")}>
        请填写下方信息，适用于企业合作、定制方案与销售咨询。
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={submitting}
        />
        <Input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={submitting}
        />
        <Input
          type="text"
          placeholder="公司"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          disabled={submitting}
        />
        <textarea
          placeholder="您的需求或问题"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          disabled={submitting}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" radius="full" disabled={submitting}>
          {submitting ? "提交中..." : "提交"}
        </Button>
      </form>
    </section>
  );
}
