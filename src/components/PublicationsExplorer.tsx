import { useMemo, useState } from 'react';
import { Check, Copy, Quote, Search, X } from 'lucide-react';
import {
  ACADEMIC_PROJECTS,
  PUBLICATIONS,
  type Publication,
  type PublicationCategory,
} from '../data/portfolioData';

const CATEGORIES: PublicationCategory[] = [
  'All',
  'Systematic Review Protocols',
  'Original Research',
  'Ongoing/Under Review',
];

function renderTitleWithItalics(title: string, italicTerm?: string) {
  if (!italicTerm || !title.includes(italicTerm)) {
    return title;
  }
  const [before, after] = title.split(italicTerm);
  return (
    <>
      {before}
      <em className="italic">{italicTerm}</em>
      {after}
    </>
  );
}

export function PublicationsExplorer() {
  const [activeCategory, setActiveCategory] = useState<PublicationCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCitationId, setExpandedCitationId] = useState<string | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<PublicationCategory, number> = {
      All: PUBLICATIONS.length,
      'Systematic Review Protocols': 0,
      'Original Research': 0,
      'Ongoing/Under Review': 0,
    };
    for (const pub of PUBLICATIONS) {
      counts[pub.category] += 1;
    }
    return counts;
  }, []);

  const filteredPublications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PUBLICATIONS.filter((pub) => {
      const matchesCategory = activeCategory === 'All' || pub.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        pub.title.toLowerCase().includes(query) ||
        pub.venue.toLowerCase().includes(query) ||
        pub.indexing.toLowerCase().includes(query) ||
        pub.categoryLabel.toLowerCase().includes(query) ||
        pub.summary.toLowerCase().includes(query)
      );
    });
  }, [activeCategory, searchQuery]);

  const handleCopyCitation = async (pub: Publication) => {
    try {
      await navigator.clipboard.writeText(pub.citation);
      setCopiedId(pub.id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === pub.id ? null : current));
      }, 2200);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = pub.citation;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(pub.id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === pub.id ? null : current));
      }, 2200);
    }
  };

  return (
    <section
      id="publications"
      className="border-t px-6 py-12 sm:px-10 sm:py-14"
      style={{ borderColor: 'var(--hairline)' }}
    >
      <div className="max-w-4xl">
        {/* Section Header */}
        <div>
          <p className="dossier-mono accent-text text-[10px] font-medium">
            02. Research &amp; Evidence Synthesis
          </p>
          <h2 className="dossier-display mt-2.5 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
            Publications &amp; Research Explorer
          </h2>
          <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-[var(--ink-secondary)]">
            Featured PROSPERO systematic review protocols, peer-reviewed original research articles,
            and PharmD / B.Pharm degree research projects. Filter by category, search keywords,
            or copy formatted citations directly.
          </p>
        </div>

        {/* Academic Degree Research Projects */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {ACADEMIC_PROJECTS.map((project) => (
            <div
              key={project.degree}
              className="portfolio-card border p-5"
              style={{
                borderColor: 'var(--hairline)',
                borderLeftWidth: '2px',
                borderLeftColor: 'var(--accent)',
              }}
            >
              <p className="dossier-mono accent-text text-[10px] font-medium">
                {project.degree}
              </p>
              <h3 className="mt-2 font-display text-sm font-semibold leading-snug text-[var(--ink)]">
                {renderTitleWithItalics(project.title, project.italicTerm)}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-muted)]">
                {project.methods}. {project.outcome}
              </p>
            </div>
          ))}
        </div>

        {/* Filter Tabs + Real-Time Search */}
        <div className="mt-8 flex flex-col gap-3">
          <div
            role="tablist"
            aria-label="Filter publications by category"
            className="flex flex-wrap items-center gap-1.5 border p-1.5"
            style={{
              borderColor: 'var(--hairline)',
              backgroundColor: 'var(--bg-subtle)',
            }}
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              const label =
                category === 'Ongoing/Under Review' ? 'Ongoing / Review' : category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`dossier-mono inline-flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isSelected
                      ? 'accent-bg font-bold'
                      : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
                  }`}
                >
                  <span>{label}</span>
                  <span className="tabular-nums opacity-75">({categoryCounts[category]})</span>
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--ink-muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search titles, journals, keywords..."
              aria-label="Search publications"
              className="portfolio-card h-11 w-full border pr-9 pl-10 font-mono text-xs text-[var(--ink)] placeholder:text-[var(--ink-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
              style={{ borderColor: 'var(--hairline)' }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-[var(--ink-muted)]">
          <p className="tabular-nums">
            Showing {filteredPublications.length} of {PUBLICATIONS.length} featured studies
          </p>
          {(activeCategory !== 'All' || searchQuery.trim() !== '') && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="dossier-mono accent-text text-[10px] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Studies List */}
        {filteredPublications.length > 0 ? (
          <div className="mt-5 space-y-4">
            {filteredPublications.map((pub) => {
              const isCopied = copiedId === pub.id;
              const isCitationOpen = expandedCitationId === pub.id;

              return (
                <article
                  key={pub.id}
                  className="portfolio-card hover-accent-border border p-5 transition-colors sm:p-6"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10.5px] text-[var(--ink-muted)]">
                    <span className="font-bold text-[var(--ink)] tabular-nums">{pub.index}</span>
                    <span aria-hidden="true">·</span>
                    <span className="accent-text font-medium uppercase tracking-wider">
                      {pub.categoryLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{pub.indexing}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{pub.year}</span>
                  </div>

                  <h3 className="mt-3 font-display text-base font-semibold leading-snug text-[var(--ink)] sm:text-lg">
                    {renderTitleWithItalics(pub.title, pub.italicTerm)}
                  </h3>

                  <p className="mt-2 font-mono text-xs text-[var(--ink-secondary)]">{pub.venue}</p>
                  <p className="mt-2 max-w-[72ch] text-sm leading-relaxed text-[var(--ink-muted)]">
                    {pub.summary}
                  </p>

                  <div
                    className="mt-5 flex flex-wrap items-center gap-3 border-t pt-4"
                    style={{ borderColor: 'var(--hairline)' }}
                  >
                    <button
                      type="button"
                      onClick={() => handleCopyCitation(pub)}
                      className={`dossier-mono inline-flex min-h-[38px] items-center gap-2 border px-3.5 py-1.5 text-[10px] font-semibold whitespace-nowrap shrink-0 transition-colors ${
                        isCopied
                          ? 'accent-border accent-soft-bg accent-text'
                          : 'hover-accent-border hover-accent-text text-[var(--ink-secondary)]'
                      }`}
                      style={!isCopied ? { borderColor: 'var(--hairline)' } : undefined}
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Citation copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedCitationId((current) => (current === pub.id ? null : pub.id))
                      }
                      aria-expanded={isCitationOpen}
                      className="dossier-mono hover-accent-text inline-flex min-h-[38px] items-center gap-1.5 px-2 py-1.5 text-[10px] text-[var(--ink-muted)] whitespace-nowrap shrink-0 transition-colors"
                    >
                      <Quote className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{isCitationOpen ? 'Hide reference' : 'Preview reference'}</span>
                    </button>
                  </div>

                  {isCitationOpen && (
                    <div
                      className="mt-3 border p-4 font-mono text-[11px] leading-relaxed text-[var(--ink-secondary)]"
                      style={{
                        borderColor: 'var(--hairline)',
                        backgroundColor: 'var(--bg-subtle)',
                      }}
                    >
                      {pub.citation}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div
            className="portfolio-card mt-6 border px-6 py-10 text-center"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <p className="font-display text-base font-semibold text-[var(--ink)]">
              No matching studies found
            </p>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">
              Try adjusting your search keywords or switching back to all study categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="accent-bg dossier-mono mt-4 inline-flex min-h-[38px] items-center px-4 py-2 text-[10px] font-bold"
            >
              Show all publications
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
