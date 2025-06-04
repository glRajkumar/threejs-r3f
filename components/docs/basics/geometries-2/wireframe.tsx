"use client"

import * as THREE from 'three'

import { Wrapper, Mesh } from "../wrapper"

export function Wireframe() {
  return (
    <Wrapper>
      <Mesh useDefaultMaterial={false}>
        <lineSegments>
          <wireframeGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial color="#14b8a6" />
        </lineSegments>
      </Mesh>
    </Wrapper>
  )
}
