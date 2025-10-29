"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { keys, useSceneGUI, useThemeTextures } from "../materials-1/use-helpers"

import { Wrapper, useMesh } from "../wrapper"

function PhysicalMesh() {
  const {
    fogEnabled, fogColor,
    createSceneGUI,
  } = useSceneGUI()

  const [specular, setSpecular] = useState("#000")
  const [emissive, setEmissive] = useState("#000")
  const [sheenClr, setSheenClr] = useState("#000")
  const [color, setColor] = useState("#14b8a6")

  const [wireframe, setWireframe] = useState(false)
  const [fog, setFog] = useState(true)

  const [clearcoatRoughness, setClearcoatRoughness] = useState(0)
  const [specularIntensity, setSpecularIntensity] = useState(0)
  const [iridescenceIOR, setIridescenceIOR] = useState(1.5)
  const [sheenRoughness, setSheenRoughness] = useState(0)
  const [vertexColors, setVertexColors] = useState(false)
  const [reflectivity, setReflectivity] = useState(1)
  const [flatShading, setFlatShading] = useState(false)
  const [iridescence, setIridescence] = useState(0)
  const [roughness, setRoughness] = useState(1)
  const [metalness, setMetalness] = useState(0)
  const [clearcoat, setClearcoat] = useState(0)
  const [sheen, setSheen] = useState(0)
  const [ior, setIor] = useState(0)

  const [maps, setMaps] = useState({
    map: 'none',
    alphaMap: 'none',
    envMap: 'none',
    roughnessMap: 'none',
    metalnessMap: 'none',
    iridescenceMap: 'none',
  })

  const textureMaps = useThemeTextures()
  const ref = useMesh()

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("physical")! })
    createSceneGUI(gui)

    const folder = gui.addFolder("THREE.MeshPhysicalMaterial")
    folder.addColor({ specular }, "specular").onChange(setSpecular)
    folder.addColor({ emissive }, "emissive").onChange(setEmissive)
    folder.addColor({ sheenClr }, "sheenClr").onChange(setSheenClr)
    folder.addColor({ color }, "color").onChange(setColor)

    folder.add({ fog }, 'fog').onChange(setFog)

    folder.add({ wireframe }, "wireframe").onChange(setWireframe)
    folder.add({ roughness }, 'roughness', 0, 1).onChange(setRoughness)
    folder.add({ metalness }, 'metalness', 0, 1).onChange(setMetalness)
    folder.add({ flatShading }, 'flatShading').onChange(setFlatShading)
    folder.add({ vertexColors }, 'vertexColors').onChange(setVertexColors)

    folder.add({ clearcoat }, 'clearcoat', 0, 1, 0.01).onChange(setClearcoat)
    folder.add({ clearcoatRoughness }, 'clearcoatRoughness', 0, 1, 0.01).onChange(setClearcoatRoughness)
    folder.add({ specularIntensity }, 'specularIntensity', 0, 1).onChange(setSpecularIntensity)
    folder.add({ iridescence }, 'iridescence', 0, 1).onChange(setIridescence)
    folder.add({ iridescenceIOR }, 'iridescenceIOR', 1, 2.33).onChange(setIridescenceIOR)
    folder.add({ sheen }, 'sheen', 0, 1).onChange(setSheen)
    folder.add({ sheenRoughness }, 'sheenRoughness', 0, 1).onChange(setSheenRoughness)
    folder.add({ reflectivity }, 'reflectivity', 0, 1).onChange(setReflectivity)
    folder.add({ ior }, 'ior', 1, 2.33).onChange(setIor)

    folder.add(maps, 'map', keys.mapKeys).onChange((v: string) => updateTexture('map', v))
    folder.add(maps, 'envMap', keys.envMapKeys).onChange((v: string) => updateTexture('envMap', v))
    folder.add(maps, 'alphaMap', keys.alphaMapKeys).onChange((v: string) => updateTexture('alphaMap', v))
    folder.add(maps, 'roughnessMap', keys.roughnessMapKeys).onChange((v: string) => updateTexture('roughnessMap', v))
    folder.add(maps, 'metalnessMap', keys.metalnessMapKeys).onChange((v: string) => updateTexture('metalnessMap', v))
    folder.add(maps, 'iridescenceMap', keys.iridescenceMapKeys).onChange((v: string) => updateTexture('iridescenceMap', v))

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.MeshPhysicalMaterial
    material.needsUpdate = true
  }, [fog, flatShading, vertexColors])

  const updateTexture = (key: 'map' | 'alphaMap' | 'envMap' | 'roughnessMap' | 'metalnessMap' | 'iridescenceMap', val: string) => {
    const textures = {
      bricks: textureMaps.map,
      fibers: textureMaps.alphaMap,
      reflection: textureMaps.reflectionCubeTexture,
      refraction: textureMaps.refractionCubeTexture,
    }

    setMaps((prev) => ({ ...prev, [key]: val }))

    if (!ref.current) return

    const material = ref.current.material as THREE.MeshPhysicalMaterial

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
        <meshPhysicalMaterial
          fog={fog}
          color={color}
          wireframe={wireframe}

          emissive={emissive}
          sheenColor={sheenClr}
          specularColor={specular}

          ior={ior}
          sheen={sheen}
          roughness={roughness}
          metalness={metalness}
          clearcoat={clearcoat}
          reflectivity={reflectivity}
          flatShading={flatShading}
          iridescence={iridescence}
          vertexColors={vertexColors}
          iridescenceIOR={iridescenceIOR}
          sheenRoughness={sheenRoughness}
          specularIntensity={specularIntensity}
          clearcoatRoughness={clearcoatRoughness}
        />
      </mesh>
    </>
  )
}

export function Physical() {
  return (
    <Wrapper divId="physical">
      <PhysicalMesh />
    </Wrapper>
  )
}
