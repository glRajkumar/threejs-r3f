
interface Slug {
  title: string;
  href: string;
  children?: Slug[];
}

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
        title: "Shadow",
        href: "shadow",
      },
    ]
  },
]

const getSlugs = (items: Slug[], parentPath: string[] = []): string[][] => {
  return items.reduce<string[][]>((acc, item) => {
    const fullPath = [...parentPath, item.href]
    acc.push(fullPath)
    if (item.children) {
      acc.push(...getSlugs(item.children, fullPath))
    }
    return acc
  }, []);
};

export const staticSlugs = getSlugs(slugs)
