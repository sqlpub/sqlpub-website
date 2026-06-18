export type DocItem = {
  label: string;
  slug: string;
};

export type DocSection = {
  title: string;
  items: DocItem[];
};

export const docsNav: DocSection[] = [
  {
    title: "介绍",
    items: [
      { label: "概览", slug: "overview" },
      { label: "架构", slug: "architecture" },
      { label: "价格方案", slug: "pricing" },
    ],
  },
  {
    title: "入门指南",
    items: [
      { label: "控制台指南", slug: "console" },
      { label: "创建数据库", slug: "create-database" },
      { label: "共享实例", slug: "user-db" },
      { label: "Serverless 实例", slug: "serverless-instance" },
      { label: "连接数据库", slug: "connect-database" },
      { label: "驱动连接教程", slug: "driver-connect" },
      { label: "Web SQL 客户端", slug: "web-client" },
      { label: "扩展数据库", slug: "scale-database" },
      { label: "备份与恢复", slug: "backup" },
    ],
  },
  {
    title: "参考",
    items: [
      { label: "API 文档", slug: "api" },
      { label: "账号与账单", slug: "account-billing" },
      { label: "使用限制", slug: "limits" },
    ],
  },
];

// Flattened list in display order, useful for prev/next navigation.
export const docsFlat: DocItem[] = docsNav.flatMap((section) => section.items);
