"use client";

import { useRef } from "react";
import { Canvas, CanvasProps, useFrame } from "@react-three/fiber";
import { Mesh as ThreeMesh } from 'three';

type commonProps = {
  useDefaultMaterial?: boolean
}

export function Mesh({ children, useDefaultMaterial = true }: readOnlychild & commonProps) {
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

export function Wrapper({ children, ...rest }: readOnlychild & CanvasProps) {
  return (
    <div className="h-96 border mt-4 rounded-lg shadow-sm">
      <Canvas {...rest}>
        {children}
      </Canvas>
    </div>
  )
}
