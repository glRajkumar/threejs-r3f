import { getContents } from "@/utils/file-helper";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "./code-block";

type props = {
  files: string[]
}

async function CodeList({ files }: props) {
  const data = await getContents(files)

  return (
    <Tabs defaultValue={data[0].relativePath}>
      <TabsList className="flex h-auto flex-wrap p-2">
        {
          data.map(file => (
            <TabsTrigger
              key={file.relativePath}
              value={file.relativePath}
            >
              {file.fileName}
            </TabsTrigger>
          ))
        }
      </TabsList>

      {
        data.map(file => (
          <TabsContent
            key={file.relativePath}
            value={file.relativePath}
          >
            <CodeBlock
              fileName={file.fileName}
              content={file.content}
            />
          </TabsContent>
        ))
      }
    </Tabs>
  )
}

export default CodeList
