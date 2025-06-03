"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"
import { Wrapper, Mesh } from "../wrapper"

export function Plane() {
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(2)
  const [widthSegments, setWidthSegments] = useState(1)
  const [heightSegments, setHeightSegments] = useState(1)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("plane")! })
    const folder = gui.addFolder("Plane Geometry")

    folder.add({ width }, "width", 0.1, 10, 0.1).onChange(setWidth)
    folder.add({ height }, "height", 0.1, 10, 0.1).onChange(setHeight)
    folder.add({ widthSegments }, "widthSegments", 1, 10, 1).onChange(setWidthSegments)
    folder.add({ heightSegments }, "heightSegments", 1, 10, 1).onChange(setHeightSegments)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="plane">
      <Mesh useDefaultMaterial={false}>
        <planeGeometry args={[width, height, widthSegments, heightSegments]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
