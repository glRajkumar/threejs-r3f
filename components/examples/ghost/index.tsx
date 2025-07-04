"use client"

import { useEffect, useState } from "react"

function Ghost() {
  const [st, setSt] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setSt(p => p + 1)
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div>
      jkgjgjjk {st}
    </div>
  )
}

export default Ghost
