// "use client"

// import { useEffect, useRef } from "react"
// import { useThree } from "@react-three/fiber"
// import { Mesh } from "three"
// import * as THREE from 'three'
// import { Wrapper } from "../wrapper"

// export function Shape() {
//   const { scene } = useThree()
//   const meshRef = useRef<Mesh>(null)

//   useEffect(() => {
//     const shape = new THREE.Shape()
//     shape.moveTo(0, 0)
//     shape.lineTo(0, 1)
//     shape.lineTo(1, 1)
//     shape.lineTo(1, 0)
//     shape.lineTo(0, 0)

//     const geometry = new THREE.ShapeGeometry(shape)
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ffff })
//     const mesh = new THREE.Mesh(geometry, material)

//     scene.add(mesh)
//     meshRef.current = mesh

//     return () => {
//       scene.remove(mesh)
//       geometry.dispose()
//       material.dispose()
//     }
//   }, [scene])

//   return <Wrapper divId="shape" />
// }



// "use client"

// import { useEffect } from "react"
// import GUI from "lil-gui"
// import { Wrapper, Mesh } from "../wrapper"
// import * as THREE from "three"

// export function Shape() {
//   useEffect(() => {
//     const gui = new GUI({ container: document.getElementById("shape")! })
//     gui.close()
//     return () => gui.destroy()
//   }, [])

//   const shape = new THREE.Shape()
//   shape.moveTo(0, 0)
//   shape.lineTo(1, 0)
//   shape.lineTo(1, 1)
//   shape.lineTo(0.5, 1.5)
//   shape.lineTo(0, 1)
//   shape.lineTo(0, 0)

//   return (
//     <Wrapper divId="shape">
//       <Mesh>
//         <shapeGeometry args={[shape]} />
//         <meshStandardMaterial color="green" />
//       </Mesh>
//     </Wrapper>
//   )
// }





"use client"

import { useEffect, useState, useMemo } from "react"
import GUI from "lil-gui"
import * as THREE from "three"
import { Wrapper, Mesh } from "../wrapper"

export function Shape() {
  const [curveSegments, setCurveSegments] = useState(12)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("shape")! })
    gui.add({ curveSegments }, "curveSegments", 1, 64, 1).onChange(setCurveSegments)

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
    s.quadraticCurveTo(0.5, 1.5, 0, 1)
    s.lineTo(0, 0)
    return s
  }, [])

  return (
    <Wrapper divId="shape">
      <Mesh useDefaultMaterial={false}>
        <shapeGeometry args={[[shape], curveSegments]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
