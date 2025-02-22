"use client";

import { Wrapper, Mesh } from "../wrapper";

export function PointLightShadow() {
  return (
    <Wrapper shadows>
      <Mesh><boxGeometry /></Mesh>
      <pointLight castShadow position={[2, 5, 2]} intensity={1} />
    </Wrapper>
  )
}

export function DirectionalLightShadow() {
  return (
    <Wrapper shadows>
      <Mesh><boxGeometry /></Mesh>
      <directionalLight castShadow position={[5, 10, 5]} intensity={1} />
    </Wrapper>
  )
}

export function SpotLightShadow() {
  return (
    <Wrapper shadows>
      <Mesh><boxGeometry /></Mesh>
      <spotLight castShadow position={[5, 10, 5]} intensity={1} />
    </Wrapper>
  )
}
