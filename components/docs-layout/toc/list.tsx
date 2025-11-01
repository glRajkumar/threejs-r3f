import { type AnchorHTMLAttributes } from "react";
import { type tocProps } from "./toc";
import { cn } from "@/lib/utils";

function removeLeadingNumber(str: string): string {
  return str.replace(/^\d+[\.\-\s]*/, "").trim()
}

function List({ list, slug, ...rest }: tocProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return list.map(item => (
    <a
      key={item.id}
      href={`/${slug.join("/")}#${item.id}`}
      className={cn("text-primary/70 hover:text-primary", {
        "pl-2": item.level === 2,
        "pl-4": item.level === 3,
      })}
      {...rest}
    >
      {removeLeadingNumber(item.title)}
    </a>
  ))
}

export default List
