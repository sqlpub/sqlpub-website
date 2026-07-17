export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  readTime: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "system-status-page",
    title: "SQLPub 系统状态页上线：透明展示各服务可用性",
    date: "2026-07-11",
    description:
      "status.sqlpub.com 正式上线，公开控制台、API、数据库等核心组件状态，控制台顶部同步显示状态徽章。",
    category: "产品",
    readTime: 5,
  },
  {
    slug: "api-key-permissions",
    title: "API Key 权限控制上线：按需授予查询与执行权限",
    date: "2026-06-12",
    description:
      "为每个应用创建独立 API Key，精确控制只读查询或读写执行权限，降低密钥泄露风险。",
    category: "产品",
    readTime: 4,
  },
  {
    slug: "developer-overseas-node",
    title: "开发版支持新加坡海外节点",
    date: "2026-06-10",
    description:
      "开发版共享实例新增新加坡节点，帮助出海开发者降低跨境访问延迟。",
    category: "产品",
    readTime: 3,
  },
  {
    slug: "serverless-billing-dashboard",
    title: "Serverless 账单体系上线：日账单、小时明细与试用不计费",
    date: "2026-06-02",
    description:
      "控制台新增 Serverless 日账单与小时明细，试用期内不计费，每一笔费用可追踪可核对。",
    category: "产品",
    readTime: 5,
  },
  {
    slug: "serverless-payg-launch",
    title: "Serverless 按量付费正式发布",
    date: "2026-06-01",
    description:
      "Serverless 独享实例全面开放按量付费，新用户享 7 天免费试用，用多少付多少。",
    category: "产品",
    readTime: 5,
  },
  {
    slug: "ask-ai-copilot",
    title: "控制台全新 Ask AI 智能助手",
    date: "2026-04-25",
    description:
      "SQLPub 控制台上线全新 Copilot，随时解答产品问题、辅助 SQL 编写与故障排查。",
    category: "产品",
    readTime: 3,
  },
];
