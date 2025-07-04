import type { appProps } from "./types";

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

      <main className="max-w-full flex-1 p-6 md:p-8 prose prose-sm prose-pre:p-0 prose-pre:m-0! prose-th:py-1 prose-th:px-2 prose-td:px-2 relative">
        <DocNavbar title={title} />

        {children}
      </main>
    </SidebarProvider>
  )
}

export default DocsLayout
