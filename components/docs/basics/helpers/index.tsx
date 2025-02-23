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
    <Wrapper>
      <ArrowHelperMesh />
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
  return (
    <Wrapper>
      <BoxHelperMesh />
    </Wrapper>
  )
}

export function Box3Helper() {
  return (
    <Wrapper>
      <Box3HelperMesh />
    </Wrapper>
  )
}

export function CameraHelper() {
  return (
    <Wrapper>
      <CameraHelperMesh />
    </Wrapper>
  )
}

export function DirectionalLightHelper() {
  return (
    <Wrapper>
      <DirectionalLightHelperMesh />
    </Wrapper>
  )
}

export function GridHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <gridHelper args={[10, 10]} rotation={[1, 0, 0]} />
    </Wrapper>
  )
}

export function PolarGridHelper() {
  return (
    <Wrapper>
      <Mesh><boxGeometry /></Mesh>
      <polarGridHelper args={[10, 10]} rotation={[1, 0, 0]} />
    </Wrapper>
  )
}

export function HemisphereLightHelper() {
  return (
    <Wrapper>
      <HemisphereLightHelperMesh />
    </Wrapper>
  )
}

export function PlaneHelper() {
  return (
    <Wrapper>
      <PlaneHelperMesh />
    </Wrapper>
  )
}

export function PointLightHelper() {
  return (
    <Wrapper>
      <PointLightHelperMesh />
    </Wrapper>
  )
}

export function SkeletonHelper() {
  return (
    <Wrapper>
      <SkeletonHelperMesh />
    </Wrapper>
  )
}

export function SpotLightHelper() {
  return (
    <Wrapper>
      <SpotLightHelperMesh />
    </Wrapper>
  )
}
