'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. 定义简单的方块组件
function SimpleBox() {
  // 显式指定类型，避免 TS 报错
  const meshRef = useRef<THREE.Mesh>(null!);

  // 每一帧让它转一下，证明 3D 引擎在运行
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.x += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* 几何体：长宽高均为 2 */}
      <boxGeometry args={[2, 2, 2]} />
      {/* 材质：使用不需要光照也能看到的法线材质（彩色） */}
      <meshNormalMaterial />
    </mesh>
  );
}

// 2. 主页面
export default function Home() {
  return (
    // 关键：必须给外层容器固定宽高，否则 Canvas 会塌陷
    <div style={{ width: '40vw', height: '40vh', backgroundColor: '#222' }}>
      <Canvas>
        {/* 使用简单的方块，不需要配置光源 */}
        <SimpleBox />
      </Canvas>
    </div>
  );
}
