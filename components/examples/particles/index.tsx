"use client";

import { useMemo, useRef } from 'react';
import { OrbitControls, useTexture } from '@react-three/drei';
import { AdditiveBlending, Points } from 'three';
import { useFrame, Canvas } from '@react-three/fiber';

function Scene() {
  const particleTexture = useTexture('/images/textures/particles/1.png')
  const pointsRef = useRef<Points | null>(null)

  const count = 5000

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
      colors[i] = Math.random()
    }

    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    const positionAttr = pointsRef.current?.geometry.attributes.position
    if (!positionAttr) return;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positionAttr.array[i3]
      positionAttr.array[i3 + 1] = Math.sin(elapsedTime + x)
    }

    positionAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        transparent
        vertexColors
        sizeAttenuation
        size={0.1}
        color='#ff88cc'
        alphaMap={particleTexture}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function Particles() {
  return (
    <div className='-m-6 md:-m-8 h-screen bg-black/90'>
      <Canvas
        shadows
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 20], fov: 75 }}
      >
        <Scene />
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  )
}

export default Particles
