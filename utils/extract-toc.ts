import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import remarkMdx from 'remark-mdx';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs/promises';

export interface TocItem {
  id: string
  title: string
  level: number
}

function customSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim()
}

export async function extractToc(filePath: string): Promise<TocItem[]> {
  const fullPath = path.join(process.cwd(), filePath)
  const fileContent = await fs.readFile(fullPath, 'utf8')

  const { content } = matter(fileContent)

  const toc: TocItem[] = []

  await remark()
    .use(remarkMdx)
    .use(() => (tree) => {
      visit(tree, 'heading', (node: any) => {
        const text = node.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.value)
          .join('')

        if (node.depth > 1) {
          toc.push({
            id: customSlug(text),
            title: text,
            level: node.depth,
          })
        }
      })
    })
    .process(content)

  return toc
}