// "use client"

// import { useEffect, useRef } from "react"
// import { useThree } from "@react-three/fiber"
// import { Mesh } from "three"
// import { Wrapper } from "../wrapper"
// import * as THREE from 'three'

// export function Extrude() {
//   const { scene } = useThree()
//   const meshRef = useRef<Mesh>(null)

//   useEffect(() => {
//     const shape = new THREE.Shape()
//     shape.moveTo(0, 0)
//     shape.lineTo(0, 1)
//     shape.lineTo(1, 1)
//     shape.lineTo(1, 0)
//     shape.lineTo(0, 0)

//     const extrudeSettings = {
//       steps: 2,
//       depth: 1,
//       bevelEnabled: true,
//       bevelThickness: 0.1,
//       bevelSize: 0.1,
//       bevelOffset: 0,
//       bevelSegments: 1
//     }

//     const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
//     const mesh = new THREE.Mesh(geometry, material)
//     scene.add(mesh)
//     meshRef.current = mesh

//     return () => {
//       scene.remove(mesh)
//       geometry.dispose()
//       material.dispose()
//     }
//   }, [scene])

//   return <Wrapper divId="extrude" />
// }


// "use client"

// import { useEffect, useState } from "react"
// import GUI from "lil-gui"
// import { Wrapper, Mesh } from "../wrapper"
// import * as THREE from "three"

// export function Extrude() {
//   const [depth, setDepth] = useState(1)

//   useEffect(() => {
//     const gui = new GUI({ container: document.getElementById("extrude")! })
//     gui.add({ depth }, "depth", 0.1, 5, 0.1).onChange(setDepth)
//     gui.close()
//     return () => gui.destroy()
//   }, [])

//   const shape = new THREE.Shape()
//   shape.moveTo(0, 0)
//   shape.lineTo(0, 1)
//   shape.lineTo(1, 1)
//   shape.lineTo(1, 0)
//   shape.lineTo(0, 0)

//   const extrudeSettings = {
//     steps: 2,
//     depth,
//     bevelEnabled: true,
//     bevelThickness: 0.1,
//     bevelSize: 0.1,
//     bevelOffset: 0,
//     bevelSegments: 1,
//   }

//   return (
//     <Wrapper divId="extrude">
//       <Mesh>
//         <extrudeGeometry args={[shape, extrudeSettings]} />
//         <meshStandardMaterial color="orange" />
//       </Mesh>
//     </Wrapper>
//   )
// }





"use client"

import { useEffect, useState, useMemo } from "react"
import * as THREE from "three"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper"

export function Extrude() {
  const [curveSegments, setCurveSegments] = useState(12)
  const [steps, setSteps] = useState(1)
  const [depth, setDepth] = useState(1)
  const [bevelEnabled, setBevelEnabled] = useState(true)
  const [bevelThickness, setBevelThickness] = useState(0.2)
  const [bevelSize, setBevelSize] = useState(0.1)
  const [bevelOffset, setBevelOffset] = useState(0)
  const [bevelSegments, setBevelSegments] = useState(3)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("extrude")! })
    const folder = gui.addFolder("Extrude Geometry")

    folder.add({ curveSegments }, "curveSegments", 1, 50, 1).onChange(setCurveSegments)
    folder.add({ steps }, "steps", 1, 20, 1).onChange(setSteps)
    folder.add({ depth }, "depth", 0.1, 5, 0.1).onChange(setDepth)
    folder.add({ bevelEnabled }, "bevelEnabled").onChange(setBevelEnabled)
    folder.add({ bevelThickness }, "bevelThickness", 0, 1, 0.01).onChange(setBevelThickness)
    folder.add({ bevelSize }, "bevelSize", 0, 1, 0.01).onChange(setBevelSize)
    folder.add({ bevelOffset }, "bevelOffset", 0, 1, 0.01).onChange(setBevelOffset)
    folder.add({ bevelSegments }, "bevelSegments", 0, 10, 1).onChange(setBevelSegments)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0)
    s.lineTo(1, 0)
    s.lineTo(1, 1)
    s.lineTo(0.5, 1.5)
    s.lineTo(0, 1)
    s.lineTo(0, 0)
    return s
  }, [])

  return (
    <Wrapper divId="extrude">
      <Mesh useDefaultMaterial={false}>
        <extrudeGeometry
          args={[[shape], {
            curveSegments,
            steps,
            depth,
            bevelEnabled,
            bevelThickness,
            bevelSize,
            bevelOffset,
            bevelSegments,
          }]}
        />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
