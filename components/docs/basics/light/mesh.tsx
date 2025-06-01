
export function Box() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  )
}

export function Plane() {
  return (
    <mesh
      position={[0, -1, 0]}
      rotation={[-Math.PI * 0.5, 0, 0]}
    >
      <planeGeometry args={[7, 7]} />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  )
}
