import { useEffect, useRef } from 'react';

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    r: number; alpha: number; baseAlpha: number;
    color: string;
}

type Section = 'hero' | 'about' | 'work' | 'contact';

const PALETTE: Record<Section, string[]> = {
    hero: ['rgba(245,158,11,', 'rgba(224,124,92,', 'rgba(251,191,36,', 'rgba(180,100,70,'],
    about: ['rgba(245,158,11,', 'rgba(253,230,138,', 'rgba(180,100,70,'],
    work: ['rgba(224,124,92,', 'rgba(245,158,11,', 'rgba(251,191,36,'],
    contact: ['rgba(245,158,11,', 'rgba(224,124,92,', 'rgba(253,230,138,'],
};

export default function ParticleCanvas({ section }: { section: Section }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = 0, H = 0;
        let particles: Particle[] = [];
        let mouse = { x: -9999, y: -9999 };
        let raf = 0;

        const resize = () => {
            W = canvas.offsetWidth;
            H = canvas.offsetHeight;
            canvas.width = W;
            canvas.height = H;
            init();
        };

        const colors = PALETTE[section];

        const init = () => {
            const count = section === 'hero' ? 120 : 70;
            particles = Array.from({ length: count }, () => {
                const col = colors[Math.floor(Math.random() * colors.length)];
                const ba = 0.15 + Math.random() * 0.3;
                return {
                    x: Math.random() * W, y: Math.random() * H,
                    vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
                    r: Math.random() * 1.5 + 0.3,
                    alpha: ba, baseAlpha: ba,
                    color: col,
                };
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            /* ── Hero: warm radial glows ── */
            if (section === 'hero') {
                [
                    { x: W * 0.15, y: H * 0.25, r: W * 0.30, c: 'rgba(245,158,11,0.05)' },
                    { x: W * 0.80, y: H * 0.60, r: W * 0.22, c: 'rgba(224,124,92,0.045)' },
                    { x: W * 0.50, y: H * 0.90, r: W * 0.28, c: 'rgba(251,191,36,0.04)' },
                ].forEach(g => {
                    const grd = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
                    grd.addColorStop(0, g.c); grd.addColorStop(1, 'transparent');
                    ctx.fillStyle = grd;
                    ctx.beginPath(); ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2); ctx.fill();
                });
            }

            /* ── About: soft warm mesh ── */
            if (section === 'about') {
                const t = Date.now() * 0.0008;
                const cols = 12, rows = 8;
                ctx.strokeStyle = 'rgba(245,158,11,0.05)';
                ctx.lineWidth = 0.7;
                for (let i = 0; i <= cols; i++) {
                    for (let j = 0; j <= rows; j++) {
                        const bx = (W / cols) * i, by = (H / rows) * j;
                        const wave = Math.sin(i * 0.5 + t) * 10 + Math.cos(j * 0.4 + t * 0.7) * 8;
                        if (i < cols && j < rows) {
                            ctx.beginPath(); ctx.moveTo(bx, by + wave); ctx.lineTo(bx + W / cols, by + wave); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(bx, by + wave); ctx.lineTo(bx, by + H / rows + wave); ctx.stroke();
                        }
                    }
                }
            }

            /* ── Work: soft floating shapes ── */
            if (section === 'work') {
                const t = Date.now() * 0.0004;
                [
                    { cx: W * 0.08, cy: H * 0.18, size: 55, rot: t },
                    { cx: W * 0.88, cy: H * 0.28, size: 70, rot: -t * 1.1 },
                    { cx: W * 0.92, cy: H * 0.78, size: 50, rot: t * 0.7 },
                ].forEach(s => {
                    ctx.save(); ctx.translate(s.cx, s.cy); ctx.rotate(s.rot);
                    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, s.size);
                    grd.addColorStop(0, 'rgba(245,158,11,0.08)');
                    grd.addColorStop(0.6, 'rgba(224,124,92,0.04)');
                    grd.addColorStop(1, 'transparent');
                    ctx.fillStyle = grd;
                    ctx.beginPath(); ctx.moveTo(0, -s.size); ctx.lineTo(s.size * 0.6, 0);
                    ctx.lineTo(0, s.size); ctx.lineTo(-s.size * 0.6, 0); ctx.closePath();
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(245,158,11,0.1)'; ctx.lineWidth = 1; ctx.stroke();
                    ctx.restore();
                });
            }

            /* ── Contact: warm radial converge ── */
            if (section === 'contact') {
                const t = Date.now() * 0.0008;
                const cx = W / 2, cy = H * 0.45;
                for (let i = 0; i < 28; i++) {
                    const angle = (i / 28) * Math.PI * 2;
                    const phase = ((t * 0.3 + i * 0.12) % 1);
                    const len = W * 0.4 * phase;
                    const sx = cx + Math.cos(angle) * len * 0.1;
                    const sy = cy + Math.sin(angle) * len * 0.1;
                    const ex = cx + Math.cos(angle) * len;
                    const ey = cy + Math.sin(angle) * len;
                    const a = (1 - phase) * 0.15;
                    const g = ctx.createLinearGradient(sx, sy, ex, ey);
                    g.addColorStop(0, `rgba(245,158,11,0)`);
                    g.addColorStop(0.5, `rgba(245,158,11,${a})`);
                    g.addColorStop(1, `rgba(224,124,92,${a * 0.7})`);
                    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
                    ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.stroke();
                }
            }

            /* ── Particles (all) ── */
            particles.forEach(p => {
                const dx = p.x - mouse.x, dy = p.y - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 80) {
                    const f = (80 - dist) / 80;
                    p.vx += (dx / dist) * f * 0.2;
                    p.vy += (dy / dist) * f * 0.2;
                }
                p.alpha += (Math.random() - 0.5) * 0.015;
                p.alpha = Math.max(0.04, Math.min(p.baseAlpha + 0.15, p.alpha));
                p.vx *= 0.98; p.vy *= 0.98;
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + `${p.alpha})`;
                ctx.shadowColor = p.color + '0.5)';
                ctx.shadowBlur = 4;
                ctx.fill();
            });

            raf = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize, { passive: true });
        window.addEventListener('mousemove', e => { mouse = { x: e.clientX, y: e.clientY }; }, { passive: true });
        resize();
        raf = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(raf);
        };
    }, [section]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}
