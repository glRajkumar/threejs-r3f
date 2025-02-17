import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import AppNavbar from "@/components/app-navbar";

export const metadata: Metadata = {
  title: "ThreeJS Learning",
  description: "",
}

function RootLayout({ children }: readOnlychild) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />

          <main className="max-w-full p-6 md:p-8 prose prose-sm prose-pre:p-0 prose-pre:m-0! prose-th:py-1 prose-th:px-2 prose-td:px-2 relative">
            <AppNavbar />

            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}

export default RootLayout
