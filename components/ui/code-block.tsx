import { getFileContent } from "@/utils/file-helper";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";
import CopyCode from "./copy-code";

type BaseProps = {
  className?: string
}

type FilePathProps = BaseProps & {
  filePath: string
  content?: never
  fileName?: never
}

type ContentProps = BaseProps & {
  content: string
  fileName: string
  filePath?: never
}

type props = FilePathProps | ContentProps;

async function CodeBlock({ className = "", ...rest }: props) {
  const data = "filePath" in rest
    ? await getFileContent(rest.filePath as string)
    : rest

  const highlightedCode = await highlightCode(data.content, data.fileName.split(".").pop() || data.fileName)

  return (
    <div className="relative isolate group">
      <CopyCode content={data.content} />

      <div
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className={cn("[&_pre]:p-4 [&_pre]:rounded-md relative", className)}
      />
    </div>
  )
}

export default CodeBlock
