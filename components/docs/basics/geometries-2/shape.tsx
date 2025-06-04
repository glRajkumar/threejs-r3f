"use client"

import { useEffect, useState, useMemo } from "react"
import GUI from "lil-gui"
import * as THREE from "three"
import { Wrapper, Mesh } from "../wrapper"

export function Shape() {
  const [curveSegments, setCurveSegments] = useState(12)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("shape")! })
    gui.add({ curveSegments }, "curveSegments", 1, 64, 1).onChange(setCurveSegments)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0)
    s.lineTo(1, 0)
    s.lineTo(1, 1)
    s.quadraticCurveTo(0.5, 1.5, 0, 1)
    s.lineTo(0, 0)
    return s
  }, [])

  return (
    <Wrapper divId="shape">
      <Mesh useDefaultMaterial={false}>
        <shapeGeometry args={[[shape], curveSegments]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
