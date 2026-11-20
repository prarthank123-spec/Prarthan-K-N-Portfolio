import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../data/portfolioData';

export function ExperienceTimeline() {
  const [expandedIds, setExpandedIds] = useState<string[]>(['exp-1', 'exp-2']);

  const allExpanded = expandedIds.length === EXPERIENCE_TIMELINE.length;

  const toggleItem = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setExpandedIds(allExpanded ? [] : EXPERIENCE_TIMELINE.map((item) => item.id));
  };

  return (
    <section
      id="experience"
      className="border-t px-6 py-12 sm:px-10 sm:py-14"
      style={{ borderColor: 'var(--hairline)' }}
    >
      <div className="max-w-4xl">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="dossier-mono accent-text text-[10px] font-medium">
              03. Clinical Practice &amp; Training
            </p>
            <h2 className="dossier-display mt-2.5 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
              Clinical &amp; Industrial Timeline
            </h2>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[var(--ink-secondary)]">
              Hands-on hospital pharmacy rotations, tertiary-care pharmacovigilance, clinical
              research training, and pharmaceutical manufacturing exposure.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleAll}
            className="dossier-mono hover-accent-border hover-accent-text inline-flex min-h-[38px] self-start items-center border px-3.5 py-2 text-[10px] text-[var(--ink-secondary)] whitespace-nowrap shrink-0 transition-colors sm:self-auto"
            style={{ borderColor: 'var(--hairline)' }}
          >
            {allExpanded ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        {/* Vertical Timeline */}
        <div className="relative mt-9 pl-6 sm:pl-7">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-2 w-px"
            style={{ backgroundColor: 'var(--hairline-strong)' }}
          />

          <div className="space-y-4">
            {EXPERIENCE_TIMELINE.map((item, idx) => {
              const isExpanded = expandedIds.includes(item.id);
              const isCurrent = idx === 0;

              return (
                <div key={item.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-6 -left-[1.32rem] h-2.5 w-2.5 border sm:-left-[1.58rem]"
                    style={
                      isCurrent
                        ? { borderColor: 'var(--accent)', backgroundColor: 'var(--accent)' }
                        : {
                            borderColor: 'var(--hairline-strong)',
                            backgroundColor: 'var(--bg-canvas)',
                          }
                    }
                  />

                  <div
                    className="portfolio-card hover-accent-border border transition-colors"
                    style={{ borderColor: 'var(--hairline)' }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left focus-visible:outline-none sm:p-6"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10.5px] text-[var(--ink-muted)]">
                          <span className="accent-text font-medium tabular-nums">
                            {item.period}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{item.domain}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.location}</span>
                        </div>

                        <h3 className="mt-2 font-display text-base font-bold text-[var(--ink)] sm:text-lg">
                          {item.role}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-[var(--ink-secondary)]">
                          {item.organization}
                        </p>
                        <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-[var(--ink-muted)]">
                          {item.summary}
                        </p>
                      </div>

                      <span
                        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border text-[var(--ink-muted)]"
                        style={{ borderColor: 'var(--hairline)' }}
                        aria-hidden="true"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </span>
                    </button>

                    {isExpanded && (
                      <div
                        className="border-t px-5 pt-4 pb-5 sm:px-6 sm:pb-6"
                        style={{ borderColor: 'var(--hairline)' }}
                      >
                        <p className="dossier-mono text-[10px] text-[var(--ink-muted)]">
                          Key Clinical &amp; Operational Contributions
                        </p>
                        <ul className="mt-3 space-y-2.5">
                          {item.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-start gap-3 text-sm leading-relaxed text-[var(--ink-secondary)]"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1.5 w-1.5 shrink-0"
                                style={{ backgroundColor: 'var(--accent)' }}
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
