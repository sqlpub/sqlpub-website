import { title } from "@/components/primitives";
import AboutLayout from "./layout";

export default function AboutPage() {
  return (
    <AboutLayout>
      <h1 className={title()}>关于 SQLPub</h1>
      <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
        SQLPub 是一个 Serverless MySQL 平台，旨在让数据库管理更加简单、高效和灵活。
      </p>

      <section className="mt-8 text-left space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">我们的使命</h2>
          <p className="text-gray-600 dark:text-gray-400">
            提供无需管理服务器的数据库服务，让开发者专注于业务而非运维。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">核心优势</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>极速启动，无需等待实例初始化</li>
            <li>按秒计费，节约成本</li>
            <li>自动扩缩容，应对负载波动</li>
            <li>安全可靠，内置数据备份和访问控制</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">我们的团队</h2>
          <p className="text-gray-600 dark:text-gray-400">
            我们是一支热衷于数据库技术和云计算的团队，致力于为开发者提供最优秀的 Serverless MySQL 服务。
          </p>
        </div>
      </section>
    </AboutLayout>
  );
}
