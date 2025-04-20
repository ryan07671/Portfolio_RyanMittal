import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const [error, setError] = useState(false);
  const { scene } = useGLTF(url, undefined, (error) => {
    console.error('Error loading model:', error);
    setError(true);
  });
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Failed to load 3D model</p>
      </div>
    );
  }

  return <primitive object={scene} ref={meshRef} />;
}

const Project3DViewer = ({ projectUrl }) => {
  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading 3D model...</p>
          </div>
        }>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Model url={projectUrl} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Project3DViewer; 