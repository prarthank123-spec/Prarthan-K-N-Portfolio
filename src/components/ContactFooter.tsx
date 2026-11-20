import { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Moon,
  Phone,
  SlidersHorizontal,
  Sun,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ContactFooterProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCv: () => void;
  onOpenStudio: () => void;
  onBackToTop: () => void;
}

export function ContactFooter({
  isDark,
  onToggleTheme,
  onOpenCv,
  onOpenStudio,
  onBackToTop,
}: ContactFooterProps) {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      const input = document.createElement('textarea');
      input.value = PROFILE.email;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    }
  };

  return (
    <section
      id="contact"
      className="border-t px-6 py-12 sm:px-10 sm:py-14"
      style={{ borderColor: 'var(--hairline)' }}
    >
      <div className="max-w-4xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <p className="dossier-mono accent-text text-[10px] font-medium">
              06. Direct Inquiries &amp; Collaboration
            </p>
            <h2 className="dossier-display mt-2.5 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
              Open to opportunities in clinical pharmacy, pharmacovigilance, regulatory affairs,
              medical writing, and collaborative clinical research.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href={PROFILE.cvPdfSrc}
                download="Dr_Prarthan_KN_CV.pdf"
                className="accent-bg dossier-mono inline-flex min-h-[42px] items-center px-5 py-2.5 text-[10.5px] font-bold whitespace-nowrap shrink-0 transition-colors"
              >
                Download Dossier (PDF)
              </a>
              <button
                type="button"
                onClick={onOpenCv}
                className="dossier-mono hover-accent-border hover-accent-text inline-flex min-h-[42px] items-center border px-4 py-2.5 text-[10.5px] text-[var(--ink-secondary)] whitespace-nowrap shrink-0 transition-colors"
                style={{ borderColor: 'var(--hairline)' }}
              >
                Preview CV
              </button>
            </div>
          </div>

          <div className="md:col-span-7">
            <div
              className="portfolio-card border"
              style={{ borderColor: 'var(--hairline)' }}
            >
              {/* Email */}
              <div
                className="flex flex-col justify-between gap-3 border-b p-5 sm:flex-row sm:items-center"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <div className="flex items-start gap-3">
                  <Mail className="accent-text mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="dossier-mono text-[9.5px] text-[var(--ink-muted)]">Email</p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="hover-accent-text mt-1 inline-block font-mono text-xs font-semibold text-[var(--ink)] transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="dossier-mono hover-accent-border hover-accent-text inline-flex min-h-[36px] self-start items-center gap-1.5 border px-3 py-1.5 text-[10px] text-[var(--ink-secondary)] whitespace-nowrap shrink-0 transition-colors sm:self-auto"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  {emailCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 accent-text" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone */}
              <div
                className="flex items-start gap-3 border-b p-5"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <Phone className="accent-text mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <div>
                  <p className="dossier-mono text-[9.5px] text-[var(--ink-muted)]">Phone</p>
                  <a
                    href={PROFILE.phoneHref}
                    className="hover-accent-text mt-1 inline-block font-mono text-xs font-medium text-[var(--ink)] tabular-nums transition-colors"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div
                className="flex items-start gap-3 border-b p-5"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <MapPin className="accent-text mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <div>
                  <p className="dossier-mono text-[9.5px] text-[var(--ink-muted)]">Location</p>
                  <p className="mt-1 text-xs font-medium text-[var(--ink)]">{PROFILE.location}</p>
                </div>
              </div>

              {/* External Profiles */}
              <div className="flex flex-wrap items-center gap-6 p-5">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-mono hover-accent-text inline-flex min-h-[36px] items-center gap-1.5 text-[10.5px] font-medium text-[var(--ink-secondary)] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <a
                  href={PROFILE.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-mono hover-accent-text inline-flex min-h-[36px] items-center gap-1.5 text-[10.5px] font-medium text-[var(--ink-secondary)] transition-colors"
                >
                  <span>ResearchGate</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Inline Dossier Bar */}
        <footer
          className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <p className="dossier-mono text-[9.5px] text-[var(--ink-muted)]">
            © {new Date().getFullYear()} {PROFILE.name} ({PROFILE.shortCredentials})
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={onOpenStudio}
              className="dossier-mono hover-accent-text inline-flex items-center gap-1.5 text-[10px] text-[var(--ink-secondary)] transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 accent-text" aria-hidden="true" />
              <span>Design &amp; Cursor</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="dossier-mono hover-accent-text inline-flex items-center gap-1.5 text-[10px] text-[var(--ink-secondary)] transition-colors"
            >
              {isDark ? (
                <>
                  <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBackToTop}
              className="dossier-mono hover-accent-text text-[10px] text-[var(--ink-secondary)] transition-colors"
            >
              Top ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
