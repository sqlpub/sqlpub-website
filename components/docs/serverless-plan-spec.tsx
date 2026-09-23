import {
  fetchServerlessPlansCatalog,
  formatPlanNumber,
  isTrafficCurrentlyFree,
  pickDefaultServerlessPlan,
  type ServerlessPlanItem,
} from "@/lib/serverless-plans";

function Unavailable({ label }: { label?: string }) {
  return (
    <p className="not-prose my-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-muted-foreground">
      {label || "Serverless 套餐规格暂时无法加载，请稍后刷新。"}
    </p>
  );
}

function trafficNote(plan: ServerlessPlanItem): string {
  const free = formatPlanNumber(plan.freeTrafficGb);
  const price = formatPlanNumber(plan.pricePerGbTraffic);
  if (free === "-" || price === "-") {
    return "-";
  }
  if (isTrafficCurrentlyFree(plan)) {
    return `${free}GB 免费 / 月，当前免费（单价 ${price} 元 / GB）`;
  }
  return `${free}GB 免费 / 月，超出 ${price} 元 / GB`;
}

export async function ServerlessPlanMeters() {
  const catalog = await fetchServerlessPlansCatalog();
  const plan = pickDefaultServerlessPlan(catalog);
  if (!plan) {
    return <Unavailable />;
  }

  const cu = formatPlanNumber(plan.pricePerCuHour);
  const storage = formatPlanNumber(plan.pricePerGbMonth);
  const traffic = formatPlanNumber(plan.pricePerGbTraffic);
  if ([cu, storage, traffic].includes("-")) {
    return <Unavailable />;
  }

  const rows = [
    {
      label: "计算费用",
      value: `${cu} 元 / CU / 小时`,
      note: "自动伸缩，按秒计费",
    },
    {
      label: "存储费用",
      value: `${storage} 元 / GB / 月`,
      note: "按实际使用",
    },
    {
      label: "流量费用",
      value: `${traffic} 元 / GB`,
      note: trafficNote(plan),
    },
  ];

  return (
    <div className="not-prose my-4 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left">
            <th className="px-4 py-2 font-medium">项目</th>
            <th className="px-4 py-2 font-medium">价格</th>
            <th className="px-4 py-2 font-medium">说明</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b last:border-0">
              <td className="px-4 py-2">{row.label}</td>
              <td className="px-4 py-2">{row.value}</td>
              <td className="px-4 py-2 text-muted-foreground">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function ServerlessPlanValue({
  field,
}: {
  field: "cuPrice" | "storagePrice" | "trafficPrice" | "freeTraffic" | "trialDays" | "maxCu";
}) {
  const catalog = await fetchServerlessPlansCatalog();
  const plan = pickDefaultServerlessPlan(catalog);
  if (!plan) {
    return <>-</>;
  }
  switch (field) {
    case "cuPrice": {
      const v = formatPlanNumber(plan.pricePerCuHour);
      return v === "-" ? <>-</> : <>{v} 元 / CU / 小时</>;
    }
    case "storagePrice": {
      const v = formatPlanNumber(plan.pricePerGbMonth);
      return v === "-" ? <>-</> : <>{v} 元 / GB / 月</>;
    }
    case "trafficPrice": {
      const v = formatPlanNumber(plan.pricePerGbTraffic);
      return v === "-" ? <>-</> : <>{v} 元 / GB</>;
    }
    case "freeTraffic": {
      const v = formatPlanNumber(plan.freeTrafficGb);
      return v === "-" ? <>-</> : <>{v}GB</>;
    }
    case "trialDays":
      return <>{formatPlanNumber(plan.trialDays)}</>;
    case "maxCu":
      return <>{formatPlanNumber(plan.maxCu)}</>;
    default:
      return <>-</>;
  }
}
