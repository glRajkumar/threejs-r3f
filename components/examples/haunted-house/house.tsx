import { useTexture } from '@react-three/drei';

function House() {
  const [
    doorColor,
    doorAlpha,
    doorAO,
    doorHeight,
    doorNormal,
    doorMetalness,
    doorRoughness,

    bricksColor,
    bricksAO,
    bricksNormal,
    bricksRoughness,
  ] = useTexture([
    "/images/textures/door/color.jpg",
    "/images/textures/door/alpha.jpg",
    "/images/textures/door/ambientOcclusion.jpg",
    "/images/textures/door/height.jpg",
    "/images/textures/door/normal.jpg",
    "/images/textures/door/metalness.jpg",
    "/images/textures/door/roughness.jpg",

    "/images/textures/bricks/color.jpg",
    "/images/textures/bricks/ambientOcclusion.jpg",
    "/images/textures/bricks/normal.jpg",
    "/images/textures/bricks/roughness.jpg",
  ])

  return (
    <group>
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[5, 4, 5]} />
        <meshStandardMaterial
          map={bricksColor}
          aoMap={bricksAO}
          normalMap={bricksNormal}
          roughnessMap={bricksRoughness}
        />
      </mesh>

      <mesh position={[0, 5, 0]} rotation-y={Math.PI * 0.25}>
        <coneGeometry args={[4, 2, 4]} />
        <meshStandardMaterial color="#b35f45" />
      </mesh>

      <mesh position={[0, 1.5, 2.51]}>
        <planeGeometry args={[2.2, 3, 100, 100]} />
        <meshStandardMaterial
          transparent
          map={doorColor}
          alphaMap={doorAlpha}
          aoMap={doorAO}
          displacementMap={doorHeight}
          displacementScale={0.1}
          normalMap={doorNormal}
          metalnessMap={doorMetalness}
          roughnessMap={doorRoughness}
        />
      </mesh>
    </group>
  )
}

export default House
