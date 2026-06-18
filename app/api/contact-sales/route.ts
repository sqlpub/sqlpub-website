import { NextResponse } from "next/server";

import { getSqlpubApiBaseUrl } from "@/lib/sqlpub-api";

type ContactSalesPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

type SqlpubResult = {
  success?: boolean;
  errorMessage?: string;
};

export async function POST(request: Request) {
  let body: ContactSalesPayload;

  try {
    body = (await request.json()) as ContactSalesPayload;
  } catch {
    return NextResponse.json({ success: false, message: "请求格式错误" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim();
  const message = body.message?.trim();

  if (!name || !email || !company || !message) {
    return NextResponse.json(
      { success: false, message: "请填写完整信息" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${getSqlpubApiBaseUrl()}/api/contact-sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, message }),
      cache: "no-store",
    });

    const result = (await response.json()) as SqlpubResult;

    if (!response.ok || !result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.errorMessage || "提交失败，请稍后重试",
        },
        { status: response.ok ? 400 : response.status }
      );
    }

    return NextResponse.json({ success: true, message: "提交成功" });
  } catch {
    return NextResponse.json(
      { success: false, message: "服务暂时不可用，请稍后重试" },
      { status: 502 }
    );
  }
}
