"use client";

import { useMemo, useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from "three";
import GUI from "lil-gui";

function Scene() {
  const [params, setParams] = useState({
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  })

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(params.count * 3)
    const colors = new Float32Array(params.count * 3)

    const colorInside = new THREE.Color(params.insideColor)
    const colorOutside = new THREE.Color(params.outsideColor)

    for (let i = 0; i < params.count; i++) {
      const i3 = i * 3
      const radius = Math.random() * params.radius

      const spinAngle = radius * params.spin
      const branchAngle =
        ((i % params.branches) / params.branches) * Math.PI * 2

      const random = () =>
        Math.pow(Math.random(), params.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        params.randomness *
        radius

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + random()
      positions[i3 + 1] = random()
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + random()

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / params.radius)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [params])

  useEffect(() => {
    const gui = new GUI()

    gui.add(params, "count", 100, 100000, 100)
      .onFinishChange((v: any) => setParams((p) => ({ ...p, count: v })))

    gui.add(params, "size", 0.001, 0.1, 0.001)
      .onChange((v: any) => setParams((p) => ({ ...p, size: v })))

    gui.add(params, "radius", 0.01, 20, 0.01)
      .onFinishChange((v: any) => setParams((p) => ({ ...p, radius: v })))

    gui.add(params, "branches", 2, 20, 1)
      .onFinishChange((v: any) => setParams((p) => ({ ...p, branches: v })))

    gui.add(params, "spin", -5, 5, 0.001)
      .onFinishChange((v: any) => setParams((p) => ({ ...p, spin: v })))

    gui.add(params, "randomness", 0, 2, 0.001)
      .onFinishChange((v: any) => setParams((p) => ({ ...p, randomness: v })))

    gui.add(params, "randomnessPower", 1, 10, 0.001)
      .onFinishChange((v: any) => setParams((p) => ({ ...p, randomnessPower: v })))

    gui.addColor(params, "insideColor")
      .onFinishChange((v: any) => setParams((p) => ({ ...p, insideColor: v })))

    gui.addColor(params, "outsideColor")
      .onFinishChange((v: any) => setParams((p) => ({ ...p, outsideColor: v })))

    return () => gui.destroy()
  }, [])

  return (
    <points>
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
        vertexColors
        sizeAttenuation
        size={params.size}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Galaxy() {
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

export default Galaxy
