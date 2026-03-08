import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT = '\u00a0\u00a0Surya P\u00a0\u00a0·\u00a0\u00a0Full-Stack Developer\u00a0\u00a0·\u00a0\u00a0ReactJS\u00a0\u00a0·\u00a0\u00a0NodeJS\u00a0\u00a0·\u00a0\u00a0Spring Boot\u00a0\u00a0·\u00a0\u00a0Open to Work\u00a0\u00a0·\u00a0\u00a0';

export default function MarqueeBar() {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!trackRef.current || !containerRef.current) return;

        const track = trackRef.current;
        const totalW = track.scrollWidth / 2; // Since we duplicated the content below

        // Base continuous looping marquee
        const tl = gsap.to(track, {
            x: -totalW,
            ease: "none",
            duration: 10,
            repeat: -1,
        });

        // Scroll velocity speed adjustment
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                // Increase speed based on scroll velocity
                const velocity = Math.abs(self.getVelocity());
                const timeScale = 1 + velocity / 100;
                gsap.to(tl, {
                    timeScale: timeScale,
                    duration: 0.1,
                    overwrite: "auto"
                });

                // Return to normal speed
                gsap.to(tl, {
                    timeScale: 1,
                    delay: 0.2,
                    duration: 0.5,
                    overwrite: "auto"
                });
            }
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const copies = 8; // Enough copies

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden py-4 select-none"
            style={{
                background: 'rgba(15, 23, 42,0.75)',
                borderTop: '1px solid rgba(56, 189, 248,0.08)',
                borderBottom: '1px solid rgba(56, 189, 248,0.08)',
                backdropFilter: 'blur(8px)',
            }}
        >
            {/* ─── Fade edges ─── */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #020617, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #020617, transparent)' }} />

            {/* ─── Scrolling track ─── */}
            <div ref={trackRef} className="flex whitespace-nowrap will-change-transform w-max">
                {Array.from({ length: copies }).map((_, i) => (
                    <span key={i} className="font-mono text-sm tracking-[0.12em] flex-shrink-0"
                        style={{ color: i % 2 === 0 ? 'rgba(56, 189, 248,0.6)' : 'rgba(148, 163, 184,0.35)' }}>
                        {TEXT}
                    </span>
                ))}
            </div>
        </div>
    );
}
