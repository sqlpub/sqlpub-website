import Link from "next/link";

import { title } from "@/components/primitives";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const posts = [
  {
    title: "SQLPub Serverless MySQL 介绍",
    date: "2025-11-22",
    description: "了解 SQLPub Serverless MySQL 的核心功能和优势。",
    slug: "introduction",
  },
  {
    title: "快速开始指南",
    date: "2025-11-22",
    description: "如何快速创建和连接数据库实例，开始使用 SQLPub。",
    slug: "getting-started",
  },
  {
    title: "数据库扩缩容实践",
    date: "2025-11-22",
    description: "学习如何根据业务负载自动扩缩 Serverless MySQL 数据库。",
    slug: "scaling",
  },
];

export default function BlogPage() {
  return (
    <div>
      <h1 className={cn(title(), "text-center")}>博客</h1>
      <div className="mt-8 flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="block p-6 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02] transform cursor-pointer">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-muted-foreground mb-2">
                {post.date}
              </p>
              <p className="text-muted-foreground">
                {post.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
