
import { getContents } from "@/utils/file-helper";
import MarkdownBlocker from "@/components/custom-ui/markdown-blocker";

async function Page() {
  const data = await getContents(["/app/intro.md"])

  return (
    <div className="p-8">
      <MarkdownBlocker
        markdown={data?.[0]?.content}
      />
    </div>
  )
}

export default Page
