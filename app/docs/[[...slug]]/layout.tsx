import { slugs } from "@/components/docs/slugs";

import DocsLayout from "@/components/docs-layout";

function RootLayout({ children }: readOnlychild) {
  return (
    <DocsLayout
      root="docs"
      slugs={slugs}
      className="grid md:grid-cols-[1fr_auto]"
    >
      {children}
    </DocsLayout>
  )
}

export default RootLayout
