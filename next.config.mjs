import createMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-gfm',
    ],
    rehypePlugins: [
      'rehype-slug',
      'rehype-autolink-headings',
    ],
  },
})

export default withMDX(nextConfig)
