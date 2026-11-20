import { useState } from 'react';
import { ArrowRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { SKILL_PILLARS, type SkillPillar } from '../data/portfolioData';

type ViewMode = 'explorer' | 'matrix';

function CompetencyCompass({
  pillars,
  activeIndex,
  onSelect,
}: {
  pillars: SkillPillar[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const quadrants = [
    {
      index: 0,
      path: 'M 160 140 L 160 28 A 112 112 0 0 1 272 140 Z',
      labelX: 214,
      labelY: 82,
      code: '01',
      name: 'Clinical & PV',
      count: `${pillars[0].items.length} areas`,
    },
    {
      index: 1,
      path: 'M 160 140 L 272 140 A 112 112 0 0 1 160 252 Z',
      labelX: 214,
      labelY: 196,
      code: '02',
      name: 'Regulatory',
      count: `${pillars[1].items.length} areas`,
    },
    {
      index: 2,
      path: 'M 160 140 L 160 252 A 112 112 0 0 1 48 140 Z',
      labelX: 106,
      labelY: 196,
      code: '03',
      name: 'Data & Tech',
      count: `${pillars[2].items.length} areas`,
    },
    {
      index: 3,
      path: 'M 160 140 L 48 140 A 112 112 0 0 1 160 28 Z',
      labelX: 106,
      labelY: 82,
      code: '04',
      name: 'Writing',
      count: `${pillars[3].items.length} areas`,
    },
  ];

  const totalCompetencies = pillars.reduce((sum, p) => sum + p.items.length, 0);

  return (
    <div
      className="flex flex-col items-center justify-center border-b px-4 py-6"
      style={{ borderColor: 'var(--hairline)' }}
    >
      <svg
        viewBox="0 0 320 280"
        className="w-full max-w-[275px] select-none"
        role="group"
        aria-label="Interactive four-pillar clinical competency diagram"
      >
        <circle
          cx="160"
          cy="140"
          r="122"
          fill="none"
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <circle
          cx="160"
          cy="140"
          r="72"
          fill="none"
          stroke="var(--hairline)"
          strokeWidth="1"
        />

        {quadrants.map((q) => {
          const isActive = activeIndex === q.index;
          return (
            <g
              key={q.code}
              role="button"
              tabIndex={0}
              aria-label={`Select ${pillars[q.index].title}`}
              aria-pressed={isActive}
              onClick={() => onSelect(q.index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(q.index);
                }
              }}
              className="cursor-pointer focus:outline-none"
            >
              <path
                d={q.path}
                style={{
                  fill: isActive ? 'var(--accent-soft)' : 'var(--bg-subtle)',
                  stroke: isActive ? 'var(--accent)' : 'var(--hairline-strong)',
                  transition: 'fill 180ms ease, stroke 180ms ease',
                }}
                strokeWidth={isActive ? '1.75' : '1'}
              />
              <text
                x={q.labelX}
                y={q.labelY - 7}
                textAnchor="middle"
                className="font-mono text-[10px] font-semibold"
                style={{ fill: isActive ? 'var(--accent)' : 'var(--ink-muted)' }}
              >
                {q.code}
              </text>
              <text
                x={q.labelX}
                y={q.labelY + 8}
                textAnchor="middle"
                className="font-display text-[10.5px] font-semibold"
                style={{ fill: isActive ? 'var(--ink)' : 'var(--ink-secondary)' }}
              >
                {q.name}
              </text>
              <text
                x={q.labelX}
                y={q.labelY + 21}
                textAnchor="middle"
                className="font-mono text-[8.5px]"
                style={{ fill: 'var(--ink-muted)' }}
              >
                {q.count}
              </text>
            </g>
          );
        })}

        <circle
          cx="160"
          cy="140"
          r="34"
          style={{ fill: 'var(--bg-canvas)', stroke: 'var(--hairline-strong)' }}
          strokeWidth="1.5"
        />
        <text
          x="160"
          y="137"
          textAnchor="middle"
          className="font-mono text-[15px] font-semibold tabular-nums"
          style={{ fill: 'var(--ink)' }}
        >
          {totalCompetencies}
        </text>
        <text
          x="160"
          y="151"
          textAnchor="middle"
          className="font-mono text-[8.5px]"
          style={{ fill: 'var(--ink-muted)' }}
        >
          SKILLS
        </text>
      </svg>

      <p className="dossier-mono mt-2 text-center text-[9.5px] text-[var(--ink-muted)]">
        Select quadrant to inspect clinical evidence
      </p>
    </div>
  );
}

export function SkillsMatrix() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('explorer');

  const activePillar = SKILL_PILLARS[activeIndex];
  const totalSkills = SKILL_PILLARS.reduce((sum, p) => sum + p.items.length, 0);

  return (
    <section
      id="expertise"
      className="border-t px-6 py-12 sm:px-10 sm:py-14"
      style={{ borderColor: 'var(--hairline)' }}
    >
      <div className="max-w-4xl">
        {/* Header + View Toggle */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="dossier-mono accent-text text-[10px] font-medium">
              04. Domain Competencies · {totalSkills} Verified Capabilities
            </p>
            <h2 className="dossier-display mt-2.5 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
              Clinical &amp; Analytical Skill Architecture
            </h2>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[var(--ink-secondary)]">
              Explore each pharmacy, regulatory, analytics, and scientific writing pillar paired
              with the clinical rotations, studies, and certifications where it was applied.
            </p>
          </div>

          <div
            role="group"
            aria-label="Skill matrix layout mode"
            className="inline-flex self-start items-center gap-1 border p-1 sm:self-auto"
            style={{
              borderColor: 'var(--hairline)',
              backgroundColor: 'var(--bg-subtle)',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('explorer')}
              aria-pressed={viewMode === 'explorer'}
              className={`dossier-mono inline-flex min-h-[34px] items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                viewMode === 'explorer'
                  ? 'accent-bg font-bold'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Workbench</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              aria-pressed={viewMode === 'matrix'}
              className={`dossier-mono inline-flex min-h-[34px] items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                viewMode === 'matrix'
                  ? 'accent-bg font-bold'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Matrix</span>
            </button>
          </div>
        </div>

        {viewMode === 'explorer' ? (
          <div
            className="portfolio-card portfolio-frame mt-8 overflow-hidden border"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Compass + Pillar Index */}
              <div
                className="border-b md:col-span-5 md:border-r md:border-b-0"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <CompetencyCompass
                  pillars={SKILL_PILLARS}
                  activeIndex={activeIndex}
                  onSelect={setActiveIndex}
                />

                <div role="tablist" aria-label="Competency domains">
                  {SKILL_PILLARS.map((pillar, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <button
                        key={pillar.number}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveIndex(idx)}
                        className={`flex w-full items-center justify-between gap-3 border-b px-4 py-3.5 text-left transition-colors last:border-b-0 ${
                          isSelected ? 'accent-soft-bg' : 'hover:bg-[var(--bg-hover)]'
                        }`}
                        style={{ borderColor: 'var(--hairline)' }}
                      >
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`font-mono text-[11px] font-semibold tabular-nums ${
                                isSelected ? 'accent-text' : 'text-[var(--ink-muted)]'
                              }`}
                            >
                              {pillar.number}
                            </span>
                            <span
                              className={`font-display text-xs font-semibold truncate ${
                                isSelected ? 'text-[var(--ink)]' : 'text-[var(--ink-secondary)]'
                              }`}
                            >
                              {pillar.title}
                            </span>
                          </div>
                          <p className="mt-0.5 pl-6 font-mono text-[10px] text-[var(--ink-muted)] truncate">
                            {pillar.scopeSummary}
                          </p>
                        </div>

                        <ArrowRight
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                            isSelected
                              ? 'accent-text translate-x-0.5'
                              : 'text-[var(--ink-muted)] opacity-40'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Pillar Deep Dive */}
              <div
                role="tabpanel"
                aria-label={activePillar.title}
                className="flex flex-col justify-between p-5 sm:p-7 md:col-span-7"
              >
                <div>
                  <div
                    className="border-b pb-4"
                    style={{ borderColor: 'var(--hairline)' }}
                  >
                    <p className="dossier-mono accent-text text-[10px] font-medium">
                      Pillar {activePillar.number} of 04 · {activePillar.items.length} Core
                      Competencies
                    </p>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-[var(--ink)] sm:text-xl">
                      {activePillar.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--ink-muted)]">
                      {activePillar.subtitle}
                    </p>
                  </div>

                  <div>
                    {activePillar.items.map((skill, sIdx) => (
                      <div
                        key={skill.name}
                        className="border-b py-4 last:border-b-0"
                        style={{ borderColor: 'var(--hairline)' }}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="font-display text-sm font-semibold text-[var(--ink)]">
                            <span className="mr-2 font-mono text-[11px] font-normal text-[var(--ink-muted)] tabular-nums">
                              {activePillar.number}.{sIdx + 1}
                            </span>
                            {skill.name}
                          </h4>
                          <span className="accent-text font-mono text-[10.5px] font-medium">
                            {skill.tier}
                          </span>
                        </div>

                        <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                          {skill.detail}
                        </p>

                        <p className="mt-2 font-mono text-[10.5px] text-[var(--ink-muted)]">
                          Applied in:{' '}
                          <span className="text-[var(--ink-secondary)]">{skill.appliedIn}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="mt-6 flex items-center justify-between border-t pt-4 font-mono text-[10.5px]"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => (prev === 0 ? SKILL_PILLARS.length - 1 : prev - 1))
                    }
                    className="dossier-mono hover-accent-text min-h-[36px] text-[10px] text-[var(--ink-secondary)] transition-colors"
                  >
                    ← Prev pillar
                  </button>
                  <span className="text-[var(--ink-muted)] tabular-nums">
                    {activePillar.number} / 0{SKILL_PILLARS.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % SKILL_PILLARS.length)}
                    className="dossier-mono hover-accent-text min-h-[36px] text-[10px] text-[var(--ink-secondary)] transition-colors"
                  >
                    Next pillar →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {SKILL_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.number}
                className="portfolio-card flex flex-col justify-between border p-5"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <div>
                  <div
                    className="border-b pb-3.5"
                    style={{ borderColor: 'var(--hairline)' }}
                  >
                    <p className="dossier-mono accent-text text-[10px] font-medium">
                      {pillar.number} · {pillar.scopeSummary}
                    </p>
                    <h3 className="mt-1.5 font-display text-base font-bold text-[var(--ink)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--ink-muted)]">{pillar.subtitle}</p>
                  </div>

                  <dl className="mt-4 space-y-3.5">
                    {pillar.items.map((skill) => (
                      <div
                        key={skill.name}
                        className="border-b pb-3.5 last:border-b-0 last:pb-0"
                        style={{ borderColor: 'var(--hairline)' }}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <dt className="font-display text-xs font-semibold text-[var(--ink)]">
                            {skill.name}
                          </dt>
                          <span className="accent-text font-mono text-[10px]">{skill.tier}</span>
                        </div>
                        <dd className="mt-1 text-xs leading-relaxed text-[var(--ink-secondary)]">
                          {skill.detail}
                        </dd>
                        <dd className="mt-1 font-mono text-[10px] text-[var(--ink-muted)]">
                          Applied in: {skill.appliedIn}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div
                  className="mt-4 border-t pt-3"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveIndex(idx);
                      setViewMode('explorer');
                    }}
                    className="dossier-mono accent-text inline-flex items-center gap-1.5 text-[10px] hover:underline"
                  >
                    <span>Inspect in Workbench</span>
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
