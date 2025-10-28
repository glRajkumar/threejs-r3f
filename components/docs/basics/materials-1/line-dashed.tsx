"use client"

import { useEffect, useMemo, useState } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { useSceneGUI } from "./use-helpers"
import { useMesh, Wrapper } from "../wrapper"

function LineDashedMesh() {
  const {
    fogEnabled, fogColor,
    createSceneGUI,
  } = useSceneGUI()

  const [color, setColor] = useState("#f97316")
  const [fog, setFog] = useState(true)
  const [linewidth, setLineWidth] = useState(1)
  const [dashSize, setDashSize] = useState(0.5)
  const [gapSize, setGapSize] = useState(0.2)
  const [scale, setScale] = useState(1)

  const ref = useMesh()

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("line-dashed")! })
    createSceneGUI(gui)

    const folder = gui.addFolder("THREE.LineDashedMaterial")
    folder.addColor({ color }, "color").onChange(setColor)
    folder.add({ fog }, 'fog').onChange(setFog)
    folder.add({ linewidth }, 'linewidth', 1, 10, 0.1).onChange(setLineWidth)
    folder.add({ dashSize }, 'dashSize', 0.1, 2).onChange(setDashSize)
    folder.add({ gapSize }, 'gapSize', 0.1, 2).onChange(setGapSize)
    folder.add({ scale }, 'scale', 0.1, 5).onChange(setScale)

    gui.close()

    return () => gui.destroy()
  }, [])

  const geometry = useMemo(() => {
    const torusKnot = new THREE.TorusKnotGeometry(10, 3, 100, 16)
    const edges = new THREE.EdgesGeometry(torusKnot)
    return edges
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const material = ref.current.material as THREE.LineBasicMaterial
    material.needsUpdate = true
  }, [fog])

  return (
    <>
      {
        fogEnabled && fog &&
        <fog attach="fog" args={[fogColor, 1, 10]} />
      }

      <mesh ref={ref}>
        {/* @ts-ignore */}
        <line geometry={geometry} onUpdate={v => v?.computeLineDistances()}>
          <lineDashedMaterial
            fog={fog}
            color={color}
            linewidth={linewidth}
            dashSize={dashSize}
            gapSize={gapSize}
            scale={scale}
          />
        </line>
      </mesh>
    </>
  )
}

export function LineDashed() {
  return (
    <Wrapper divId="line-dashed">
      <LineDashedMesh />
    </Wrapper>
  )
}
