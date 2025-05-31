"use client"

import { useTexture } from "@react-three/drei";

import { Wrapper, useMesh } from "../wrapper";

type props = {
  img: string
  position: any
}

function Text({ img, position }: props) {
  const meshRef = useMesh()
  const texture = useTexture(img)

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

export function Boxes() {
  return (
    <Wrapper>
      <Text
        img="/images/textures/brick/bump.jpg"
        position={[-4, 0, 0]}
      />
      <Text
        img="/images/textures/brick/diffuse.jpg"
        position={[0, 0, 0]}
      />
      <Text
        img="/images/textures/brick/roughness.jpg"
        position={[4, 0, 0]}
      />
    </Wrapper>
  )
}
