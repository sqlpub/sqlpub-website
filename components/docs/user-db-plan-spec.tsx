import {
  fetchUserDbPlansCatalog,
  findPlan,
  formatOveragePrice,
  formatPlanPriceWithPeriod,
  formatPriceYear,
  formatQueriesPerHourDocs,
  formatStorageFromMb,
  type UserDbPlanItem,
} from "@/lib/user-db-plans";

function Unavailable({ label }: { label?: string }) {
  return (
    <p className="not-prose my-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-muted-foreground">
      {label || "套餐规格暂时无法加载，请稍后刷新。"}
    </p>
  );
}

function freeStorageTip(mode: "pricing" | "limits"): string {
  return mode === "pricing"
    ? "超出后锁定，升级开发版可自动解锁"
    : "超出后锁定（可升级开发版自动解锁）";
}

function developerStorageTip(
  plan: UserDbPlanItem,
  mode: "pricing" | "limits"
): string {
  const overage = formatOveragePrice(plan.overagePricePerGibMonth);
  if (overage === "-") {
    return mode === "pricing"
      ? "超出按量计费，需保持钱包余额充足"
      : "超出按量计费，需保持余额充足";
  }
  return mode === "pricing"
    ? `超出 ${overage}，需保持钱包余额充足`
    : `超出按 ${overage} 计费，需保持余额充足`;
}

function buildRows(
  plan: UserDbPlanItem,
  mode: "pricing" | "limits"
): { label: string; value: string }[] {
  const storage = formatStorageFromMb(plan.limitSizeMb);
  const isFree = plan.planCode === "Free";
  const storageValue = isFree
    ? `${storage}（${freeStorageTip(mode)}）`
    : `${storage}（${developerStorageTip(plan, mode)}）`;

  const rows: { label: string; value: string }[] = [
    {
      label: "实例类型",
      value: isFree
        ? "共享实例"
        : mode === "pricing"
          ? "共享实例（优质资源池，稳定性与性能优于免费版）"
          : "共享实例（优质资源池）",
    },
    { label: "数据库", value: "1 个 schema" },
    { label: "存储空间", value: storageValue },
    {
      label: mode === "limits" ? "并发连接" : "连接数",
      value: `${plan.limitConnSize ?? "-"} 个`,
    },
    {
      label: "请求数",
      value: formatQueriesPerHourDocs(plan.maxQueriesPerHour),
    },
    {
      label: "公网流量",
      value: isFree
        ? "5G / 月"
        : "10G（超出 0.7 元 / GB，当前免费）",
    },
  ];

  if (!isFree) {
    rows.push({ label: "自动备份", value: "1 次 / 天，保留 3 个" });
  }

  return rows;
}

/**
 * 仅输出规格表。标题 / 导语留在 MDX，以便 rehype-slug + autolink-headings 生效。
 */
export async function UserDbPlanSpecTable({
  planCode,
  mode = "pricing",
}: {
  planCode: string;
  mode?: "pricing" | "limits";
}) {
  const catalog = await fetchUserDbPlansCatalog();
  const plan = findPlan(catalog?.plans, planCode);
  if (!plan) {
    return <Unavailable />;
  }

  const rows = buildRows(plan, mode);
  const valueHeader = mode === "limits" ? "限制" : "额度";

  return (
    <table>
      <thead>
        <tr>
          <th>项目</th>
          <th>{valueHeader}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td>{row.label}</td>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** 内联价格文案，如「¥9.9 / 年」 */
export async function UserDbPlanPriceLabel({
  planCode,
}: {
  planCode: string;
}) {
  const catalog = await fetchUserDbPlansCatalog();
  const plan = findPlan(catalog?.plans, planCode);
  if (!plan) {
    return <>价格加载失败</>;
  }
  return <>{formatPlanPriceWithPeriod(planCode, plan.priceYear)}</>;
}

/** 仅价格数字，如「¥9.9」 */
export async function UserDbPlanPrice({ planCode }: { planCode: string }) {
  const catalog = await fetchUserDbPlansCatalog();
  const plan = findPlan(catalog?.plans, planCode);
  if (!plan) {
    return <>-</>;
  }
  return <>{formatPriceYear(plan.priceYear)}</>;
}

/** 内联字段：storage / conn / qph / overage */
export async function UserDbPlanValue({
  planCode,
  field,
}: {
  planCode: string;
  field: "storage" | "conn" | "qph" | "overage";
}) {
  const catalog = await fetchUserDbPlansCatalog();
  const plan = findPlan(catalog?.plans, planCode);
  if (!plan) {
    return <>-</>;
  }
  switch (field) {
    case "storage":
      return <>{formatStorageFromMb(plan.limitSizeMb)}</>;
    case "conn":
      return <>{plan.limitConnSize ?? "-"}</>;
    case "qph":
      return <>{formatQueriesPerHourDocs(plan.maxQueriesPerHour)}</>;
    case "overage":
      return <>{formatOveragePrice(plan.overagePricePerGibMonth)}</>;
    default:
      return <>-</>;
  }
}

/** 存储超量对照表 + 说明（limits 页） */
export async function UserDbStorageOverageSection() {
  const catalog = await fetchUserDbPlansCatalog();
  const free = findPlan(catalog?.plans, "Free");
  const developer = findPlan(catalog?.plans, "Developer");
  if (!free || !developer) {
    return <Unavailable />;
  }

  const freeStorage = formatStorageFromMb(free.limitSizeMb);
  const devStorage = formatStorageFromMb(developer.limitSizeMb);
  const overage = formatOveragePrice(developer.overagePricePerGibMonth);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>方案</th>
            <th>包含额度</th>
            <th>超出后行为</th>
            <th>恢复方式</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{free.displayName || "免费版"}</td>
            <td>{freeStorage}</td>
            <td>
              数据库进入 <strong>禁用（锁定）</strong> 状态，无法写入
            </td>
            <td>
              清理数据使用量回落至额度内，或 <strong>升级至开发版</strong>{" "}
              后自动解锁
            </td>
          </tr>
          <tr>
            <td>{developer.displayName || "开发版"}</td>
            <td>{devStorage}</td>
            <td>
              超出部分按 <strong>{overage}</strong> 从钱包余额扣费
            </td>
            <td>
              保持 <strong>我的钱包</strong> 余额充足；余额不足时可能被锁定
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>免费版锁定说明：</strong>
      </p>
      <ul>
        <li>
          存储超过 {freeStorage}{" "}
          后，数据库状态变为禁用，连接与写入将受限。
        </li>
        <li>
          升级至开发版（共享实例 → <strong>升级</strong>
          ）并完成数据迁移后，系统会自动解锁，同时获得 {devStorage}{" "}
          基础额度与按量计费能力。
        </li>
        <li>
          若暂不升级，需删除或归档数据，使存储回落至 {freeStorage}{" "}
          以内后恢复使用。
        </li>
      </ul>
      <p>
        <strong>开发版按量计费说明：</strong>
      </p>
      <ul>
        <li>存储在 {devStorage} 以内不产生额外存储费用。</li>
        <li>
          超出 {devStorage} 的部分按 {overage}{" "}
          计费，从账号钱包余额中扣除。
        </li>
        <li>
          请定期在 <strong>个人中心 → 我的钱包</strong>{" "}
          充值，确保余额充足，避免因欠费导致数据库被锁定。
        </li>
        <li>可在详情页用量环图实时查看当前存储占用。</li>
      </ul>
    </>
  );
}
