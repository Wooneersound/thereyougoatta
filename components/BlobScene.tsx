"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";

// 실제 이끼 텍스처를 입힌 구체 (NatureBlob)
function NatureBlob() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // ▶▶▶ [핵심] 실제 자연 이미지(텍스처) 불러오기 ◀◀◀
  // 인터넷에서 '이끼 낀 암석' 고화질 사진들을 가져옵니다.
  const props = useTexture({
    // 1. 실제 색상 사진 (Base Color)
    map: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/mossy_rock/mossy_rock_diff_2k.jpg',
    // 2. 표면의 울퉁불퉁한 입체감 정보 (Normal Map) - 이게 있어야 리얼함!
    normalMap: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/mossy_rock/mossy_rock_nor_gl_2k.jpg',
    // 3. 거칠기 정보 (Roughness Map) - 빛 반사 조절
    roughnessMap: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/mossy_rock/mossy_rock_rough_2k.jpg',
    // 4. 틈새 그림자 정보 (Ambient Occlusion) - 깊이감 추가
    aoMap: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/mossy_rock/mossy_rock_ao_2k.jpg',
  });

  // 텍스처가 구체에 자연스럽게 감기도록 설정
  Object.values(props).forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; // 텍스처 반복
    tex.repeat.set(3, 3); // 3배로 촘촘하게 반복해서 디테일 업
  });

  useFrame(() => {
    meshRef.current.rotation.y += 0.0005; // 아주 천천히 자전 (거의 멈춘 듯이)
  });

  return (
    // 크기 조절: scale을 2.5에서 1.7로 줄임
    <Sphere args={[1, 128, 128]} ref={meshRef} scale={1.7}>
      {/* meshStandardMaterial: 빛에 반응하는 표준 재질
        여기에 불러온 텍스처 사진들을 입힙니다.
      */}
      <meshStandardMaterial
        {...props} // 위에서 불러온 텍스처 속성 모두 적용
        roughness={1}   // 텍스처 자체 거칠기 사용
        metalness={0}   // 돌/이끼니까 금속성 0
        normalScale={new THREE.Vector2(1.5, 1.5)} // 울퉁불퉁함을 더 강하게!
      />
    </Sphere>
  );
}

export default function BlobScene() {
  return (
    <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
      <Canvas
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* 조명: 실제 텍스처가 잘 보이도록 입체적인 빛 세팅 */}
        <ambientLight intensity={0.4} color="#ffffff" /> {/* 전체적으로 은은하게 */}
        <directionalLight position={[10, 10, 5]} intensity={2} color="#fffbd2" castShadow /> {/* 따뜻한 주광 */}
        <spotLight position={[-10, -10, -10]} intensity={1} color="#a6d995" angle={0.3} /> {/* 밑에서 올라오는 신비한 녹색 빛 */}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          autoRotate={true}
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        
        {/* 숲 속 환경 반사광 적용 */}
        <Environment preset="forest" background={false} blur={0.8} />

        <NatureBlob />
      </Canvas>
    </div>
  );
}