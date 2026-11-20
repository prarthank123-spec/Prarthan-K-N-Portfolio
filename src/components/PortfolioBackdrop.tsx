import type { GraphicsId } from '../types/themeConfig';

interface PortfolioBackdropProps {
  graphics: GraphicsId;
}

export function PortfolioBackdrop({ graphics }: PortfolioBackdropProps) {
  if (graphics === 'clean') {
    return null;
  }

  if (graphics === 'dots') {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.55] dark:opacity-[0.45]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(148, 163, 184, 0.22) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    );
  }

  if (graphics === 'aura') {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-40 right-[-10%] h-[540px] w-[540px] rounded-full blur-3xl transition-colors duration-300"
          style={{ background: 'radial-gradient(circle, var(--accent-aura) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[45%] -left-44 h-[480px] w-[480px] rounded-full blur-3xl transition-colors duration-300"
          style={{ background: 'radial-gradient(circle, var(--accent-aura) 0%, transparent 72%)' }}
        />
      </div>
    );
  }

  if (graphics === 'blueprint') {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <svg
          className="h-full w-full text-slate-400/[0.15] dark:text-slate-500/[0.14]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bp-minor" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
            <pattern id="bp-major" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect width="120" height="120" fill="url(#bp-minor)" />
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="1.8" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bp-major)" />
        </svg>
        <div
          className="absolute top-0 right-0 h-80 w-80 opacity-20"
          style={{ background: 'radial-gradient(circle at top right, var(--accent-aura), transparent 70%)' }}
        />
      </div>
    );
  }

  if (graphics === 'helix') {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Right-edge architectural biomedical double helix */}
        <svg
          viewBox="0 0 260 900"
          preserveAspectRatio="none"
          className="absolute top-0 right-0 h-full w-48 opacity-[0.14] sm:w-64 dark:opacity-[0.18]"
          style={{ color: 'var(--accent)' }}
          fill="none"
        >
          <path
            d="M 70 0 C 210 112, 210 188, 70 300 C -70 412, -70 488, 70 600 C 210 712, 210 788, 70 900"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M 190 0 C 50 112, 50 188, 190 300 C 330 412, 330 488, 190 600 C 50 712, 50 788, 190 900"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />
          {[75, 150, 225, 375, 450, 525, 675, 750, 825].map((y) => (
            <line
              key={y}
              x1="78"
              y1={y}
              x2="182"
              y2={y}
              stroke="currentColor"
              strokeWidth="0.9"
              opacity="0.6"
            />
          ))}
        </svg>

        {/* Left-edge subtle counter curve */}
        <svg
          viewBox="0 0 180 900"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 hidden h-full w-36 text-slate-400/[0.15] lg:block dark:text-slate-500/[0.12]"
          fill="none"
        >
          <path
            d="M 40 0 C 140 150, 140 300, 40 450 C -60 600, -60 750, 40 900"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    );
  }

  if (graphics === 'contours') {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full text-slate-400/[0.14] dark:text-slate-500/[0.12]"
          fill="none"
        >
          {[1, 2, 3, 4, 5, 6].map((ring) => (
            <ellipse
              key={`tr-${ring}`}
              cx="1040"
              cy="120"
              rx={ring * 82}
              ry={ring * 54}
              transform="rotate(-18 1040 120)"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
          {[1, 2, 3, 4, 5].map((ring) => (
            <ellipse
              key={`bl-${ring}`}
              cx="120"
              cy="690"
              rx={ring * 90}
              ry={ring * 58}
              transform="rotate(14 120 690)"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
        <div
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-50"
          style={{ background: 'radial-gradient(circle, var(--accent-aura) 0%, transparent 72%)' }}
        />
      </div>
    );
  }

  // 'molecular': Architectural hexagonal pharmaceutical lattice + subtle lab contour lines
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg
        className="h-full w-full text-slate-400/[0.16] dark:text-slate-500/[0.13]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="pharma-hex-lattice"
            width="96"
            height="84"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="48,4 84,24 84,60 48,80 12,60 12,24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            <circle cx="48" cy="4" r="2" fill="currentColor" />
            <circle cx="84" cy="60" r="1.8" fill="currentColor" />
            <circle cx="12" cy="60" r="1.8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pharma-hex-lattice)" />
      </svg>

      {/* Subtle accent molecular highlight on top-right corner */}
      <svg
        viewBox="0 0 360 360"
        className="absolute -top-12 -right-12 h-[360px] w-[360px] opacity-[0.14] dark:opacity-[0.18]"
        style={{ color: 'var(--accent)' }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <polygon points="180,40 245,78 245,152 180,190 115,152 115,78" />
          <polygon points="245,152 310,190 310,264 245,302 180,264 180,190" />
          <polygon points="115,152 180,190 180,264 115,302 50,264 50,190" />
          <line x1="180" y1="62" x2="228" y2="90" />
          <line x1="228" y1="140" x2="180" y2="168" />
          <line x1="132" y1="90" x2="132" y2="140" />
        </g>
        <g fill="currentColor">
          <circle cx="180" cy="40" r="3.5" />
          <circle cx="245" cy="152" r="3.5" />
          <circle cx="180" cy="190" r="4" />
          <circle cx="115" cy="152" r="3.5" />
          <circle cx="245" cy="302" r="3" />
          <circle cx="115" cy="302" r="3" />
        </g>
      </svg>
    </div>
  );
}
