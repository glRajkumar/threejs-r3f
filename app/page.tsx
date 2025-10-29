import Link from "next/link"

function Page() {
  return (
    <section className="dc flex-col h-screen">
      <h1 className="text-2xl md:text-4xl font-semibold">
        Under Construnction
      </h1>

      <Link href="/docs/intro" className="text-blue-600 underline">
        Go to Docs
      </Link>

      <Link href="/examples/haunted-house" className="text-blue-600 underline">
        Go to Examples
      </Link>
    </section>
  )
}

export default Page