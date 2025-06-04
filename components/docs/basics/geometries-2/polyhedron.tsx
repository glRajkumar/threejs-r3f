"use client"

import { useEffect, useState, useMemo } from "react"
import GUI from "lil-gui"
import { Wrapper, Mesh } from "../wrapper"

export function Polyhedron() {
  const [radius, setRadius] = useState(1)
  const [detail, setDetail] = useState(0)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("polyhedron")! })
    const folder = gui.addFolder("Polyhedron Geometry")

    folder.add({ radius }, "radius", 0.1, 5, 0.1).onChange(setRadius)
    folder.add({ detail }, "detail", 0, 5, 1).onChange(setDetail)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  const vertices = useMemo(() => [
    1, 1, 1, -1, 1, 1,
    -1, -1, 1, 1, -1, 1,
    1, 1, -1, -1, 1, -1,
    -1, -1, -1, 1, -1, -1
  ], [])

  const indices = useMemo(() => [
    2, 1, 0, 0, 3, 2,
    0, 4, 7, 7, 3, 0,
    4, 5, 6, 6, 7, 4,
    5, 1, 2, 2, 6, 5,
    5, 4, 0, 0, 1, 5,
    2, 3, 7, 7, 6, 2
  ], [])

  return (
    <Wrapper divId="polyhedron">
      <Mesh useDefaultMaterial={false}>
        <polyhedronGeometry args={[vertices, indices, radius, detail]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
