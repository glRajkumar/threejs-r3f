"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useHelper } from "@react-three/drei"
import GUI from "lil-gui"

import { Box, Plane } from "./mesh"
import { Wrapper } from "../wrapper"

function PointLightMesh() {
  const pointRef = useRef<THREE.PointLight>(null)

  const [showHelper, setShowHelper] = useState(true)
  const [showAmbient, setShowAmbient] = useState(true)

  const [intensity, setIntensity] = useState(1)
  const [position, setPosition] = useState<postionTuple>([0, 3, 0])
  const [distance, setDistance] = useState(5)
  const [color, setColor] = useState("#f00")
  const [decay, setDecay] = useState(0.5)

  useHelper(showHelper && pointRef as React.RefObject<THREE.Object3D>, THREE.PointLightHelper, 0.5)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("point-light")! })
    const folder = gui.addFolder("Point Light")

    folder.addColor({ color }, "color").onChange(setColor)
    folder.add({ intensity }, "intensity", 0, 10, 0.1).onChange(setIntensity)
    folder.add({ distance }, "distance", 0, 50, 0.1).onChange(setDistance)
    folder.add({ decay }, "decay", 0, 5, 0.1).onChange(setDecay)

    const positionProxy = { x: position[0], y: position[1], z: position[2] }
    const positionFolder = folder.addFolder("Position")

    positionFolder.add(positionProxy, "x", -10, 10, 0.5).onChange((v: number) =>
      setPosition(([_, y, z]) => [v, y, z])
    )
    positionFolder.add(positionProxy, "y", -10, 10, 0.5).onChange((v: number) =>
      setPosition(([x, _, z]) => [x, v, z])
    )
    positionFolder.add(positionProxy, "z", -10, 10, 0.5).onChange((v: number) =>
      setPosition(([x, y, _]) => [x, y, v])
    )

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showHelper }, "showHelper").onChange(setShowHelper)
    additionalFolder.add({ showAmbient }, "showAmbient").onChange(setShowAmbient)

    folder.open()

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <>
      <Box />
      <Plane />

      <pointLight
        ref={pointRef}
        args={[color, intensity, distance, decay]}
        position={position}
      />

      {showAmbient && <ambientLight intensity={0.2} />}
    </>
  )
}

export function PointLight() {
  return (
    <Wrapper divId="point-light">
      <PointLightMesh />
    </Wrapper>
  )
}
