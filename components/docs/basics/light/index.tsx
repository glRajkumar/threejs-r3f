"use client";

import { useEffect, useRef, useState } from "react"
import { OrbitControls, useHelper } from "@react-three/drei"
import * as Three from "three"
import GUI from "lil-gui"

import { Wrapper, Mesh } from "../wrapper";

export function AmbientLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>

      <mesh
        position={[0, -1, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial />
      </mesh>
      <ambientLight intensity={1} />
    </Wrapper>
  )
}

export function DirectionalLigh() {
  const directionalRef = useRef<Three.DirectionalLight>(null)

  const [helperSize, setHelperSize] = useState(0.2)
  const [showHelper, setShowHelper] = useState(true)
  const [intensity, setIntensity] = useState(1)
  const [color, setColor] = useState("#f00")

  useHelper(showHelper && directionalRef as React.RefObject<Three.Object3D>, Three.DirectionalLightHelper, helperSize)

  useEffect(() => {
    const gui = new GUI({ container: document.getElementById("test")! })
    const folder = gui.addFolder("Directional Light")

    folder.add({ intensity }, "intensity", 0, 10, 0.1)
      .onChange(setIntensity)

    folder.add({ helperSize }, "helperSize", 0.1, 5, 0.1)
      .onChange(setHelperSize)

    folder.add({ showHelper }, "showHelper")
      .onChange(setShowHelper)

    folder
      .addColor({ color }, "color")
      .onChange(setColor)

    folder.open()

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <>
      <OrbitControls enableDamping />

      <mesh>
        <boxGeometry />
        <meshStandardMaterial roughness={0.4} />
      </mesh>

      <mesh
        position={[0, -1, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial roughness={0.4} />
      </mesh>

      <directionalLight
        ref={directionalRef}
        position={[5, 0.25, 0]}
        color={color}
        intensity={intensity}
      />
      <ambientLight />
    </>
  )
}

export function DirectionalLight() {
  return (
    <Wrapper divId="test">
      <DirectionalLigh />
    </Wrapper>
  )
}

export function HemisphereLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <hemisphereLight groundColor="green" intensity={0.6} />
    </Wrapper>
  )
}

export function LightProbe() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <lightProbe />
    </Wrapper>
  )
}

export function PointLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <pointLight position={[2, 3, 2]} intensity={1} distance={10} color="red" />
    </Wrapper>
  )
}

export function RectAreaLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <rectAreaLight width={4} height={2} intensity={2} color="white" />
    </Wrapper>
  )
}

export function SpotLight() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <spotLight position={[5, 10, 5]} intensity={1} />
    </Wrapper>
  )
}
