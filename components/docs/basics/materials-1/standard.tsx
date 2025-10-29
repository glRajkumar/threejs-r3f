"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { keys, useMaterialGUI, useSceneGUI, useThemeTextures } from "./use-helpers"
import { Wrapper, useMesh } from "../wrapper"

function StandardMesh() {
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

  const [wireframe, setWireframe] = useState(false)
  const [emissive, setEmissive] = useState("#000")
  const [color, setColor] = useState("#14b8a6")
  const [fog, setFog] = useState(true)

  const [vertexColors, setVertexColors] = useState(false)
  const [flatShading, setFlatShading] = useState(false)
  const [roughness, setRoughness] = useState(1)
  const [metalness, setMetalness] = useState(0)

  const [maps, setMaps] = useState({
    map: 'none',
    alphaMap: 'none',
    envMap: 'none',
    roughnessMap: 'none',
    metalnessMap: 'none',
  })

  const textureMaps = useThemeTextures()
  const ref = useMesh()

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("standard")! })
    createSceneGUI(gui)
    createMaterialGUI(gui)

    const folder = gui.addFolder("THREE.MeshStandardMaterial")
    folder.addColor({ color }, "color").onChange(setColor)
    folder.addColor({ emissive }, 'emissive').onChange(setEmissive)

    folder.add({ fog }, 'fog').onChange(setFog)
    folder.add({ wireframe }, "wireframe").onChange(setWireframe)
    folder.add({ roughness }, 'roughness', 0, 1).onChange(setRoughness)
    folder.add({ metalness }, 'metalness', 0, 1).onChange(setMetalness)
    folder.add({ flatShading }, 'flatShading').onChange(setFlatShading)
    folder.add({ vertexColors }, 'vertexColors').onChange(setVertexColors)

    folder.add(maps, 'map', keys.mapKeys).onChange((v: string) => updateTexture('map', v))
    folder.add(maps, 'envMap', keys.envMapKeys).onChange((v: string) => updateTexture('envMap', v))
    folder.add(maps, 'alphaMap', keys.alphaMapKeys).onChange((v: string) => updateTexture('alphaMap', v))
    folder.add(maps, 'roughnessMap', keys.roughnessMapKeys).onChange((v: string) => updateTexture('roughnessMap', v))
    folder.add(maps, 'metalnessMap', keys.metalnessMapKeys).onChange((v: string) => updateTexture('metalnessMap', v))

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.MeshStandardMaterial
    material.needsUpdate = true
  }, [fog, flatShading, vertexColors, alphaHash, depthTest, depthWrite])

  const updateTexture = (key: 'map' | 'alphaMap' | 'envMap' | 'roughnessMap' | 'metalnessMap', val: string) => {
    const textures = {
      bricks: textureMaps.map,
      fibers: textureMaps.alphaMap,
      reflection: textureMaps.reflectionCubeTexture,
      refraction: textureMaps.refractionCubeTexture,
    }

    setMaps((prev) => ({ ...prev, [key]: val }))

    if (!ref.current) return

    const material = ref.current.material as THREE.MeshStandardMaterial

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
        <meshStandardMaterial
          fog={fog}
          side={side}
          color={color}
          opacity={opacity}
          visible={visible}
          emissive={emissive}
          roughness={roughness}
          metalness={metalness}
          alphaHash={alphaHash}
          alphaTest={alphaTest}
          depthTest={depthTest}
          wireframe={wireframe}
          depthWrite={depthWrite}
          transparent={transparent}
          flatShading={flatShading}
          vertexColors={vertexColors}
        />
      </mesh>

      <ambientLight />
      <pointLight position={[2, 2, 2]} />
    </>
  )
}

export function Standard() {
  return (
    <Wrapper divId="standard">
      <StandardMesh />
    </Wrapper>
  )
}
