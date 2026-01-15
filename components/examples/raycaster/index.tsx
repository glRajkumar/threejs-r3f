"use client"

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const object1 = useRef<THREE.Mesh>(null!)
  const object2 = useRef<THREE.Mesh>(null!)
  const object3 = useRef<THREE.Mesh>(null!)

  const clock = useRef(new THREE.Clock())

  // const ray = useMemo(() => {
  //   const origin = new THREE.Vector3(- 3, 0, 0)
  //   const direction = new THREE.Vector3(10, 0, 0)
  //   direction.normalize()
  //   return { origin, direction }
  // }, [])

  useFrame(({ raycaster, pointer, camera }) => {
    const elapsedTime = clock.current.getElapsedTime()

    object1.current.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.current.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.current.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // raycaster.set(ray.origin, ray.direction)
    raycaster.setFromCamera(pointer, camera)

    const list = [
      object1.current,
      object2.current,
      object3.current
    ]
    const intersects = raycaster.intersectObjects(list)

    list.forEach(item => {
      if (item === intersects?.[0]?.object) {
        (item.material as any).color.set('#0000ff')
      } else {
        (item.material as any).color.set('#ff0000')
      }
    })
  })

  return (
    <>
      <mesh ref={object1} position={[-2, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>

      <mesh ref={object2}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>

      <mesh ref={object3} position={[2, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  )
}

function RayCaster() {
  return (
    <div className='-m-6 md:-m-8 h-screen bg-black/90'>
      <Canvas camera={{ fov: 75, position: [0, 0, 3] }}>
        <Scene />
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  )
}

export default RayCaster
