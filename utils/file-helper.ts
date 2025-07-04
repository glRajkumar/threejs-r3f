"use server";

import path from 'path';
import fs from 'fs/promises';

type fileT = {
  relativePath: string
  fileName: string
  content: string
}

export async function checkFileExists(filePath: string): Promise<boolean> {
  try {
    const absolutePath = path.join(process.cwd(), filePath)
    await fs.stat(absolutePath)
    return true

  } catch (error) {
    return false
  }
}

export async function getFileContent(filePath: string): Promise<fileT> {
  const absolutePath = path.join(process.cwd(), filePath)
  const content = await fs.readFile(absolutePath, 'utf8')

  return {
    content,
    fileName: path.basename(filePath),
    relativePath: filePath,
  }
}

export async function getFilesInFolder(folderPath: string): Promise<string[]> {
  const absolutePath = path.join(process.cwd(), folderPath)
  const entries = await fs.readdir(absolutePath, { withFileTypes: true })

  const files: string[] = []

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name)
    if (entry.isDirectory()) {
      const nestedFiles = await getFilesInFolder(entryPath)
      files.push(...nestedFiles)
    } else if (entry.isFile()) {
      files.push(entryPath)
    }
  }

  return files
}

export async function getFolderContents(folderPath: string): Promise<fileT[]> {
  const absolutePath = path.join(process.cwd(), folderPath)
  const files = await fs.readdir(absolutePath)

  const fileContents = await Promise.all(
    files.map(async (currFile) => {
      const filePath = path.join(folderPath, currFile)
      const { content, fileName, relativePath } = await getFileContent(filePath)
      return { fileName, content, relativePath }
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
        const { content, fileName, relativePath } = await getFileContent(filePath)
        results.push({ fileName, content, relativePath })

      } else {
        console.warn(`Skipping ${absolutePath}: Neither a file nor a directory`)
      }

    } catch (error) {
      console.error(`Error processing ${absolutePath}:`, error)
    }
  }

  return results
}