"use client"

import { useEffect, useRef, useState } from "react"
import { OrthographicCamera, useHelper } from "@react-three/drei"
import * as THREE from "three"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

function Camera() {
  const [left, setLeft] = useState(-2)
  const [right, setRight] = useState(2)
  const [top, setTop] = useState(2)
  const [bottom, setBottom] = useState(-2)
  const [near, setNear] = useState(0.1)
  const [far, setFar] = useState(100)

  const [showHelper, setShowHelper] = useState(true)

  const cameraRef = useRef<THREE.OrthographicCamera>(null)

  useHelper(showHelper && cameraRef as React.RefObject<THREE.OrthographicCamera>, THREE.CameraHelper)

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.left = left
      cameraRef.current.right = right
      cameraRef.current.top = top
      cameraRef.current.bottom = bottom
      cameraRef.current.near = near
      cameraRef.current.far = far
      cameraRef.current.updateProjectionMatrix()
    }
  }, [left, right, top, bottom, near, far])

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("orthographic")! })
    const folder = gui.addFolder("Orthographic Camera")

    folder.add({ left }, "left", -10, 0, 0.1).onChange(setLeft)
    folder.add({ right }, "right", 0, 10, 0.1).onChange(setRight)
    folder.add({ top }, "top", 0, 10, 0.1).onChange(setTop)
    folder.add({ bottom }, "bottom", -10, 0, 0.1).onChange(setBottom)
    folder.add({ near }, "near", 0.01, 10, 0.01).onChange(setNear)
    folder.add({ far }, "far", 10, 200, 1).onChange(setFar)
    folder.add({ showHelper }, "showHelper").onChange(setShowHelper)

    gui.close()
    return () => gui.destroy()
  }, [])

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 5]}
    />
  )
}

export function Orthographic() {
  return (
    <Wrapper divId="orthographic">
      <Mesh>
        <boxGeometry />
      </Mesh>

      <Camera />
    </Wrapper>
  )
}
