"use client"

import { useEffect, useState, useMemo } from "react"
import { Vector2 } from "three"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Lathe() {
  const [segments, setSegments] = useState(12)
  const [phiStart, setPhiStart] = useState(0)
  const [phiLength, setPhiLength] = useState(Math.PI * 2)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("lathe")! })
    const folder = gui.addFolder("Lathe Geometry")

    folder.add({ segments }, "segments", 3, 64, 1).onChange(setSegments)
    folder.add({ phiStart }, "phiStart", 0, Math.PI * 2, 0.1).onChange(setPhiStart)
    folder.add({ phiLength }, "phiLength", 0.1, Math.PI * 2, 0.1).onChange(setPhiLength)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  const points = useMemo(() => {
    const p: Vector2[] = []
    for (let i = 0; i < 10; i++) {
      const x = Math.sin(i * 0.2) * 0.4 + 0.5
      const y = (i - 5) * 0.2
      p.push(new Vector2(x, y))
    }
    return p
  }, [])

  return (
    <Wrapper divId="lathe">
      <Mesh useDefaultMaterial={false}>
        <latheGeometry args={[points, segments, phiStart, phiLength]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
