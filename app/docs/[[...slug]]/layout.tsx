import { slugs } from "@/components/docs/slugs";

import DocsLayout from "@/components/docs-layout";

function RootLayout({ children }: readOnlychild) {
  return (
    <DocsLayout
      title="Threejs + R3F"
      root="docs"
      slugs={slugs}
    >
      {children}
    </DocsLayout>
  )
}

export default RootLayout
