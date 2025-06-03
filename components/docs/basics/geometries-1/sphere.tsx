"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Sphere() {
  const [radius, setRadius] = useState(1)
  const [widthSegments, setWidthSegments] = useState(16)
  const [heightSegments, setHeightSegments] = useState(12)
  const [phiStart, setPhiStart] = useState(0)
  const [phiLength, setPhiLength] = useState(Math.PI * 2)
  const [thetaStart, setThetaStart] = useState(0)
  const [thetaLength, setThetaLength] = useState(Math.PI)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("sphere")! })
    const folder = gui.addFolder("Sphere Geometry")

    folder.add({ radius }, "radius", 0.1, 5, 0.1).onChange(setRadius)
    folder.add({ widthSegments }, "widthSegments", 3, 64, 1).onChange(setWidthSegments)
    folder.add({ heightSegments }, "heightSegments", 2, 64, 1).onChange(setHeightSegments)
    folder.add({ phiStart }, "phiStart", 0, Math.PI * 2, 0.1).onChange(setPhiStart)
    folder.add({ phiLength }, "phiLength", 0.1, Math.PI * 2, 0.1).onChange(setPhiLength)
    folder.add({ thetaStart }, "thetaStart", 0, Math.PI, 0.1).onChange(setThetaStart)
    folder.add({ thetaLength }, "thetaLength", 0.1, Math.PI, 0.1).onChange(setThetaLength)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="sphere">
      <Mesh useDefaultMaterial={false}>
        <sphereGeometry
          args={[
            radius,
            widthSegments,
            heightSegments,
            phiStart,
            phiLength,
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
