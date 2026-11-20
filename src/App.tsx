import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, Moon, SlidersHorizontal, Sun, X } from 'lucide-react';
import { ContactFooter } from './components/ContactFooter';
import { CredentialsSection } from './components/CredentialsSection';
import { CustomCursor } from './components/CustomCursor';
import { CvModal } from './components/CvModal';
import { DesignStudioDrawer } from './components/DesignStudioDrawer';
import { DossierRightPane } from './components/DossierRightPane';
import { DossierSidebar } from './components/DossierSidebar';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { HeroSection } from './components/HeroSection';
import { PortfolioBackdrop } from './components/PortfolioBackdrop';
import { PublicationsExplorer } from './components/PublicationsExplorer';
import { SkillsMatrix } from './components/SkillsMatrix';
import { PROFILE } from './data/portfolioData';
import {
  DEFAULT_DESIGN_CONFIG,
  type CompletePortfolioPreset,
  type PortfolioDesignConfig,
} from './types/themeConfig';

const NAV_ITEMS = [
  { id: 'overview', num: '01.', label: 'Overview' },
  { id: 'publications', num: '02.', label: 'Publications' },
  { id: 'experience', num: '03.', label: 'Experience' },
  { id: 'expertise', num: '04.', label: 'Skills' },
  { id: 'credentials', num: '05.', label: 'Credentials' },
  { id: 'contact', num: '06.', label: 'Contact' },
];

const THEME_STORAGE_KEY = 'prarthan-theme-v2';
const DESIGN_STORAGE_KEY = 'prarthan-design-config-v2';

function loadSavedDesignConfig(): PortfolioDesignConfig {
  try {
    const raw = localStorage.getItem(DESIGN_STORAGE_KEY);
    if (!raw) return DEFAULT_DESIGN_CONFIG;
    const parsed = JSON.parse(raw) as Partial<PortfolioDesignConfig>;
    return {
      palette: parsed.palette ?? DEFAULT_DESIGN_CONFIG.palette,
      typography: parsed.typography ?? DEFAULT_DESIGN_CONFIG.typography,
      graphics: parsed.graphics ?? DEFAULT_DESIGN_CONFIG.graphics,
      surface: parsed.surface ?? DEFAULT_DESIGN_CONFIG.surface,
      cursor: parsed.cursor ?? DEFAULT_DESIGN_CONFIG.cursor,
    };
  } catch {
    return DEFAULT_DESIGN_CONFIG;
  }
}

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });
  const [designConfig, setDesignConfig] = useState<PortfolioDesignConfig>(loadSavedDesignConfig);
  const [studioOpen, setStudioOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [cvModalOpen, setCvModalOpen] = useState<boolean>(false);

  const mainPaneRef = useRef<HTMLElement | null>(null);

  const handleApplyPreset = (preset: CompletePortfolioPreset) => {
    setIsDark(preset.mode === 'dark');
    setDesignConfig((prev) => ({
      ...prev,
      ...preset.config,
    }));
  };

  const handleResetDefaults = () => {
    setIsDark(true);
    setDesignConfig(DEFAULT_DESIGN_CONFIG);
  };

  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (!target) return;

    const mainEl = mainPaneRef.current;
    const isDesktopPane =
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches &&
      mainEl !== null;

    if (isDesktopPane && mainEl) {
      const containerTop = mainEl.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const offset = targetTop - containerTop + mainEl.scrollTop - 64;
      mainEl.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
  }, []);

  // Sync light/dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage restrictions
    }
  }, [isDark]);

  // Sync palette, typography, surface style, and mouse cursor attributes on <html>
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-palette', designConfig.palette);
    root.setAttribute('data-typography', designConfig.typography);
    root.setAttribute('data-surface', designConfig.surface);
    root.setAttribute('data-cursor', designConfig.cursor);
    try {
      localStorage.setItem(DESIGN_STORAGE_KEY, JSON.stringify(designConfig));
    } catch {
      // Ignore storage restrictions
    }
  }, [designConfig]);

  // Scroll-spy across both desktop center pane and mobile viewport
  useEffect(() => {
    const mainEl = mainPaneRef.current;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: isDesktop ? mainEl : null,
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0.05, 0.2, 0.45],
      }
    );

    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen transition-colors duration-200 lg:h-screen lg:overflow-hidden"
      style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--ink)' }}
    >
      {/* Selectable Portfolio Background Graphics */}
      <PortfolioBackdrop graphics={designConfig.graphics} />

      {/* Selectable Desktop Mouse Cursor */}
      <CustomCursor cursorStyle={designConfig.cursor} />

      {/* Mobile Sticky Top Header (< lg) */}
      <header
        className="sticky top-0 z-40 flex h-14 items-center justify-between border-b px-4 backdrop-blur-md lg:hidden"
        style={{
          borderColor: 'var(--hairline)',
          backgroundColor: 'var(--bg-canvas)',
        }}
      >
        <button
          type="button"
          onClick={() => scrollToSection('overview')}
          className="dossier-display text-sm font-extrabold text-[var(--ink)]"
        >
          {PROFILE.name}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStudioOpen(true)}
            aria-label="Open Design and Cursor Studio"
            className="inline-flex h-9 w-9 items-center justify-center border text-[var(--ink-secondary)]"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <SlidersHorizontal className="h-4 w-4 accent-text" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-9 w-9 items-center justify-center border text-[var(--ink)]"
            style={{ borderColor: 'var(--hairline)' }}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="sticky top-14 z-30 border-b px-4 py-3 lg:hidden"
          style={{
            borderColor: 'var(--hairline)',
            backgroundColor: 'var(--bg-canvas)',
          }}
        >
          <nav className="grid grid-cols-2 gap-1.5" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`dossier-mono flex min-h-[42px] items-center gap-1.5 border px-3 text-left text-[10px] ${
                    active ? 'accent-border accent-soft-bg accent-text font-bold' : 'text-[var(--ink-secondary)]'
                  }`}
                  style={!active ? { borderColor: 'var(--hairline)' } : undefined}
                >
                  <span>{item.num}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsDark((prev) => !prev);
                setMobileMenuOpen(false);
              }}
              className="dossier-mono flex min-h-[40px] flex-1 items-center justify-center gap-1.5 border text-[10px] text-[var(--ink-secondary)]"
              style={{ borderColor: 'var(--hairline)' }}
            >
              {isDark ? <Sun className="h-3.5 w-3.5 accent-text" /> : <Moon className="h-3.5 w-3.5" />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStudioOpen(true);
                setMobileMenuOpen(false);
              }}
              className="dossier-mono flex min-h-[40px] flex-1 items-center justify-center gap-1.5 border text-[10px] text-[var(--ink-secondary)]"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <SlidersHorizontal className="h-3.5 w-3.5 accent-text" />
              <span>Design &amp; Cursor</span>
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          VARIATION 3 — 3-PANE CLINICAL DOSSIER WORKBENCH SHELL
          Desktop: 280px Identity Sidebar | 1fr Scrollable Main | 320px Log
         ==================================================================== */}
      <div
        className="relative z-10 grid min-h-[calc(100vh-3.5rem)] grid-cols-1 lg:h-screen lg:grid-cols-[276px_minmax(0,1fr)] xl:grid-cols-[276px_minmax(0,1fr)_316px]"
        style={{ borderColor: 'var(--hairline)' }}
      >
        {/* PANE 1: LEFT IDENTITY SIDEBAR */}
        <aside
          className="border-b lg:h-screen lg:overflow-y-auto lg:border-r lg:border-b-0"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <DossierSidebar
            onOpenCv={() => setCvModalOpen(true)}
            onOpenStudio={() => setStudioOpen(true)}
          />
        </aside>

        {/* PANE 2: CENTER PRIMARY CONTEXT & INTERACTIVE SECTIONS */}
        <main
          ref={mainPaneRef}
          className="min-w-0 lg:h-screen lg:overflow-y-auto xl:border-r"
          style={{ borderColor: 'var(--hairline)' }}
        >
          {/* Sticky Center Pane Navigation Header (Desktop) */}
          <header
            className="sticky top-0 z-20 hidden h-16 items-center justify-between gap-4 border-b px-6 sm:px-10 lg:flex"
            style={{
              borderColor: 'var(--hairline)',
              backgroundColor: 'var(--bg-canvas)',
            }}
          >
            <nav
              aria-label="Primary dossier navigation"
              className="flex items-center gap-5 overflow-x-auto"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`dossier-mono relative py-1 text-[10.5px] whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? 'accent-text font-bold'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {item.num} {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Compact right actions inside center header when Right Pane is hidden (lg..xl) */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => setIsDark((prev) => !prev)}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="hover-accent-border inline-flex h-8 w-8 items-center justify-center border text-[var(--ink-secondary)]"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {isDark ? <Sun className="h-3.5 w-3.5 accent-text" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                aria-label="Open Design and Cursor Studio"
                className="hover-accent-border inline-flex h-8 w-8 items-center justify-center border text-[var(--ink-secondary)]"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <SlidersHorizontal className="h-3.5 w-3.5 accent-text" />
              </button>
            </div>
          </header>

          {/* All Portfolio Sections */}
          <HeroSection onNavigate={scrollToSection} />
          <PublicationsExplorer />
          <ExperienceTimeline />
          <SkillsMatrix />
          <CredentialsSection />
          <ContactFooter
            isDark={isDark}
            onToggleTheme={() => setIsDark((prev) => !prev)}
            onOpenCv={() => setCvModalOpen(true)}
            onOpenStudio={() => setStudioOpen(true)}
            onBackToTop={() => scrollToSection('overview')}
          />
        </main>

        {/* PANE 3: RIGHT DOCUMENTATION LOG (xl+ Desktop) */}
        <aside className="hidden xl:block xl:h-screen xl:overflow-y-auto">
          <DossierRightPane
            activeSection={activeSection}
            onNavigate={scrollToSection}
            isDark={isDark}
            onToggleTheme={() => setIsDark((prev) => !prev)}
            onOpenStudio={() => setStudioOpen(true)}
          />
        </aside>
      </div>

      {/* Design, Graphics & Mouse Cursor Studio Drawer */}
      <DesignStudioDrawer
        isOpen={studioOpen}
        onClose={() => setStudioOpen(false)}
        config={designConfig}
        onChange={setDesignConfig}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onApplyPreset={handleApplyPreset}
        onResetDefaults={handleResetDefaults}
      />

      {/* Print-Ready CV Preview Modal */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
}
