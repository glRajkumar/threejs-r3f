import { getSlugsArr, Slug } from "@/utils/slugs-helper";

export const slugs: Slug[] = [
  {
    title: "Haunted House",
    href: "haunted-house",
  },
  {
    title: "Particles",
    href: "particles",
  },
]

export const staticSlugs = getSlugsArr(slugs)
