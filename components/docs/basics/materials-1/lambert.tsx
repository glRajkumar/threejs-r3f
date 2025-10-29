"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { keys, useMaterialGUI, useSceneGUI, useThemeTextures } from "./use-helpers"

import { Wrapper, useMesh } from "../wrapper"

function LambertMesh() {
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
  const [reflectivity, setReflectivity] = useState(1)
  const [refractionRatio, setRefractionRatio] = useState(1)
  const [combine, setCombine] = useState<0 | 1 | 2>(THREE.MultiplyOperation)

  const [maps, setMaps] = useState({
    map: 'none',
    alphaMap: 'none',
    envMap: 'none',
  })

  const textureMaps = useThemeTextures()
  const ref = useMesh()

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("lambert")! })
    createSceneGUI(gui)
    createMaterialGUI(gui)

    const folder = gui.addFolder("THREE.MeshLambertMaterial")
    folder.addColor({ color }, "color").onChange(setColor)
    folder.addColor({ emissive }, 'emissive').onChange(setEmissive)

    folder.add({ vertexColors }, 'vertexColors').onChange(setVertexColors)
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

    const material = ref.current.material as THREE.MeshLambertMaterial
    material.needsUpdate = true
  }, [fog, vertexColors])

  const updateTexture = (key: 'map' | 'alphaMap' | 'envMap', val: string) => {
    const textures = {
      bricks: textureMaps.map,
      fibers: textureMaps.alphaMap,
      reflection: textureMaps.reflectionCubeTexture,
      refraction: textureMaps.refractionCubeTexture,
    }

    setMaps((prev) => ({ ...prev, [key]: val }))

    if (!ref.current) return

    const material = ref.current.material as THREE.MeshLambertMaterial

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
        <meshLambertMaterial
          fog={fog}
          color={color}

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

      <ambientLight />
    </>
  )
}

export function Lambert() {
  return (
    <Wrapper divId="lambert">
      <LambertMesh />
    </Wrapper>
  )
}
