"use client"

import { useEffect, useRef, useState } from "react"
import { useHelper } from "@react-three/drei"
import * as THREE from "three"
import GUI from "lil-gui"

import { Box, Plane } from "./mesh"
import { Wrapper } from "../wrapper"

function HemisphereLightMesh() {
  const hemisphereRef = useRef<THREE.HemisphereLight>(null)

  const [showHelper, setShowHelper] = useState(true)

  const [groundColor, setGroundColor] = useState("#f00")
  const [intensity, setIntensity] = useState(1)
  const [skyColor, setSkyColor] = useState("#00f")
  const [position, setPosition] = useState<postionTuple>([0, 2, 0])

  useHelper(showHelper && hemisphereRef as React.RefObject<THREE.Object3D>, THREE.HemisphereLightHelper, 1)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("hemisphere-light")! })
    const folder = gui.addFolder("Hemisphere Light")

    folder
      .addColor({ skyColor }, "skyColor")
      .onChange(setSkyColor)

    folder
      .addColor({ groundColor }, "groundColor")
      .onChange(setGroundColor)

    folder.add({ intensity }, "intensity", 0, 10, 0.1)
      .onChange(setIntensity)

    const positionProxy = { x: position[0], y: position[1], z: position[2] }

    const positionFolder = folder.addFolder("Position")
    positionFolder
      .add(positionProxy, "x", -5, 10, 0.5)
      .onChange((v: number) =>
        setPosition(([_, y, z]) => [v, y, z])
      )
    positionFolder
      .add(positionProxy, "y", -5, 10, 0.5)
      .onChange((v: number) =>
        setPosition(([x, _, z]) => [x, v, z])
      )
    positionFolder
      .add(positionProxy, "z", -5, 10, 0.5)
      .onChange((v: number) =>
        setPosition(([x, y, _]) => [x, y, v])
      )

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showHelper }, "showHelper")
      .onChange(setShowHelper)

    gui.close()

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <>
      <Box />
      <Plane />

      <hemisphereLight
        ref={hemisphereRef}
        args={[skyColor, groundColor, intensity]}
        position={position}
      />
    </>
  )
}

export function HemisphereLight() {
  return (
    <Wrapper divId="hemisphere-light">
      <HemisphereLightMesh />
    </Wrapper>
  )
}
