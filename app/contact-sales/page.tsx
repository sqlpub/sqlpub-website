"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactSales() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("提交失败，请稍后重试");
    }
  };

  if (submitted) {
    return (
      <section className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold mb-4">感谢您的联系！</h1>
        <p className="text-muted-foreground">我们会尽快与您取得联系。</p>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">联系我们</h1>
      <p className="mb-8 text-center text-muted-foreground">
        请填写下方信息，我们会尽快与您联系。
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="公司"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <textarea
          placeholder="您的需求或问题"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button type="submit" size="lg" radius="full">
          提交
        </Button>
      </form>
    </section>
  );
}
