import { useState } from "react"
import { useCubeTexture, useTexture } from "@react-three/drei"
import * as THREE from "three"
import GUI from "lil-gui"

export const keys = {
  mapKeys: {
    none: null,
    bricks: "bricks",
  },
  envMapKeys: {
    none: null,
    reflection: "reflection",
    refraction: "refraction",
  },
  alphaMapKeys: {
    none: null,
    fibers: "fibers",
  },
  combineKeys: {
    'THREE.MultiplyOperation': THREE.MultiplyOperation,
    'THREE.MixOperation': THREE.MixOperation,
    'THREE.AddOperation': THREE.AddOperation
  }
}

export function useSceneGUI() {
  const [fogEnabled, setFogEnabled] = useState(false)
  const [fogColor, setFogColor] = useState("#ff0000")

  function createSceneGUI(gui: GUI) {
    const folder = gui.addFolder("Scene")

    folder.add({ fogEnabled }, "fogEnabled").onChange(setFogEnabled)
    folder.addColor({ fogColor }, "fogColor").onChange(setFogColor)
  }

  return {
    fogEnabled, fogColor,
    createSceneGUI,
  }
}

export function useMaterialGUI() {
  const [depthTest, setDepthTest] = useState(true)
  const [depthWrite, setDepthWrite] = useState(true)
  const [alphaTest, setAlphaTest] = useState(0)
  const [alphaHash, setAlphaHash] = useState(false)
  const [transparent, setTransparent] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const [visible, setVisible] = useState(true)
  const [side, setSide] = useState<0 | 1 | 2>(THREE.FrontSide)

  function createMaterialGUI(gui: GUI) {
    const materialFolder = gui.addFolder("THREE.Material")
    materialFolder.add({ transparent }, "transparent").onChange(setTransparent)
    materialFolder.add({ opacity }, "opacity", 0, 1, 0.01).onChange(setOpacity)
    materialFolder.add({ depthTest }, 'depthTest').onChange(setDepthTest)
    materialFolder.add({ depthWrite }, 'depthWrite').onChange(setDepthWrite)
    materialFolder.add({ alphaTest }, 'alphaTest', 0, 1, 0.01).onChange(setAlphaTest)
    materialFolder.add({ alphaHash }, 'alphaHash').onChange(setAlphaHash)
    materialFolder.add({ visible }, "visible").onChange(setVisible)
    materialFolder
      .add({ side }, "side", {
        Front: THREE.FrontSide,
        Back: THREE.BackSide,
        Double: THREE.DoubleSide
      })
      .onChange((value: number) => {
        setSide(value as 0 | 1 | 2)
      })
  }

  return {
    depthTest, depthWrite,
    alphaTest, alphaHash,
    transparent, opacity,
    visible, side,
    createMaterialGUI,
  }
}

export function useThemeTextures() {
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

  const refractionCubeTexture = reflectionCubeTexture.clone()
  refractionCubeTexture.mapping = THREE.CubeRefractionMapping

  Object.values(textureMaps).forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(9, 1)
  })

  return {
    ...textureMaps,
    reflectionCubeTexture,
    refractionCubeTexture,
  }
}