"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { useMaterialGUI, useSceneGUI } from "./use-helpers"

import { Wrapper, useMesh } from "../wrapper"

function NormalMesh() {
  const {
    fogEnabled, fogColor,
    createSceneGUI,
  } = useSceneGUI()
  const {
    depthTest, depthWrite,
    alphaTest, alphaHash,
    transparent, opacity,
    visible, side,
    createMaterialGUI,
  } = useMaterialGUI()

  const [flatShading, setFlatShading] = useState(false)
  const [wireframe, setWireframe] = useState(false)
  const [color, setColor] = useState("#14b8a6")
  const [fog, setFog] = useState(true)

  const ref = useMesh()

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("normal")! })
    createSceneGUI(gui)
    createMaterialGUI(gui)

    const folder = gui.addFolder("THREE.MeshNormalMaterial")
    folder.addColor({ color }, "color").onChange(setColor)
    folder.add({ fog }, 'fog').onChange(setFog)

    folder.add({ wireframe }, "wireframe").onChange(setWireframe)
    folder.add({ flatShading }, 'flatShading').onChange(setFlatShading)
    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.MeshNormalMaterial
    material.needsUpdate = true
  }, [fog, flatShading])

  return (
    <>
      {
        fogEnabled && fog &&
        <fog attach="fog" args={[fogColor, 1, 10]} />
      }

      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshNormalMaterial
          wireframe={wireframe}

          flatShading={flatShading}

          side={side}
          opacity={opacity}
          visible={visible}
          alphaHash={alphaHash}
          alphaTest={alphaTest}
          depthTest={depthTest}
          depthWrite={depthWrite}
          transparent={transparent}
        />
      </mesh>
    </>
  )
}

export function Normal() {
  return (
    <Wrapper divId="normal">
      <NormalMesh />
    </Wrapper>
  )
}
