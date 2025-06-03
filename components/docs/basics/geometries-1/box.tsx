"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Box() {
  const [width, setWidth] = useState(1)
  const [height, setHeight] = useState(1)
  const [depth, setDepth] = useState(1)

  const [widthSegments, setWidthSegments] = useState(1)
  const [heightSegments, setHeightSegments] = useState(1)
  const [depthSegments, setDepthSegments] = useState(1)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("box")! })
    const folder = gui.addFolder("Box Geometry")

    folder.add({ width }, "width", 0.1, 5, 0.1).onChange(setWidth)
    folder.add({ height }, "height", 0.1, 5, 0.1).onChange(setHeight)
    folder.add({ depth }, "depth", 0.1, 5, 0.1).onChange(setDepth)

    folder.add({ widthSegments }, "widthSegments", 1, 10, 1).onChange(setWidthSegments)
    folder.add({ heightSegments }, "heightSegments", 1, 10, 1).onChange(setHeightSegments)
    folder.add({ depthSegments }, "depthSegments", 1, 10, 1).onChange(setDepthSegments)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <Wrapper divId="box">
      <Mesh useDefaultMaterial={false}>
        <boxGeometry
          args={[
            width,
            height,
            depth,
            widthSegments,
            heightSegments,
            depthSegments
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
