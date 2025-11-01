"use client";

import { usePathname } from "next/navigation";

import type { appProps } from "../types";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";

import MenuItem from "./menu";
import Footer from "../footer";

function DocsSidebar({ slugs, root, title }: appProps) {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <SidebarMenu className="pl-2 pt-2 text-sm font-bold">
          {title}
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {
          slugs?.map((item) => (
            <MenuItem
              {...item}
              key={item.title}
              root={root}
              pathname={pathname}
            />
          ))
        }
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter className="pb-4 border-t">
        <Footer />
      </SidebarFooter>
    </Sidebar>
  )
}

export default DocsSidebar
