"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingBoxes() {
  const meshRef = useRef<THREE.Group>(null);
  const count = 20;

  const boxes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.5 + 0.2
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={meshRef}>
      {boxes.map((box, i) => (
        <mesh key={i} position={box.position as any} rotation={box.rotation as any} scale={box.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#8B5CF6" 
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroCanvas() {
  return (
    <div className="w-full h-full bg-zinc-950">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#8B5CF6" />
        <FloatingBoxes />
      </Canvas>
    </div>
  );
}
