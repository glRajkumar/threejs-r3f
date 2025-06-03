"use client"

import * as THREE from 'three'

import { Wrapper, Mesh } from "../wrapper"

export function Edges() {
  return (
    <Wrapper>
      <Mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial color="white" />
        </lineSegments>
      </Mesh>
    </Wrapper>
  )
}

