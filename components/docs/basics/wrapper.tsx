"use client";

import { useRef } from "react";
import { Canvas, CanvasProps, useFrame } from "@react-three/fiber";
import { Mesh as ThreeMesh } from 'three';

type commonProps = {
  useDefaultMaterial?: boolean
}

export function useMesh() {
  const meshRef = useRef<ThreeMesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01
    }
  })

  return meshRef
}

export function Mesh({ children, useDefaultMaterial = true }: readOnlychild & commonProps) {
  const meshRef = useMesh()

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

export function Wrapper({ children, divId, ...rest }: readOnlychild & CanvasProps & { divId?: string }) {
  return (
    <div className="canvas-wrapper h-96 border mt-4 rounded-lg shadow-sm relative" id={divId}>
      <Canvas {...rest}>
        {children}
      </Canvas>
    </div>
  )
}
