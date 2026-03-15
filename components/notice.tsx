import { Link } from "@heroui/link";

export const Notice = () => {
  return (
    <>
      <Link
        isExternal
        className="block w-full bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 py-2 text-center text-sm font-semibold hover:opacity-80 border-b border-default-200 dark:border-default-100"
        href="https://www.aeoliancloud.com"
      >
        【赞助】【风铃云】专业的云计算服务提供商，价格便宜实惠，欢迎大家体验。{" "}
        {">"}
      </Link>
      <Link
        isExternal
        className="block w-full bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 py-2 text-center text-sm font-semibold hover:opacity-80 border-b border-default-200 dark:border-default-100"
        href="https://www.asktable.com"
      >
        【赞助】【察言观数】领先的企业级 AI 数据表格智能体平台，欢迎大家体验。{" "}
        {">"}
      </Link>
    </>
  );
};
