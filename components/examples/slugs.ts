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
  {
    title: "Galaxy",
    href: "galaxy",
  },
  {
    title: "Ray Caster",
    href: "raycaster",
  },
]

export const staticSlugs = getSlugsArr(slugs)
