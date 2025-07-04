import Link from 'next/link';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

type itemProps = {
  title: string
  href: string
}

type MenuItemProps = itemProps & {
  root: string
  pathname: string
  children?: itemProps[]
}

function Item({ title, href, pathname }: itemProps & { pathname: string }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="df p-2 w-full rounded-lg hover:bg-muted group"
        isActive={pathname === href}
      >
        <Link href={href}>
          {title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function MenuItem({ root, title, href, children, pathname }: MenuItemProps) {
  if (!children) {
    return (
      <SidebarGroup className='py-0'>
        <SidebarMenu>
          <Item
            title={title}
            href={`/${root}/${href}`}
            pathname={pathname}
          />
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup className='py-0'>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarGroupLabel className='h-auto mt-4'>
            {title}
          </SidebarGroupLabel>

          <SidebarMenu>
            {
              children.map(child => (
                <Item
                  key={child.title}
                  href={`/${root}/${href}/${child.href}`}
                  title={child.title}
                  pathname={pathname}
                />
              ))
            }
          </SidebarMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default MenuItem
