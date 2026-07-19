import englishSlogans from './content/slogans.en.json';

export type CopyPack = {
  kicker: string;
  title: string;
  titleLine2: string;
  summary: string;
  action: string;
};

export const copyPacks: CopyPack[] = englishSlogans;
export const newCopyPacks: CopyPack[] = copyPacks.slice(24);
export const additionalCopyPacks: CopyPack[] = copyPacks.slice(-100);

const stopWords = new Set(['a', 'an', 'and', 'as', 'at', 'before', 'for', 'from', 'in', 'into', 'is', 'it', 'not', 'of', 'on', 'the', 'to', 'what', 'where', 'with']);

const normalizeSlogan = (value: string): string => value
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const setSimilarity = (left: Set<string>, right: Set<string>): number => {
  if (left.size === 0 && right.size === 0) return 1;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
};

const meaningfulTokens = (value: string): Set<string> => new Set(
  normalizeSlogan(value).split(' ').filter((token) => token && !stopWords.has(token))
);

const characterTrigrams = (value: string): Set<string> => {
  const normalized = `  ${normalizeSlogan(value)}  `;
  const grams = new Set<string>();
  for (let index = 0; index <= normalized.length - 3; index += 1) grams.add(normalized.slice(index, index + 3));
  return grams;
};

const fnvFingerprint = (value: string): string => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
};

export const sloganText = (pack: Pick<CopyPack, 'title' | 'titleLine2'>): string => `${pack.title} ${pack.titleLine2}`;

export type SloganComparison = {
  left: string;
  right: string;
  leftFingerprint: string;
  rightFingerprint: string;
  tokenSimilarity: number;
  trigramSimilarity: number;
  similarity: number;
  distance: number;
};

export const compareSlogans = (leftPack: CopyPack, rightPack: CopyPack): SloganComparison => {
  const left = sloganText(leftPack);
  const right = sloganText(rightPack);
  const tokenSimilarity = setSimilarity(meaningfulTokens(left), meaningfulTokens(right));
  const trigramSimilarity = setSimilarity(characterTrigrams(left), characterTrigrams(right));
  const similarity = Math.max(tokenSimilarity, trigramSimilarity * 0.9);
  return {
    left,
    right,
    leftFingerprint: fnvFingerprint(normalizeSlogan(left)),
    rightFingerprint: fnvFingerprint(normalizeSlogan(right)),
    tokenSimilarity,
    trigramSimilarity,
    similarity,
    distance: 1 - similarity
  };
};

export type SloganAudit = {
  count: number;
  minimumDistance: number;
  closest: SloganComparison[];
  collisions: SloganComparison[];
};

export const auditSlogans = (packs: CopyPack[] = copyPacks, minimumDistance = 0.55): SloganAudit => {
  const comparisons: SloganComparison[] = [];
  for (let left = 0; left < packs.length; left += 1) {
    for (let right = left + 1; right < packs.length; right += 1) {
      comparisons.push(compareSlogans(packs[left]!, packs[right]!));
    }
  }
  comparisons.sort((a, b) => a.distance - b.distance);
  return {
    count: packs.length,
    minimumDistance,
    closest: comparisons.slice(0, 12),
    collisions: comparisons.filter((comparison) => comparison.distance < minimumDistance)
  };
};
