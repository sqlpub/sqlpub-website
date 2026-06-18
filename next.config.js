import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired.
  // With Turbopack, plugins must be passed as serializable string names
  // (optionally with an options object) rather than imported functions.
  extension: /\.(mdx)$/,
  options: {
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [
      ["rehype-slug"],
      ["rehype-highlight"],
      ["rehype-autolink-headings", { behavior: "wrap" }],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
