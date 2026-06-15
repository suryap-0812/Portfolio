import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  { year: '2025', role: 'Eureka! 2025 Zonal Rounds Shortlist', org: 'E-Cell, IIT Bombay' },
  { year: '2025', role: 'Smart India Hackathon (SIH) Shortlist', org: 'Internal Round Selection' },
  { year: '2025', role: 'Mastering Data Structures & Algorithms using C and C++', org: 'Udemy' },
  { year: '2025', role: 'Getting Started with Deep Learning', org: 'NVIDIA' },
  { year: '2024', role: 'Completion Of C++ Training', org: 'Udemy' },
  { year: '2024', role: 'ReactJS Masterclass', org: 'Udemy' },
];

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
    itemRefs.current.forEach((item) => {
      if (!item) return;

      ScrollTrigger.create({
        trigger: item,
        start: "top center+=50",
        end: "bottom center-=50",
        onEnter: () => {
          gsap.to(item, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" });
        },
        onLeaveBack: () => {
          gsap.to(item, { opacity: 0.3, x: -12, duration: 0.5, ease: "power2.out" });
        }
      });

      // Initial state
      gsap.set(item, { opacity: 0.3, x: -12 });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative py-12 theme-bg">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-left">
          <p className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-3 text-slate-500">
            // Achievements & Certifications
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            Timeline
          </h2>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative pl-24 md:pl-44 py-6">

          {/* Vertical line track */}
          <div className="absolute left-[72px] md:left-[136px] top-0 bottom-0 w-[1.5px]"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            <div ref={trackRef} className="w-full h-full bg-sky-400 origin-top" />
          </div>

          {/* Indicator Dot */}
          <div
            ref={indicatorRef}
            className="absolute left-[66px] md:left-[130px] top-0 w-3.5 h-3.5 rounded-full border border-sky-400 flex items-center justify-center z-20 pointer-events-none bg-[#020617]"
          >
            <div className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-16">
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                ref={el => itemRefs.current[i] = el}
                className="relative flex items-center gap-6 group cursor-none"
                data-hover-label="AWARD"
              >
                {/* Year Marker (Left of the line) */}
                <div className="absolute -left-[85px] md:-left-[145px] w-[50px] text-right">
                  <div className="font-mono text-sm tracking-[0.2em] text-slate-500">
                    {a.year}
                  </div>
                </div>

                {/* Node Dot on the line */}
                <div className="absolute -left-[41px] top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
                </div>

                {/* Content */}
                <div className="text-left">
                  <h4 className="font-display font-bold text-base md:text-lg text-slate-200 group-hover:text-white transition-colors">
                    {a.role}
                  </h4>
                  <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-slate-500 mt-1">
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
