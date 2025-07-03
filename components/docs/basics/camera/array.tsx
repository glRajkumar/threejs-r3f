"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

import { Wrapper, Mesh } from "../wrapper"

function Scene() {
  const arrayCameraRef = useRef<THREE.ArrayCamera>(null)
  const { size } = useThree()

  const height = size.height
  const width = size.width
  const halfW = width / 2
  const halfH = height / 2

  if (!arrayCameraRef.current) {
    const cam1 = new THREE.PerspectiveCamera(50, halfW / halfH, 0.1, 100)
    cam1.position.set(5, 0, 0)
    cam1.lookAt(0, 0, 0)
    cam1.viewport = new THREE.Vector4(0, halfH, halfW, halfH)

    const cam2 = new THREE.PerspectiveCamera(50, halfW / halfH, 0.1, 100)
    cam2.position.set(0, 5, 0)
    cam2.lookAt(0, 0, 0)
    cam2.up.set(0, 0, -1)
    cam2.viewport = new THREE.Vector4(halfW, halfH, halfW, halfH)

    const cam3 = new THREE.PerspectiveCamera(50, halfW / halfH, 0.1, 100)
    cam3.position.set(0, 0, 5)
    cam3.lookAt(0, 0, 0)
    cam3.viewport = new THREE.Vector4(0, 0, halfW, halfH)

    const cam4 = new THREE.PerspectiveCamera(50, halfW / halfH, 0.1, 100)
    cam4.position.set(5, 0, 0)
    cam4.lookAt(0, 0, 0)
    cam4.viewport = new THREE.Vector4(halfW, 0, halfW, halfH)

    arrayCameraRef.current = new THREE.ArrayCamera([cam1, cam2, cam3, cam4])
  }

  useFrame((state) => {
    const { gl, scene } = state
    const camera = arrayCameraRef.current!
    gl.setScissorTest(true)

    for (const cam of camera.cameras) {
      const vp = cam?.viewport
      if (vp) {
        gl.setViewport(vp.x, vp.y, vp.z, vp.w)
        gl.setScissor(vp.x, vp.y, vp.z, vp.w)
        gl.render(scene, cam)
      }
    }

    gl.setScissorTest(false)
  }, 1)

  return (
    <Mesh>
      <boxGeometry />
    </Mesh>
  )
}

export function Array() {
  return (
    <Wrapper divId="array" gl={{ preserveDrawingBuffer: true }}>
      <Scene />
    </Wrapper>
  )
}
