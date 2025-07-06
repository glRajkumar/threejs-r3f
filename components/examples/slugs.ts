import { getSlugsArr, Slug } from "@/utils/slugs-helper";

export const slugs: Slug[] = [
  {
    title: "Haunted House",
    href: "haunted-house",
  },
]

export const staticSlugs = getSlugsArr(slugs)
