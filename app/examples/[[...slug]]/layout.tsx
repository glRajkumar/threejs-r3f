import { slugs } from "@/components/examples/slugs";

import DocsLayout from "@/components/docs-layout";

function RootLayout({ children }: readOnlychild) {
  return (
    <DocsLayout
      root="examples"
      slugs={slugs}
      className="max-w-full min-w-0"
    >
      {children}
    </DocsLayout>
  )
}

export default RootLayout
