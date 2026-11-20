import { useEffect, useState } from 'react';
import { Menu, Moon, SlidersHorizontal, Sun, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenStudio: () => void;
}

const NAV_LINKS = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'publications', label: 'Publications', href: '#publications' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'expertise', label: 'Expertise', href: '#expertise' },
  { id: 'credentials', label: 'Credentials', href: '#credentials' },
];

export function Navbar({ activeSection, isDark, onToggleTheme, onOpenStudio }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#F8FAFC]/85 backdrop-blur-md transition-colors duration-200 dark:border-slate-800/80 dark:bg-[#0F172A]/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#overview"
          className="hover-accent-text font-display text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none dark:text-slate-50"
        >
          {PROFILE.name}
        </a>

        {/* Zone 2: Concise single-line scroll-spy navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none ${
                  isActive
                    ? 'accent-text'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action (plus mobile menu trigger on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="accent-bg hidden sm:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 md:hidden dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-[#F8FAFC] px-4 py-4 md:hidden dark:border-slate-800 dark:bg-[#0F172A]">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'accent-soft-bg accent-text'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70"
            >
              Contact
            </a>
            <div className="pt-2 mt-2 space-y-1 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStudio();
                }}
                className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/70"
              >
                <span>Design, Graphics &amp; Cursor</span>
                <SlidersHorizontal className="h-4 w-4 accent-text" />
              </button>
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/70"
              >
                <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                {isDark ? <Sun className="h-4 w-4 accent-text" /> : <Moon className="h-4 w-4 text-slate-500" />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
