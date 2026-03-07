import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });
    const raf = useRef<number>(0);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const clickable = el?.closest('a, button, [role="button"], input, textarea, select');
            ringRef.current?.classList.toggle('hovering', !!clickable);
        };

        const lerp = () => {
            ring.current.x += (pos.current.x - ring.current.x) * 0.10;
            ring.current.y += (pos.current.y - ring.current.y) * 0.10;
            if (ringRef.current) {
                ringRef.current.style.left = `${ring.current.x}px`;
                ringRef.current.style.top = `${ring.current.y}px`;
            }
            raf.current = requestAnimationFrame(lerp);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        raf.current = requestAnimationFrame(lerp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}
