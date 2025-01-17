"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function BoxMesh() {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
      >
        <boxGeometry />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  )
}

function Page() {
  return (
    <div className='w-screen h-screen'>
      <Canvas
        camera={{
          fov: 75,
          position: [0, 0, 3],
        }}
      >
        <BoxMesh />
      </Canvas>
    </div>
  )
}

export default Page
