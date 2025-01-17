"use server";

import path from 'path';
import fs from 'fs/promises';

type fileT = { fileName: string; content: string }

export async function getFileContent(filePath: string): Promise<fileT> {
  const absolutePath = path.join(process.cwd(), filePath)
  const content = await fs.readFile(absolutePath, 'utf8')
  return { fileName: path.basename(filePath), content }
}

export async function getFolderContents(folderPath: string): Promise<fileT[]> {
  const absolutePath = path.join(process.cwd(), folderPath)
  const files = await fs.readdir(absolutePath)

  const fileContents = await Promise.all(
    files.map(async (currFile) => {
      const filePath = path.join(folderPath, currFile)
      const { content, fileName } = await getFileContent(filePath)
      return { fileName, content }
    })
  )

  return fileContents
}

export async function getContents(paths: string[]): Promise<fileT[]> {
  const results: fileT[] = []

  for (const filePath of paths) {
    const absolutePath = path.join(process.cwd(), filePath)

    try {
      const stats = await fs.stat(absolutePath)

      if (stats.isDirectory()) {
        const folderContents = await getFolderContents(filePath)
        results.push(...folderContents)

      } else if (stats.isFile()) {
        const { content, fileName } = await getFileContent(filePath)
        results.push({ fileName, content })

      } else {
        console.warn(`Skipping ${absolutePath}: Neither a file nor a directory`)
      }

    } catch (error) {
      console.error(`Error processing ${absolutePath}:`, error)
    }
  }

  return results
}