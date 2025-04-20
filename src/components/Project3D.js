import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

const ProjectCard3D = ({ project, darkMode }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 2, 0.2]} />
      <meshStandardMaterial
        color={darkMode ? '#1f2937' : '#ffffff'}
        metalness={0.5}
        roughness={0.2}
      />
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[2.8, 1.8]} />
        <meshBasicMaterial color={darkMode ? '#374151' : '#f3f4f6'} />
      </mesh>
    </mesh>
  );
};

const Project3DView = ({ project, darkMode }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-64 z-50">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ProjectCard3D project={project} darkMode={darkMode} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Project3DView; 