import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    // Positions
    const mouse = useRef({ x: -200, y: -200 });
    const dotPos = useRef({ x: -200, y: -200 });
    const ringPos = useRef({ x: -200, y: -200 });
    const raf = useRef<number>(0);
    const isDown = useRef(false);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Update ring state inline (no React re-render)
    const setRingState = useCallback((state: 'normal' | 'hover' | 'click') => {
        const r = ringRef.current;
        if (!r) return;
        if (state === 'hover') {
            r.style.width = '80px';
            r.style.height = '80px';
            r.style.background = 'rgba(255,255,255,0.10)';
            r.style.borderColor = 'rgba(56, 189, 248,0.6)';
            r.style.borderWidth = '1.5px';
        } else if (state === 'click') {
            r.style.width = '96px';
            r.style.height = '96px';
            r.style.background = 'rgba(56, 189, 248,0.12)';
            r.style.borderColor = 'rgba(56, 189, 248,0.9)';
        } else {
            r.style.width = '40px';
            r.style.height = '40px';
            r.style.background = 'transparent';
            r.style.borderColor = 'rgba(56, 189, 248,0.40)';
            r.style.borderWidth = '1.5px';
        }
    }, []);

    useEffect(() => {
        const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
        const onDown = () => {
            isDown.current = true;
            setRingState('click');
            if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(0)';
        };
        const onUp = () => {
            isDown.current = false;
            const el = document.elementFromPoint(mouse.current.x, mouse.current.y);
            const hover = !!el?.closest('a,button,[role="button"],input,textarea,select,[data-hover]');
            setRingState(hover ? 'hover' : 'normal');
            if (dotRef.current)
                dotRef.current.style.transform = hover
                    ? 'translate(-50%,-50%) scale(0)'
                    : 'translate(-50%,-50%) scale(1)';
        };
        const onEnter = () => {
            setRingState('hover');
            if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(0)';
        };
        const onLeave = () => {
            if (isDown.current) return;
            setRingState('normal');
            if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
        };

        // Delegate hover detection
        const checkHover = () => {
            const el = document.elementFromPoint(mouse.current.x, mouse.current.y);
            return !!el?.closest('a,button,[role="button"],input,textarea,select,[data-hover]');
        };

        const tick = () => {
            // Dot — fast lerp 0.12
            dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.12);
            dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.12);

            // Ring — slower lerp 0.07
            ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.07);
            ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.07);

            if (dotRef.current) {
                dotRef.current.style.left = `${dotPos.current.x}px`;
                dotRef.current.style.top = `${dotPos.current.y}px`;
            }
            if (ringRef.current) {
                ringRef.current.style.left = `${ringPos.current.x}px`;
                ringRef.current.style.top = `${ringPos.current.y}px`;
            }

            // Live hover check
            if (!isDown.current) {
                const hov = checkHover();
                setRingState(hov ? 'hover' : 'normal');
                if (dotRef.current)
                    dotRef.current.style.transform = hov
                        ? 'translate(-50%,-50%) scale(0)'
                        : 'translate(-50%,-50%) scale(1)';
            }

            raf.current = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        document.querySelectorAll('a,button').forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        raf.current = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            cancelAnimationFrame(raf.current);
        };
    }, [setRingState]);

    return (
        <>
            {/* 12px filled amber dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    width: 12, height: 12,
                    background: '#38bdf8',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%,-50%)',
                    boxShadow: '0 0 8px rgba(56, 189, 248,0.6)',
                    transition: 'transform 0.15s cubic-bezier(0.76,0,0.24,1)',
                    willChange: 'transform, left, top',
                }}
            />
            {/* 40px hollow ring → expands to 80px on hover */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    width: 40, height: 40,
                    border: '1.5px solid rgba(56, 189, 248,0.4)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%,-50%)',
                    transition: 'width 0.25s cubic-bezier(0.76,0,0.24,1), height 0.25s cubic-bezier(0.76,0,0.24,1), background 0.25s, border-color 0.25s',
                    willChange: 'transform, left, top',
                }}
            />
        </>
    );
}
