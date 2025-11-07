"use client";

import { Wrapper, Mesh } from "../wrapper";
import {
  ArrowHelperMesh, BoxHelperMesh, Box3HelperMesh,
  CameraHelperMesh, DirectionalLightHelperMesh,
  HemisphereLightHelperMesh, PlaneHelperMesh,
  PointLightHelperMesh, SkeletonHelperMesh,
  SpotLightHelperMesh
} from "./helpers";

export function ArrowHelper() {
  return (
    <Wrapper divId="helper-arrow">
      <ArrowHelperMesh />
    </Wrapper>
  )
}

export function AxesHelper() {
  return (
    <Wrapper divId="helper-axes">
      <Mesh><boxGeometry /></Mesh>
      <axesHelper args={[5]} />
    </Wrapper>
  )
}

export function BoxHelper() {
  return (
    <Wrapper divId="helper-box">
      <BoxHelperMesh />
    </Wrapper>
  )
}

export function Box3Helper() {
  return (
    <Wrapper divId="helper-box3">
      <Box3HelperMesh />
    </Wrapper>
  )
}

export function CameraHelper() {
  return (
    <Wrapper divId="helper-camera">
      <CameraHelperMesh />
    </Wrapper>
  )
}

export function DirectionalLightHelper() {
  return (
    <Wrapper divId="helper-directional-light">
      <DirectionalLightHelperMesh />
    </Wrapper>
  )
}

export function GridHelper() {
  return (
    <Wrapper divId="helper-grid">
      <Mesh><boxGeometry /></Mesh>
      <gridHelper args={[10, 10]} rotation={[1, 0, 0]} />
    </Wrapper>
  )
}

export function PolarGridHelper() {
  return (
    <Wrapper divId="helper-polar-grid">
      <Mesh><boxGeometry /></Mesh>
      <polarGridHelper args={[10, 10]} rotation={[1, 0, 0]} />
    </Wrapper>
  )
}

export function HemisphereLightHelper() {
  return (
    <Wrapper divId="helper-hemisphere-light">
      <HemisphereLightHelperMesh />
    </Wrapper>
  )
}

export function PlaneHelper() {
  return (
    <Wrapper divId="helper-plane">
      <PlaneHelperMesh />
    </Wrapper>
  )
}

export function PointLightHelper() {
  return (
    <Wrapper divId="helper-point-light">
      <PointLightHelperMesh />
    </Wrapper>
  )
}

export function SkeletonHelper() {
  return (
    <Wrapper divId="helper-skeleton">
      <SkeletonHelperMesh />
    </Wrapper>
  )
}

export function SpotLightHelper() {
  return (
    <Wrapper divId="helper-spot-light">
      <SpotLightHelperMesh />
    </Wrapper>
  )
}
