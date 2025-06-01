"use client";

import { Wrapper, Mesh } from "../wrapper";

export * from "./direactional";

export function AmbientLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>

      <mesh
        position={[0, -1, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial />
      </mesh>
      <ambientLight intensity={1} />
    </Wrapper>
  )
}

export function HemisphereLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <hemisphereLight groundColor="green" intensity={0.6} />
    </Wrapper>
  )
}

export function LightProbe() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <lightProbe />
    </Wrapper>
  )
}

export function PointLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <pointLight position={[2, 3, 2]} intensity={1} distance={10} color="red" />
    </Wrapper>
  )
}

export function RectAreaLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <rectAreaLight width={4} height={2} intensity={2} color="white" />
    </Wrapper>
  )
}

export function SpotLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <spotLight position={[5, 10, 5]} intensity={1} />
    </Wrapper>
  )
}
