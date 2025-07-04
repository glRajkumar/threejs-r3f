import { slugs } from "@/components/examples/slugs";

import DocsLayout from "@/components/docs-layout";

function RootLayout({ children }: readOnlychild) {
  return (
    <DocsLayout
      title="Examplse"
      root="examples"
      slugs={slugs}
      className="not-prose"
    >
      {children}
    </DocsLayout>
  )
}

export default RootLayout
