import { DocsPager } from "@/components/docs/pager";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/docs/${slug}.mdx`);

  return (
    <>
      <Post />
      <DocsPager slug={slug} />
    </>
  );
}

export function generateStaticParams() {
  return [
    { slug: "introduction" },
    { slug: "overview" },
    { slug: "architecture" },
    { slug: "pricing" },
    { slug: "console" },
    { slug: "create-database" },
    { slug: "user-db" },
    { slug: "serverless-instance" },
    { slug: "connect-database" },
    { slug: "driver-connect" },
    { slug: "web-client" },
    { slug: "scale-database" },
    { slug: "backup" },
    { slug: "api" },
    { slug: "account-billing" },
    { slug: "limits" },
  ];
}

export const dynamicParams = false;
