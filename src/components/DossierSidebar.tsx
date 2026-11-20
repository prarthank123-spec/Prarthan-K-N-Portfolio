import { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface DossierSidebarProps {
  onOpenCv: () => void;
  onOpenStudio: () => void;
}

export function DossierSidebar({ onOpenCv, onOpenStudio }: DossierSidebarProps) {
  const [imgError, setImgError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        {/* Square Accent-Framed Portrait (Variation 3 Signature) */}
        <div
          className="mb-6 aspect-square w-full border p-2 transition-colors"
          style={{
            borderColor: 'var(--accent)',
            backgroundColor: 'var(--bg-subtle)',
          }}
        >
          {!imgError ? (
            <img
              src={PROFILE.portraitSrc}
              alt={`${PROFILE.name} — Clinical Pharmacy Intern`}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top brightness-95 contrast-[1.08] dark:brightness-90 dark:contrast-[1.12]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <span className="dossier-display accent-text text-3xl font-extrabold">PK</span>
              <span className="dossier-mono mt-2 text-[10px] text-[var(--ink-muted)]">
                PHARMD (PB)
              </span>
            </div>
          )}
        </div>

        {/* License & Identity */}
        <p className="dossier-mono accent-text text-[10px] font-medium">
          [ License KSPC ]
        </p>
        <h2 className="dossier-display mt-2.5 text-2xl font-extrabold leading-tight text-[var(--ink)]">
          {PROFILE.name}
        </h2>
        <p className="dossier-mono mt-2 text-[10px] leading-relaxed text-[var(--ink-muted)]">
          PharmD (PB) · B.Pharm · Clinical Intern · Karnataka, India
        </p>

        {/* Contact Core */}
        <div
          className="mt-8 border-t pt-6"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <p className="dossier-mono text-[10px] text-[var(--ink-muted)]">
            Contact Core
          </p>

          <div className="mt-3 space-y-2.5 font-mono text-[11px] text-[var(--ink-secondary)]">
            <a
              href={PROFILE.phoneHref}
              className="hover-accent-text block tabular-nums transition-colors"
            >
              {PROFILE.phone}
            </a>

            <div className="flex items-center justify-between gap-2">
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover-accent-text truncate transition-colors"
              >
                {PROFILE.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center border text-[var(--ink-muted)] transition-colors hover-accent-border hover-accent-text"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {copiedEmail ? (
                  <Check className="h-3 w-3 accent-text" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>

            <p className="text-[10px] text-[var(--ink-muted)]">{PROFILE.shortLocation}</p>
          </div>

          {/* Verified External Profiles */}
          <div className="mt-4 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-accent-text inline-flex items-center gap-1 text-[var(--ink-secondary)] transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.researchGate}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-accent-text inline-flex items-center gap-1 text-[var(--ink-secondary)] transition-colors"
            >
              <span>ResearchGate</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>

          {/* Primary Dossier CTA */}
          <a
            href={PROFILE.cvPdfSrc}
            download="Dr_Prarthan_KN_CV.pdf"
            className="accent-bg dossier-mono mt-6 flex min-h-[44px] w-full items-center justify-center gap-2 px-4 py-3 text-[11px] font-bold transition-colors"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Download Dossier</span>
          </a>

          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onOpenCv}
              className="dossier-mono hover-accent-border hover-accent-text flex min-h-[38px] items-center justify-center border px-2 py-2 text-[10px] text-[var(--ink-secondary)] transition-colors"
              style={{ borderColor: 'var(--hairline)' }}
            >
              Preview CV
            </button>
            <button
              type="button"
              onClick={onOpenStudio}
              className="dossier-mono hover-accent-border hover-accent-text flex min-h-[38px] items-center justify-center gap-1.5 border px-2 py-2 text-[10px] text-[var(--ink-secondary)] transition-colors"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <SlidersHorizontal className="h-3 w-3 accent-text" aria-hidden="true" />
              <span>Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Standing Note */}
      <div
        className="mt-8 border-t pt-4 font-mono text-[10px] text-[var(--ink-muted)]"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <p className="uppercase tracking-[0.12em]">Languages</p>
        <p className="mt-1 text-[var(--ink-secondary)]">{PROFILE.languages.join(' · ')}</p>
      </div>
    </div>
  );
}
