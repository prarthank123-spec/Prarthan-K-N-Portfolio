import { useEffect, useRef, useState } from 'react';
import type { CursorStyleId } from '../types/themeConfig';

interface CustomCursorProps {
  cursorStyle: CursorStyleId;
}

const COMET_NODES = [0, 1, 2, 3, 4];

export function CustomCursor({ cursorStyle }: CustomCursorProps) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [pressing, setPressing] = useState(false);

  const primaryRef = useRef<HTMLDivElement | null>(null);
  const trailingRef = useRef<HTMLDivElement | null>(null);
  const cometRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (cursorStyle === 'default' || typeof window === 'undefined') {
      setEnabled(false);
      return;
    }

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    const trailPoints = COMET_NODES.map(() => ({ x: targetX, y: targetY }));
    let frameId = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);

      if (primaryRef.current) {
        primaryRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, textarea, select, [role="button"], [role="tab"]')
      );
      setHoveringInteractive(isInteractive);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    const handleDown = () => setPressing(true);
    const handleUp = () => setPressing(false);

    const animate = () => {
      const ease =
        cursorStyle === 'spotlight'
          ? 0.14
          : cursorStyle === 'editorial-brackets'
          ? 0.28
          : 0.22;

      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (trailingRef.current) {
        trailingRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      if (cursorStyle === 'comet-trail') {
        let prevX = targetX;
        let prevY = targetY;
        for (let i = 0; i < trailPoints.length; i++) {
          const factor = 0.34 - i * 0.03;
          trailPoints[i].x += (prevX - trailPoints[i].x) * factor;
          trailPoints[i].y += (prevY - trailPoints[i].y) * factor;
          prevX = trailPoints[i].x;
          prevY = trailPoints[i].y;
          const node = cometRefs.current[i];
          if (node) {
            node.style.transform = `translate3d(${trailPoints[i].x}px, ${trailPoints[i].y}px, 0)`;
          }
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [cursorStyle]);

  if (!enabled || cursorStyle === 'default') {
    return null;
  }

  // 1. Accent Spotlight
  if (cursorStyle === 'spotlight') {
    return (
      <div
        ref={trailingRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 -ml-44 -mt-44 h-88 w-88 rounded-full transition-opacity duration-200 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, var(--accent-aura) 0%, transparent 65%)',
          willChange: 'transform',
        }}
      />
    );
  }

  // 2. Clinical Reticle
  if (cursorStyle === 'reticle') {
    return (
      <>
        <div
          ref={primaryRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 -ml-3 -mt-3 h-6 w-6 transition-opacity duration-150 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: 'transform', color: 'var(--accent)' }}
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 transition-transform duration-150 ${
              hoveringInteractive ? 'scale-125' : pressing ? 'scale-90' : 'scale-100'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="12" y1="2" x2="12" y2="8" />
            <line x1="12" y1="16" x2="12" y2="22" />
            <line x1="2" y1="12" x2="8" y2="12" />
            <line x1="16" y1="12" x2="22" y2="12" />
            <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
          </svg>
        </div>

        <div
          ref={trailingRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 -ml-5 -mt-5 h-10 w-10 rounded-full border transition-opacity duration-200 ${
            visible ? 'opacity-70' : 'opacity-0'
          }`}
          style={{ borderColor: 'var(--accent)', willChange: 'transform' }}
        >
          <div
            className={`h-full w-full rounded-full transition-transform duration-150 ${
              hoveringInteractive ? 'scale-125' : 'scale-100'
            }`}
            style={{ backgroundColor: hoveringInteractive ? 'var(--accent-soft)' : 'transparent' }}
          />
        </div>
      </>
    );
  }

  // 3. Molecular Orbit (Hexagonal Benzene Core + Orbiting Electron Ring)
  if (cursorStyle === 'molecular-orbit') {
    return (
      <>
        <div
          ref={primaryRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 -ml-2 -mt-2 h-4 w-4 transition-opacity duration-150 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ color: 'var(--accent)', willChange: 'transform' }}
        >
          <svg
            viewBox="0 0 16 16"
            className={`h-4 w-4 transition-transform duration-150 ${
              pressing ? 'scale-75' : hoveringInteractive ? 'scale-110' : 'scale-100'
            }`}
            fill="currentColor"
          >
            <polygon points="8,1 14,4.5 14,11.5 8,15 2,11.5 2,4.5" opacity="0.9" />
            <circle cx="8" cy="8" r="2" fill="var(--accent-fg)" />
          </svg>
        </div>

        <div
          ref={trailingRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 -ml-5 -mt-5 h-10 w-10 transition-opacity duration-200 ${
            visible ? 'opacity-90' : 'opacity-0'
          }`}
          style={{ color: 'var(--accent)', willChange: 'transform' }}
        >
          <svg
            viewBox="0 0 40 40"
            className={`h-10 w-10 transition-transform duration-150 ${
              hoveringInteractive ? 'scale-125' : pressing ? 'scale-90' : 'scale-100'
            }`}
            fill="none"
          >
            <g className="cursor-orbit-spin origin-center">
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="6 4"
                opacity="0.8"
              />
              <circle cx="20" cy="5" r="2.6" fill="currentColor" />
              <circle cx="20" cy="35" r="1.8" fill="currentColor" opacity="0.65" />
            </g>
          </svg>
        </div>
      </>
    );
  }

  // 4. Editorial Viewfinder Brackets
  if (cursorStyle === 'editorial-brackets') {
    return (
      <>
        <div
          ref={primaryRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 -ml-1 -mt-1 h-2 w-2 rounded-full transition-opacity duration-150 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'var(--accent)', willChange: 'transform' }}
        />
        <div
          ref={trailingRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 -ml-4 -mt-4 h-8 w-8 transition-opacity duration-200 ${
            visible ? 'opacity-95' : 'opacity-0'
          }`}
          style={{ color: 'var(--accent)', willChange: 'transform' }}
        >
          <svg
            viewBox="0 0 32 32"
            className={`h-8 w-8 transition-transform duration-150 ${
              hoveringInteractive ? 'scale-135' : pressing ? 'scale-80' : 'scale-100'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="square"
          >
            <path d="M 3 10 L 3 3 L 10 3" />
            <path d="M 22 3 L 29 3 L 29 10" />
            <path d="M 29 22 L 29 29 L 22 29" />
            <path d="M 10 29 L 3 29 L 3 22" />
          </svg>
        </div>
      </>
    );
  }

  // 5. Fluid Comet Trail
  if (cursorStyle === 'comet-trail') {
    return (
      <>
        <div
          ref={primaryRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full transition-opacity duration-150 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'var(--accent)', willChange: 'transform' }}
        >
          <div
            className={`h-full w-full rounded-full transition-transform duration-150 ${
              hoveringInteractive ? 'scale-150' : pressing ? 'scale-75' : 'scale-100'
            }`}
            style={{ backgroundColor: 'var(--accent)' }}
          />
        </div>
        {COMET_NODES.map((idx) => {
          const size = Math.max(4, 10 - idx * 1.4);
          const half = size / 2;
          const alpha = 0.65 - idx * 0.11;
          return (
            <div
              key={idx}
              ref={(el) => {
                cometRefs.current[idx] = el;
              }}
              aria-hidden="true"
              className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full transition-opacity duration-200 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                marginLeft: `-${half}px`,
                marginTop: `-${half}px`,
                backgroundColor: 'var(--accent)',
                opacity: visible ? alpha : 0,
                willChange: 'transform',
              }}
            />
          );
        })}
      </>
    );
  }

  // 6. 'dot-ring': Minimal editorial dot + reactive halo ring
  return (
    <>
      <div
        ref={primaryRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 -ml-1 -mt-1 h-2 w-2 rounded-full transition-opacity duration-150 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: 'var(--accent)', willChange: 'transform' }}
      />
      <div
        ref={trailingRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 -ml-4 -mt-4 h-8 w-8 rounded-full border transition-opacity duration-200 ${
          visible ? 'opacity-90' : 'opacity-0'
        }`}
        style={{ borderColor: 'var(--accent)', willChange: 'transform' }}
      >
        <div
          className={`h-full w-full rounded-full transition-transform duration-150 ${
            hoveringInteractive ? 'scale-150' : pressing ? 'scale-75' : 'scale-100'
          }`}
          style={{
            backgroundColor: hoveringInteractive ? 'var(--accent-soft)' : 'transparent',
          }}
        />
      </div>
    </>
  );
}
