"use client"

import { useEffect, useState } from "react"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Circle() {
  const [radius, setRadius] = useState(1)
  const [segments, setSegments] = useState(8)
  const [thetaStart, setThetaStart] = useState(0)
  const [thetaLength, setThetaLength] = useState(Math.PI * 2)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("circle")! })
    const folder = gui.addFolder("Circle Geometry")

    folder.add({ radius }, "radius", 0.1, 5, 0.1).onChange(setRadius)
    folder.add({ segments }, "segments", 3, 64, 1).onChange(setSegments)
    folder.add({ thetaStart }, "thetaStart", 0, Math.PI * 2, 0.1).onChange(setThetaStart)
    folder.add({ thetaLength }, "thetaLength", 0.1, Math.PI * 2, 0.1).onChange(setThetaLength)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="circle">
      <Mesh useDefaultMaterial={false}>
        <circleGeometry args={[radius, segments, thetaStart, thetaLength]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
