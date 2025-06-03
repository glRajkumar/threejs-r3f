"use client"

import { useEffect, useRef, useState } from "react"
import { useHelper } from "@react-three/drei"
import * as THREE from "three"
import GUI from "lil-gui"

import { Box, Plane } from "./mesh"
import { Wrapper } from "../wrapper"

function DirectionalLightMesh() {
  const directionalRef = useRef<THREE.DirectionalLight>(null)

  const [showAmbient, setShowAmbient] = useState(true)
  const [showHelper, setShowHelper] = useState(true)

  const [intensity, setIntensity] = useState(1)
  const [position, setPosition] = useState<[number, number, number]>([4, 0.5, 0])
  const [color, setColor] = useState("#f00")

  useHelper(showHelper && directionalRef as React.RefObject<THREE.Object3D>, THREE.DirectionalLightHelper, 0.5)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("direactional-light")! })
    const folder = gui.addFolder("Directional Light")

    folder
      .addColor({ color }, "color")
      .onChange(setColor)

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

    const addFolder = gui.addFolder("Additionals")

    addFolder.add({ showHelper }, "showHelper")
      .onChange(setShowHelper)

    addFolder.add({ showAmbient }, "showAmbient")
      .onChange(setShowAmbient)

    gui.close()

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <>
      <Box />
      <Plane />

      <directionalLight
        ref={directionalRef}
        args={[color, intensity]}
        position={position}
      />

      {showAmbient && <ambientLight />}
    </>
  )
}

export function DirectionalLight() {
  return (
    <Wrapper divId="direactional-light">
      <DirectionalLightMesh />
    </Wrapper>
  )
}