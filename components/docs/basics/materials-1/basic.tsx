"use client"

import { useEffect, useState } from "react"
import { useCubeTexture, useTexture } from "@react-three/drei"
import * as THREE from "three"
import GUI from "lil-gui"

import { Wrapper, useMesh } from "../wrapper"

const mapKeys = {
  none: null,
  bricks: "bricks",
}

const envMapKeys = {
  none: null,
  reflection: "reflection",
  refraction: "refraction",
}

const alphaMapKeys = {
  none: null,
  fibers: "fibers",
}

const combineKeys = {
  'THREE.MultiplyOperation': THREE.MultiplyOperation,
  'THREE.MixOperation': THREE.MixOperation,
  'THREE.AddOperation': THREE.AddOperation
}

function BasicMesh() {
  const [transparent, setTransparent] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const [visible, setVisible] = useState(true)
  const [side, setSide] = useState<0 | 1 | 2>(THREE.FrontSide)

  const [color, setColor] = useState("#14b8a6")
  const [wireframe, setWireframe] = useState(false)
  const [fog, setFog] = useState(false)
  const [reflectivity, setReflectivity] = useState(0)
  const [refractionRatio, setRefractionRatio] = useState(0)
  const [combine, setCombine] = useState<0 | 1 | 2>(THREE.MultiplyOperation)

  const [maps, setMaps] = useState({
    map: 'none',
    alphaMap: 'none',
    envMap: 'none'
  })

  const ref = useMesh()

  const reflectionCubeTexture = useCubeTexture([
    "px.jpg",
    "nx.jpg",
    "py.jpg",
    "ny.jpg",
    "pz.jpg",
    "nz.jpg"
  ], { path: "/images/textures/SwedishRoyalCastle/" })

  const textureMaps = useTexture({
    map: `/images/textures/brick/diffuse.jpg`,
    alphaMap: `/images/textures/alphaMap.jpg`,
  })

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("basic")! })

    const folder = gui.addFolder("THREE.Material")
    folder.add({ transparent }, "transparent").onChange(setTransparent)
    folder.add({ opacity }, "opacity", 0, 1, 0.01).onChange(setOpacity)
    folder.add({ visible }, "visible").onChange(setVisible)
    folder
      .add({ side }, "side", {
        Front: THREE.FrontSide,
        Back: THREE.BackSide,
        Double: THREE.DoubleSide
      })
      .onChange((value: number) => {
        setSide(value as 0 | 1 | 2)
      })

    const folder2 = gui.addFolder("THREE.MeshBasicMaterial")
    folder2.addColor({ color }, "color").onChange(setColor)
    folder2.add({ wireframe }, "wireframe").onChange(setWireframe)
    folder2.add({ fog }, 'fog').onChange(setFog)

    folder2.add(maps, 'envMap', envMapKeys).onChange((v: string) => updateTexture('envMap', v))
    folder2.add(maps, 'map', mapKeys).onChange((v: string) => updateTexture('map', v))
    folder2.add(maps, 'alphaMap', alphaMapKeys).onChange((v: string) => updateTexture('alphaMap', v))

    folder2.add({ combine }, 'combine', combineKeys).onChange((value: number) => setCombine(value as 0 | 1 | 2))
    folder2.add({ reflectivity }, 'reflectivity', 0, 1).onChange(setReflectivity)
    folder2.add({ refractionRatio }, 'refractionRatio', 0, 1).onChange(setRefractionRatio)

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.MeshBasicMaterial
    material.needsUpdate = true
  }, [combine, maps])

  const refractionCubeTexture = reflectionCubeTexture.clone()
  refractionCubeTexture.mapping = THREE.CubeRefractionMapping

  Object.values(textureMaps).forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(9, 1)
  })

  const textures = {
    bricks: textureMaps.map,
    fibers: textureMaps.alphaMap,
    reflection: reflectionCubeTexture,
    refraction: refractionCubeTexture,
  }

  const updateTexture = (key: 'map' | 'alphaMap' | 'envMap', val: string) => {
    setMaps((prev) => ({ ...prev, [key]: val }))

    if (!ref.current) return

    const material = ref.current.material as THREE.MeshBasicMaterial

    if (val === 'none') {
      material[key] = null
      return
    }

    material[key] = textures[val as keyof typeof textures]
  }

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshBasicMaterial
        color={color}
        wireframe={wireframe}
        transparent={transparent}
        opacity={opacity}
        visible={visible}
        side={side}
        reflectivity={reflectivity}
        refractionRatio={refractionRatio}
        combine={combine}
      />
    </mesh>
  )
}

export function Basic() {
  return (
    <Wrapper divId="basic">
      <BasicMesh />
    </Wrapper>
  )
}