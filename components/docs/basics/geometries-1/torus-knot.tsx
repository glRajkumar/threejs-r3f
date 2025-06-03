"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"
import { Wrapper, Mesh } from "../wrapper"

export function TorusKnot() {
  const [radius, setRadius] = useState(1)
  const [tube, setTube] = useState(0.4)
  const [tubularSegments, setTubularSegments] = useState(64)
  const [radialSegments, setRadialSegments] = useState(8)
  const [p, setP] = useState(2)
  const [q, setQ] = useState(3)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("torusKnot")! })
    const folder = gui.addFolder("TorusKnot Geometry")

    folder.add({ radius }, "radius", 0.1, 5, 0.1).onChange(setRadius)
    folder.add({ tube }, "tube", 0.1, 2, 0.1).onChange(setTube)
    folder.add({ tubularSegments }, "tubularSegments", 10, 150, 1).onChange(setTubularSegments)
    folder.add({ radialSegments }, "radialSegments", 3, 32, 1).onChange(setRadialSegments)
    folder.add({ p }, "p", 1, 10, 1).onChange(setP)
    folder.add({ q }, "q", 1, 10, 1).onChange(setQ)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="torusKnot">
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[radius, tube, tubularSegments, radialSegments, p, q]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
