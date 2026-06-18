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
    ],
  },
  {
    title: "入门指南",
    items: [
      { label: "创建数据库", slug: "create-database" },
      { label: "连接数据库", slug: "connect-database" },
      { label: "扩展数据库", slug: "scale-database" },
    ],
  },
  {
    title: "参考",
    items: [
      { label: "API 文档", slug: "api" },
      { label: "使用限制", slug: "limits" },
    ],
  },
];

// Flattened list in display order, useful for prev/next navigation.
export const docsFlat: DocItem[] = docsNav.flatMap((section) => section.items);
