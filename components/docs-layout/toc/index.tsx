import { TextAlignStart } from "lucide-react";

import type { tocProps } from "./toc";

import Mobile from "./mobile";
import Main from "./main";

function Toc({ list }: tocProps) {
  return (
    <aside className="md:w-52 md:p-4 fixed bottom-0 inset-x-0 border-t md:border-t-0 md:border-l md:relative shadow md:shadow-none bg-background">
      <div className="sticky top-4 text-sm hidden md:block">
        <header className="df text-muted-foreground">
          <TextAlignStart className="size-4" />
          On this page
        </header>

        <div className="dfc mt-2" id="toc-content">
          <Main items={list} />
        </div>
      </div>

      <Mobile list={list} />
    </aside>
  )
}

export default Toc
