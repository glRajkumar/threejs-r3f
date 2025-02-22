import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThreeJS Learning",
  description: "",
}

function RootLayout({ children }: readOnlychild) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
