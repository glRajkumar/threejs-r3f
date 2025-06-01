"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js"
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js"

import { Box, Plane } from "./mesh"
import { Wrapper } from "../wrapper"

function RectAreaLightMesh() {
  const rectRef = useRef<THREE.RectAreaLight>(null)

  const [showHelper, setShowHelper] = useState(true)
  const [showAmbient, setShowAmbient] = useState(true)

  const [position, setPosition] = useState<postionTuple>([0, 3, 2])
  const [rotation, setRotation] = useState<postionTuple>([-Math.PI / 2, 0, 0])

  const [intensity, setIntensity] = useState(5)
  const [height, setHeight] = useState(2)
  const [color, setColor] = useState("#ffffff")
  const [width, setWidth] = useState(4)

  useEffect(() => {
    RectAreaLightUniformsLib.init()
  }, [])

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("rectarea-light")! })
    const folder = gui.addFolder("RectArea Light")

    folder.addColor({ color }, "color").onChange(setColor)
    folder.add({ intensity }, "intensity", 0, 20, 0.1).onChange(setIntensity)
    folder.add({ width }, "width", 0.1, 10, 0.1).onChange(setWidth)
    folder.add({ height }, "height", 0.1, 10, 0.1).onChange(setHeight)

    const pos = { x: position[0], y: position[1], z: position[2] }
    const rot = { rx: rotation[0], ry: rotation[1], rz: rotation[2] }

    const posFolder = folder.addFolder("Position")
    posFolder.add(pos, "x", -10, 10, 0.1).onChange((v: number) =>
      setPosition(([_, y, z]) => [v, y, z])
    )
    posFolder.add(pos, "y", -10, 10, 0.1).onChange((v: number) =>
      setPosition(([x, _, z]) => [x, v, z])
    )
    posFolder.add(pos, "z", -10, 10, 0.1).onChange((v: number) =>
      setPosition(([x, y, _]) => [x, y, v])
    )

    const rotFolder = folder.addFolder("Rotation")
    rotFolder.add(rot, "rx", -Math.PI, Math.PI, 0.01).onChange((v: number) =>
      setRotation(([_, y, z]) => [v, y, z])
    )
    rotFolder.add(rot, "ry", -Math.PI, Math.PI, 0.01).onChange((v: number) =>
      setRotation(([x, _, z]) => [x, v, z])
    )
    rotFolder.add(rot, "rz", -Math.PI, Math.PI, 0.01).onChange((v: number) =>
      setRotation(([x, y, _]) => [x, y, v])
    )

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showHelper }, "showHelper").onChange(setShowHelper)
    additionalFolder.add({ showAmbient }, "showAmbient").onChange(setShowAmbient)

    folder.open()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (rectRef.current && showHelper) {
      const helper = new RectAreaLightHelper(rectRef.current)
      rectRef.current.add(helper)

      return () => {
        rectRef.current?.remove(helper)
        helper.dispose()
      }
    }
  }, [showHelper])

  return (
    <>
      <Box />
      <Plane />

      <rectAreaLight
        ref={rectRef}
        args={[color, intensity, width, height]}
        position={position}
        rotation={rotation}
      />

      {showAmbient && <ambientLight intensity={0.2} />}
    </>
  )
}

export function RectAreaLight() {
  return (
    <Wrapper divId="rectarea-light">
      <RectAreaLightMesh />
    </Wrapper>
  )
}
