import { getSqlpubApiBaseUrl } from "@/lib/sqlpub-api";

export type UserDbPlanItem = {
  planCode: string;
  displayName?: string;
  priceYear?: number | string;
  priceMonth?: number | string;
  limitSizeMb?: number;
  limitConnSize?: number;
  maxQueriesPerHour?: number;
  overagePricePerGibMonth?: number | string;
  description?: string;
};

export type UserDbPlansCatalog = {
  plans?: UserDbPlanItem[];
};

type ApiResult = {
  success?: boolean;
  data?: UserDbPlansCatalog;
};

export function findPlan(
  plans: UserDbPlanItem[] | undefined | null,
  planCode: string
): UserDbPlanItem | undefined {
  return plans?.find((p) => p.planCode === planCode);
}

export function formatStorageFromMb(limitSizeMb?: number): string {
  if (limitSizeMb == null || Number.isNaN(limitSizeMb)) {
    return "-";
  }
  if (limitSizeMb >= 1024 && limitSizeMb % 1024 === 0) {
    return `${limitSizeMb / 1024}GB`;
  }
  if (limitSizeMb % 1024 === 0) {
    return `${limitSizeMb / 1024}GB`;
  }
  const gb = limitSizeMb / 1024;
  if (gb >= 0.1) {
    const text = gb % 1 === 0 ? String(gb) : gb.toFixed(1).replace(/\.0$/, "");
    return `${text}GB`;
  }
  return `${limitSizeMb}MB`;
}

export function formatQueriesPerHour(qph?: number): string {
  if (qph == null || Number.isNaN(qph)) {
    return "-";
  }
  if (qph >= 10000 && qph % 10000 === 0) {
    return `${qph / 10000}万次请求 / 小时`;
  }
  if (qph >= 10000) {
    const wan = qph / 10000;
    const text = wan % 1 === 0 ? String(wan) : wan.toFixed(1).replace(/\.0$/, "");
    return `${text}万次请求 / 小时`;
  }
  return `${qph}次请求 / 小时`;
}

/** 文档表格用：如「3.6 万次 / 小时」 */
export function formatQueriesPerHourDocs(qph?: number): string {
  if (qph == null || Number.isNaN(qph)) {
    return "-";
  }
  if (qph >= 10000) {
    const wan = qph / 10000;
    const text = wan % 1 === 0 ? String(wan) : wan.toFixed(1).replace(/\.0$/, "");
    return `${text} 万次 / 小时`;
  }
  return `${qph} 次 / 小时`;
}

export function formatPriceYear(priceYear?: number | string): string {
  if (priceYear == null || priceYear === "") {
    return "-";
  }
  const n = Number(priceYear);
  if (Number.isNaN(n)) {
    return "-";
  }
  if (n === 0) {
    return "¥0";
  }
  return `¥${n}`;
}

/** 文档标题用：免费版「¥0 / 月」，开发版「¥9.9 / 年」 */
export function formatPlanPriceWithPeriod(
  planCode: string,
  priceYear?: number | string
): string {
  const price = formatPriceYear(priceYear);
  if (price === "-") {
    return "-";
  }
  if (planCode === "Free" || Number(priceYear) === 0) {
    return `${price} / 月`;
  }
  return `${price} / 年`;
}

export function formatOveragePrice(overage?: number | string): string {
  if (overage == null || overage === "") {
    return "-";
  }
  const n = Number(overage);
  if (Number.isNaN(n)) {
    return "-";
  }
  return `${n} 元 / GB / 月`;
}

export function formatOverageTip(overage?: number | string): string | undefined {
  if (overage == null || overage === "") {
    return undefined;
  }
  const n = Number(overage);
  if (Number.isNaN(n)) {
    return undefined;
  }
  return `超出 ${n}元/GB/月，需保持余额充足`;
}

/**
 * 拉取公开套餐目录。ISR 缓存 300 秒。
 * 失败返回 null，不做本地种子兜底。
 */
export async function fetchUserDbPlansCatalog(): Promise<UserDbPlansCatalog | null> {
  try {
    const res = await fetch(
      `${getSqlpubApiBaseUrl()}/api/pricing/user-db-plans`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) {
      return null;
    }
    const json = (await res.json()) as ApiResult;
    if (!json?.success || !json.data?.plans?.length) {
      return null;
    }
    return json.data;
  } catch (e) {
    console.error("fetchUserDbPlansCatalog failed", e);
    return null;
  }
}
