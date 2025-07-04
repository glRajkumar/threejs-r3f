export interface Slug {
  title: string
  href: string
  children?: Slug[]
}

export const getSlugsArr = (items: Slug[], parentPath: string[] = []): string[][] => {
  return items.reduce<string[][]>((acc, item) => {
    const fullPath = [...parentPath, item.href]
    acc.push(fullPath)
    if (item.children) {
      acc.push(...getSlugsArr(item.children, fullPath))
    }
    return acc
  }, [])
}
