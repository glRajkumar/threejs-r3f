"use client"

import { useEffect, useRef, useState } from "react"
import { PerspectiveCamera, useHelper } from "@react-three/drei"
import * as THREE from "three"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

function Camera() {
  const [fov, setFov] = useState(75)
  const [near, setNear] = useState(0.1)
  const [far, setFar] = useState(100)
  const [aspect, setAspect] = useState(16 / 9)

  const [showHelper, setShowHelper] = useState(true)

  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useHelper(showHelper && cameraRef as React.RefObject<THREE.PerspectiveCamera>, THREE.CameraHelper)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("perspective")! })

    const folder = gui.addFolder("Perspective Camera")

    folder.add({ fov }, "fov", 10, 120, 1).onChange(setFov)
    folder.add({ near }, "near", 0.01, 10, 0.01).onChange(setNear)
    folder.add({ far }, "far", 10, 200, 1).onChange(setFar)
    folder.add({ aspect }, "aspect", 0.5, 3, 0.01).onChange(setAspect)

    const addFolder = gui.addFolder("Additionals")

    addFolder.add({ showHelper }, "showHelper")
      .onChange(setShowHelper)

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.aspect = aspect
      cameraRef.current.updateProjectionMatrix()
    }
  }, [aspect])

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={fov}
      near={near}
      far={far}
      aspect={aspect}
      position={[0, 0, 5]}
    />
  )
}

export function Perspective() {
  return (
    <Wrapper divId="perspective">
      <Mesh>
        <boxGeometry />
      </Mesh>

      <Camera />
    </Wrapper>
  )
}
