"use client";

import { OrthographicCamera, CubeCamera } from '@react-three/drei';
import { Wrapper, Mesh } from "../wrapper";

export function PerspectiveCamera() {
  return (
    <Wrapper camera={{ position: [0, 0, 5], fov: 75 }}>
      <Mesh>
        <boxGeometry />
      </Mesh>
    </Wrapper>
  )
}

export function OrthographicCameraExample() {
  return (
    <Wrapper>
      <Mesh>
        <boxGeometry />
      </Mesh>
      <OrthographicCamera makeDefault position={[0, 1, 5]} zoom={50} />
    </Wrapper>
  )
}

export function CubeCameraExample() {
  return (
    <Wrapper>
      <CubeCamera resolution={256} frames={1}>
        {(texture) => (
          <Mesh>
            <boxGeometry />
            <meshStandardMaterial envMap={texture} />
          </Mesh>
        )}
      </CubeCamera>
    </Wrapper>
  )
}





// import { useThree } from '@react-three/fiber';
// import { useEffect } from 'react';
// import * as THREE from "three";

// function MultiViewCamera() {
//   const { gl, scene, size } = useThree();

//   useEffect(() => {
//     const aspect = size.width / size.height;

//     // Create multiple perspective cameras
//     const subCameras = [
//       new THREE.PerspectiveCamera(50, aspect, 0.1, 100),
//       new THREE.PerspectiveCamera(50, aspect, 0.1, 100),
//       new THREE.PerspectiveCamera(50, aspect, 0.1, 100),
//       new THREE.PerspectiveCamera(50, aspect, 0.1, 100),
//     ];

//     // Set camera positions for different viewpoints
//     subCameras[0].position.set(5, 5, 5);  // Top-Right View
//     subCameras[1].position.set(-5, 5, 5); // Top-Left View
//     subCameras[2].position.set(5, -5, 5); // Bottom-Right View
//     subCameras[3].position.set(-5, -5, 5); // Bottom-Left View

//     // All cameras look at the scene center
//     subCameras.forEach((cam) => cam.lookAt(0, 0, 0));

//     // Create the ArrayCamera
//     const arrayCamera = new THREE.ArrayCamera(subCameras);

//     // Assign the array camera to the renderer
//     gl.setAnimationLoop(() => {
//       gl.setViewport(0, 0, size.width, size.height);
//       gl.render(scene, arrayCamera);
//     });

//     return () => {
//       gl.setAnimationLoop(null); // Cleanup
//     };
//   }, [gl, scene, size]);

//   return null
// }

// export function ArrayCameraExample() {
//   return (
//     <Wrapper>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} />

//       <MultiViewCamera />

//       <Mesh>
//         <boxGeometry />
//       </Mesh>

//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
//         <planeGeometry args={[10, 10]} />
//         <meshStandardMaterial color="gray" />
//       </mesh>
//     </Wrapper>
//   );
// }