"use client";

export * from './basic';
export * from './line-basic';

import { Wrapper, Mesh } from '../wrapper';

export function MeshBasicMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshBasicMaterial color="blue" />
      </Mesh>
    </Wrapper>
  )
}

export function LineDashedMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <lineSegments>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <lineDashedMaterial
            color="green"
            dashSize={6}
            gapSize={3}
          />
        </lineSegments>
      </Mesh>
    </Wrapper>
  )
}

export function MeshStandardMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshBasicMaterial color="blue" />
        <ambientLight intensity={5} />
        <pointLight position={[2, 2, 2]} />
      </Mesh>
    </Wrapper>
  )
}

export function MeshDepthMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshDepthMaterial />
      </Mesh>
    </Wrapper>
  )
}

export function MeshDistanceMaterial() {
  return (
    <>

    </>
  )
}

export function MeshLambertMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshLambertMaterial color="teal" />
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} />
      </Mesh>
    </Wrapper>
  )
}

export function MeshMatcapMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshBasicMaterial color="blue" />
      </Mesh>
    </Wrapper>
  )
}

export function MeshNormalMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshNormalMaterial />
      </Mesh>
    </Wrapper>
  )
}

export function MeshPhongMaterial() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshPhongMaterial color="red" shininess={100} />
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} />
      </Mesh>
    </Wrapper>
  )
}