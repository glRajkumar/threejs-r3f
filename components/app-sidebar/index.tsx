"use client";

import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";

import { items } from "./item";
import MenuItem from "./menu";

function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <SidebarMenu className="pl-2 pt-2 text-sm font-bold">
          Threejs + R3F
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {items?.map((item) => (
          <MenuItem
            {...item}
            key={item.title}
            pathname={pathname}
          />
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
