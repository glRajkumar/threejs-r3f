import { SidebarTrigger } from "@/components/ui/sidebar";

type props = {
  title: string
}

function DocsNavbar({ title }: props) {
  return (
    <nav className="flex md:hidden items-center gap-2 sticky top-0 -mt-4 -mx-6 p-4 bg-white shadow-sm">
      <SidebarTrigger className="border" />
      <p className="my-0! text-sm font-bold">
        {title}
      </p>
    </nav>
  )
}

export default DocsNavbar
