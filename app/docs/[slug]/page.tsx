export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/docs/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  return [
    { slug: "introduction" },
    { slug: "overview" },
    { slug: "create-database" },
    { slug: "connect-database" },
    { slug: "scale-database" },
    { slug: "api" },
    { slug: "limits" },
    { slug: "architecture" },
    { slug: "architecture" },
  ];
}

export const dynamicParams = false;
