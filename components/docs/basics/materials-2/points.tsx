"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { useSceneGUI } from "../materials-1/use-helpers"

import { Wrapper, useMesh } from "../wrapper"

function PointsMesh() {
  const {
    fogEnabled, fogColor,
    createSceneGUI,
  } = useSceneGUI()

  const [color, setColor] = useState("#14b8a6")
  const [fog, setFog] = useState(true)

  const ref = useMesh()

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("points")! })
    createSceneGUI(gui)

    const folder = gui.addFolder("THREE.PointsMaterial")
    folder.addColor({ color }, "color").onChange(setColor)
    folder.add({ fog }, 'fog').onChange(setFog)

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.PointsMaterial
    material.needsUpdate = true
  }, [fog])

  return (
    <>
      {
        fogEnabled && fog &&
        <fog attach="fog" args={[fogColor, 1, 10]} />
      }

      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <pointsMaterial
        />
      </mesh>
    </>
  )
}

export function Points() {
  return (
    <Wrapper divId="points">
      <PointsMesh />
    </Wrapper>
  )
}
