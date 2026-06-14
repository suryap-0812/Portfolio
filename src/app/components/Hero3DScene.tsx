import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D Glass Object with physical properties
function FloatingGlassShape({ 
  geometry, 
  color, 
  position, 
  scale, 
  speed, 
  floatIntensity 
}: { 
  geometry: THREE.BufferGeometry; 
  color: string; 
  position: [number, number, number]; 
  scale: number; 
  speed: number; 
  floatIntensity: number; 
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous elegant slow rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.12 * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.16 * speed;
    }
  });

  return (
    <Float speed={speed} floatIntensity={floatIntensity} rotationIntensity={1.5}>
      <mesh ref={meshRef} geometry={geometry} position={position} scale={scale}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.12}
          metalness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.85} // High glass transmission
          ior={1.48}          // Index of refraction for glass
          thickness={1.8}    // Physical refraction thickness
          specularIntensity={1.2}
          envMapIntensity={2.5}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  );
}

// Scene Wrapper to handle Parallax and lighting
function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth mouse-reactive camera parallax
  useFrame((state) => {
    if (groupRef.current) {
      // Lerping coordinates for liquid smooth responsiveness
      const targetX = state.pointer.x * 1.8;
      const targetY = state.pointer.y * 1.2;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.12, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.12, 0.05);
    }
  });

  // Pre-compiled geometries to avoid re-instantiation lag
  const centralGeometry = new THREE.DodecahedronGeometry(1.3, 0);
  const ringGeometry = new THREE.TorusGeometry(1.0, 0.28, 16, 48);
  const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);

  return (
    <group ref={groupRef}>
      {/* Drifting digital stardust for 3D depth */}
      <Sparkles count={80} scale={12} size={1.8} speed={0.4} opacity={0.4} color="#38bdf8" />
      <Sparkles count={40} scale={15} size={2.5} speed={0.25} opacity={0.2} color="#c084fc" />

      {/* Central Glass Dodecahedron */}
      <FloatingGlassShape
        geometry={centralGeometry}
        color="#38bdf8" // Electric Sky Blue
        position={[0, 0, 0]}
        scale={1.4}
        speed={1.4}
        floatIntensity={1.6}
      />

      {/* Orbiting Magenta Torus */}
      <FloatingGlassShape
        geometry={ringGeometry}
        color="#c084fc" // Vivid Tech Purple
        position={[-2.4, 1.2, -1.2]}
        scale={0.88}
        speed={2.2}
        floatIntensity={2.5}
      />

      {/* Orbiting Blue Sphere */}
      <FloatingGlassShape
        geometry={sphereGeometry}
        color="#60a5fa" // Ocean Tech Blue
        position={[2.5, -1.3, -1.5]}
        scale={0.8}
        speed={1.8}
        floatIntensity={2.0}
      />
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-75 mix-blend-screen pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, stencil: false, depth: true }}
        dpr={[1, 1.5]} // Restrict maximum DPR to 1.5 for steady high FPS on mobile/retina
      >
        <ambientLight intensity={0.45} />
        
        {/* Colorful directional lights mapping shadows/refractions */}
        <directionalLight position={[10, 8, 5]} intensity={2.0} color="#38bdf8" />
        <directionalLight position={[-10, -5, -3]} intensity={1.5} color="#c084fc" />
        <pointLight position={[0, 4, -2]} intensity={1.0} color="#60a5fa" />

        <SceneContent />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
