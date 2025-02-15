"use client";

import { useRef } from "react";
import { Canvas, CanvasProps, useFrame } from "@react-three/fiber";
import { Mesh as ThreeMesh } from 'three';

type commonProps = {
  useDefaultMaterial?: boolean
}

function Mesh({ children, useDefaultMaterial = true }: readOnlychild & commonProps) {
  const meshRef = useRef<ThreeMesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      {children}

      {
        useDefaultMaterial &&
        <meshBasicMaterial color="#14b8a6" />
      }
    </mesh>
  )
}

type props = readOnlychild & CanvasProps & commonProps

export function Wrapper({ children, useDefaultMaterial, ...rest }: props) {
  return (
    <div className="h-96 border mt-4 rounded-lg shadow">
      <Canvas {...rest}>
        <Mesh useDefaultMaterial={useDefaultMaterial}>
          {children}
        </Mesh>
      </Canvas>
    </div>
  )
}
