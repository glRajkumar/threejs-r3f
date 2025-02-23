import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { checkFileExists } from "@/utils/file-helper";
import { staticSlugs } from "@/components/docs/slugs";
import NotFound from "@/components/not-found";

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
  if (!slug) return redirect("/docs/intro")

  const filePath = `/components/docs/${slug?.join("/")}/page.mdx`
  const isFileExists = await checkFileExists(filePath)

  if (!isFileExists) return <NotFound />

  const MDXComponent = dynamic(() => import(`@${filePath}`))

  return <MDXComponent />
}

export default Page
