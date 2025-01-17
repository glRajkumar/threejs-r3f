import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

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

          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}

export default RootLayout
