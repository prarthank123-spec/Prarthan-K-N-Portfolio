import { CERTIFICATIONS, CONFERENCES, EDUCATION, PROFILE } from '../data/portfolioData';

export function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="border-t px-6 py-12 sm:px-10 sm:py-14"
      style={{ borderColor: 'var(--hairline)' }}
    >
      <div className="max-w-4xl">
        <div>
          <p className="dossier-mono accent-text text-[10px] font-medium">
            05. Academic &amp; Professional Standing
          </p>
          <h2 className="dossier-display mt-2.5 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
            Education, Certifications &amp; Conferences
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Degrees + Registration */}
          <div className="space-y-5 md:col-span-5">
            <div>
              <h3 className="dossier-mono text-[10px] text-[var(--ink-muted)]">
                Academic Degrees
              </h3>
              <div className="mt-3 space-y-3.5">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.degree}
                    className="portfolio-card border p-5"
                    style={{
                      borderColor: 'var(--hairline)',
                      borderLeftWidth: '2px',
                      borderLeftColor: 'var(--accent)',
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-mono text-[11px] text-[var(--ink-muted)] tabular-nums">
                        {edu.period}
                      </p>
                      <p className="accent-text font-mono text-sm font-semibold tabular-nums">
                        {edu.score}
                      </p>
                    </div>
                    <h4 className="mt-2 font-display text-sm font-bold text-[var(--ink)]">
                      {edu.degree}
                    </h4>
                    <p className="mt-1 text-xs text-[var(--ink-secondary)]">{edu.institution}</p>
                    <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">{edu.university}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="portfolio-card border p-5"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <h3 className="dossier-mono text-[10px] text-[var(--ink-muted)]">
                Licensure &amp; Languages
              </h3>
              <dl className="mt-3.5 space-y-3 text-xs">
                <div>
                  <dt className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                    Pharmacy Council Registration
                  </dt>
                  <dd className="mt-1 font-medium text-[var(--ink)]">{PROFILE.registration}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                    Languages Spoken
                  </dt>
                  <dd className="mt-1 font-medium text-[var(--ink)]">
                    {PROFILE.languages.join(' · ')}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Certifications + Conferences */}
          <div className="space-y-6 md:col-span-7">
            <div>
              <h3 className="dossier-mono text-[10px] text-[var(--ink-muted)]">
                Specialized Certifications
              </h3>
              <div
                className="portfolio-card mt-3 border"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.title}
                    className="border-b p-4 last:border-b-0 sm:p-5"
                    style={{ borderColor: 'var(--hairline)' }}
                  >
                    <h4 className="font-display text-sm font-semibold text-[var(--ink)]">
                      {cert.title}
                    </h4>
                    <p className="mt-1 text-xs text-[var(--ink-muted)]">
                      <span className="font-medium text-[var(--ink-secondary)]">
                        {cert.issuer}
                      </span>
                      <span aria-hidden="true" className="mx-2 opacity-40">
                        ·
                      </span>
                      <span>{cert.detail}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="dossier-mono text-[10px] text-[var(--ink-muted)]">
                Conferences &amp; Scientific Forums
              </h3>
              <div
                className="portfolio-card mt-3 border"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {CONFERENCES.map((conf) => (
                  <div
                    key={conf.title}
                    className="border-b p-4 last:border-b-0 sm:p-5"
                    style={{ borderColor: 'var(--hairline)' }}
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] text-[var(--ink-muted)]">
                      <span className="accent-text font-medium">{conf.role}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{conf.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{conf.venue}</span>
                    </div>
                    <h4 className="mt-2 font-display text-sm font-semibold text-[var(--ink)]">
                      {conf.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
