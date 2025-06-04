"use client"

import { useEffect, useState, useMemo } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Extrude() {
  const [curveSegments, setCurveSegments] = useState(12)
  const [steps, setSteps] = useState(1)
  const [depth, setDepth] = useState(1)
  const [bevelEnabled, setBevelEnabled] = useState(true)
  const [bevelThickness, setBevelThickness] = useState(0.2)
  const [bevelSize, setBevelSize] = useState(0.1)
  const [bevelOffset, setBevelOffset] = useState(0)
  const [bevelSegments, setBevelSegments] = useState(3)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("extrude")! })
    const folder = gui.addFolder("Extrude Geometry")

    folder.add({ curveSegments }, "curveSegments", 1, 50, 1).onChange(setCurveSegments)
    folder.add({ steps }, "steps", 1, 20, 1).onChange(setSteps)
    folder.add({ depth }, "depth", 0.1, 5, 0.1).onChange(setDepth)
    folder.add({ bevelEnabled }, "bevelEnabled").onChange(setBevelEnabled)
    folder.add({ bevelThickness }, "bevelThickness", 0, 1, 0.01).onChange(setBevelThickness)
    folder.add({ bevelSize }, "bevelSize", 0, 1, 0.01).onChange(setBevelSize)
    folder.add({ bevelOffset }, "bevelOffset", 0, 1, 0.01).onChange(setBevelOffset)
    folder.add({ bevelSegments }, "bevelSegments", 0, 10, 1).onChange(setBevelSegments)

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
    s.lineTo(0.5, 1.5)
    s.lineTo(0, 1)
    s.lineTo(0, 0)
    return s
  }, [])

  return (
    <Wrapper divId="extrude">
      <Mesh useDefaultMaterial={false}>
        <extrudeGeometry
          args={[[shape], {
            curveSegments,
            steps,
            depth,
            bevelEnabled,
            bevelThickness,
            bevelSize,
            bevelOffset,
            bevelSegments,
          }]}
        />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
