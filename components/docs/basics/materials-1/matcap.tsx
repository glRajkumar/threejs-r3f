"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { keys, useMaterialGUI, useSceneGUI, useThemeTextures } from "./use-helpers"

import { Wrapper, useMesh } from "../wrapper"

function MatcapMesh() {
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
  const [color, setColor] = useState("#14b8a6")
  const [fog, setFog] = useState(true)

  const [maps, setMaps] = useState({
    matcap: 'none',
    alphaMap: 'none',
  })

  const textureMaps = useThemeTextures()
  const ref = useMesh()

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("matcap")! })
    createSceneGUI(gui)
    createMaterialGUI(gui)

    const folder = gui.addFolder("THREE.MeshMatcapMaterial")
    folder.addColor({ color }, "color").onChange(setColor)
    folder.add({ fog }, 'fog').onChange(setFog)

    folder.add({ flatShading }, 'flatShading').onChange(setFlatShading)

    folder.add(maps, 'matcap', keys.mapKeys).onChange((v: string) => updateTexture('matcap', v))
    folder.add(maps, 'alphaMap', keys.alphaMapKeys).onChange((v: string) => updateTexture('alphaMap', v))

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.MeshMatcapMaterial
    material.needsUpdate = true
  }, [fog])

  const updateTexture = (key: 'matcap' | 'alphaMap', val: string) => {
    const textures = {
      porcelainWhite: textureMaps.matcap,
      fibers: textureMaps.alphaMap,
    }

    setMaps((prev) => ({ ...prev, [key]: val }))

    if (!ref.current) return

    const material = ref.current.material as THREE.MeshMatcapMaterial

    if (val === 'none') {
      material[key] = null
      return
    }

    material[key] = textures[val as keyof typeof textures]
    material.needsUpdate = true
  }

  return (
    <>
      {
        fogEnabled && fog &&
        <fog attach="fog" args={[fogColor, 1, 10]} />
      }

      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshMatcapMaterial
          fog={fog}
          color={color}

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

export function Matcap() {
  return (
    <Wrapper divId="matcap">
      <MatcapMesh />
    </Wrapper>
  )
}
