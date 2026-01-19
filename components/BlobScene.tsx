"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function PlutoBlob() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x += 0.001;
  });

  return (
    <Sphere args={[1, 64, 64]} ref={meshRef} scale={1.8}>
      {/* 텍스처 대신 깔끔한 재질 사용 (에러 방지) */}
      <meshStandardMaterial
        color="#cceeff"       // 얼음 행성 색상
        roughness={0.6}
        metalness={0.2}
      />
    </Sphere>
  );
}

export default function BlobScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} color="#111133" />
        <directionalLight position={[10, 5, 10]} intensity={2} color="#ffffff" />
        <spotLight position={[-15, 0, -10]} intensity={5} color="#5555ff" angle={0.5} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        
        <Suspense fallback={null}>
          <PlutoBlob />
        </Suspense>
      </Canvas>
    </div>
  );
}