import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    // Update ring state inline
    const setRingState = useCallback((state: 'normal' | 'hover' | 'click') => {
        const r = ringRef.current;
        const d = dotRef.current;
        if (!r || !d) return;

        if (state === 'hover') {
            gsap.to(r, { width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.10)', borderColor: 'rgba(56, 189, 248,0.6)', borderWidth: 1.5, duration: 0.25, ease: 'power2.out' });
            gsap.to(d, { scale: 0, duration: 0.15, ease: 'power2.out' });
        } else if (state === 'click') {
            gsap.to(r, { width: 96, height: 96, backgroundColor: 'rgba(56, 189, 248,0.12)', borderColor: 'rgba(56, 189, 248,0.9)', duration: 0.15, ease: 'power2.out' });
            gsap.to(d, { scale: 0, duration: 0.15, ease: 'power2.out' });
        } else {
            gsap.to(r, { width: 40, height: 40, backgroundColor: 'transparent', borderColor: 'rgba(56, 189, 248,0.40)', borderWidth: 1.5, duration: 0.25, ease: 'power2.out' });
            gsap.to(d, { scale: 1, duration: 0.15, ease: 'power2.out' });
        }
    }, []);

    useEffect(() => {
        if (!dotRef.current || !ringRef.current) return;

        // Use gsap quickTo for maximum performance
        const xDot = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power3" });
        const yDot = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power3" });

        const xRing = gsap.quickTo(ringRef.current, "x", { duration: 0.3, ease: "power3" });
        const yRing = gsap.quickTo(ringRef.current, "y", { duration: 0.3, ease: "power3" });

        const onMove = (e: MouseEvent) => {
            xDot(e.clientX);
            yDot(e.clientY);
            xRing(e.clientX);
            yRing(e.clientY);

            const el = document.elementFromPoint(e.clientX, e.clientY);
            const isHover = !!el?.closest('a,button,[role="button"],input,textarea,select,[data-hover]');
            if (!isDownRef.current) setRingState(isHover ? 'hover' : 'normal');
        };

        const isDownRef = { current: false };

        const onDown = () => {
            isDownRef.current = true;
            setRingState('click');
        };

        const onUp = (e: MouseEvent) => {
            isDownRef.current = false;
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const hover = !!el?.closest('a,button,[role="button"],input,textarea,select,[data-hover]');
            setRingState(hover ? 'hover' : 'normal');
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        // Center on start
        xDot(-200); yDot(-200);
        xRing(-200); yRing(-200);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
        };
    }, [setRingState]);

    return (
        <>
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    left: 0, top: 0,
                    width: 12, height: 12,
                    background: '#38bdf8',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 8px rgba(56, 189, 248,0.6)',
                }}
            />
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    left: 0, top: 0,
                    width: 40, height: 40,
                    border: '1.5px solid rgba(56, 189, 248,0.4)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </>
    );
}
