"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Cylinder() {
  const [radiusTop, setRadiusTop] = useState(1)
  const [radiusBottom, setRadiusBottom] = useState(1)
  const [height, setHeight] = useState(2)
  const [radialSegments, setRadialSegments] = useState(8)
  const [heightSegments, setHeightSegments] = useState(1)
  const [openEnded, setOpenEnded] = useState(false)
  const [thetaStart, setThetaStart] = useState(0)
  const [thetaLength, setThetaLength] = useState(Math.PI * 2)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("cylinder")! })
    const folder = gui.addFolder("Cylinder Geometry")

    folder.add({ radiusTop }, "radiusTop", 0.1, 5, 0.1).onChange(setRadiusTop)
    folder.add({ radiusBottom }, "radiusBottom", 0.1, 5, 0.1).onChange(setRadiusBottom)
    folder.add({ height }, "height", 0.1, 10, 0.1).onChange(setHeight)
    folder.add({ radialSegments }, "radialSegments", 3, 64, 1).onChange(setRadialSegments)
    folder.add({ heightSegments }, "heightSegments", 1, 20, 1).onChange(setHeightSegments)
    folder.add({ openEnded }, "openEnded").onChange(setOpenEnded)
    folder.add({ thetaStart }, "thetaStart", 0, Math.PI * 2, 0.1).onChange(setThetaStart)
    folder.add({ thetaLength }, "thetaLength", 0.1, Math.PI * 2, 0.1).onChange(setThetaLength)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="cylinder">
      <Mesh useDefaultMaterial={false}>
        <cylinderGeometry
          args={[
            radiusTop,
            radiusBottom,
            height,
            radialSegments,
            heightSegments,
            openEnded,
            thetaStart,
            thetaLength
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
