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
  const [fogEnabled, setFogEnabled] = useState(false)
  const [fogColor, setFogColor] = useState("#ff0000")

  const [depthTest, setDepthTest] = useState(true)
  const [depthWrite, setDepthWrite] = useState(true)
  const [alphaTest, setAlphaTest] = useState(0)
  const [alphaHash, setAlphaHash] = useState(false)
  const [transparent, setTransparent] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const [visible, setVisible] = useState(true)
  const [side, setSide] = useState<0 | 1 | 2>(THREE.FrontSide)

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

    const folder = gui.addFolder("Scene")

    folder.add({ fogEnabled }, "fogEnabled").onChange(setFogEnabled)
    folder.addColor({ fogColor }, "fogColor").onChange(setFogColor)

    const folder1 = gui.addFolder("THREE.Material")
    folder1.add({ transparent }, "transparent").onChange(setTransparent)
    folder1.add({ opacity }, "opacity", 0, 1, 0.01).onChange(setOpacity)
    folder.add({ depthTest }, 'depthTest').onChange(setDepthTest)
    folder.add({ depthWrite }, 'depthWrite').onChange(setDepthWrite)
    folder.add({ alphaTest }, 'alphaTest', 0, 1, 0.01).onChange(setAlphaTest)
    folder.add({ alphaHash }, 'alphaHash').onChange(setAlphaHash)
    folder1.add({ visible }, "visible").onChange(setVisible)
    folder1
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

    folder2.add({ combine }, 'combine', combineKeys).onChange(setCombine)
    folder2.add({ reflectivity }, 'reflectivity', 0, 1).onChange(setReflectivity)
    folder2.add({ refractionRatio }, 'refractionRatio', 0, 1).onChange(setRefractionRatio)

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.MeshBasicMaterial
    material.needsUpdate = true
  }, [combine, alphaHash, depthTest, depthWrite, fog])

  const refractionCubeTexture = reflectionCubeTexture.clone()
  refractionCubeTexture.mapping = THREE.CubeRefractionMapping

  Object.values(textureMaps).forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(9, 1)
  })

  const updateTexture = (key: 'map' | 'alphaMap' | 'envMap', val: string) => {
    const textures = {
      bricks: textureMaps.map,
      fibers: textureMaps.alphaMap,
      reflection: reflectionCubeTexture,
      refraction: refractionCubeTexture,
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