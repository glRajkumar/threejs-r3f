"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { keys, useMaterialGUI, useSceneGUI, useThemeTextures } from "./use-helpers"

import { Wrapper, useMesh } from "../wrapper"

function BasicMesh() {
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

  const [color, setColor] = useState("#14b8a6")
  const [wireframe, setWireframe] = useState(false)
  const [fog, setFog] = useState(true)
  const [reflectivity, setReflectivity] = useState(1)
  const [refractionRatio, setRefractionRatio] = useState(1)
  const [combine, setCombine] = useState<0 | 1 | 2>(THREE.MultiplyOperation)

  const [maps, setMaps] = useState({
    map: 'none',
    alphaMap: 'none',
    envMap: 'none'
  })

  const textureMaps = useThemeTextures()
  const ref = useMesh()

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("basic")! })
    createSceneGUI(gui)
    createMaterialGUI(gui)

    const folder = gui.addFolder("THREE.MeshBasicMaterial")
    folder.addColor({ color }, "color").onChange(setColor)
    folder.add({ wireframe }, "wireframe").onChange(setWireframe)
    folder.add({ fog }, 'fog').onChange(setFog)

    folder.add(maps, 'map', keys.mapKeys).onChange((v: string) => updateTexture('map', v))
    folder.add(maps, 'envMap', keys.envMapKeys).onChange((v: string) => updateTexture('envMap', v))
    folder.add(maps, 'alphaMap', keys.alphaMapKeys).onChange((v: string) => updateTexture('alphaMap', v))

    folder.add({ combine }, 'combine', keys.combineKeys).onChange(setCombine)
    folder.add({ reflectivity }, 'reflectivity', 0, 1).onChange(setReflectivity)
    folder.add({ refractionRatio }, 'refractionRatio', 0, 1).onChange(setRefractionRatio)

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.MeshBasicMaterial
    material.needsUpdate = true
  }, [combine, alphaHash, depthTest, depthWrite, fog])

  const updateTexture = (key: 'map' | 'alphaMap' | 'envMap', val: string) => {
    const textures = {
      bricks: textureMaps.map,
      fibers: textureMaps.alphaMap,
      reflection: textureMaps.reflectionCubeTexture,
      refraction: textureMaps.refractionCubeTexture,
    }

    setMaps((prev) => ({ ...prev, [key]: val }))

    if (!ref.current) return

    const material = ref.current.material as THREE.MeshBasicMaterial

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
        <meshBasicMaterial
          fog={fog}
          side={side}
          color={color}
          opacity={opacity}
          visible={visible}
          combine={combine}
          alphaHash={alphaHash}
          alphaTest={alphaTest}
          depthTest={depthTest}
          wireframe={wireframe}
          depthWrite={depthWrite}
          transparent={transparent}
          reflectivity={reflectivity}
          refractionRatio={refractionRatio}
        />
      </mesh>
    </>
  )
}

export function Basic() {
  return (
    <Wrapper divId="basic">
      <BasicMesh />
    </Wrapper>
  )
}