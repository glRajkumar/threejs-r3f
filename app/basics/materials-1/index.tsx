"use client";

import { Wrapper } from '../wrapper';

export function MeshBasicMaterial() {
  return (
    <Wrapper useDefaultMaterial={false}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshBasicMaterial color="blue" />
    </Wrapper>
  )
}

export function LineBasicMaterial() {
  return (
    <Wrapper useDefaultMaterial={false}>
      <line>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <lineBasicMaterial color="red" />
      </line>
    </Wrapper>
  )
}

export function LineDashedMaterial() {
  return (
    <Wrapper useDefaultMaterial={false}>
      <lineSegments>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <lineDashedMaterial
          color="green"
          dashSize={0.3}
          gapSize={0.3}
        />
      </lineSegments>
    </Wrapper>
  )
}

export function MeshStandardMaterial() {
  return (
    <Wrapper useDefaultMaterial={false}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshBasicMaterial color="blue" />
      <ambientLight intensity={5} />
      <pointLight position={[2, 2, 2]} />
    </Wrapper>
  )
}

export function MeshDepthMaterial() {
  return (
    <Wrapper useDefaultMaterial={false}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshDepthMaterial />
    </Wrapper>
  )
}

export function MeshDistanceMaterial() {
  return (
    <>
      {/* <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshDistanceMaterial /> */}

      {/* <mesh position={[-2, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial color="purple" />
      </mesh>

      <mesh position={[2, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshDistanceMaterial />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="white" />
      </mesh> */}
    </>
  )
}

export function MeshLambertMaterial() {
  return (
    <Wrapper useDefaultMaterial={false}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshLambertMaterial color="teal" />
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} />
    </Wrapper>
  )
}

export function MeshMatcapMaterial() {
  return (
    <Wrapper useDefaultMaterial={false}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshBasicMaterial color="blue" />
    </Wrapper>
  )
}

export function MeshNormalMaterial() {
  return (
    <Wrapper useDefaultMaterial={false}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshNormalMaterial />
    </Wrapper>
  )
}

export function MeshPhongMaterial() {
  return (
    <Wrapper useDefaultMaterial={false}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshPhongMaterial color="red" shininess={100} />
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} />
    </Wrapper>
  )
}