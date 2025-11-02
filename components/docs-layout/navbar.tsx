import { SidebarTrigger } from "@/components/ui/sidebar";
import Footer from "./footer";

function DocsNavbar() {
  return (
    <nav className="flex md:hidden items-center gap-2 sticky top-0 -mt-6 p-4 shadow-sm z-1 bg-background dark:shadow-white/20">
      <SidebarTrigger className="border" />
      <header className="my-0! flex-1 text-sm font-bold">
        Threejs + R3F
      </header>

      <Footer />
    </nav>
  )
}

export default DocsNavbar
