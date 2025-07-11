
function Lights() {
  return (
    <>
      <fog attach="fog" args={["#262837", 1, 20]} />

      <ambientLight
        intensity={0.3}
        color="#b9d5ff"
      />

      <directionalLight
        position={[0, 0, 6]}
        args={["#b9d5ff", 0.15]}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={15}
      />

      {/* at door top */}
      <pointLight
        position={[0, 4, 2.7]}
        args={["#ff7d46", 1, 7]}
      />
    </>
  )
}

export default Lights
