"use client";

import { type TocItem } from "@/utils/extract-toc";
import { cn } from "@/lib/utils";

type props = {
  item: TocItem
  slug: string[]
}

function Item({ item, slug }: props) {
  function onClk() {
    document?.getElementById("toc-content")?.classList?.toggle("open")
  }

  return (
    <a
      href={`/${slug.join("/")}#${item.id}`}
      className={cn("text-primary/70 hover:text-primary", {
        "pl-2": item.level === 2,
        "pl-4": item.level === 3,
      })}
      onClick={onClk}
    >
      {item.title?.split(".")?.[1] || item.title}
    </a>
  )
}

export default Item
