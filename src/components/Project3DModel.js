import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// Import THREE and GLTFExporter separately
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const Project3DModel = ({ projectTitle }) => {
  const getModelUrl = (title) => {
    const modelMap = {
      'Angry Bird Game': '/models/angry-bird.glb',
      'Assembler': '/models/assembler.glb',
      'Legal Lingo': '/models/legal-lingo.glb'
    };
    return modelMap[title] || '/models/default.glb';
  };

  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Model url={getModelUrl(projectTitle)} />
          <OrbitControls enableZoom={true} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload models
useGLTF.preload('/models/angry-bird.glb');
useGLTF.preload('/models/assembler.glb');
useGLTF.preload('/models/legal-lingo.glb');
useGLTF.preload('/models/default.glb');

export default Project3DModel;