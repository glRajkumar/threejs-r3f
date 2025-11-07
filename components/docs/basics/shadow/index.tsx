"use client";

import { Wrapper, Mesh } from "../wrapper";

export function PointLightShadow() {
  return (
    <Wrapper divId="shadow-point" shadows>
      <Mesh><boxGeometry /></Mesh>
      <pointLight castShadow position={[2, 5, 2]} intensity={1} />
    </Wrapper>
  )
}

export function DirectionalLightShadow() {
  return (
    <Wrapper divId="shadow-directional" shadows>
      <Mesh><boxGeometry /></Mesh>
      <directionalLight castShadow position={[5, 10, 5]} intensity={1} />
    </Wrapper>
  )
}

export function SpotLightShadow() {
  return (
    <Wrapper divId="shadow-spot" shadows>
      <Mesh><boxGeometry /></Mesh>
      <spotLight castShadow position={[5, 10, 5]} intensity={1} />
    </Wrapper>
  )
}
