"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"
import { Wrapper, Mesh } from "../wrapper"

export function Ring() {
  const [innerRadius, setInnerRadius] = useState(0.5)
  const [outerRadius, setOuterRadius] = useState(1)
  const [thetaSegments, setThetaSegments] = useState(8)
  const [phiSegments, setPhiSegments] = useState(1)
  const [thetaStart, setThetaStart] = useState(0)
  const [thetaLength, setThetaLength] = useState(Math.PI * 2)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("ring")! })
    const folder = gui.addFolder("Ring Geometry")

    folder.add({ innerRadius }, "innerRadius", 0.1, 5, 0.1).onChange(setInnerRadius)
    folder.add({ outerRadius }, "outerRadius", 0.1, 5, 0.1).onChange(setOuterRadius)
    folder.add({ thetaSegments }, "thetaSegments", 3, 64, 1).onChange(setThetaSegments)
    folder.add({ phiSegments }, "phiSegments", 1, 64, 1).onChange(setPhiSegments)
    folder.add({ thetaStart }, "thetaStart", 0, Math.PI * 2, 0.1).onChange(setThetaStart)
    folder.add({ thetaLength }, "thetaLength", 0.1, Math.PI * 2, 0.1).onChange(setThetaLength)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="ring">
      <Mesh useDefaultMaterial={false}>
        <ringGeometry args={[innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
