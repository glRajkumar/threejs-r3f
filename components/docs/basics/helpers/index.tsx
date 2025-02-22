"use client";

import { Wrapper, Mesh } from "../wrapper";
import * as THREE from "three";

export function ArrowHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <primitive object={new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0).normalize(), new THREE.Vector3(0, 0, 0), 2, 0xff0000)} />
    </Wrapper>
  )
}

export function AxesHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <axesHelper args={[5]} />
    </Wrapper>
  )
}

export function BoxHelper() {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())

  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <primitive object={new THREE.BoxHelper(mesh, 0xffff00)} />
    </Wrapper>
  )
}

export function Box3Helper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      {/* <primitive object={new THREE.Box3Helper(new THREE.Box3().setFromObject(mesh), 0xff0000)} /> */}
    </Wrapper>
  )
}

export function CameraHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      {/* <primitive object={new THREE.CameraHelper(camera)} /> */}
    </Wrapper>
  )
}

export function DirectionalLightHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      {/* <primitive object={new THREE.DirectionalLightHelper(light, 5)} /> */}
    </Wrapper>
  )
}

export function GridHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <gridHelper args={[10, 10]} />
    </Wrapper>
  )
}

export function PolarGridHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <polarGridHelper args={[10, 10]} />
    </Wrapper>
  )
}

export function HemisphereLightHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      {/* <primitive object={new THREE.HemisphereLightHelper(hemisphereLight, 5)} /> */}
    </Wrapper>
  )
}

export function PlaneHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      {/* <primitive object={new THREE.PlaneHelper(plane, 5, 0xff0000)} /> */}
    </Wrapper>
  )
}

export function PointLightHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      {/* <primitive object={new THREE.PointLightHelper(pointLight, 1)} /> */}
    </Wrapper>
  )
}

export function SkeletonHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      {/* <primitive object={new THREE.SkeletonHelper(skinnedMesh)} /> */}
    </Wrapper>
  )
}

export function SpotLightHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      {/* <primitive object={new THREE.SpotLightHelper(spotLight)} /> */}
    </Wrapper>
  )
}
