import { auditSlogans, copyPacks, newCopyPacks } from '../src/lib/slogans.ts';

const audit = auditSlogans();
const expectedNewSlogans = 100;

console.log(`Slogan library: ${audit.count} total / ${newCopyPacks.length} new`);
console.log(`Required lexical distance: ${audit.minimumDistance.toFixed(2)}`);
console.table(audit.closest.map((comparison) => ({
  left: comparison.left,
  right: comparison.right,
  distance: comparison.distance.toFixed(3),
  token: comparison.tokenSimilarity.toFixed(3),
  trigram: comparison.trigramSimilarity.toFixed(3),
  fingerprints: `${comparison.leftFingerprint} / ${comparison.rightFingerprint}`
})));

if (newCopyPacks.length !== expectedNewSlogans) {
  throw new Error(`Expected ${expectedNewSlogans} new slogans, found ${newCopyPacks.length}.`);
}

const unreachable = newCopyPacks.filter((pack) => `${pack.title} ${pack.titleLine2}`.length > 46);
if (unreachable.length > 0) {
  throw new Error(`Some slogans exceed the widest layout limit: ${unreachable.map((pack) => `"${pack.title} ${pack.titleLine2}"`).join(', ')}`);
}

const normalized = copyPacks.map((pack) => `${pack.title} ${pack.titleLine2}`.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim());
if (new Set(normalized).size !== normalized.length) {
  throw new Error('The slogan library contains an exact duplicate.');
}

if (audit.collisions.length > 0) {
  const details = audit.collisions.map((collision) =>
    `"${collision.left}" vs "${collision.right}" (distance ${collision.distance.toFixed(3)})`
  ).join('\n');
  throw new Error(`Slogan distance audit failed:\n${details}`);
}

console.log('Slogan distance audit passed.');
