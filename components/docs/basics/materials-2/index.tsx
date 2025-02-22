"use client";

import { Wrapper, Mesh } from '../wrapper';

export function MeshPhysicalMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshPhysicalMaterial color="green" clearcoat={1.0} clearcoatRoughness={0.1} />
        <ambientLight intensity={0.5} />
      </Mesh>
    </Wrapper>
  )
}

export function MeshToonMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshToonMaterial color="blue" />
      </Mesh>
    </Wrapper>
  )
}

export function PointsMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        {/* <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={new Float32Array([0, 0, 0, 1, 1, 1, -1, -1, -1])} count={3} itemSize={3} />
      </bufferGeometry> */}
        <pointsMaterial color="magenta" size={0.1} />
      </Mesh>
    </Wrapper>
  )
}