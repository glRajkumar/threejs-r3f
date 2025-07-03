"use client"

import { useEffect, useRef, useState } from "react"
import { CubeCamera, Environment } from "@react-three/drei"
import * as THREE from "three"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Cube() {
  const reflectiveMaterial = useRef<THREE.MeshStandardMaterial>(null!)

  const [metalness, setMetalness] = useState(1)
  const [roughness, setRoughness] = useState(0)
  const [frames, setFrames] = useState(Infinity)
  const [resolution, setResolution] = useState(256)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("cube")! })
    const matFolder = gui.addFolder("Material")
    matFolder.add({ metalness }, "metalness", 0, 1, 0.01).onChange(setMetalness)
    matFolder.add({ roughness }, "roughness", 0, 1, 0.01).onChange(setRoughness)

    const camFolder = gui.addFolder("Cube Camera")
    camFolder
      .add({ frames: frames === Infinity ? 0 : frames }, "frames", 0, 60, 1)
      .name("frames (0 = Inf)")
      .onChange((v: number) => setFrames(v === 0 ? Infinity : v))
    camFolder
      .add({ resolution }, "resolution", 16, 1024, 1)
      .onChange(setResolution)

    gui.close()
    return () => gui.destroy()
  }, [])

  return (
    <Wrapper divId="cube">
      <Mesh>
        <boxGeometry />
      </Mesh>

      <Environment preset="city" background />

      <CubeCamera position={[2, 0, 0]}>
        {(texture) => (
          <mesh position={[2, 0, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              ref={reflectiveMaterial}
              envMap={texture}
              metalness={metalness}
              roughness={roughness}
              envMapIntensity={1}
            />
          </mesh>
        )}
      </CubeCamera>
    </Wrapper>
  )
}
