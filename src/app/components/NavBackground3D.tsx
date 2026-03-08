import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function RotatingAbstract() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float speed={3} floatIntensity={1} rotationIntensity={1}>
            <mesh ref={meshRef} scale={1.8}>
                {/* A complex, interesting geometry that looks great even small */}
                <torusKnotGeometry args={[3, 0.6, 128, 32]} />
                <meshPhysicalMaterial
                    color="#38bdf8"
                    emissive="#0284c7"
                    emissiveIntensity={0.8}
                    roughness={0.1}
                    metalness={1}
                    wireframe={true}
                    transparent={true}
                    opacity={0.15}
                />
            </mesh>
        </Float>
    );
}

export default function NavBackground3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-full mix-blend-screen opacity-60">
            <Canvas camera={{ position: [0, 0, 8], fov: 30 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#7dd3fc" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#f472b6" />
                <RotatingAbstract />
                <Sparkles count={50} scale={20} size={1.5} speed={0.6} opacity={0.4} color="#38bdf8" />
            </Canvas>
        </div>
    );
}
