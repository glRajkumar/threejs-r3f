import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Ghosts() {
  const ghost1 = useRef<THREE.PointLight>(null)
  const ghost2 = useRef<THREE.PointLight>(null)
  const ghost3 = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    if (ghost1.current) {
      ghost1.current.position.x = Math.cos(elapsedTime * 0.5) * 4
      ghost1.current.position.z = Math.sin(elapsedTime * 0.5) * 4
      ghost1.current.position.y = Math.sin(elapsedTime * 3)
    }

    if (ghost2.current) {
      ghost2.current.position.x = Math.cos(-elapsedTime * 0.32) * 5
      ghost2.current.position.z = Math.sin(-elapsedTime * 0.32) * 5
      ghost2.current.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    }

    if (ghost3.current) {
      ghost3.current.position.x = Math.cos(-elapsedTime * 0.18) * (7 + Math.sin(elapsedTime * 0.32))
      ghost3.current.position.z = Math.sin(-elapsedTime * 0.18) * (7 + Math.sin(elapsedTime * 0.5))
      ghost3.current.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    }
  })

  return (
    <>
      <pointLight ref={ghost1} args={["#ff00ff", 3, 3]} />
      <pointLight ref={ghost2} args={["#00ffff", 3, 3]} />
      <pointLight ref={ghost3} args={["#ff7800", 3, 3]} />
    </>
  )
}

export default Ghosts
