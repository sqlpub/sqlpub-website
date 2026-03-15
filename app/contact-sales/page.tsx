// app/contact-sales/page.tsx
"use client";

import { useState } from "react";
import { button as buttonStyles } from "@heroui/theme";

export default function ContactSales() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以调用你的后端 API 提交表单
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
        <p>我们会尽快与您取得联系。</p>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">联系我们</h1>
      <p className="mb-8 text-center text-gray-600">
        请填写下方信息，我们会尽快与您联系。
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="text"
          placeholder="公司"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <textarea
          placeholder="您的需求或问题"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          type="submit"
          className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
        >
          提交
        </button>
      </form>
    </section>
  );
}