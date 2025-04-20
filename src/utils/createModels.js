import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { Scene, Mesh, BoxGeometry, MeshStandardMaterial, Group, SphereGeometry, CylinderGeometry } from 'three';

const createAngryBirdModel = () => {
  const scene = new Scene();
  const group = new Group();

  // Create bird body
  const bodyGeometry = new SphereGeometry(1, 32, 32);
  const bodyMaterial = new MeshStandardMaterial({ color: 0xff0000 });
  const body = new Mesh(bodyGeometry, bodyMaterial);
  group.add(body);

  // Create beak
  const beakGeometry = new CylinderGeometry(0.2, 0.1, 0.5, 32);
  const beakMaterial = new MeshStandardMaterial({ color: 0xffa500 });
  const beak = new Mesh(beakGeometry, beakMaterial);
  beak.position.set(1, 0, 0);
  beak.rotation.z = Math.PI / 2;
  group.add(beak);

  // Create eyes
  const eyeGeometry = new SphereGeometry(0.2, 32, 32);
  const eyeMaterial = new MeshStandardMaterial({ color: 0xffffff });
  const leftEye = new Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(0.7, 0.3, 0.5);
  group.add(leftEye);

  const rightEye = new Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.7, 0.3, -0.5);
  group.add(rightEye);

  scene.add(group);
  return scene;
};

const createAssemblerModel = () => {
  const scene = new Scene();
  const group = new Group();

  // Create CPU-like structure
  const baseGeometry = new BoxGeometry(2, 0.2, 2);
  const baseMaterial = new MeshStandardMaterial({ color: 0x333333 });
  const base = new Mesh(baseGeometry, baseMaterial);
  group.add(base);

  // Create processor cores
  const coreGeometry = new BoxGeometry(0.3, 0.4, 0.3);
  const coreMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
  
  for (let i = 0; i < 4; i++) {
    const core = new Mesh(coreGeometry, coreMaterial);
    core.position.set(
      (i % 2) * 0.6 - 0.3,
      0.3,
      Math.floor(i / 2) * 0.6 - 0.3
    );
    group.add(core);
  }

  scene.add(group);
  return scene;
};

const createLegalLingoModel = () => {
  const scene = new Scene();
  const group = new Group();

  // Create chat bubble
  const bubbleGeometry = new SphereGeometry(1, 32, 32);
  const bubbleMaterial = new MeshStandardMaterial({ color: 0xffffff });
  const bubble = new Mesh(bubbleGeometry, bubbleMaterial);
  group.add(bubble);

  // Create text elements
  const textGeometry = new BoxGeometry(0.6, 0.1, 0.1);
  const textMaterial = new MeshStandardMaterial({ color: 0x000000 });
  
  for (let i = 0; i < 3; i++) {
    const text = new Mesh(textGeometry, textMaterial);
    text.position.set(0, 0.2 - i * 0.3, 0.5);
    group.add(text);
  }

  scene.add(group);
  return scene;
};

const exportModel = (scene, filename) => {
  const exporter = new GLTFExporter();
  exporter.parse(scene, (gltf) => {
    const blob = new Blob([gltf], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  });
};

export const generateModels = () => {
  exportModel(createAngryBirdModel(), 'angry-bird.glb');
  exportModel(createAssemblerModel(), 'assembler.glb');
  exportModel(createLegalLingoModel(), 'legal-lingo.glb');
}; 