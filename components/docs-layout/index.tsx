import type { appProps } from "./types";
import { cn } from "@/lib/utils";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./sidebar";
import DocNavbar from "./navbar";

type props = {
  className?: string
} & readOnlychild & appProps

function DocsLayout({ children, className, ...rest }: props) {
  return (
    <SidebarProvider>
      <AppSidebar {...rest} />

      <main className={cn("flex-1 relative isolate", className)}>
        <DocNavbar />

        {children}
      </main>
    </SidebarProvider>
  )
}

export default DocsLayout
