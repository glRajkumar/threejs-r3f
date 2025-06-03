"use client"

import { useEffect, useRef, useState } from "react"
import { LightProbeGenerator } from "three/addons/lights/LightProbeGenerator.js"
import { LightProbeHelper } from "three/addons/helpers/LightProbeHelper.js"
import { useCubeTexture } from "@react-three/drei"
import * as THREE from "three"
import GUI from "lil-gui"

import { Wrapper } from "../wrapper"
import { Plane } from "./mesh"

function LightProbeMesh() {
  const probeRef = useRef<THREE.LightProbe>(null)

  const [showAmbient, setShowAmbient] = useState(true)
  const [showHelper, setShowHelper] = useState(true)
  const [intensity, setIntensity] = useState(1)

  const cubeTexture = useCubeTexture([
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png"
  ], { path: "/images/textures/pisa/" })

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("lightprobe-light")! })
    const folder = gui.addFolder("Light Probe")

    folder.add({ intensity }, "intensity", 0, 5, 0.1).onChange(setIntensity)

    const extra = gui.addFolder("Additionals")
    extra.add({ showAmbient }, "showAmbient").onChange(setShowAmbient)
    extra.add({ showHelper }, "showHelper").onChange(setShowHelper)

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (probeRef.current) {
      const generated = LightProbeGenerator.fromCubeTexture(cubeTexture)
      probeRef.current.copy(generated)
    }
  }, [cubeTexture])

  useEffect(() => {
    if (probeRef.current && showHelper) {
      const helper = new LightProbeHelper(probeRef.current)
      probeRef.current.add(helper)

      return () => {
        probeRef.current?.remove(helper)
        helper.dispose()
      }
    }
  }, [showHelper])

  return (
    <>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial
          metalness={0}
          roughness={0}
          envMap={cubeTexture}
        />
      </mesh>

      <Plane />

      <lightProbe ref={probeRef} intensity={intensity} />

      {showAmbient && <ambientLight intensity={0.1} />}
    </>
  )
}

export function LightProbe() {
  return (
    <Wrapper divId="lightprobe-light">
      <LightProbeMesh />
    </Wrapper>
  )
}
