"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { keys, useSceneGUI, useThemeTextures } from "../materials-1/use-helpers"

import { Wrapper, useMesh } from "../wrapper"

function ToonMesh() {
  const {
    fogEnabled, fogColor,
    createSceneGUI,
  } = useSceneGUI()

  const [color, setColor] = useState("#14b8a6")
  const [fog, setFog] = useState(true)

  const [maps, setMaps] = useState({
    map: 'none',
    alphaMap: 'none',
    gradientMap: 'none'
  })

  const textureMaps = useThemeTextures()
  const ref = useMesh()

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("toon")! })
    createSceneGUI(gui)

    const folder = gui.addFolder("THREE.MeshToonMaterial")
    folder.addColor({ color }, "color").onChange(setColor)
    folder.add({ fog }, 'fog').onChange(setFog)

    folder.add(maps, 'map', keys.mapKeys).onChange((v: string) => updateTexture('map', v))
    folder.add(maps, 'gradientMap', keys.gradientMapKeys).onChange((v: string) => updateTexture('gradientMap', v))
    folder.add(maps, 'alphaMap', keys.alphaMapKeys).onChange((v: string) => updateTexture('alphaMap', v))

    gui.close()

    return () => gui.destroy()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.MeshToonMaterial
    material.needsUpdate = true
  }, [fog])

  const updateTexture = (key: 'map' | 'alphaMap' | 'gradientMap', val: string) => {
    const textures = {
      bricks: textureMaps.map,
      fibers: textureMaps.alphaMap,
      threeTone: textureMaps.threeToneGradientMap,
      fiveTone: textureMaps.fiveToneGradientMap,
    }

    setMaps((prev) => ({ ...prev, [key]: val }))

    if (!ref.current) return

    const material = ref.current.material as THREE.MeshToonMaterial

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
        <meshToonMaterial
          color={color}
          fog={fog}
        />
      </mesh>
    </>
  )
}

export function Toon() {
  return (
    <Wrapper divId="toon">
      <ToonMesh />
    </Wrapper>
  )
}
