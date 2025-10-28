"use client"

import { useEffect, useMemo, useState } from "react"
import * as THREE from "three"
import { Line } from "@react-three/drei"
import GUI from "lil-gui"

import { useMesh, Wrapper } from "../wrapper"
import { useSceneGUI } from "./use-helpers"

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

  const points = useMemo(() => {
    const torusKnot = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
    const edges = new THREE.EdgesGeometry(torusKnot)
    const positions = edges.attributes.position.array

    const pts: THREE.Vector3[] = []
    for (let i = 0; i < positions.length; i += 3) {
      pts.push(new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2]
      ))
    }
    return pts
  }, [])

  // const geometry = useMemo(() => {
  //   const torusKnot = new THREE.TorusKnotGeometry(10, 3, 100, 16)
  //   const edges = new THREE.EdgesGeometry(torusKnot)
  //   return edges
  // }, [])

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

      {/* <mesh ref={ref}>
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
      </mesh> */}

      <Line
        ref={ref as any}
        points={points}
        color={color}
        fog={fog}
        lineWidth={linewidth}
        dashed={true}
        dashSize={dashSize}
        gapSize={gapSize}
        dashScale={scale}
      />
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
