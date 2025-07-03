"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { Wrapper, Mesh } from "../wrapper"

function Scene() {
  const stereoCameraRef = useRef<THREE.StereoCamera>(null)

  useEffect(() => {
    const camera = new THREE.StereoCamera()
    stereoCameraRef.current = camera
  }, [])

  useFrame(({ gl, scene, camera, size }) => {
    const stereo = stereoCameraRef.current
    if (!stereo) return

    stereo.update(camera as any)

    gl.setScissorTest(true)

    const halfWidth = size.width / 2
    const height = size.height

    gl.setViewport(0, 0, halfWidth, height)
    gl.setScissor(0, 0, halfWidth, height)
    gl.render(scene, stereo.cameraL)

    gl.setViewport(halfWidth, 0, halfWidth, height)
    gl.setScissor(halfWidth, 0, halfWidth, height)
    gl.render(scene, stereo.cameraR)

    gl.setScissorTest(false)
  }, 1)

  return (
    <Mesh>
      <boxGeometry />
    </Mesh>
  )
}

export function Stereo() {
  return (
    <Wrapper divId="stereo" gl={{ preserveDrawingBuffer: true }}>
      <Scene />
    </Wrapper>
  )
}
