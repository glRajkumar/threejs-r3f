import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/provider";

export const metadata: Metadata = {
  title: "Three.js Learning",
  description: "",
}

function RootLayout({ children }: readOnlychild) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
