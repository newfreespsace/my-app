'use client'; // 必须声明为客户端组件

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // 初始化场景
    const scene = new THREE.Scene();
    // 初始化相机
    // PerspectiveCamera 透视相机
    // 第一个参数是视野范围 field of view，FOV是指任意时刻显示器能看到的场景范围，值以角度为单位
    // 第二个参数是宽高比 asspect ratio
    // 第三、四个参数是近裁剪面 near，远裁剪面 far，距离相机比 far 更远或比 near 更近的物体将不会被渲染
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    // 2. 将渲染器的 canvas 添加到指定的 ref 容器中，而不是 body
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // 3. 添加物体
    // BoxGeometry 立方体几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 材质为立方体着色。这里使用 MeshBasicMaterial。
    const material = new THREE.MeshBasicMaterial({ color: 0xafafaf });
    // Mesh 网格是一个接受几何体并将材质应用于其上的对象，然后我们可以将它插入场景中并自由移动。
    const cube = new THREE.Mesh(geometry, material);

    // 添加线条
    const LineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    const LineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(LineGeometry, LineMaterial);
    scene.add(line);

    // 添加的对象会被放置在坐标 (0,0,0) 处。这会导致相机和立方体重叠在一起。
    // scene.add(cube);
    camera.position.z = 5;

    // 4. 动画循环
    const animate = (time) => {
      // cube.position.x += 0.001;
      cube.rotation.x = time / 2000;
      cube.rotation.y = time / 1000;
      // camera.position.z += 0.01;
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // 5. 清理函数：组件卸载时移除 canvas，防止内存泄漏
    return () => {
      renderer.setAnimationLoop(null);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="absolute top-1 w-full text-center z-100 block">fe</div>
    </div>
  );
};

export default ThreeScene;
