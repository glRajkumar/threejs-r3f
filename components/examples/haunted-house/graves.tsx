
function Graves() {
  return Array.from({ length: 50 }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = 0.3
    const rotZ = (Math.random() - 0.5) * 0.4
    const rotY = (Math.random() - 0.5) * 0.4

    return (
      <mesh key={i} position={[x, y, z]} rotation={[0, rotY, rotZ]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#727272" />
      </mesh>
    )
  })
}

export default Graves
