"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { Box, Plane } from "./mesh"
import { Wrapper } from "../wrapper"

function AmbientLightMesh() {
  const ambientRef = useRef<THREE.AmbientLight>(null)

  const [intensity, setIntensity] = useState(1)
  const [color, setColor] = useState("#f00")

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("ambient-light")! })
    const folder = gui.addFolder("Ambient Light")

    folder
      .addColor({ color }, "color")
      .onChange(setColor)

    folder.add({ intensity }, "intensity", 0, 10, 0.1)
      .onChange(setIntensity)

    folder.open()

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <>
      <Box />
      <Plane />

      <ambientLight
        ref={ambientRef}
        args={[color, intensity]}
      />
    </>
  )
}

export function AmbientLight() {
  return (
    <Wrapper divId="ambient-light">
      <AmbientLightMesh />
    </Wrapper>
  )
}