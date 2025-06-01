"use client"

import { useEffect, useRef, useState } from "react"
import { useHelper } from "@react-three/drei"
import * as THREE from "three"
import GUI from "lil-gui"

import { Box, Plane } from "./mesh"
import { Wrapper } from "../wrapper"

function SpotLightMesh() {
  const spotRef = useRef<THREE.SpotLight>(null)

  const [showAmbient, setShowAmbient] = useState(true)
  const [showHelper, setShowHelper] = useState(true)

  const [intensity, setIntensity] = useState(3)
  const [position, setPosition] = useState<postionTuple>([2, 5, 2])
  const [distance, setDistance] = useState(8)
  const [penumbra, setPenumbra] = useState(0.5)
  const [color, setColor] = useState("#f00")
  const [angle, setAngle] = useState(Math.PI / 6)
  const [decay, setDecay] = useState(0.2)

  useHelper(showHelper && spotRef as React.RefObject<THREE.Object3D>, THREE.SpotLightHelper)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("spot-light")! })
    const folder = gui.addFolder("Spot Light")

    folder.addColor({ color }, "color").onChange(setColor)
    folder.add({ intensity }, "intensity", 0, 10, 0.1).onChange(setIntensity)
    folder.add({ distance }, "distance", 0, 20, 0.1).onChange(setDistance)
    folder.add({ angle }, "angle", 0, Math.PI / 2, 0.01).onChange(setAngle)
    folder.add({ penumbra }, "penumbra", 0, 1, 0.01).onChange(setPenumbra)
    folder.add({ decay }, "decay", 0, 2, 0.1).onChange(setDecay)

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

      <spotLight
        ref={spotRef}
        args={[color, intensity, distance, angle, penumbra, decay]}
        position={position}
      />

      {showAmbient && <ambientLight intensity={0.2} />}
    </>
  )
}

export function SpotLight() {
  return (
    <Wrapper divId="spot-light">
      <SpotLightMesh />
    </Wrapper>
  )
}
