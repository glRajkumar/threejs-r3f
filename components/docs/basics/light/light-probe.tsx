"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Environment } from "@react-three/drei"
import GUI from "lil-gui"

import { LightProbeHelper } from "three/addons/helpers/LightProbeHelper.js"

import { Box, Plane } from "./mesh"
import { Wrapper } from "../wrapper"

function LightProbeMesh() {
  const probeRef = useRef<THREE.LightProbe>(null)

  const [showAmbient, setShowAmbient] = useState(true)
  const [showHelper, setShowHelper] = useState(true)
  const [intensity, setIntensity] = useState(1)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("lightprobe-light")! })
    const folder = gui.addFolder("Light Probe")

    folder.add({ intensity }, "intensity", 0, 5, 0.1).onChange(setIntensity)

    const extra = gui.addFolder("Additionals")
    extra.add({ showAmbient }, "showAmbient").onChange(setShowAmbient)
    extra.add({ showHelper }, "showHelper").onChange(setShowHelper)

    folder.open()

    return () => gui.destroy()
  }, [])

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
      <Box />
      <Plane />

      <Environment preset="sunset" />

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
