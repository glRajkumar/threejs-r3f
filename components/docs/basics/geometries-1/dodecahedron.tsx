"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Dodecahedron() {
  const [radius, setRadius] = useState(1)
  const [detail, setDetail] = useState(0)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("dodecahedron")! })
    const folder = gui.addFolder("Dodecahedron Geometry")

    folder.add({ radius }, "radius", 0.1, 5, 0.1).onChange(setRadius)
    folder.add({ detail }, "detail", 0, 5, 1).onChange(setDetail)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="dodecahedron">
      <Mesh useDefaultMaterial={false}>
        <dodecahedronGeometry args={[radius, detail]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
