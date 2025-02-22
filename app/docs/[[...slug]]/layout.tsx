
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/docs/sidebar";
import AppNavbar from "@/components/docs/navbar";

function RootLayout({ children }: readOnlychild) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="max-w-full p-6 md:p-8 prose prose-sm prose-pre:p-0 prose-pre:m-0! prose-th:py-1 prose-th:px-2 prose-td:px-2 relative">
        <AppNavbar />

        {children}
      </main>
    </SidebarProvider>
  )
}

export default RootLayout
