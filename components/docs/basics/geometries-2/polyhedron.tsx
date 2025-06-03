// "use client"

// import { useEffect, useRef } from "react"
// import { useThree } from "@react-three/fiber"
// import { Mesh } from "three"
// import { Wrapper } from "../wrapper"
// import * as THREE from 'three'

// export function Polyhedron() {
//   const { scene } = useThree()
//   const meshRef = useRef<Mesh>(null)

//   useEffect(() => {
//     const vertices = [
//       1, 1, 1, -1, 1, 1,
//       -1, -1, 1, 1, -1, 1,
//       1, 1, -1, -1, 1, -1,
//       -1, -1, -1, 1, -1, -1
//     ]

//     const indices = [
//       2, 1, 0, 0, 3, 2,
//       0, 4, 7, 7, 3, 0,
//       4, 5, 6, 6, 7, 4,
//       5, 1, 2, 2, 6, 5,
//       5, 4, 0, 0, 1, 5,
//       2, 3, 7, 7, 6, 2
//     ]

//     const radius = 1
//     const detail = 0
//     const geometry = new THREE.PolyhedronGeometry(vertices, indices, radius, detail)
//     const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
//     const mesh = new THREE.Mesh(geometry, material)

//     scene.add(mesh)
//     meshRef.current = mesh

//     return () => {
//       scene.remove(mesh)
//       geometry.dispose()
//       material.dispose()
//     }
//   }, [scene])

//   return <Wrapper divId="polyhedron" />
// }



// "use client"

// import { useEffect, useState } from "react"
// import GUI from "lil-gui"
// import { Wrapper, Mesh } from "../wrapper"

// export function Polyhedron() {
//   const [radius, setRadius] = useState(1)

//   useEffect(() => {
//     const gui = new GUI({ container: document.getElementById("polyhedron")! })
//     gui.add({ radius }, "radius", 0.5, 2, 0.1).onChange(setRadius)
//     gui.close()
//     return () => gui.destroy()
//   }, [])

//   const vertices = [
//     1, 1, 1, -1, 1, 1,
//     -1, -1, 1, 1, -1, 1,
//     1, 1, -1, -1, 1, -1,
//     -1, -1, -1, 1, -1, -1
//   ]

//   const indices = [
//     2, 1, 0, 0, 3, 2,
//     0, 4, 7, 7, 3, 0,
//     4, 5, 6, 6, 7, 4,
//     5, 1, 2, 2, 6, 5,
//     5, 4, 0, 0, 1, 5,
//     2, 3, 7, 7, 6, 2
//   ]

//   return (
//     <Wrapper divId="polyhedron">
//       <Mesh>
//         <polyhedronGeometry args={[vertices, indices, radius, 0]} />
//         <meshStandardMaterial color="teal" wireframe={true} />
//       </Mesh>
//     </Wrapper>
//   )
// }







"use client"

import { useEffect, useState, useMemo } from "react"
import GUI from "lil-gui"
import { Wrapper, Mesh } from "../wrapper"

export function Polyhedron() {
  const [radius, setRadius] = useState(1)
  const [detail, setDetail] = useState(0)

  const [showWireframe, setShowWireframe] = useState(false)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("polyhedron")! })
    const folder = gui.addFolder("Polyhedron Geometry")

    folder.add({ radius }, "radius", 0.1, 5, 0.1).onChange(setRadius)
    folder.add({ detail }, "detail", 0, 5, 1).onChange(setDetail)

    const additionalFolder = gui.addFolder("Additionals")
    additionalFolder.add({ showWireframe }, "showWireframe").onChange(setShowWireframe)

    gui.close()

    return () => gui.destroy()
  }, [])

  const vertices = useMemo(() => [
    1, 1, 1, -1, 1, 1,
    -1, -1, 1, 1, -1, 1,
    1, 1, -1, -1, 1, -1,
    -1, -1, -1, 1, -1, -1
  ], [])

  const indices = useMemo(() => [
    2, 1, 0, 0, 3, 2,
    0, 4, 7, 7, 3, 0,
    4, 5, 6, 6, 7, 4,
    5, 1, 2, 2, 6, 5,
    5, 4, 0, 0, 1, 5,
    2, 3, 7, 7, 6, 2
  ], [])

  return (
    <Wrapper divId="polyhedron">
      <Mesh useDefaultMaterial={false}>
        <polyhedronGeometry args={[vertices, indices, radius, detail]} />

        <meshBasicMaterial
          color="#14b8a6"
          wireframe={showWireframe}
        />
      </Mesh>
    </Wrapper>
  )
}
