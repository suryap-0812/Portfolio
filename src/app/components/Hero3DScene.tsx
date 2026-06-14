import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

function Laptop() {
  const laptopGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (laptopGroup.current) {
      // Elegant slow float
      laptopGroup.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.7) * 0.12 - 0.2;
      
      // Smooth mouse-tracking parallax rotation
      const targetY = state.pointer.x * 0.35;
      const targetX = 0.12 - state.pointer.y * 0.15;
      
      laptopGroup.current.rotation.y = THREE.MathUtils.lerp(laptopGroup.current.rotation.y, targetY, 0.06);
      laptopGroup.current.rotation.x = THREE.MathUtils.lerp(laptopGroup.current.rotation.x, targetX, 0.06);
    }
  });

  return (
    <group ref={laptopGroup} position={[0, -0.2, 0]}>
      
      {/* 1. Base / Keyboard Part */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.6, 0.08, 2.5]} />
        <meshStandardMaterial color="#0b0f19" metalness={0.85} roughness={0.15} />
      </mesh>
      
      {/* Laptop Keyboard Area Accent (Inset) */}
      <mesh position={[0, 0.001, -0.2]}>
        <boxGeometry args={[3.1, 0.02, 1.2]} />
        <meshStandardMaterial color="#020617" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.001, 0.75]}>
        <boxGeometry args={[0.9, 0.02, 0.55]} />
        <meshStandardMaterial color="#090d16" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* 2. Screen Assembly (Tilted Backward at Hinge Pivot) */}
      <group position={[0, -0.01, -1.2]} rotation={[-0.38, 0, 0]}>
        
        {/* Screen Outer Lid */}
        <mesh position={[0, 1.1, -0.04]}>
          <boxGeometry args={[3.6, 2.3, 0.08]} />
          <meshStandardMaterial color="#0b0f19" metalness={0.85} roughness={0.15} />
        </mesh>
        
        {/* Screen Bezel (Front face frame) */}
        <mesh position={[0, 1.1, 0.01]}>
          <boxGeometry args={[3.4, 2.1, 0.02]} />
          <meshStandardMaterial color="#020617" roughness={0.85} />
        </mesh>

        {/* 3. Glowing Holographic Terminal Screen HTML */}
        <Html
          transform
          distanceFactor={2.7}
          position={[0, 1.1, 0.06]}
        >
          <div className="w-[500px] h-[320px] bg-slate-950/95 border-2 border-sky-500/40 rounded-lg p-5 font-mono text-xs text-sky-400 select-none flex flex-col justify-between shadow-[0_0_35px_rgba(56,189,248,0.25)]">
            
            {/* Window Top Controls */}
            <div>
              <div className="flex justify-between items-center border-b border-sky-500/20 pb-2.5 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[0.65rem] text-sky-500/60 font-semibold tracking-wider">surya_sys@terminal_v2</span>
              </div>
              
              {/* Terminal Logs & Details from Resume */}
              <div className="space-y-3.5 text-left leading-relaxed">
                <p className="text-sky-500/50">// ESTABLISHING CONNECTION...</p>
                <p className="text-white">
                  guest@surya:~$ <span className="text-sky-300">cat info.json</span>
                </p>
                <div className="pl-4 border-l border-sky-500/20 py-0.5 space-y-1.5 text-slate-300">
                  <p><span className="text-sky-400/80">IDENTITY:</span> Surya P</p>
                  <p><span className="text-sky-400/80">POSITION:</span> Full Stack Developer Intern</p>
                  <p><span className="text-sky-400/80">CAMPUS:</span> Sri Eshwar College of Engineering</p>
                </div>
                <p className="text-white">
                  guest@surya:~$ <span className="text-sky-300">sys --status</span>
                </p>
                <p className="text-slate-300 pl-4">
                  C++ · Java · JavaScript · ReactJS · Node.js · Spring Boot · PostgreSQL
                </p>
              </div>
            </div>
            
            {/* Window Footer Status */}
            <div className="flex justify-between items-center text-[0.65rem] text-slate-500 border-t border-sky-500/10 pt-2.5">
              <span>PORT: 5173</span>
              <span className="animate-pulse text-sky-400 font-semibold">[ SHELL STATUS: ACTIVE ]</span>
            </div>
            
          </div>
        </Html>
        
      </group>
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        gl={{ alpha: true, antialias: true, stencil: false, depth: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        
        {/* Futuristic direction lights mapping colors */}
        <directionalLight position={[10, 8, 5]} intensity={2.2} color="#38bdf8" />
        <directionalLight position={[-10, -5, -3]} intensity={1.5} color="#c084fc" />
        <pointLight position={[0, 4, -2]} intensity={1.2} color="#60a5fa" />

        {/* Faint technical dust particles */}
        <Sparkles count={50} scale={10} size={1.5} speed={0.35} opacity={0.3} color="#38bdf8" />
        <Sparkles count={25} scale={12} size={2.0} speed={0.2} opacity={0.15} color="#c084fc" />

        <Laptop />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
