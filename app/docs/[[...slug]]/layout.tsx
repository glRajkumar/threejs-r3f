import { slugs } from "@/components/docs/slugs";

import SettingsFloater from "@/components/docs/settings-floater";
import DocsLayout from "@/components/docs-layout";

function RootLayout({ children }: readOnlychild) {
  return (
    <DocsLayout
      root="docs"
      slugs={slugs}
      className="grid md:grid-cols-[1fr_auto]"
    >
      {children}

      <SettingsFloater />
    </DocsLayout>
  )
}

export default RootLayout
