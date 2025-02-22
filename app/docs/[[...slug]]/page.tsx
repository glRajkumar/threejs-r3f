import dynamic from "next/dynamic";

import { checkFileExists } from "@/utils/file-helper";
import { staticSlugs } from "@/components/docs/slugs";

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
  const filePath = `/app/${slug.join("/")}/page.mdx`
  const isFileExists = await checkFileExists(filePath)

  if (!isFileExists) {
    return <div>Not found</div>
  }

  const MDXComponent = dynamic(() => import(`@${filePath}`))

  return <MDXComponent />
}

export default Page
