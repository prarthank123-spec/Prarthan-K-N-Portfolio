export type PaletteId =
  | 'neon-green'
  | 'teal'
  | 'indigo'
  | 'emerald'
  | 'amber'
  | 'crimson'
  | 'sapphire';

export type TypographyId =
  | 'syne-dossier'
  | 'modern-sans'
  | 'editorial-serif'
  | 'geometric-clean';

export type GraphicsId =
  | 'clean'
  | 'dots'
  | 'molecular'
  | 'aura'
  | 'blueprint'
  | 'helix'
  | 'contours';

export type SurfaceStyleId =
  | 'sharp'
  | 'hairline'
  | 'glass'
  | 'elevated'
  | 'dossier'
  | 'tinted';

export type CursorStyleId =
  | 'default'
  | 'dot-ring'
  | 'reticle'
  | 'spotlight'
  | 'molecular-orbit'
  | 'editorial-brackets'
  | 'comet-trail';

export interface PortfolioDesignConfig {
  palette: PaletteId;
  typography: TypographyId;
  graphics: GraphicsId;
  surface: SurfaceStyleId;
  cursor: CursorStyleId;
}

export interface CompletePortfolioPreset {
  id: string;
  name: string;
  tagline: string;
  mode: 'light' | 'dark';
  previewBg: string;
  previewCard: string;
  previewAccent: string;
  config: Omit<PortfolioDesignConfig, 'cursor'>;
  recommendedCursor: CursorStyleId;
}

export const DEFAULT_DESIGN_CONFIG: PortfolioDesignConfig = {
  palette: 'neon-green',
  typography: 'syne-dossier',
  graphics: 'dots',
  surface: 'sharp',
  cursor: 'default',
};

export const PORTFOLIO_PRESETS: CompletePortfolioPreset[] = [
  {
    id: 'clinical-dossier',
    name: 'Clinical Dossier (Signature)',
    tagline: 'Obsidian #111113, Neon Clinical Green, Syne & Geist Mono',
    mode: 'dark',
    previewBg: '#111113',
    previewCard: '#1A1A1E',
    previewAccent: '#00FFAA',
    config: {
      palette: 'neon-green',
      typography: 'syne-dossier',
      graphics: 'dots',
      surface: 'sharp',
    },
    recommendedCursor: 'reticle',
  },
  {
    id: 'clinical-precision',
    name: 'Clinical Precision Light',
    tagline: 'Crisp Lab White, Medical Teal & Molecular Lattice',
    mode: 'light',
    previewBg: '#F6F7F8',
    previewCard: '#FFFFFF',
    previewAccent: '#0D9488',
    config: {
      palette: 'teal',
      typography: 'modern-sans',
      graphics: 'molecular',
      surface: 'hairline',
    },
    recommendedCursor: 'dot-ring',
  },
  {
    id: 'midnight-lab',
    name: 'Midnight Research Lab',
    tagline: 'Obsidian Canvas, Frosted Glass & Luminous Teal Lattice',
    mode: 'dark',
    previewBg: '#111113',
    previewCard: '#191D24',
    previewAccent: '#2DD4BF',
    config: {
      palette: 'teal',
      typography: 'modern-sans',
      graphics: 'molecular',
      surface: 'glass',
    },
    recommendedCursor: 'molecular-orbit',
  },
  {
    id: 'academic-monograph',
    name: 'Academic Monograph',
    tagline: 'Newsreader Serif, Journal Indigo & Blueprint Framing',
    mode: 'light',
    previewBg: '#F6F7F8',
    previewCard: '#FFFFFF',
    previewAccent: '#4F46E5',
    config: {
      palette: 'indigo',
      typography: 'editorial-serif',
      graphics: 'blueprint',
      surface: 'sharp',
    },
    recommendedCursor: 'editorial-brackets',
  },
  {
    id: 'botanical-science',
    name: 'Botanical Pharmacognosy',
    tagline: 'Geometric Outfit, Research Emerald & Biomedical Helix',
    mode: 'light',
    previewBg: '#F6F7F8',
    previewCard: '#FFFFFF',
    previewAccent: '#059669',
    config: {
      palette: 'emerald',
      typography: 'geometric-clean',
      graphics: 'helix',
      surface: 'elevated',
    },
    recommendedCursor: 'comet-trail',
  },
  {
    id: 'executive-archive',
    name: 'Executive Archival',
    tagline: 'Warm Monograph Amber, Serif Display & Topographic Contours',
    mode: 'light',
    previewBg: '#F6F7F8',
    previewCard: '#FFFFFF',
    previewAccent: '#B45309',
    config: {
      palette: 'amber',
      typography: 'editorial-serif',
      graphics: 'contours',
      surface: 'dossier',
    },
    recommendedCursor: 'spotlight',
  },
  {
    id: 'regulatory-blueprint',
    name: 'Regulatory Blueprint',
    tagline: 'Dark Sapphire Precision Grid & Technical Blueprint Framing',
    mode: 'dark',
    previewBg: '#111113',
    previewCard: '#1A1C22',
    previewAccent: '#38BDF8',
    config: {
      palette: 'sapphire',
      typography: 'syne-dossier',
      graphics: 'blueprint',
      surface: 'sharp',
    },
    recommendedCursor: 'reticle',
  },
  {
    id: 'crimson-editorial',
    name: 'Clinical Journal Crimson',
    tagline: 'Medical Burgundy Accent, Ambient Aura & Tinted Surfaces',
    mode: 'dark',
    previewBg: '#111113',
    previewCard: '#1D181B',
    previewAccent: '#FB7185',
    config: {
      palette: 'crimson',
      typography: 'editorial-serif',
      graphics: 'aura',
      surface: 'tinted',
    },
    recommendedCursor: 'dot-ring',
  },
];

export const PALETTE_OPTIONS: {
  id: PaletteId;
  name: string;
  description: string;
  swatchLight: string;
  swatchDark: string;
}[] = [
  {
    id: 'neon-green',
    name: 'Neon Clinical Green',
    description: 'Signature #00FFAA dossier accent on obsidian charcoal',
    swatchLight: '#00875A',
    swatchDark: '#00FFAA',
  },
  {
    id: 'teal',
    name: 'Clinical Teal',
    description: 'Medical teal calibrated for high-contrast lab UI',
    swatchLight: '#0D9488',
    swatchDark: '#2DD4BF',
  },
  {
    id: 'indigo',
    name: 'Academic Indigo',
    description: 'Scholarly journal indigo for research authority',
    swatchLight: '#4F46E5',
    swatchDark: '#818CF8',
  },
  {
    id: 'emerald',
    name: 'Botanical Emerald',
    description: 'Pharmacognosy emerald inspired by lab research',
    swatchLight: '#059669',
    swatchDark: '#34D399',
  },
  {
    id: 'amber',
    name: 'Monograph Amber',
    description: 'Warm archival gold-amber with executive poise',
    swatchLight: '#B45309',
    swatchDark: '#F59E0B',
  },
  {
    id: 'crimson',
    name: 'Clinical Crimson',
    description: 'Authoritative medical journal burgundy & rose',
    swatchLight: '#BE123C',
    swatchDark: '#FB7185',
  },
  {
    id: 'sapphire',
    name: 'Regulatory Sapphire',
    description: 'Precision pharmacovigilance & clinical trial blue',
    swatchLight: '#0369A1',
    swatchDark: '#38BDF8',
  },
];

export const TYPOGRAPHY_OPTIONS: {
  id: TypographyId;
  name: string;
  sampleFont: string;
  description: string;
}[] = [
  {
    id: 'syne-dossier',
    name: 'Syne Dossier (Signature)',
    sampleFont: '"Syne", sans-serif',
    description: 'Bold Syne uppercase display paired with Geist & Geist Mono',
  },
  {
    id: 'modern-sans',
    name: 'Clinical Modern',
    sampleFont: '"Plus Jakarta Sans", sans-serif',
    description: 'Plus Jakarta Sans display paired with Geist body',
  },
  {
    id: 'editorial-serif',
    name: 'Academic Journal Serif',
    sampleFont: '"Newsreader", Georgia, serif',
    description: 'Newsreader editorial serif headlines with crisp sans body',
  },
  {
    id: 'geometric-clean',
    name: 'Geometric Lab',
    sampleFont: '"Outfit", sans-serif',
    description: 'Clean Outfit geometric headings for modern scientific poise',
  },
];

export const GRAPHICS_OPTIONS: {
  id: GraphicsId;
  name: string;
  description: string;
}[] = [
  {
    id: 'dots',
    name: 'Clinical Dot Matrix',
    description: 'Subtle 32px precision laboratory coordinate texture',
  },
  {
    id: 'clean',
    name: 'Clean Obsidian / White',
    description: 'Pure neutral canvas with zero background graphics',
  },
  {
    id: 'molecular',
    name: 'Molecular Lattice',
    description: 'Architectural hexagonal pharmaceutical vector lattice',
  },
  {
    id: 'aura',
    name: 'Ambient Lab Aura',
    description: 'Soft atmospheric gradient field tuned to active accent',
  },
  {
    id: 'blueprint',
    name: 'Clinical Blueprint Grid',
    description: 'Fine millimeter pharmacopeia & schematic grid lines',
  },
  {
    id: 'helix',
    name: 'Biomedical Helix Waves',
    description: 'Delicate architectural sinusoidal double-helix curves',
  },
  {
    id: 'contours',
    name: 'Topographic Contours',
    description: 'Editorial concentric organic survey linework',
  },
];

export const SURFACE_OPTIONS: {
  id: SurfaceStyleId;
  name: string;
  description: string;
}[] = [
  {
    id: 'sharp',
    name: 'Sharp Dossier (Signature)',
    description: 'Zero-radius technical clinical dossier geometry',
  },
  {
    id: 'hairline',
    name: 'Editorial Hairline',
    description: 'Crisp 1px borders with refined rounded geometry',
  },
  {
    id: 'glass',
    name: 'Translucent Glass',
    description: 'Frosted clinical surfaces revealing backdrop depth',
  },
  {
    id: 'elevated',
    name: 'Soft Elevated',
    description: 'Gentle ambient card elevation with layered clarity',
  },
  {
    id: 'dossier',
    name: 'Offset Archival Frame',
    description: 'Crisp report borders with subtle structural offset shadow',
  },
  {
    id: 'tinted',
    name: 'Tinted Lab Surface',
    description: 'Soft tonal cards with generous rounded corners',
  },
];

export const CURSOR_OPTIONS: {
  id: CursorStyleId;
  name: string;
  description: string;
  tag: string;
}[] = [
  {
    id: 'default',
    name: 'System Default',
    description: 'Standard native operating system pointer',
    tag: 'Native',
  },
  {
    id: 'reticle',
    name: 'Clinical Reticle',
    description: 'Laboratory crosshair pointer with calibrated ring',
    tag: 'Lab',
  },
  {
    id: 'dot-ring',
    name: 'Precision Dot & Ring',
    description: 'Minimal accent dot with smooth reactive hover halo',
    tag: 'Minimal',
  },
  {
    id: 'spotlight',
    name: 'Accent Spotlight',
    description: 'Soft ambient aura illuminating surfaces beneath cursor',
    tag: 'Ambient',
  },
  {
    id: 'molecular-orbit',
    name: 'Molecular Orbit',
    description: 'Hexagonal benzene core with orbiting electron ring',
    tag: 'Pharma',
  },
  {
    id: 'editorial-brackets',
    name: 'Viewfinder Brackets',
    description: 'Architectural [ · ] corner brackets framing active links',
    tag: 'Editorial',
  },
  {
    id: 'comet-trail',
    name: 'Fluid Comet Trail',
    description: 'Precision lead point with 5 interpolated trailing nodes',
    tag: 'Motion',
  },
];
