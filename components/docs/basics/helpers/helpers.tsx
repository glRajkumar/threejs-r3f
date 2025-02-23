import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh as ThreeMesh } from 'three';
import * as THREE from "three";

export function BoxHelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const boxHelperRef = useRef<THREE.BoxHelper | null>(null)

  useEffect(() => {
    if (meshRef.current) {
      boxHelperRef.current = new THREE.BoxHelper(meshRef.current, 0xff0000)
    }
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01

      if (boxHelperRef.current) {
        boxHelperRef.current.update()
      }
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>

      {
        boxHelperRef.current &&
        <primitive object={boxHelperRef.current} />
      }
    </>
  )
}

export function ArrowHelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const arrowHelperRef = useRef<THREE.ArrowHelper | null>(null)

  useEffect(() => {
    const dir = new THREE.Vector3(1, 0, 0)
    dir.normalize()
    const origin = new THREE.Vector3(0, 0, 0)
    arrowHelperRef.current = new THREE.ArrowHelper(dir, origin, 2, 0xff0000)
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      {arrowHelperRef.current && <primitive object={arrowHelperRef.current} />}
    </>
  )
}

export function Box3HelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const box3HelperRef = useRef<THREE.Box3Helper | null>(null)

  useEffect(() => {
    if (meshRef.current) {
      const box = new THREE.Box3()
      box.setFromObject(meshRef.current)
      box3HelperRef.current = new THREE.Box3Helper(box, 0xff0000)
    }
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01

      if (box3HelperRef.current) {
        const box = new THREE.Box3()
        box.setFromObject(meshRef.current)
        box3HelperRef.current.box = box
      }
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      {box3HelperRef.current && <primitive object={box3HelperRef.current} />}
    </>
  )
}

export function CameraHelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const cameraHelperRef = useRef<THREE.CameraHelper | null>(null)

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    cameraHelperRef.current = new THREE.CameraHelper(camera)
  }, [])

  useFrame(() => {
    if (cameraHelperRef.current) {
      cameraHelperRef.current.rotation.y += 0.01
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      {cameraHelperRef.current && <primitive object={cameraHelperRef.current} />}
    </>
  )
}

export function DirectionalLightHelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const lightRef = useRef<THREE.DirectionalLight>(null)
  const helperRef = useRef<THREE.DirectionalLightHelper | null>(null)

  useEffect(() => {
    if (lightRef.current) {
      helperRef.current = new THREE.DirectionalLightHelper(lightRef.current, 1)
    }
  }, [])

  useFrame(() => {
    if (helperRef.current) {
      helperRef.current.update()
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      <directionalLight ref={lightRef} color="red" position={[5, 5, 5]} intensity={1} />
      {helperRef.current && <primitive object={helperRef.current} />}
    </>
  )
}

export function HemisphereLightHelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const lightRef = useRef<THREE.HemisphereLight>(null)
  const helperRef = useRef<THREE.HemisphereLightHelper | null>(null)

  useEffect(() => {
    if (lightRef.current) {
      helperRef.current = new THREE.HemisphereLightHelper(lightRef.current, 1)
    }
  }, [])

  useFrame(() => {
    if (helperRef.current) {
      helperRef.current.update()
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      <hemisphereLight ref={lightRef} groundColor={0xff0000} intensity={1} />
      {helperRef.current && <primitive object={helperRef.current} />}
    </>
  )
}

export function PlaneHelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const helperRef = useRef<THREE.PlaneHelper | null>(null)

  useEffect(() => {
    const plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)
    helperRef.current = new THREE.PlaneHelper(plane, 2, 0xff0000)
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      {helperRef.current && <primitive object={helperRef.current} />}
    </>
  )
}

export function PointLightHelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const helperRef = useRef<THREE.PointLightHelper | null>(null)

  useEffect(() => {
    if (lightRef.current) {
      helperRef.current = new THREE.PointLightHelper(lightRef.current, 1)
    }
  }, [])

  useFrame(() => {
    if (helperRef.current) {
      helperRef.current.update()
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      <pointLight ref={lightRef} color="red" position={[2, 2, 2]} intensity={1} />
      {helperRef.current && <primitive object={helperRef.current} />}
    </>
  )
}

export function SkeletonHelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const boneRef = useRef<THREE.Bone>(null)
  const helperRef = useRef<THREE.SkeletonHelper | null>(null)

  useEffect(() => {
    if (boneRef.current) {
      helperRef.current = new THREE.SkeletonHelper(boneRef.current)
    }
  }, [])

  useFrame(() => {
    if (boneRef.current) {
      boneRef.current.rotation.y += 0.01
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      <bone ref={boneRef} position={[0, 0, 0]}>
        <bone position={[0, 1, 0]}>
          <bone position={[0, 1, 0]} />
        </bone>
      </bone>
      {helperRef.current && <primitive object={helperRef.current} />}
    </>
  )
}

export function SpotLightHelperMesh() {
  const meshRef = useRef<ThreeMesh>(null)
  const lightRef = useRef<THREE.SpotLight>(null)
  const helperRef = useRef<THREE.SpotLightHelper | null>(null)

  useEffect(() => {
    if (lightRef.current) {
      helperRef.current = new THREE.SpotLightHelper(lightRef.current)
    }
  }, [])

  useFrame(() => {
    if (helperRef.current) {
      helperRef.current.update()
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      <spotLight ref={lightRef} color="red" position={[2, 2, 2]} angle={Math.PI / 6} intensity={1} />
      {helperRef.current && <primitive object={helperRef.current} />}
    </>
  )
}
