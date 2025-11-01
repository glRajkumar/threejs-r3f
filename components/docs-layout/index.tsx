import type { appProps } from "./types";
import { cn } from "@/lib/utils";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./sidebar";
import DocNavbar from "./navbar";

type props = {
  className?: string
} & readOnlychild & appProps

function DocsLayout({ children, title, className, ...rest }: props) {
  return (
    <SidebarProvider>
      <AppSidebar
        title={title}
        {...rest}
      />

      <main className={cn("flex-1 grid md:grid-cols-[1fr_auto] gap-4 relative isolate", className)}>
        <DocNavbar title={title} />

        {children}
      </main>
    </SidebarProvider>
  )
}

export default DocsLayout
