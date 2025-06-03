"use client"

import { useEffect, useState, useMemo } from "react"
import { CatmullRomCurve3, Vector3 } from "three"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Tube() {
  const [tubularSegments, setTubularSegments] = useState(64)
  const [radius, setRadius] = useState(0.2)
  const [radialSegments, setRadialSegments] = useState(8)
  const [closed, setClosed] = useState(false)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("tube")! })
    const folder = gui.addFolder("Tube Geometry")

    folder.add({ tubularSegments }, "tubularSegments", 3, 200, 1).onChange(setTubularSegments)
    folder.add({ radius }, "radius", 0.05, 2, 0.05).onChange(setRadius)
    folder.add({ radialSegments }, "radialSegments", 3, 64, 1).onChange(setRadialSegments)
    folder.add({ closed }, "closed").onChange(setClosed)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  const path = useMemo(() => {
    return new CatmullRomCurve3([
      new Vector3(-2, 0, 2),
      new Vector3(-1, 1, 0),
      new Vector3(0, 0, 0),
      new Vector3(1, -1, 0),
      new Vector3(2, 0, 2),
    ])
  }, [])

  return (
    <Wrapper divId="tube">
      <Mesh useDefaultMaterial={false}>
        <tubeGeometry
          args={[
            path,
            tubularSegments,
            radius,
            radialSegments,
            closed,
          ]}
        />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
