"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"
import { Wrapper, Mesh } from "../wrapper"

export function Capsule() {
  const [radius, setRadius] = useState(0.5)
  const [height, setHeight] = useState(1)
  const [capSegments, setCapSegments] = useState(4)
  const [radialSegments, setRadialSegments] = useState(8)
  // const [heightSegments, setHeightSegments] = useState(1)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("capsule")! })
    const folder = gui.addFolder("Capsule Geometry")

    folder.add({ radius }, "radius", 0.1, 2, 0.1).onChange(setRadius)
    folder.add({ height }, "height", 0.1, 5, 0.1).onChange(setHeight)
    folder.add({ capSegments }, "capSegments", 1, 16, 1).onChange(setCapSegments)
    folder.add({ radialSegments }, "radialSegments", 3, 32, 1).onChange(setRadialSegments)
    // folder.add({ heightSegments }, "heightSegments", 1, 10, 1).onChange(setHeightSegments)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="capsule">
      <Mesh useDefaultMaterial={false}>
        <capsuleGeometry
          args={[
            radius,
            height,
            capSegments,
            radialSegments,
            // heightSegments
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
