"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh as MeshType } from 'three';

function Mesh({ children }: readOnlychild) {
  const meshRef = useRef<MeshType>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      {children}

      <meshBasicMaterial color="#14b8a6" />
    </mesh>
  )
}

function Wrapper({ children }: readOnlychild) {
  return (
    <div className="h-96 border mt-4 rounded-lg shadow">
      <Canvas>
        <Mesh>
          {children}
        </Mesh>
      </Canvas>
    </div>
  )
}

export function Box() {
  return (
    <Wrapper>
      <boxGeometry args={[1, 1, 1]} />
    </Wrapper>
  )
}

export function Sphere() {
  return (
    <Wrapper>
      <sphereGeometry args={[1, 32, 32]} />
    </Wrapper>
  )
}

export function Plane() {
  return (
    <Wrapper>
      <planeGeometry args={[3, 3]} />
    </Wrapper>
  )
}

export function Circle() {
  return (
    <Wrapper>
      <circleGeometry args={[1, 32]} />
    </Wrapper>
  )
}

export function Cone() {
  return (
    <Wrapper>
      <coneGeometry args={[1, 2, 32]} />
    </Wrapper>
  )
}

export function Cylinder() {
  return (
    <Wrapper>
      <cylinderGeometry args={[1, 1, 2, 32]} />
    </Wrapper>
  )
}

export function Torus() {
  return (
    <Wrapper>
      <torusGeometry args={[1, 0.4, 16, 100]} />
    </Wrapper>
  )
}

export function TorusKnot() {
  return (
    <Wrapper>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
    </Wrapper>
  )
}

export function Dodecahedron() {
  return (
    <Wrapper>
      <dodecahedronGeometry args={[1]} />
    </Wrapper>
  )
}

export function Icosahedron() {
  return (
    <Wrapper>
      <icosahedronGeometry args={[1]} />
    </Wrapper>
  )
}

export function Octahedron() {
  return (
    <Wrapper>
      <octahedronGeometry args={[1]} />
    </Wrapper>
  )
}

export function Tetrahedron() {
  return (
    <Wrapper>
      <tetrahedronGeometry args={[1]} />
    </Wrapper>
  )
}

export function Ring() {
  return (
    <Wrapper>
      <boxGeometry args={[1, 1, 1]} />
    </Wrapper>
  )
}
