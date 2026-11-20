import { useEffect } from 'react';
import { Download, Printer, X } from 'lucide-react';
import {
  CERTIFICATIONS,
  CONFERENCES,
  EDUCATION,
  EXPERIENCE_TIMELINE,
  PROFILE,
  PUBLICATIONS,
  SKILL_PILLARS,
} from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadTextCv = () => {
    const lines = [
      `${PROFILE.name.toUpperCase()}`,
      `${PROFILE.credentials}`,
      `${PROFILE.tagline}`,
      `Location: ${PROFILE.location}`,
      `Email: ${PROFILE.email} | Phone: ${PROFILE.phone}`,
      `LinkedIn: ${PROFILE.linkedin}`,
      '',
      'PROFILE SUMMARY',
      PROFILE.bio,
      '',
      'RESEARCH METRICS',
      '25 Citations | H-Index: 2 | 22+ Scholarly Outputs (11 research papers, 4 review articles, 3 case series, 2 case reports, 2 systematic reviews) | 2 Manuscripts Under Peer Review (2026)',
      '',
      'EXPERIENCE',
      ...EXPERIENCE_TIMELINE.flatMap((exp) => [
        `- ${exp.role} | ${exp.organization} (${exp.period})`,
        ...exp.highlights.map((h) => `  * ${h}`),
      ]),
      '',
      'EDUCATION',
      ...EDUCATION.map(
        (edu) => `- ${edu.degree} — ${edu.institution}, ${edu.university} (${edu.period}) | ${edu.score}`
      ),
      '',
      'SELECTED PUBLICATIONS',
      ...PUBLICATIONS.map((pub) => `${pub.index}. ${pub.citation}`),
      '',
      'CERTIFICATIONS',
      ...CERTIFICATIONS.map((c) => `- ${c.title} (${c.issuer} — ${c.detail})`),
      '',
      'CONFERENCES',
      ...CONFERENCES.map((c) => `- ${c.role}: ${c.title} (${c.venue}, ${c.year})`),
      '',
      `LANGUAGES: ${PROFILE.languages.join(', ')}`,
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Dr_Prarthan_KN_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border shadow-2xl"
        style={{
          borderColor: 'var(--hairline-strong)',
          backgroundColor: 'var(--bg-canvas)',
          color: 'var(--ink)',
        }}
      >
        {/* Modal Action Header */}
        <div
          className="no-print flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div>
            <h2
              id="cv-modal-title"
              className="dossier-display text-sm font-bold text-[var(--ink)]"
            >
              Curriculum Vitae — {PROFILE.name}
            </h2>
            <p className="mt-0.5 font-mono text-[10.5px] text-[var(--ink-muted)]">
              Download original PDF, print sheet, or export structured text.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE.cvPdfSrc}
              download="Dr_Prarthan_KN_CV.pdf"
              className="accent-bg dossier-mono inline-flex min-h-[38px] items-center gap-1.5 px-4 py-2 text-[10px] font-bold whitespace-nowrap shrink-0 transition-colors"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="dossier-mono hover-accent-border hover-accent-text inline-flex min-h-[38px] items-center gap-1.5 border px-3.5 py-2 text-[10px] text-[var(--ink-secondary)] whitespace-nowrap shrink-0 transition-colors"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadTextCv}
              className="dossier-mono hover-accent-border hover-accent-text hidden min-h-[38px] items-center gap-1.5 border px-3.5 py-2 text-[10px] text-[var(--ink-secondary)] whitespace-nowrap shrink-0 transition-colors sm:inline-flex"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <span>Export .txt</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close curriculum vitae preview"
              className="hover-accent-border hover-accent-text inline-flex h-9 w-9 items-center justify-center border text-[var(--ink-secondary)] transition-colors"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable CV Sheet */}
        <div
          id="printable-cv-sheet"
          className="overflow-y-auto p-6 sm:p-10"
          style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--ink)' }}
        >
          <div className="border-b pb-5" style={{ borderColor: 'var(--hairline)' }}>
            <h1 className="dossier-display text-2xl font-extrabold">{PROFILE.name}</h1>
            <p className="accent-text mt-1 font-mono text-xs">{PROFILE.credentials}</p>
            <p className="mt-2 font-mono text-[11px] text-[var(--ink-muted)]">
              {PROFILE.email} · {PROFILE.phone} · {PROFILE.location}
            </p>
          </div>

          <div className="mt-6 space-y-6 text-sm">
            <section>
              <h3 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                Summary &amp; Research Impact
              </h3>
              <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">
                {PROFILE.bio}
              </p>
              <p className="mt-2 font-mono text-xs text-slate-600 tabular-nums dark:text-slate-400">
                25 Citations · H-Index: 2 · 22+ Scholarly Outputs (11 Research Papers, 4 Reviews, 3
                Case Series, 2 Case Reports, 2 Systematic Reviews) · 2 Manuscripts Under Peer Review
                (2026)
              </p>
            </section>

            <section>
              <h3 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                Clinical &amp; Industrial Experience
              </h3>
              <div className="mt-3 space-y-4">
                {EXPERIENCE_TIMELINE.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="font-semibold">
                        {exp.role} — {exp.organization}
                      </p>
                      <span className="font-mono text-xs text-slate-500 tabular-nums">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {exp.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                Education
              </h3>
              <div className="mt-3 space-y-2">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="flex flex-wrap justify-between gap-2 text-xs">
                    <p>
                      <span className="font-semibold">{edu.degree}</span> — {edu.institution},{' '}
                      {edu.university}
                    </p>
                    <span className="font-mono text-slate-600 tabular-nums dark:text-slate-400">
                      {edu.period} · {edu.score}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                Core Competencies
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                {SKILL_PILLARS.map((pillar) => (
                  <div key={pillar.number}>
                    <p className="font-semibold">{pillar.title}</p>
                    <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                      {pillar.items.map((i) => i.name).join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                Featured Publications &amp; Protocols
              </h3>
              <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-xs text-slate-700 dark:text-slate-300">
                {PUBLICATIONS.map((pub) => (
                  <li key={pub.id}>{pub.citation}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
