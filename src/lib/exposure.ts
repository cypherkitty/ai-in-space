export type ExposureBand = 'deep' | 'graphite' | 'dusk';

export type ExposureSpec = {
  band: ExposureBand;
  amount: number;
  label: string;
};

export type PaletteInput = {
  accent: string;
  accent2: string;
  bg: string;
  text: string;
  muted: string;
  panel: string;
};

export type ExposedPalette = PaletteInput & {
  exposure: number;
  exposureBand: ExposureBand;
};

type RGB = { r: number; g: number; b: number };

const clamp = (value: number, minimum = 0, maximum = 1): number => Math.min(maximum, Math.max(minimum, value));

const parseHex = (value: string): RGB => {
  const source = value.replace('#', '');
  const normalized = source.length === 3 ? source.split('').map((character) => `${character}${character}`).join('') : source;
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16)
  };
};

const toHex = ({ r, g, b }: RGB): string => `#${[r, g, b]
  .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
  .join('')}`;

export const mixHex = (from: string, to: string, amount: number): string => {
  const left = parseHex(from);
  const right = parseHex(to);
  const weight = clamp(amount);
  return toHex({
    r: left.r + (right.r - left.r) * weight,
    g: left.g + (right.g - left.g) * weight,
    b: left.b + (right.b - left.b) * weight
  });
};

const linearChannel = (channel: number): number => {
  const normalized = channel / 255;
  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
};

export const relativeLuminance = (color: string): number => {
  const { r, g, b } = parseHex(color);
  return 0.2126 * linearChannel(r) + 0.7152 * linearChannel(g) + 0.0722 * linearChannel(b);
};

export const perceivedLightness = (color: string): number => {
  const { r, g, b } = parseHex(color);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrastRatio = (left: string, right: string): number => {
  const brightest = Math.max(relativeLuminance(left), relativeLuminance(right));
  const darkest = Math.min(relativeLuminance(left), relativeLuminance(right));
  return (brightest + 0.05) / (darkest + 0.05);
};

const seededRandom = (seed: number): (() => number) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

export const exposureForSeed = (seed: number): ExposureSpec => {
  const random = seededRandom((seed ^ 0xa511e9b3) >>> 0);
  const roll = random();
  if (roll < 0.58) return { band: 'deep', amount: random() * 0.025, label: 'deep exposure' };
  if (roll < 0.88) return { band: 'graphite', amount: 0.10 + random() * 0.075, label: 'graphite exposure' };
  return { band: 'dusk', amount: 0.21 + random() * 0.07, label: 'dusk exposure' };
};

const fitBackground = (background: string, text: string, requestedAmount: number): { color: string; amount: number } => {
  let amount = requestedAmount;
  let color = mixHex(background, text, amount);
  while (amount > 0 && contrastRatio(text, color) < 6.5) {
    amount = Math.max(0, amount - 0.01);
    color = mixHex(background, text, amount);
  }
  return { color, amount };
};

const ensureContrast = (color: string, background: string, target: string, minimum = 4.5): string => {
  if (contrastRatio(color, background) >= minimum) return color;
  for (let step = 1; step <= 20; step += 1) {
    const candidate = mixHex(color, target, step / 20);
    if (contrastRatio(candidate, background) >= minimum) return candidate;
  }
  return target;
};

const panelFor = (background: string, original: string, band: ExposureBand): string => {
  if (band === 'deep') return original;
  const { r, g, b } = parseHex(mixHex(background, '#000000', band === 'dusk' ? 0.28 : 0.22));
  return `rgba(${r}, ${g}, ${b}, ${band === 'dusk' ? '.78' : '.82'})`;
};

export const applyExposure = (palette: PaletteInput, spec: ExposureSpec): ExposedPalette => {
  const background = fitBackground(palette.bg, palette.text, spec.amount);
  return {
    bg: background.color,
    text: palette.text,
    accent: ensureContrast(palette.accent, background.color, palette.text),
    accent2: ensureContrast(palette.accent2, background.color, palette.text),
    muted: ensureContrast(palette.muted, background.color, palette.text),
    panel: panelFor(background.color, palette.panel, spec.band),
    exposure: background.amount,
    exposureBand: spec.band
  };
};
