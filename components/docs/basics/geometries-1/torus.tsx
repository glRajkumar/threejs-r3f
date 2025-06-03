"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Torus() {
  const [radius, setRadius] = useState(1)
  const [tube, setTube] = useState(0.4)
  const [radialSegments, setRadialSegments] = useState(8)
  const [tubularSegments, setTubularSegments] = useState(6)
  const [arc, setArc] = useState(Math.PI * 2)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("torus")! })
    const folder = gui.addFolder("Torus Geometry")

    folder.add({ radius }, "radius", 0.1, 5, 0.1).onChange(setRadius)
    folder.add({ tube }, "tube", 0.05, 2, 0.05).onChange(setTube)
    folder.add({ radialSegments }, "radialSegments", 3, 64, 1).onChange(setRadialSegments)
    folder.add({ tubularSegments }, "tubularSegments", 3, 128, 1).onChange(setTubularSegments)
    folder.add({ arc }, "arc", 0.1, Math.PI * 2, 0.1).onChange(setArc)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="torus">
      <Mesh useDefaultMaterial={false}>
        <torusGeometry
          args={[radius, tube, radialSegments, tubularSegments, arc]}
        />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
