"use client";

import { Wrapper, Mesh } from "../wrapper";

export function Box() {
  return (
    <Wrapper>
      <Mesh>
        <boxGeometry args={[1, 1, 1]} />
      </Mesh>
    </Wrapper>
  )
}

export function Sphere() {
  return (
    <Wrapper>
      <Mesh>
        <sphereGeometry args={[1, 32, 32]} />
      </Mesh>
    </Wrapper>
  )
}

export function Plane() {
  return (
    <Wrapper>
      <Mesh>
        <planeGeometry args={[3, 3]} />
      </Mesh>
    </Wrapper>
  )
}

export function Circle() {
  return (
    <Wrapper>
      <Mesh>
        <circleGeometry args={[1, 32]} />
      </Mesh>
    </Wrapper>
  )
}

export function Cone() {
  return (
    <Wrapper>
      <Mesh>
        <coneGeometry args={[1, 2, 32]} />
      </Mesh>
    </Wrapper>
  )
}

export function Cylinder() {
  return (
    <Wrapper>
      <Mesh>
        <cylinderGeometry args={[1, 1, 2, 32]} />
      </Mesh>
    </Wrapper>
  )
}

export function Torus() {
  return (
    <Wrapper>
      <Mesh>
        <torusGeometry args={[1, 0.4, 16, 100]} />
      </Mesh>
    </Wrapper>
  )
}

export function TorusKnot() {
  return (
    <Wrapper>
      <Mesh>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      </Mesh>
    </Wrapper>
  )
}

export function Dodecahedron() {
  return (
    <Wrapper>
      <Mesh>
        <dodecahedronGeometry args={[1]} />
      </Mesh>
    </Wrapper>
  )
}

export function Icosahedron() {
  return (
    <Wrapper>
      <Mesh>
        <icosahedronGeometry args={[1]} />
      </Mesh>
    </Wrapper>
  )
}
