import { type TocItem } from "@/utils/extract-toc";
import { cn } from "@/lib/utils";

import Header from "./header";
import Item from "./item";

type props = {
  list: TocItem[]
  slug: string[]
}

function Toc({ list, slug }: props) {
  return (
    <aside className="md:w-40 p-4 fixed max-md:top-15 inset-x-0 md:border-l md:relative bg-white shadow md:shadow-none">
      <div className="sticky top-4 text-sm">
        <Header />

        <div className="dfc" id="toc-content">
          {
            list.map(l => (
              <Item
                key={l.id}
                item={l}
                slug={slug}
              />
            ))
          }
        </div>
      </div>
    </aside>
  )
}

export default Toc
