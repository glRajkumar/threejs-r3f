import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Floor() {
  const textures = useTexture({
    map: "/images/textures/grass/color.jpg",
    aoMap: "/images/textures/grass/ambientOcclusion.jpg",
    normalMap: "/images/textures/grass/normal.jpg",
    roughnessMap: "/images/textures/grass/roughness.jpg"
  })

  Object.values(textures).forEach(t => {
    t.repeat.set(8, 8)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
  })

  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial {...textures} />
    </mesh>
  )
}

/*
function Floor() {
  const [
    grassColor,
    grassAO,
    grassNormal,
    grassRoughness
  ] = useTexture([
    "/images/textures/grass/color.jpg",
    "/images/textures/grass/ambientOcclusion.jpg",
    "/images/textures/grass/normal.jpg",
    "/images/textures/grass/roughness.jpg"
  ])

  grassColor.repeat.set(8, 8)
  grassAO.repeat.set(8, 8)
  grassNormal.repeat.set(8, 8)
  grassRoughness.repeat.set(8, 8)

  grassColor.wrapS = grassAO.wrapS = grassNormal.wrapS = grassRoughness.wrapS = THREE.RepeatWrapping
  grassColor.wrapT = grassAO.wrapT = grassNormal.wrapT = grassRoughness.wrapT = THREE.RepeatWrapping

  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        map={grassColor}
        aoMap={grassAO}
        normalMap={grassNormal}
        roughnessMap={grassRoughness}
      />
    </mesh>
  )
}
*/

export default Floor
