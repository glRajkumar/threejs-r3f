import { type tocProps } from "./toc";
import Mobile from "./mobile";
import List from "./list";

function Toc({ list, slug }: tocProps) {
  return (
    <aside className="md:w-52 md:p-4 fixed bottom-0 inset-x-0 border-t md:border-t-0 md:border-l md:relative shadow md:shadow-none bg-background">
      <div className="sticky top-4 text-sm hidden md:block">
        <header>On this page</header>

        <div className="dfc mt-2" id="toc-content">
          <List
            list={list}
            slug={slug}
          />
        </div>
      </div>

      <Mobile
        list={list}
        slug={slug}
      />
    </aside>
  )
}

export default Toc
