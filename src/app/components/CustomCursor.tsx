import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const ringVisualRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    // Update ring state inline
    const setRingState = useCallback((state: 'normal' | 'hover' | 'click', labelText: string = '') => {
        const r = ringRef.current;
        const rv = ringVisualRef.current;
        const d = dotRef.current;
        const l = labelRef.current;
        if (!r || !rv || !d || !l) return;

        if (state === 'hover') {
            if (labelText) {
                // Larger hover state with background filling for readability of labels
                gsap.to(r, { width: 90, height: 90, duration: 0.3, ease: 'power2.out' });
                gsap.to(rv, { 
                    backgroundColor: 'rgba(56, 189, 248, 0.12)', 
                    borderColor: 'rgba(56, 189, 248, 0.7)', 
                    borderWidth: 1.5, 
                    duration: 0.3, 
                    ease: 'power2.out' 
                });
                l.textContent = labelText;
                gsap.to(l, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.2)' });
            } else {
                // Subtle hover scale for normal links/buttons
                gsap.to(r, { width: 70, height: 70, duration: 0.3, ease: 'power2.out' });
                gsap.to(rv, { 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                    borderColor: 'rgba(56, 189, 248, 0.5)', 
                    borderWidth: 1.5, 
                    duration: 0.3, 
                    ease: 'power2.out' 
                });
                gsap.to(l, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.out' });
            }
            gsap.to(d, { scale: 0, duration: 0.2, ease: 'power2.out' });
        } else if (state === 'click') {
            // Squeeze/implode visual feedback
            gsap.to(r, { width: 60, height: 60, duration: 0.2, ease: 'power3.out' });
            gsap.to(rv, { 
                backgroundColor: 'rgba(56, 189, 248, 0.22)', 
                borderColor: 'rgba(56, 189, 248, 0.95)', 
                borderWidth: 2,
                duration: 0.2, 
                ease: 'power3.out' 
            });
            gsap.to(d, { scale: 0, duration: 0.15, ease: 'power2.out' });
            gsap.to(l, { scale: 0, opacity: 0, duration: 0.15, ease: 'power2.out' });
        } else {
            // Reset to normal state
            gsap.to(r, { width: 36, height: 36, duration: 0.3, ease: 'power2.out' });
            gsap.to(rv, { 
                backgroundColor: 'transparent', 
                borderColor: 'rgba(56, 189, 248, 0.45)', 
                borderWidth: 1.5, 
                duration: 0.3, 
                ease: 'power2.out' 
            });
            gsap.to(d, { scale: 1, duration: 0.2, ease: 'power2.out' });
            gsap.to(l, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.out' });
        }
    }, []);

    useEffect(() => {
        if (!dotRef.current || !ringRef.current || !ringVisualRef.current) return;

        // Use gsap quickTo for maximum performance
        const xDot = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3.out" });
        const yDot = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3.out" });

        const xRing = gsap.quickTo(ringRef.current, "x", { duration: 0.24, ease: "power3.out" });
        const yRing = gsap.quickTo(ringRef.current, "y", { duration: 0.24, ease: "power3.out" });

        let lastX = 0;
        let lastY = 0;
        let lastTime = Date.now();
        const isDownRef = { current: false };

        const onMove = (e: MouseEvent) => {
            const now = Date.now();
            const dt = now - lastTime || 1;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const dist = Math.hypot(dx, dy);

            // Calculate velocity-based stretch parameters
            const velocity = dist / dt;
            const stretchScaleX = Math.min(1 + velocity * 0.15, 1.45);
            const stretchScaleY = Math.max(1 - velocity * 0.12, 0.65);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            xDot(e.clientX);
            yDot(e.clientY);
            xRing(e.clientX);
            yRing(e.clientY);

            // Stretch ring visual child along the direction of motion
            if (velocity > 0.08 && !isDownRef.current) {
                gsap.to(ringVisualRef.current, {
                    scaleX: stretchScaleX,
                    scaleY: stretchScaleY,
                    rotation: angle,
                    duration: 0.1,
                    overwrite: "auto"
                });
            } else {
                gsap.to(ringVisualRef.current, {
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0,
                    duration: 0.22,
                    overwrite: "auto"
                });
            }

            lastX = e.clientX;
            lastY = e.clientY;
            lastTime = now;

            const el = document.elementFromPoint(e.clientX, e.clientY);
            const hoverEl = el?.closest('a,button,[role="button"],input,textarea,select,[data-hover]');
            const hoverLabelEl = el?.closest('[data-hover-label]');
            const labelText = hoverLabelEl ? hoverLabelEl.getAttribute('data-hover-label') || '' : '';

            if (!isDownRef.current) {
                if (labelText) {
                    setRingState('hover', labelText);
                } else {
                    setRingState(hoverEl ? 'hover' : 'normal');
                }
            }
        };

        const onDown = () => {
            isDownRef.current = true;
            // Instantly clear any stretch rotation on click
            gsap.killTweensOf(ringVisualRef.current);
            gsap.set(ringVisualRef.current, { scaleX: 1, scaleY: 1, rotation: 0 });
            setRingState('click');
        };

        const onUp = (e: MouseEvent) => {
            isDownRef.current = false;
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const hoverEl = el?.closest('a,button,[role="button"],input,textarea,select,[data-hover]');
            const hoverLabelEl = el?.closest('[data-hover-label]');
            const labelText = hoverLabelEl ? hoverLabelEl.getAttribute('data-hover-label') || '' : '';

            if (labelText) {
                setRingState('hover', labelText);
            } else {
                setRingState(hoverEl ? 'hover' : 'normal');
            }
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        // Position off-screen initially
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
                    width: 8, height: 8,
                    background: '#38bdf8',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    left: 0, top: 0,
                    width: 36, height: 36,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* The actual visual ring component that is stretched/rotated */}
                <div
                    ref={ringVisualRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(56, 189, 248, 0.45)',
                        pointerEvents: 'none',
                    }}
                />
                {/* Text label element (stays oriented vertically) */}
                <div
                    ref={labelRef}
                    style={{
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '9px',
                        fontWeight: 650,
                        letterSpacing: '0.12em',
                        color: '#38bdf8',
                        opacity: 0,
                        transform: 'scale(0)',
                        pointerEvents: 'none',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                    }}
                />
            </div>
        </>
    );
}
