import { useEffect, useRef, useState } from 'react';
import { useScroll } from 'motion/react';

const TEXT = '\u00a0\u00a0Surya P\u00a0\u00a0·\u00a0\u00a0Full-Stack Developer\u00a0\u00a0·\u00a0\u00a0ReactJS\u00a0\u00a0·\u00a0\u00a0NodeJS\u00a0\u00a0·\u00a0\u00a0Spring Boot\u00a0\u00a0·\u00a0\u00a0Open to Work\u00a0\u00a0·\u00a0\u00a0';

const BASE_SPEED = 60;   // px/s
const FAST_SPEED = 180;  // px/s on scroll

export default function MarqueeBar() {
    const trackRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const xRef = useRef(0);
    const speedRef = useRef(BASE_SPEED);
    const targetSpeed = useRef(BASE_SPEED);
    const lastScroll = useRef(0);
    const scrollTimer = useRef<ReturnType<typeof setTimeout>>();
    const lastTime = useRef<number>(0);
    const [itemW, setItemW] = useState(0);

    // Measure one text item width
    const measureRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (measureRef.current) setItemW(measureRef.current.offsetWidth);
    }, []);

    // Detect scroll to speed up
    useEffect(() => {
        const onScroll = () => {
            const sy = window.scrollY;
            const dir = sy - lastScroll.current;
            lastScroll.current = sy;
            if (Math.abs(dir) > 1) targetSpeed.current = FAST_SPEED;
            clearTimeout(scrollTimer.current);
            scrollTimer.current = setTimeout(() => { targetSpeed.current = BASE_SPEED; }, 400);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Animation loop
    useEffect(() => {
        if (!itemW || !trackRef.current) return;
        lastTime.current = performance.now();

        const tick = (now: number) => {
            const dt = (now - lastTime.current) / 1000;
            lastTime.current = now;

            // Lerp speed toward target (0.08 per frame ≈ 400ms ease)
            speedRef.current += (targetSpeed.current - speedRef.current) * 0.08;

            xRef.current -= speedRef.current * dt;
            // Reset when scrolled one full item width
            if (xRef.current <= -itemW) xRef.current += itemW;

            if (trackRef.current)
                trackRef.current.style.transform = `translateX(${xRef.current}px)`;

            animRef.current = requestAnimationFrame(tick);
        };

        animRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animRef.current);
    }, [itemW]);

    // Render enough copies to fill screen (minimum 6)
    const copies = Math.max(6, Math.ceil((typeof window !== 'undefined' ? window.innerWidth * 2 : 2400) / (itemW || 400)) + 2);

    return (
        <div
            className="relative overflow-hidden py-4 select-none"
            style={{
                background: 'rgba(22,18,16,0.75)',
                borderTop: '1px solid rgba(245,158,11,0.08)',
                borderBottom: '1px solid rgba(245,158,11,0.08)',
                backdropFilter: 'blur(8px)',
            }}
        >
            {/* ─── Fade edges ─── */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #0e0c0a, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #0e0c0a, transparent)' }} />

            {/* ─── Scrolling track ─── */}
            <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
                {/* Hidden measure node */}
                <span ref={measureRef} className="absolute opacity-0 pointer-events-none font-mono text-sm tracking-[0.12em]">
                    {TEXT}
                </span>

                {Array.from({ length: copies }).map((_, i) => (
                    <span key={i} className="font-mono text-sm tracking-[0.12em] flex-shrink-0"
                        style={{ color: i % 2 === 0 ? 'rgba(245,158,11,0.6)' : 'rgba(168,162,158,0.35)' }}>
                        {TEXT}
                    </span>
                ))}
            </div>
        </div>
    );
}
