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

import PageSwitcher from "./page-switcher";
import MenuItem from "./menu";
import Footer from "../footer";

function DocsSidebar({ slugs, root }: appProps) {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="mb-2 border-b">
        <SidebarMenu className="pl-2 pt-2 text-sm font-bold">
          Threejs + R3F
        </SidebarMenu>

        <PageSwitcher
          root={root}
        />
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
