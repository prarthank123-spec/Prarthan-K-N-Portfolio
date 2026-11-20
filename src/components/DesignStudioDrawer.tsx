import { useEffect } from 'react';
import { Check, Moon, RotateCcw, Sun, X } from 'lucide-react';
import {
  CURSOR_OPTIONS,
  DEFAULT_DESIGN_CONFIG,
  GRAPHICS_OPTIONS,
  PALETTE_OPTIONS,
  PORTFOLIO_PRESETS,
  SURFACE_OPTIONS,
  TYPOGRAPHY_OPTIONS,
  type CompletePortfolioPreset,
  type CursorStyleId,
  type PortfolioDesignConfig,
} from '../types/themeConfig';

interface DesignStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioDesignConfig;
  onChange: (next: PortfolioDesignConfig) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onApplyPreset: (preset: CompletePortfolioPreset) => void;
  onResetDefaults: () => void;
}

function CursorPreviewGlyph({ id }: { id: CursorStyleId }) {
  switch (id) {
    case 'default':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 3l12 9-5 1.5L9.5 19 5 3z" />
        </svg>
      );
    case 'dot-ring':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'reticle':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="7" opacity="0.45" />
          <line x1="12" y1="2" x2="12" y2="7" />
          <line x1="12" y1="17" x2="12" y2="22" />
          <line x1="2" y1="12" x2="7" y2="12" />
          <line x1="17" y1="12" x2="22" y2="12" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'spotlight':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.16" />
          <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.32" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case 'molecular-orbit':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3">
          <circle cx="12" cy="12" r="8.5" strokeDasharray="3 2.5" opacity="0.7" />
          <polygon points="12,7.5 16,9.8 16,14.2 12,16.5 8,14.2 8,9.8" fill="currentColor" opacity="0.85" stroke="none" />
          <circle cx="12" cy="3.5" r="1.7" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'editorial-brackets':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'comet-trail':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <circle cx="17" cy="7" r="3" />
          <circle cx="13" cy="11" r="2.3" opacity="0.72" />
          <circle cx="9.5" cy="14.5" r="1.8" opacity="0.48" />
          <circle cx="6.5" cy="17.5" r="1.3" opacity="0.28" />
        </svg>
      );
  }
}

export function DesignStudioDrawer({
  isOpen,
  onClose,
  config,
  onChange,
  isDark,
  onToggleTheme,
  onApplyPreset,
  onResetDefaults,
}: DesignStudioDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPresetActive = (preset: CompletePortfolioPreset) =>
    preset.mode === (isDark ? 'dark' : 'light') &&
    preset.config.palette === config.palette &&
    preset.config.typography === config.typography &&
    preset.config.graphics === config.graphics &&
    preset.config.surface === config.surface;

  const isDefault =
    isDark &&
    config.palette === DEFAULT_DESIGN_CONFIG.palette &&
    config.typography === DEFAULT_DESIGN_CONFIG.typography &&
    config.graphics === DEFAULT_DESIGN_CONFIG.graphics &&
    config.surface === DEFAULT_DESIGN_CONFIG.surface &&
    config.cursor === DEFAULT_DESIGN_CONFIG.cursor;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="design-studio-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="flex h-full w-full max-w-lg flex-col border-l shadow-2xl"
        style={{
          borderColor: 'var(--hairline-strong)',
          backgroundColor: 'var(--bg-canvas)',
          color: 'var(--ink)',
        }}
      >
        {/* Drawer Header */}
        <div
          className="flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div>
            <h2
              id="design-studio-title"
              className="dossier-display text-sm font-bold text-[var(--ink)]"
            >
              Design &amp; Cursor Studio
            </h2>
            <p className="mt-0.5 font-mono text-[10.5px] text-[var(--ink-muted)]">
              {PORTFOLIO_PRESETS.length} full themes · {PALETTE_OPTIONS.length} palettes ·{' '}
              {GRAPHICS_OPTIONS.length} graphics · {CURSOR_OPTIONS.length} cursors
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close design studio"
            className="hover-accent-border hover-accent-text inline-flex h-9 w-9 items-center justify-center border text-[var(--ink-secondary)] transition-colors"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
          {/* 01. Complete Portfolio Design Presets */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="dossier-mono text-[10.5px] font-semibold text-[var(--ink)]">
                  01. Complete Portfolio Designs ({PORTFOLIO_PRESETS.length})
                </h3>
                <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">
                  One-click full theme switching mode, palette, typography, graphics &amp; cards.
                </p>
              </div>
              <button
                type="button"
                onClick={onToggleTheme}
                className="dossier-mono hover-accent-border hover-accent-text inline-flex min-h-[34px] shrink-0 items-center gap-1.5 border px-3 py-1.5 text-[10px] text-[var(--ink-secondary)] transition-colors"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5 accent-text" aria-hidden="true" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              {PORTFOLIO_PRESETS.map((preset) => {
                const active = isPresetActive(preset);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onApplyPreset(preset)}
                    aria-pressed={active}
                    className={`flex items-center gap-3.5 border p-3 text-left transition-colors ${
                      active
                        ? 'accent-border accent-soft-bg'
                        : 'hover:bg-[var(--bg-hover)]'
                    }`}
                    style={!active ? { borderColor: 'var(--hairline)' } : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-13 shrink-0 flex-col justify-between overflow-hidden border p-1.5"
                      style={{
                        backgroundColor: preset.previewBg,
                        borderColor: 'var(--hairline-strong)',
                      }}
                    >
                      <span
                        className="block h-1.5 w-7"
                        style={{ backgroundColor: preset.previewAccent }}
                      />
                      <span
                        className="block h-3.5 w-full"
                        style={{ backgroundColor: preset.previewCard }}
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-xs font-semibold text-[var(--ink)]">
                          {preset.name}
                        </span>
                        <span className="font-mono text-[9.5px] uppercase text-[var(--ink-muted)]">
                          {preset.mode}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-[var(--ink-muted)]">
                        {preset.tagline}
                      </span>
                    </span>

                    {active && <Check className="h-4 w-4 shrink-0 accent-text" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 02. Mouse Cursor Experience */}
          <div className="border-t pt-6" style={{ borderColor: 'var(--hairline)' }}>
            <h3 className="dossier-mono text-[10.5px] font-semibold text-[var(--ink)]">
              02. Mouse Cursor Experience ({CURSOR_OPTIONS.length})
            </h3>
            <p className="mt-1 text-[11px] text-[var(--ink-muted)]">
              Desktop pointers synced to your active palette; touch devices remain native.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2">
              {CURSOR_OPTIONS.map((option) => {
                const selected = config.cursor === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChange({ ...config, cursor: option.id })}
                    aria-pressed={selected}
                    className={`flex items-center gap-3.5 border px-3.5 py-2.5 text-left transition-colors ${
                      selected
                        ? 'accent-border accent-soft-bg'
                        : 'hover:bg-[var(--bg-hover)]'
                    }`}
                    style={!selected ? { borderColor: 'var(--hairline)' } : undefined}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border ${
                        selected ? 'accent-border accent-text' : 'text-[var(--ink-secondary)]'
                      }`}
                      style={!selected ? { borderColor: 'var(--hairline)' } : undefined}
                    >
                      <CursorPreviewGlyph id={option.id} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-xs font-semibold text-[var(--ink)]">
                          {option.name}
                        </span>
                        <span className="font-mono text-[9.5px] uppercase text-[var(--ink-muted)]">
                          {option.tag}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-[var(--ink-muted)]">
                        {option.description}
                      </span>
                    </span>
                    {selected && <Check className="h-4 w-4 shrink-0 accent-text" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 03. Color Palette */}
          <div className="border-t pt-6" style={{ borderColor: 'var(--hairline)' }}>
            <h3 className="dossier-mono text-[10.5px] font-semibold text-[var(--ink)]">
              03. Color Palette ({PALETTE_OPTIONS.length})
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PALETTE_OPTIONS.map((option) => {
                const selected = config.palette === option.id;
                const swatch = isDark ? option.swatchDark : option.swatchLight;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChange({ ...config, palette: option.id })}
                    aria-pressed={selected}
                    className={`flex items-start gap-3 border p-3 text-left transition-colors ${
                      selected
                        ? 'accent-border accent-soft-bg'
                        : 'hover:bg-[var(--bg-hover)]'
                    }`}
                    style={!selected ? { borderColor: 'var(--hairline)' } : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center"
                      style={{ backgroundColor: swatch }}
                    >
                      {selected && (
                        <Check
                          className="h-3 w-3"
                          style={{ color: isDark ? '#111113' : '#FFFFFF' }}
                        />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xs font-semibold text-[var(--ink)]">
                        {option.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-[var(--ink-muted)]">
                        {option.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 04. Typography Voice */}
          <div className="border-t pt-6" style={{ borderColor: 'var(--hairline)' }}>
            <h3 className="dossier-mono text-[10.5px] font-semibold text-[var(--ink)]">
              04. Editorial Typography ({TYPOGRAPHY_OPTIONS.length})
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2">
              {TYPOGRAPHY_OPTIONS.map((option) => {
                const selected = config.typography === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChange({ ...config, typography: option.id })}
                    aria-pressed={selected}
                    className={`flex items-center justify-between gap-3 border px-4 py-3 text-left transition-colors ${
                      selected
                        ? 'accent-border accent-soft-bg'
                        : 'hover:bg-[var(--bg-hover)]'
                    }`}
                    style={!selected ? { borderColor: 'var(--hairline)' } : undefined}
                  >
                    <div>
                      <span
                        className="block text-sm font-bold text-[var(--ink)]"
                        style={{ fontFamily: option.sampleFont }}
                      >
                        {option.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-[var(--ink-muted)]">
                        {option.description}
                      </span>
                    </div>
                    {selected && <Check className="h-4 w-4 shrink-0 accent-text" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 05. Background Graphics */}
          <div className="border-t pt-6" style={{ borderColor: 'var(--hairline)' }}>
            <h3 className="dossier-mono text-[10.5px] font-semibold text-[var(--ink)]">
              05. Background Graphics ({GRAPHICS_OPTIONS.length})
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {GRAPHICS_OPTIONS.map((option) => {
                const selected = config.graphics === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChange({ ...config, graphics: option.id })}
                    aria-pressed={selected}
                    className={`flex items-start justify-between gap-2 border p-3 text-left transition-colors ${
                      selected
                        ? 'accent-border accent-soft-bg'
                        : 'hover:bg-[var(--bg-hover)]'
                    }`}
                    style={!selected ? { borderColor: 'var(--hairline)' } : undefined}
                  >
                    <div>
                      <span className="block font-display text-xs font-semibold text-[var(--ink)]">
                        {option.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-[var(--ink-muted)]">
                        {option.description}
                      </span>
                    </div>
                    {selected && <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-text" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 06. Card & Surface Style */}
          <div className="border-t pt-6" style={{ borderColor: 'var(--hairline)' }}>
            <h3 className="dossier-mono text-[10.5px] font-semibold text-[var(--ink)]">
              06. Card &amp; Surface Design ({SURFACE_OPTIONS.length})
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SURFACE_OPTIONS.map((option) => {
                const selected = config.surface === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChange({ ...config, surface: option.id })}
                    aria-pressed={selected}
                    className={`flex items-start justify-between gap-2 border p-3 text-left transition-colors ${
                      selected
                        ? 'accent-border accent-soft-bg'
                        : 'hover:bg-[var(--bg-hover)]'
                    }`}
                    style={!selected ? { borderColor: 'var(--hairline)' } : undefined}
                  >
                    <div>
                      <span className="block font-display text-xs font-semibold text-[var(--ink)]">
                        {option.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-[var(--ink-muted)]">
                        {option.description}
                      </span>
                    </div>
                    {selected && <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-text" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div
          className="flex items-center justify-between border-t px-6 py-4"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <button
            type="button"
            disabled={isDefault}
            onClick={onResetDefaults}
            className="dossier-mono hover-accent-text inline-flex min-h-[38px] items-center gap-1.5 text-[10px] text-[var(--ink-secondary)] transition-colors disabled:opacity-40"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset Dossier Default</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="accent-bg dossier-mono inline-flex min-h-[38px] items-center px-5 py-2 text-[10.5px] font-bold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
