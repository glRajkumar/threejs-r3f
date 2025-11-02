"use client"

import { ChevronsUpDown } from "lucide-react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type props = {
  root: string
}

function PageSwitcher({ root }: props) {
  const list = [
    {
      title: "Documentation",
      href: "docs",
    },
    {
      title: "Examples",
      href: "examples",
    }
  ]

  const selected = list.find((l) => l.href === root)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
            >
              {selected?.title}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {
              list.map((l) => (
                <DropdownMenuItem
                  key={l.title}
                  asChild
                >
                  <Link href={`/${l.href}`} replace>
                    {l.title}
                  </Link>
                </DropdownMenuItem>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default PageSwitcher
