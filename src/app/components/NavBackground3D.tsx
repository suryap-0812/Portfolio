import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function RotatingAbstract() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Smooth, flowing rotation
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <Float speed={2} floatIntensity={0.5} rotationIntensity={0.5}>
            <mesh ref={meshRef} position={[0, 0, -2]} scale={1.5}>
                {/* A long, flowing wireframe tube that fills the background */}
                <cylinderGeometry args={[1.5, 1.5, 16, 64, 32, true]} />
                <meshPhysicalMaterial
                    color="#38bdf8"
                    emissive="#0284c7"
                    emissiveIntensity={0.4}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                    transparent={true}
                    opacity={0.08}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </Float>
    );
}

export default function NavBackground3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-full blend-screen opacity-80">
            {/* Using a wider FOV so the cylinder fills the pill shape nicely */}
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#7dd3fc" />
                <pointLight position={[-10, 0, -5]} intensity={1} color="#38bdf8" />
                <RotatingAbstract />
                {/* Drifting horizontal tech dust */}
                <Sparkles count={40} scale={[20, 2, 2]} size={1.5} speed={0.4} opacity={0.3} color="#38bdf8" />
            </Canvas>
        </div>
    );
}
