import { getSlugsArr, Slug } from "@/utils/slugs-helper";

export const slugs: Slug[] = [
  {
    title: "Ghost",
    href: "ghost",
  },
]

export const staticSlugs = getSlugsArr(slugs)
