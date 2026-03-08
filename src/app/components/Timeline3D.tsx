import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line as LineDrei, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
    { year: '2025', role: 'Eureka! 2025 Zonal Rounds Shortlist', org: 'E-Cell, IIT Bombay' },
    { year: '2025', role: 'Smart India Hackathon (SIH) Shortlist', org: 'Internal Round Selection' },
    { year: '2025', role: 'Mastering DSA using C/C++', org: 'Udemy Certification' },
    { year: '2025', role: 'Deep Learning Specialization', org: 'NVIDIA Certification' },
    { year: '2024', role: 'ReactJS Masterclass', org: 'Udemy Certification' },
    { year: '2024', role: 'Completion Of C++ Training', org: 'IIT Bombay Certification' },
];

/* ─── ThreeJS Grid & Particles Background ─── */
function TimelineEnvironment() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle drift for depth
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
        }
    });

    // Calculate lines for a massive, faint grid to mimic the reference image
    const gridLines: [number, number, number][] = [];
    const size = 40;
    const step = 4;
    for (let i = -size; i <= size; i += step) {
        gridLines.push([i, -size, -5]);
        gridLines.push([i, size, -5]);
        gridLines.push([-size, i, -5]);
        gridLines.push([size, i, -5]);
    }

    return (
        <group ref={meshRef}>
            {/* Dynamic drifting tech dust */}
            <Sparkles count={150} scale={20} size={1.2} speed={0.2} opacity={0.3} color="#38bdf8" />
            <Sparkles count={50} scale={25} size={2} speed={0.1} opacity={0.1} color="#3b82f6" />

            {/* Background Grid Lines (Extremely Faint) */}
            <LineDrei
                points={gridLines}
                color="#38bdf8"
                lineWidth={0.5}
                transparent
                opacity={0.03}
                dashed={true}
                dashSize={0.5}
                gapSize={0.5}
            />
        </group>
    );
}

export default function Timeline3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current || !indicatorRef.current || !trackRef.current) return;

        // Line drawing animation
        gsap.fromTo(trackRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                }
            }
        );

        // Indicator Ring tracing the scroll
        gsap.to(indicatorRef.current, {
            y: () => containerRef.current!.offsetHeight - 40,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: true,
            }
        });

        // Fade and slide items when indicator passes them
        itemRefs.current.forEach((item, index) => {
            if (!item) return;

            ScrollTrigger.create({
                trigger: item,
                start: "top center+=50", // When indicator approaches
                end: "bottom center-=50",
                onEnter: () => {
                    gsap.to(item, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" });
                    // Pulse the dot
                    const dot = item.querySelector('.timeline-dot');
                    if (dot) {
                        gsap.to(dot, { scale: 1.5, fill: "#38bdf8", duration: 0.3, yoyo: true, repeat: 1 });
                    }
                },
                onLeaveBack: () => {
                    gsap.to(item, { opacity: 0.3, x: -20, duration: 0.6, ease: "power2.out" });
                }
            });

            // Initial state
            gsap.set(item, { opacity: 0.3, x: -20 });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="relative py-20 overflow-hidden" style={{ minHeight: '80vh', background: '#08101a' }}>

            {/* ─── 3D Environment Background ─── */}
            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-70">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.5} />
                    <TimelineEnvironment />
                </Canvas>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Header matching the reference image */}
                <div className="mb-24 flex flex-col items-center">
                    <p className="font-mono text-[0.6rem] tracking-[0.42em] uppercase mb-4" style={{ color: 'rgba(56, 189, 248,0.55)' }}>
                // Achievements & Certifications
                    </p>
                    <h2 className="font-display text-4xl tracking-widest uppercase" style={{ color: '#f8fafc', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
                        Timeline
                    </h2>
                </div>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative pl-32 md:pl-48 py-10">

                    {/* The Vertical Track (Fills down) */}
                    <div className="absolute left-[88px] md:left-[152px] top-0 bottom-0 w-[1px] transform origin-top"
                        style={{ background: 'rgba(56, 189, 248, 0.15)' }}>
                        <div ref={trackRef} className="w-full h-full bg-[#38bdf8] origin-top" style={{ boxShadow: '0 0 10px rgba(56, 189, 248, 0.6)' }} />
                    </div>

                    {/* GSAP Tracking Floating Ring Indicator */}
                    <div
                        ref={indicatorRef}
                        className="absolute left-[78px] md:left-[142px] top-0 w-5 h-5 rounded-full border border-[#38bdf8] flex items-center justify-center z-20 pointer-events-none bg-[#08101a]"
                        style={{ boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)' }}
                    >
                        <div className="w-2 h-2 bg-[#38bdf8] rounded-full" />
                    </div>

                    {/* Timeline Items */}
                    <div className="flex flex-col gap-20">
                        {ACHIEVEMENTS.map((a, i) => (
                            <div
                                key={i}
                                ref={el => itemRefs.current[i] = el}
                                className="relative flex items-center gap-8 group"
                            >
                                {/* Year Marker (Left of the line) */}
                                <div className="absolute -left-[100px] md:-left-[160px] w-[60px] text-right">
                                    <div className="font-mono text-xs tracking-[0.3em]" style={{ color: 'rgba(56, 189, 248, 0.5)' }}>
                                        {a.year}
                                    </div>
                                </div>

                                {/* Node Dot on the line */}
                                <div className="absolute -left-[45px] top-1/2 -translate-y-1/2">
                                    <svg width="10" height="10" viewBox="0 0 10 10" className="timeline-dot transition-transform">
                                        <circle cx="5" cy="5" r="3.5" fill="rgba(56, 189, 248, 0.4)" stroke="#38bdf8" />
                                    </svg>
                                </div>

                                {/* Content */}
                                <div className="pt-0.5">
                                    <h4 className="font-body font-semibold text-lg md:text-xl tracking-wide mb-2 transition-colors duration-300"
                                        style={{ color: '#e2e8f0', letterSpacing: '0.02em' }}>
                                        {a.role}
                                    </h4>
                                    <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
                                        style={{ color: 'rgba(148, 163, 184, 0.6)' }}>
                                        {a.org}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
