import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { checkFileExists } from "@/utils/file-helper";
import { extractToc } from "@/utils/extract-toc";

import { staticSlugs } from "@/components/docs/slugs";
import NotFound from "@/components/not-found";
import Toc from "@/components/docs-layout/toc";

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
  const toc = await extractToc(filePath)

  return (
    <>
      <article className="p-6 md:p-8 max-w-none min-w-0 prose prose-sm prose-th:py-1 prose-th:px-2 prose-td:px-2 prose-table:border prose-h2:mb-1 dark:bg-[#141414]">
        <MDXComponent />
      </article>

      {
        toc.length > 0 &&
        <Toc
          list={toc}
          slug={["docs", ...slug]}
        />
      }
    </>
  )
}

export default Page
