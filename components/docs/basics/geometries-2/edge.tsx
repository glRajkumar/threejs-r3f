"use client"

import { useEffect, useState } from "react"
import { Edges as R3fEdges } from '@react-three/drei'
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Edges() {
  const [threshold, setThreshold] = useState(15)
  const [scale, setScale] = useState(1)
  const [color, setColor] = useState("#ff0000")

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("edges")! })
    const folder = gui.addFolder("Edges Properties")

    folder.add({ threshold }, "threshold", 1, 90, 1).onChange(setThreshold)
    folder.add({ scale }, "scale", 0.9, 1.5, 0.01).onChange(setScale)
    folder.addColor({ color }, "color").onChange(setColor)

    gui.close()
    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="edges">
      <Mesh>
        <torusKnotGeometry />
        <R3fEdges threshold={threshold} scale={scale} color={color} />
      </Mesh>
    </Wrapper>
  )
}