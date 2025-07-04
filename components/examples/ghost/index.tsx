import { getFilesInFolder } from "@/utils/file-helper";
import CodeList from "@/components/ui/code-list";

async function Ghost() {
  const files = await getFilesInFolder("components")

  return (
    <CodeList files={files} />
  )
}

export default Ghost
