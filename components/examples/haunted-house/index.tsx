"use client";

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Ghosts from './ghosts';
import Graves from './graves';
import Lights from './lights';
import Floor from './floor';
import House from './house';

function Scene() {
  return (
    <>
      <Lights />
      <Ghosts />
      <Graves />
      <House />
      <Floor />
    </>
  )
}

function HauntedHouse() {
  return (
    <div className='md:-m-8 h-screen bg-black/90'>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <OrbitControls enableDamping />
        <Scene />
      </Canvas>
    </div>
  )
}

export default HauntedHouse
