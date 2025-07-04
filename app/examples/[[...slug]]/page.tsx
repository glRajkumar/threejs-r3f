import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { checkFileExists, getFilesInFolder } from "@/utils/file-helper";
import { staticSlugs } from "@/components/examples/slugs";
import CodeList from "@/components/ui/code-list";
import NotFound from "@/components/not-found";
import View from "./view";

interface props {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  return staticSlugs.map(slugArray => ({ slug: slugArray }))
}

async function Page({ params }: props) {
  const slug = (await params).slug
  if (!slug) return redirect("/" + staticSlugs?.[0]?.join("/"))

  const root = `/components/examples/${slug?.join("/")}`
  const filePath = `${root}/index.tsx`
  const isFileExists = await checkFileExists(filePath)

  if (!isFileExists) return <NotFound />

  const files = await getFilesInFolder(root)

  const MDXComponent = dynamic(() => import(`@${filePath}`))

  return (
    <View
      code={<CodeList files={files} />}
      preview={<MDXComponent />}
    />
  )
}

export default Page
