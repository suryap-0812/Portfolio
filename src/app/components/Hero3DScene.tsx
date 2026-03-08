import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
                <MeshDistortMaterial
                    color="#a855f7" // Purple tint
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    envMapIntensity={2}
                />
            </Sphere>
        </Float>
    );
}

export default function Hero3DScene() {
    return (
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#38bdf8" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#ec4899" />

                {/* Glow behind the sphere */}
                <mesh position={[0, 0, -2]}>
                    <planeGeometry args={[15, 15]} />
                    <meshBasicMaterial
                        map={new THREE.TextureLoader().load('/hero_3d_concept.png')}
                        transparent
                        opacity={0.3}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>

                <AnimatedSphere />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
