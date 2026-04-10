"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

function CeresBlob() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // ▶▶▶ [핵심] 배포 환경 경로 문제 해결 ◀◀◀
  // 배포 중이면 '/thereyougoatta'를 붙이고, 아니면 그냥 빈칸
  const prefix = '';
  
  // 다운로드 받은 파일 경로 (확장자가 jpg인지 꼭 확인하세요!)
  const textureUrl = `${prefix}/images/4k_ceres_fictional.jpg`;

  const props = useTexture({
    map: textureUrl,
  });

  useFrame(() => {
    // 자전 속도: 0.0005는 아주 느림, 0.001은 보통
    meshRef.current.rotation.y += 0.0008; 
  });

  return (
    <Sphere args={[1, 64, 64]} ref={meshRef} scale={1.8}>
      <meshStandardMaterial
        {...props}
        // 세레스(Ceres)나 가상의 행성은 보통 돌/얼음 재질
        roughness={0.8} // 거친 표면
        metalness={0.1} // 비금속
        color="#ffffff" // 텍스처 본연의 색 사용
      />
    </Sphere>
  );
}

export default function BlobScene() {
  return (
    <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
      <Canvas
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* 우주 공간 조명 세팅 */}
        {/* 1. 환경광: 우주는 어두우므로 약하게 */}
        <ambientLight intensity={0.05} color="#ffffff" />

        {/* 2. 주광원 (태양): 오른쪽 위에서 강하게 */}
        <directionalLight position={[10, 5, 10]} intensity={2.5} color="#ffffee" />

        {/* 3. 보조광: 반대편 어두운 곳을 살짝 밝혀줌 (신비로운 푸른빛) */}
        <spotLight position={[-10, -5, -10]} intensity={1.5} color="#4b5c74" angle={0.5} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={true}
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        
        {/* 텍스처 로딩 중 에러 방지 */}
        <Suspense fallback={null}>
          <CeresBlob />
        </Suspense>

      </Canvas>
    </div>
  );
}