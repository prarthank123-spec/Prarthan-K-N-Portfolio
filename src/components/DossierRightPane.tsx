import { Moon, SlidersHorizontal, Sun } from 'lucide-react';
import { EDUCATION, PROFILE } from '../data/portfolioData';

interface DossierRightPaneProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenStudio: () => void;
}

export function DossierRightPane({
  activeSection,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenStudio,
}: DossierRightPaneProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Sticky Pane Header */}
      <div
        className="sticky top-0 z-10 flex h-16 items-center justify-between border-b px-6"
        style={{
          borderColor: 'var(--hairline)',
          backgroundColor: 'var(--bg-canvas)',
        }}
      >
        <span className="dossier-mono text-[10px] font-medium text-[var(--ink-secondary)]">
          Documentation Log
        </span>
        <span className="dossier-mono accent-text text-[10px] tabular-nums">
          {activeSection}
        </span>
      </div>

      {/* Activity Feed Entries */}
      <div className="divide-y" style={{ borderColor: 'var(--hairline)' }}>
        <button
          type="button"
          onClick={() => onNavigate('experience')}
          className="block w-full border-b p-5 text-left transition-colors hover:bg-[var(--bg-hover)]"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span className="dossier-mono text-[10px] text-[var(--ink-muted)]">
              2026 / Intern
            </span>
          </div>
          <p className="text-sm font-semibold text-[var(--ink)]">
            Srinivas Medical Sciences
          </p>
          <p className="dossier-mono mt-1.5 text-[9.5px] leading-relaxed text-[var(--ink-muted)]">
            Medication profile review, clinical case reporting &amp; interaction auditing.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('experience')}
          className="block w-full border-b p-5 text-left transition-colors hover:bg-[var(--bg-hover)]"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span className="dossier-mono text-[10px] text-[var(--ink-muted)]">
              2025–2026 / Clinical
            </span>
          </div>
          <p className="text-sm font-semibold text-[var(--ink)]">
            Narayana Health, Bangalore
          </p>
          <p className="dossier-mono mt-1.5 text-[9.5px] leading-relaxed text-[var(--ink-muted)]">
            VigiFlow ADR reporting, AMS &amp; Oncology / Cardiology rotations.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('publications')}
          className="accent-soft-bg block w-full border-b p-5 text-left transition-colors"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <span className="dossier-mono accent-text block text-[10px]">
            Pub: PROSPERO Protocols
          </span>
          <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
            MELAS Syndrome &amp; Leqselvi
          </p>
          <p className="dossier-mono mt-1.5 text-[9.5px] leading-relaxed text-[var(--ink-muted)]">
            Scopus / Web of Science indexed systematic review protocol synthesis.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('credentials')}
          className="block w-full border-b p-5 text-left transition-colors hover:bg-[var(--bg-hover)]"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <span className="dossier-mono block text-[10px] text-[var(--ink-muted)]">
            Academic History
          </span>
          <div className="mt-3 space-y-2.5">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="flex items-baseline justify-between gap-2">
                <p className="text-xs font-semibold text-[var(--ink)]">
                  {edu.degree.includes('PharmD') ? 'PharmD (PB)' : 'B.Pharm'}
                </p>
                <span className="accent-text font-mono text-xs font-semibold tabular-nums">
                  {edu.score}
                </span>
              </div>
            ))}
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('credentials')}
          className="block w-full border-b p-5 text-left transition-colors hover:bg-[var(--bg-hover)]"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <span className="dossier-mono block text-[10px] text-[var(--ink-muted)]">
            Credentials &amp; Training
          </span>
          <p className="mt-2 text-xs font-semibold text-[var(--ink)]">
            NIDA GCP · IMWA · SCRMP
          </p>
          <p className="dossier-mono mt-1.5 text-[9.5px] leading-relaxed text-[var(--ink-muted)]">
            Regulatory affairs, clinical data management &amp; 8th IPCTS 2026.
          </p>
        </button>
      </div>

      {/* Bottom Pinned Dossier Footer & Controls */}
      <div
        className="mt-auto border-t p-5"
        style={{
          borderColor: 'var(--hairline)',
          backgroundColor: 'var(--bg-subtle)',
        }}
      >
        <div className="mb-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenStudio}
            className="dossier-mono hover-accent-border hover-accent-text inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 border px-2.5 py-1.5 text-[10px] text-[var(--ink-secondary)] transition-colors"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <SlidersHorizontal className="h-3 w-3 accent-text" aria-hidden="true" />
            <span>Design &amp; Cursor</span>
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="hover-accent-border hover-accent-text inline-flex h-9 w-9 shrink-0 items-center justify-center border text-[var(--ink-secondary)] transition-colors"
            style={{ borderColor: 'var(--hairline)' }}
          >
            {isDark ? <Sun className="h-3.5 w-3.5 accent-text" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>

        <p className="dossier-mono text-[9.5px] text-[var(--ink-muted)]">
          Dossier Rev: 2026 · KSPC Reg.
        </p>
        <p className="dossier-mono mt-1 text-[9.5px] text-[var(--ink-muted)]">
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
      </div>
    </div>
  );
}
