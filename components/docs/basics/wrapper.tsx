"use client";

import { useRef, useState } from "react";
import { Canvas, CanvasProps, useFrame } from "@react-three/fiber";
import { Mesh as ThreeMesh } from 'three';
import { OrbitControls } from "@react-three/drei";
import { RefreshCcw } from "lucide-react";

import { useSettingsStore } from "@/store/settings";

import { Button } from "@/components/ui/button";

type commonProps = {
  useDefaultMaterial?: boolean
}

export function useMesh() {
  const meshRef = useRef<ThreeMesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01
    }
  })

  return meshRef
}

export function Mesh({ children, useDefaultMaterial = true }: readOnlychild & commonProps) {
  const meshRef = useMesh()

  return (
    <mesh ref={meshRef}>
      {children}

      {
        useDefaultMaterial &&
        <meshBasicMaterial color="#14b8a6" />
      }
    </mesh>
  )
}

export function Wrapper({ children, divId, ...rest }: readOnlychild & CanvasProps & { divId: string }) {
  const [key, setKey] = useState(0)

  const addCanvas = useSettingsStore(s => s.addCanvas)
  const isActive = useSettingsStore(s => s.canvases.includes(divId))

  function reload() {
    setKey(p => p + 1)
    addCanvas(divId)
  }

  return (
    <div className="dfc canvas-wrapper h-96 gap-0 border mt-4 rounded-lg shadow-sm relative isolate" id={divId}>
      <div className="df justify-between px-4 py-2 border-b">
        <p className="m-0! capitalize">{divId?.replaceAll("-", " ")}</p>

        <Button
          size="icon"
          variant="secondary"
          onClick={reload}
          className="size-6 p-0 cursor-pointer hover:bg-border group"
          title="Refresh"
        >
          <RefreshCcw className="size-3 group-hover:rotate-180 transition-transform" />
        </Button>
      </div>

      {
        isActive ?
          <div className="flex-1" key={`${divId}-${key}`}>
            <Canvas {...rest}>
              {children}

              <OrbitControls enableDamping />
            </Canvas>
          </div>
          :
          <div className="dc flex-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => addCanvas(divId)}
              className="cursor-pointer"
            >
              View
            </Button>
          </div>
      }
    </div>
  )
}
