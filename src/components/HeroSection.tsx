import { useEffect, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import {
  OUTPUT_BREAKDOWN,
  PROFILE,
  RESEARCH_METRICS,
} from '../data/portfolioData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const CORE_COMPETENCY_PREVIEW = [
  'Pharmacovigilance (VigiFlow)',
  'Antimicrobial Stewardship',
  'Systematic Review (PROSPERO)',
  'Statistical Data Analysis (SPSS)',
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let frameId = 0;
    const duration = 680;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target]);

  const formatted = target < 10 && !suffix ? `0${count}` : `${count}`;

  return (
    <span className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const totalOutputs = OUTPUT_BREAKDOWN.reduce((sum, item) => sum + item.count, 0);

  const metricDescriptors: Record<string, { kicker: string; unit: string }> = {
    citations: { kicker: 'Impact Metric', unit: 'Citations' },
    outputs: { kicker: 'Scholarly Archive', unit: 'Outputs' },
    'h-index': { kicker: 'H-Index', unit: 'Verified' },
    'under-review': { kicker: 'Pipeline (2026)', unit: 'Under Review' },
  };

  // Order matches Variation 3 layout: Citations, Outputs, H-Index, Pipeline
  const orderedMetrics = [
    RESEARCH_METRICS[0],
    RESEARCH_METRICS[2],
    RESEARCH_METRICS[1],
    RESEARCH_METRICS[3],
  ];

  return (
    <section id="overview" className="px-6 py-10 sm:px-10 sm:py-12">
      <div className="max-w-4xl">
        {/* Executive Summary Kicker */}
        <p className="dossier-mono text-[11px] text-[var(--ink-muted)]">
          Executive Summary · 2026 · {PROFILE.shortCredentials}
        </p>

        {/* Monumental Variation 3 Display Title */}
        <h1 className="dossier-display accent-text mt-5 text-4xl font-extrabold leading-[0.94] sm:text-5xl xl:text-[3.85rem]">
          Clinical Systems Optimization.
        </h1>

        {/* Verified Bio */}
        <p className="mt-7 max-w-[65ch] text-base leading-[1.72] text-[var(--ink-secondary)] sm:text-[1.0625rem]">
          {PROFILE.bio}
        </p>

        {/* 2x2 Signature Variation 3 Data Cards Grid */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {orderedMetrics.map((metric) => {
            const meta = metricDescriptors[metric.id];
            return (
              <div
                key={metric.id}
                className="portfolio-card border p-5 transition-colors"
                style={{
                  borderColor: 'var(--hairline)',
                  borderLeftWidth: '2px',
                  borderLeftColor: 'var(--accent)',
                }}
              >
                <span className="dossier-mono block text-[10px] text-[var(--ink-muted)]">
                  {meta.kicker}
                </span>
                <div className="mt-2 font-mono text-2xl font-semibold text-[var(--ink)] tabular-nums">
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />{' '}
                  <span className="text-lg font-medium text-[var(--ink-secondary)]">
                    {meta.unit}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[var(--ink-muted)]">{metric.context}</p>
              </div>
            );
          })}
        </div>

        {/* Scholarly Composition Bar */}
        <div
          className="portfolio-card mt-4 border p-5"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="dossier-mono text-[10px] text-[var(--ink-muted)]">
              Scholarly Composition Breakdown
            </span>
            <button
              type="button"
              onClick={() => onNavigate('publications')}
              className="dossier-mono accent-text inline-flex items-center gap-1 text-[10px] hover:underline"
            >
              <span>Inspect Archive</span>
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="mt-3 flex h-1.5 w-full overflow-hidden"
            style={{ backgroundColor: 'var(--bg-subtle)' }}
            aria-hidden="true"
          >
            {OUTPUT_BREAKDOWN.map((item, idx) => {
              const widthPct = (item.count / totalOutputs) * 100;
              const opacities = [1, 0.72, 0.5, 0.34, 0.22];
              return (
                <div
                  key={item.label}
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: 'var(--accent)',
                    opacity: opacities[idx] ?? 0.3,
                  }}
                />
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-[var(--ink-secondary)] tabular-nums">
            {OUTPUT_BREAKDOWN.map((item) => (
              <span key={item.label}>
                <strong className="font-semibold text-[var(--ink)]">{item.count}</strong>{' '}
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Core Competency Quick Grid (Variation 3 Signature Preview) */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="dossier-mono text-[10px] text-[var(--ink-muted)]">
              Core Competency Grid
            </span>
            <button
              type="button"
              onClick={() => onNavigate('expertise')}
              className="dossier-mono hover-accent-text text-[10px] text-[var(--ink-muted)] transition-colors"
            >
              Open Full 4-Pillar Workbench →
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CORE_COMPETENCY_PREVIEW.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onNavigate('expertise')}
                className="dossier-mono hover-accent-border hover-accent-text border px-4 py-3 text-left text-[10.5px] text-[var(--ink-secondary)] transition-colors"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
