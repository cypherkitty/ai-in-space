import { applyExposure, contrastRatio, exposureForSeed, perceivedLightness, type PaletteInput } from '../src/lib/exposure.ts';

const sampleSize = 10_000;
const counts = { deep: 0, graphite: 0, dusk: 0 };
const representativePalettes: PaletteInput[] = [
  { accent: '#72f7db', accent2: '#dffcf7', bg: '#02060b', text: '#f2f7fb', muted: '#8b98a5', panel: 'rgba(3, 10, 17, .55)' },
  { accent: '#ff8a4c', accent2: '#f4d7c5', bg: '#100806', text: '#f5eee8', muted: '#a98f82', panel: 'rgba(23, 10, 7, .72)' },
  { accent: '#91dace', accent2: '#e3e7e5', bg: '#3a3d3b', text: '#f2f3f2', muted: '#b9c0bc', panel: 'rgba(24, 28, 26, .8)' }
];

let brightest = { color: '#000000', lightness: 0, seed: 0 };
let minimumTextContrast = Number.POSITIVE_INFINITY;
let minimumAccentContrast = Number.POSITIVE_INFINITY;
let minimumMutedContrast = Number.POSITIVE_INFINITY;

for (let seed = 1; seed <= sampleSize; seed += 1) {
  const spec = exposureForSeed(seed);
  counts[spec.band] += 1;
  for (const palette of representativePalettes) {
    const exposed = applyExposure(palette, spec);
    const lightness = perceivedLightness(exposed.bg);
    const textContrast = contrastRatio(exposed.text, exposed.bg);
    const accentContrast = contrastRatio(exposed.accent, exposed.bg);
    const mutedContrast = contrastRatio(exposed.muted, exposed.bg);
    if (lightness > brightest.lightness) brightest = { color: exposed.bg, lightness, seed };
    minimumTextContrast = Math.min(minimumTextContrast, textContrast);
    minimumAccentContrast = Math.min(minimumAccentContrast, accentContrast);
    minimumMutedContrast = Math.min(minimumMutedContrast, mutedContrast);
  }
}

const ratios = Object.fromEntries(Object.entries(counts).map(([band, count]) => [band, count / sampleSize]));
console.table(Object.entries(counts).map(([band, count]) => ({ band, count, share: `${(count / sampleSize * 100).toFixed(1)}%` })));
console.table({
  brightest_background: { value: brightest.color, score: brightest.lightness.toFixed(1), seed: brightest.seed },
  minimum_text_contrast: { value: minimumTextContrast.toFixed(2), score: 'required 6.50', seed: '' },
  minimum_accent_contrast: { value: minimumAccentContrast.toFixed(2), score: 'required 4.50', seed: '' },
  minimum_muted_contrast: { value: minimumMutedContrast.toFixed(2), score: 'required 4.50', seed: '' }
});

if (ratios.deep! < 0.55 || ratios.deep! > 0.61) throw new Error(`Deep exposure share drifted to ${(ratios.deep! * 100).toFixed(1)}%.`);
if (ratios.graphite! < 0.27 || ratios.graphite! > 0.33) throw new Error(`Graphite exposure share drifted to ${(ratios.graphite! * 100).toFixed(1)}%.`);
if (ratios.dusk! < 0.09 || ratios.dusk! > 0.15) throw new Error(`Dusk exposure share drifted to ${(ratios.dusk! * 100).toFixed(1)}%.`);
if (brightest.lightness > 90) throw new Error(`A generated background became too light: ${brightest.color} (${brightest.lightness.toFixed(1)}).`);
if (minimumTextContrast < 6.5) throw new Error(`Text contrast fell below 6.5: ${minimumTextContrast.toFixed(2)}.`);
if (minimumAccentContrast < 4.5) throw new Error(`Accent contrast fell below 4.5: ${minimumAccentContrast.toFixed(2)}.`);
if (minimumMutedContrast < 4.5) throw new Error(`Muted contrast fell below 4.5: ${minimumMutedContrast.toFixed(2)}.`);

console.log('Exposure distribution and contrast audit passed.');
