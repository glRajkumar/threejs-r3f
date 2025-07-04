import { getSlugsArr, Slug } from "@/utils/slugs-helper"

export const slugs: Slug[] = [
  {
    title: "Getting started",
    href: "intro",
  },
  {
    title: "Basics",
    href: "basics",
    children: [
      {
        title: "Geometry Part 1",
        href: "geometries-1",
      },
      {
        title: "Geometry Part 2",
        href: "geometries-2",
      },
      {
        title: "Materials Part 1",
        href: "materials-1",
      },
      {
        title: "Materials Part 2",
        href: "materials-2",
      },
      {
        title: "Camera",
        href: "camera",
      },
      {
        title: "Light",
        href: "light",
      },
      {
        title: "Texture",
        href: "texture",
      },
      {
        title: "Shadow",
        href: "shadow",
      },
      {
        title: "Helpers",
        href: "helpers",
      },
    ]
  },
]

export const staticSlugs = getSlugsArr(slugs)
