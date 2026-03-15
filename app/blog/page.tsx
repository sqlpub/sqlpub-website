import { Card } from "@heroui/card";

import BlogLayout from "./layout";

import { title } from "@/components/primitives";

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
    <BlogLayout>
      <h1 className={title()}>博客</h1>
      <div className="mt-8 flex flex-col gap-6">
        {posts.map((post) => (
          <Card
            key={post.slug}
            as="a"
            className="block p-6 rounded-xl shadow hover:shadow-lg transition hover:scale-105 transform"
            href={`/blog/${post.slug}`}
          >
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {post.date}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {post.description}
            </p>
          </Card>
        ))}
      </div>
    </BlogLayout>
  );
}
