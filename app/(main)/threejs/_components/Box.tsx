// components/Box.tsx
'use client';

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, ThreeElements } from '@react-three/fiber';

// 使用 ThreeElements['mesh'] 自动获取标准 mesh 属性的类型
export default function Box(props: ThreeElements['mesh']) {
  // 显式指定 ref 引用的是一个 THREE.Mesh 对象
  const meshRef = useRef<THREE.Mesh>(null!);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // delta 是自上一帧以来的秒数
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#ff6080' : '#40a9ff'} />
    </mesh>
  );
}
