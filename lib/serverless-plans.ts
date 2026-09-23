import { getSqlpubApiBaseUrl } from "@/lib/sqlpub-api";

export type ServerlessPlanItem = {
  planCode: string;
  displayName?: string;
  pricePerCuHour?: number | string;
  pricePerGbMonth?: number | string;
  pricePerGbTraffic?: number | string;
  freeTrafficGb?: number | string;
  trafficBillingEnabled?: number;
  trialDays?: number;
  maxCu?: number | string;
  idleScaleToZeroHours?: number;
  maxConnections?: number;
  description?: string;
  enabled?: number;
};

export type ServerlessPlansCatalog = {
  defaultPlanCode?: string;
  defaultVersion?: string;
  plans?: ServerlessPlanItem[];
};

type ApiResult = {
  success?: boolean;
  data?: ServerlessPlansCatalog;
};

export function findServerlessPlan(
  plans: ServerlessPlanItem[] | undefined | null,
  planCode: string
): ServerlessPlanItem | undefined {
  return plans?.find((p) => p.planCode === planCode);
}

export function pickDefaultServerlessPlan(
  catalog: ServerlessPlansCatalog | null | undefined
): ServerlessPlanItem | undefined {
  const plans = (catalog?.plans || []).filter(
    (p) => p.enabled == null || p.enabled === 1
  );
  if (plans.length === 0) {
    return undefined;
  }
  const preferred = catalog?.defaultPlanCode
    ? findServerlessPlan(plans, catalog.defaultPlanCode)
    : undefined;
  return preferred || plans[0];
}

export function formatPlanNumber(value?: number | string, fallback = "-"): string {
  if (value == null || value === "") {
    return fallback;
  }
  const n = Number(value);
  if (Number.isNaN(n)) {
    return fallback;
  }
  return String(n);
}

export function isTrafficCurrentlyFree(plan?: ServerlessPlanItem | null): boolean {
  return !plan || plan.trafficBillingEnabled !== 1;
}

/**
 * 拉取公开 Serverless 套餐目录。ISR 缓存 300 秒。
 * 失败返回 null，不做本地种子兜底。
 */
export async function fetchServerlessPlansCatalog(): Promise<ServerlessPlansCatalog | null> {
  try {
    const res = await fetch(
      `${getSqlpubApiBaseUrl()}/api/pricing/serverless-plans`,
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
    console.error("fetchServerlessPlansCatalog failed", e);
    return null;
  }
}
