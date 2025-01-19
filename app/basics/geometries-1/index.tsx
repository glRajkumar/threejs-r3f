"use client";

import { Wrapper } from "../wrapper";

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
