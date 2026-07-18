import earth from './assets/orbital-earth.jpg';
import copper from './assets/copper-eclipse.jpg';
import ice from './assets/ice-signal.jpg';
import ringWorld from './assets/ring-world.jpg';
import gravityLens from './assets/gravity-lens.jpg';
import oceanWorld from './assets/ocean-world.jpg';
import solarSail from './assets/solar-sail.jpg';
import farObservatory from './assets/far-observatory.jpg';

export type Layout =
  | 'origin'
  | 'split'
  | 'editorial'
  | 'console'
  | 'poster'
  | 'manifesto'
  | 'radar'
  | 'diagonal'
  | 'monolith'
  | 'terminal'
  | 'atlas'
  | 'horizon'
  | 'aperture'
  | 'zenith'
  | 'broadcast'
  | 'ledger';

export type WidgetName = 'stats' | 'signal' | 'coordinates' | 'progress' | 'quote' | 'mission';
export type TitleTreatment = 'native' | 'outline' | 'editorial' | 'mono';
export type Texture = 'grid' | 'scan' | 'grain' | 'clean';
export type SceneAlign = 'left' | 'center' | 'right';

export interface Design {
  id: string;
  index: string;
  name: string;
  note: string;
  layout: Layout;
  visual?: 'orbit' | 'neural';
  scene: string;
  accent: string;
  accent2: string;
  bg: string;
  text: string;
  muted: string;
  panel: string;
  tone?: 'light' | 'dark';
  kicker: string;
  title: string;
  titleLine2: string;
  summary: string;
  action: string;
  storyTitle?: string;
  widgets: WidgetName[];
  stats: [string, string, string][];
  generated?: boolean;
  seed?: number;
  copySeed?: number;
  treatment?: TitleTreatment;
  texture?: Texture;
  sceneAlign?: SceneAlign;
}

const coreStats: [string, string, string][] = [
  ['24', 'missions', 'supported'],
  ['87 TB', 'space data', 'processed'],
  ['3.2M', 'models', 'deployed']
];

export const curatedDesigns: Design[] = [
  {
    id: 'orbital-zero', index: '00', name: 'Orbital Zero', note: 'Reference study', layout: 'origin', scene: earth,
    visual: 'orbit',
    accent: '#d9ecff', accent2: '#ffffff', bg: '#02060b', text: '#f2f7fb', muted: '#8b98a5', panel: 'rgba(3, 10, 17, .55)',
    kicker: 'Intelligence beyond boundaries', title: 'AI', titleLine2: 'in space',
    summary: 'Advancing intelligence to explore, understand, and shape our future beyond Earth.', action: 'Explore the future', widgets: ['stats', 'progress'], stats: coreStats
  },
  {
    id: 'solar-archive', index: '01', name: 'Solar Archive', note: 'Copper eclipse', layout: 'split', scene: copper,
    visual: 'orbit',
    accent: '#ff8a45', accent2: '#ffe6c9', bg: '#100806', text: '#fff6ed', muted: '#b58f78', panel: 'rgba(22, 8, 2, .62)',
    kicker: 'A new instrument for discovery', title: 'Read the', titleLine2: 'unknown',
    summary: 'Machine perception for the places where distance turns every observation into history.', action: 'Enter the archive', widgets: ['signal', 'coordinates'], stats: [['04', 'active', 'relays'], ['8.3m', 'light-min', 'latency'], ['99.7', 'signal', 'integrity']]
  },
  {
    id: 'lunar-signal', index: '02', name: 'Lunar Signal', note: 'Quiet intelligence', layout: 'editorial', scene: ice,
    visual: 'orbit',
    accent: '#72f7db', accent2: '#dffcf7', bg: '#e9ece8', text: '#101615', muted: '#596965', panel: 'rgba(236, 241, 237, .74)', tone: 'light',
    kicker: 'Field note 021 / autonomous science', title: 'A signal', titleLine2: 'learns to listen',
    summary: 'We build systems that notice the faint evidence hidden inside very large silences.', action: 'Read field notes', widgets: ['quote', 'mission'], stats: [['12k', 'ice spectra', 'indexed'], ['0.04', 'false signal', 'ratio'], ['06', 'outer moon', 'models']]
  },
  {
    id: 'astral-index', index: '03', name: 'Astral Index', note: 'Data as landscape', layout: 'console', scene: earth,
    visual: 'neural',
    accent: '#b7ff5a', accent2: '#f2ffe2', bg: '#050805', text: '#efffe1', muted: '#86937c', panel: 'rgba(7, 13, 5, .78)',
    kicker: 'Index / deep field / live', title: 'Map more', titleLine2: 'than stars',
    summary: 'A living observatory index built for hypotheses, not dashboards.', action: 'Open the index', widgets: ['coordinates', 'signal', 'stats'], stats: [['31.4', 'petapixels', 'charted'], ['062', 'candidate', 'worlds'], ['LIVE', 'deep field', 'relay']]
  },
  {
    id: 'deep-field', index: '04', name: 'Deep Field', note: 'Type-first minimalism', layout: 'manifesto', scene: ice,
    visual: 'neural',
    accent: '#b8a7ff', accent2: '#ffffff', bg: '#07060c', text: '#faf8ff', muted: '#9a95aa', panel: 'rgba(12, 9, 19, .62)',
    kicker: 'Deep field intelligence', title: 'The farther', titleLine2: 'we look, the more we learn.',
    summary: 'AI compresses the distance between a strange observation and a useful question.', action: 'See what we see', widgets: ['quote', 'progress'], stats: [['14B', 'years of', 'context'], ['01', 'shared', 'sky'], ['∞', 'questions', 'remaining']]
  },
  {
    id: 'genesis-line', index: '05', name: 'Genesis Line', note: 'Mission poster', layout: 'poster', scene: copper,
    visual: 'orbit',
    accent: '#ff4f36', accent2: '#ffdfb1', bg: '#0b0604', text: '#fff0dc', muted: '#b7957e', panel: 'rgba(17, 6, 3, .58)',
    kicker: 'Mission genesis / 2031', title: 'Train here.', titleLine2: 'Think out there.',
    summary: 'Autonomous models prepared for radiation, delay, ambiguity, and the long way home.', action: 'View the mission', widgets: ['mission', 'coordinates'], stats: [['2031', 'launch', 'window'], ['18', 'model', 'payloads'], ['227d', 'cruise', 'phase']]
  },
  {
    id: 'cartographer', index: '06', name: 'Cartographer', note: 'Scientific survey', layout: 'radar', scene: earth,
    visual: 'orbit',
    accent: '#49c8ff', accent2: '#e2f7ff', bg: '#02080d', text: '#e9f8ff', muted: '#7293a3', panel: 'rgba(1, 12, 18, .68)',
    kicker: 'Autonomous survey network', title: 'Give space', titleLine2: 'a memory',
    summary: 'One navigable intelligence layer for every observation, model, and mission decision.', action: 'Start mapping', widgets: ['signal', 'progress', 'coordinates'], stats: [['68%', 'survey', 'complete'], ['9.1 AU', 'network', 'reach'], ['004', 'silent', 'nodes']]
  },
  {
    id: 'night-relay', index: '07', name: 'Night Relay', note: 'Broadcast system', layout: 'diagonal', scene: copper,
    visual: 'orbit',
    accent: '#ffd24a', accent2: '#fff4c7', bg: '#090804', text: '#fffce8', muted: '#aaa27d', panel: 'rgba(15, 13, 4, .68)',
    kicker: 'Relay 7 is receiving', title: 'No signal', titleLine2: 'left behind',
    summary: 'Adaptive compression and inference for links measured in minutes, not milliseconds.', action: 'Follow the relay', widgets: ['signal', 'stats'], stats: [['7.4kb', 'uplink', 'rate'], ['14:22', 'next', 'window'], ['AOS', 'carrier', 'state']]
  },
  {
    id: 'helix-dawn', index: '08', name: 'Helix Dawn', note: 'New-world biology', layout: 'monolith', scene: ice,
    visual: 'neural',
    accent: '#e6ff65', accent2: '#ffffff', bg: '#050703', text: '#f9ffe5', muted: '#919a75', panel: 'rgba(9, 12, 3, .57)',
    kicker: 'Life detection / protocol 08', title: 'Is anyone', titleLine2: 'else becoming?',
    summary: 'Patient intelligence for the most consequential yes-or-no question we can ask.', action: 'Examine the evidence', widgets: ['mission', 'quote'], stats: [['0.7', 'confidence', 'threshold'], ['41', 'bio-signature', 'classes'], ['08', 'worlds', 'queued']]
  },
  {
    id: 'pale-machine', index: '09', name: 'Pale Machine', note: 'Lunar modernism', layout: 'atlas', scene: ice,
    visual: 'orbit',
    accent: '#0f6d61', accent2: '#111815', bg: '#e7e9e4', text: '#121714', muted: '#5f6963', panel: 'rgba(242, 244, 239, .82)', tone: 'light',
    kicker: 'An operating system for elsewhere', title: 'Built for', titleLine2: 'the quiet',
    summary: 'Tools for scientists and machines working at the edge of what can be known.', action: 'See the system', widgets: ['stats', 'mission'], stats: [['03', 'research', 'programs'], ['128', 'edge model', 'cores'], ['1.0', 'shared', 'protocol']]
  },
  {
    id: 'event-horizon', index: '10', name: 'Event Horizon', note: 'Machine terminal', layout: 'terminal', scene: earth,
    visual: 'neural',
    accent: '#00ff88', accent2: '#d4ffe9', bg: '#010603', text: '#dcffeb', muted: '#628b73', panel: 'rgba(0, 12, 5, .8)',
    kicker: 'AIS://OBSERVATORY/ONLINE', title: 'Ask bigger', titleLine2: 'questions.',
    summary: 'An open research interface for reasoning across the observable universe.', action: 'Initialize session', widgets: ['coordinates', 'progress', 'signal'], stats: [['READY', 'inference', 'fabric'], ['31ms', 'local', 'response'], ['∞', 'context', 'window']]
  },
  {
    id: 'ring-observer', index: '11', name: 'Ring Observer', note: 'Planetary horizon', layout: 'horizon', scene: ringWorld,
    visual: 'orbit',
    accent: '#f0c979', accent2: '#fff8e8', bg: '#080705', text: '#fff9ed', muted: '#aa9a7f', panel: 'rgba(14, 11, 5, .62)',
    kicker: 'Outer system survey / ring plane', title: 'Measure the', titleLine2: 'impossible scale',
    summary: 'Autonomous observation turns a world-sized system into a sequence of testable details.', action: 'Enter the survey', widgets: ['stats', 'coordinates'], stats: [['142k', 'ring gaps', 'indexed'], ['29.4y', 'orbital', 'period'], ['07', 'shepherd', 'moons']]
  },
  {
    id: 'gravity-well', index: '12', name: 'Gravity Well', note: 'Lensing aperture', layout: 'aperture', scene: gravityLens,
    visual: 'neural',
    accent: '#8ce8ff', accent2: '#ffd6aa', bg: '#020507', text: '#f4fbff', muted: '#7f959f', panel: 'rgba(2, 8, 11, .7)',
    kicker: 'Lensing study / mass without light', title: 'Read what', titleLine2: 'bends around it',
    summary: 'Inference makes the invisible measurable through the paths that light is forced to take.', action: 'Trace the lens', widgets: ['signal', 'progress'], stats: [['6.4B', 'solar mass', 'estimate'], ['0.02″', 'arc', 'variance'], ['91%', 'model', 'agreement']]
  },
  {
    id: 'pelagic-night', index: '13', name: 'Pelagic Night', note: 'Exoplanet field study', layout: 'zenith', scene: oceanWorld,
    visual: 'neural',
    accent: '#4ff3e5', accent2: '#dcfffb', bg: '#021016', text: '#edfffd', muted: '#78a4aa', panel: 'rgba(1, 16, 22, .6)',
    kicker: 'Ocean world / first light', title: 'Listen to', titleLine2: 'another ocean',
    summary: 'Models compare tides, chemistry, and faint emissions without mistaking unfamiliar for alive.', action: 'Open the field log', widgets: ['mission', 'signal'], stats: [['2.8km', 'ocean', 'depth'], ['0.7g', 'surface', 'gravity'], ['14', 'chemistry', 'passes']]
  },
  {
    id: 'solar-thread', index: '14', name: 'Solar Thread', note: 'Light-driven mission', layout: 'broadcast', scene: solarSail,
    visual: 'orbit',
    accent: '#fff08c', accent2: '#ffffff', bg: '#040506', text: '#fffdf1', muted: '#a5a49c', panel: 'rgba(5, 6, 7, .6)',
    kicker: 'Photon drive / sail deployed', title: 'Travel on', titleLine2: 'almost nothing',
    summary: 'A film thinner than paper turns steady light into a mission that never needs fuel.', action: 'Follow the sail', widgets: ['progress', 'coordinates'], stats: [['0.81g', 'sail', 'mass'], ['84m', 'span', 'deployed'], ['1.6mm/s²', 'solar', 'push']]
  },
  {
    id: 'far-observatory', index: '15', name: 'Far Observatory', note: 'Lunar research ledger', layout: 'ledger', scene: farObservatory,
    visual: 'orbit',
    accent: '#ff6d5c', accent2: '#fff5ec', bg: '#070707', text: '#fff8f2', muted: '#9a918c', panel: 'rgba(11, 9, 8, .72)',
    kicker: 'Far side array / interference zero', title: 'The quietest', titleLine2: 'place to listen',
    summary: 'Shielded by a world, an automated observatory hears the frequencies Earth cannot.', action: 'Review the array', widgets: ['coordinates', 'stats'], stats: [['0.3K', 'receiver', 'noise'], ['128', 'array', 'elements'], ['18d', 'night', 'cycle']]
  }
];

const pick = <T>(items: T[], except?: T): T => {
  const options = except === undefined ? items : items.filter((item) => item !== except);
  return options[Math.floor(Math.random() * options.length)]!;
};

type FamilyRule = {
  visuals: ('orbit' | 'neural')[];
  treatments: TitleTreatment[];
  textures: Texture[];
  alignments: SceneAlign[];
  widgets: WidgetName[];
};

const familyRules: Record<Layout, FamilyRule> = {
  origin: { visuals: ['orbit'], treatments: ['native', 'outline'], textures: ['grid', 'grain'], alignments: ['center', 'right'], widgets: ['stats', 'progress', 'coordinates'] },
  split: { visuals: ['orbit'], treatments: ['native', 'outline'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['signal', 'coordinates', 'mission'] },
  editorial: { visuals: ['orbit', 'neural'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['quote', 'mission', 'progress'] },
  console: { visuals: ['neural', 'orbit'], treatments: ['mono', 'native'], textures: ['grid', 'scan'], alignments: ['center', 'right'], widgets: ['coordinates', 'signal', 'progress'] },
  poster: { visuals: ['orbit'], treatments: ['outline', 'native'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['mission', 'coordinates', 'signal'] },
  manifesto: { visuals: ['neural', 'orbit'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['quote', 'progress', 'mission'] },
  radar: { visuals: ['orbit', 'neural'], treatments: ['native', 'mono'], textures: ['grid', 'scan'], alignments: ['center', 'right'], widgets: ['signal', 'progress', 'coordinates'] },
  diagonal: { visuals: ['orbit'], treatments: ['mono', 'outline'], textures: ['scan', 'grain'], alignments: ['center', 'right'], widgets: ['signal', 'coordinates', 'progress'] },
  monolith: { visuals: ['neural', 'orbit'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['mission', 'quote', 'progress'] },
  terminal: { visuals: ['neural'], treatments: ['mono'], textures: ['scan', 'grid'], alignments: ['center', 'right'], widgets: ['coordinates', 'progress', 'signal'] },
  atlas: { visuals: ['orbit', 'neural'], treatments: ['editorial', 'native'], textures: ['clean', 'grid'], alignments: ['center', 'right'], widgets: ['stats', 'mission', 'coordinates'] },
  horizon: { visuals: ['orbit'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['stats', 'coordinates', 'progress'] },
  aperture: { visuals: ['neural', 'orbit'], treatments: ['native', 'mono'], textures: ['clean', 'grid'], alignments: ['center', 'right'], widgets: ['signal', 'progress', 'coordinates'] },
  zenith: { visuals: ['neural', 'orbit'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['mission', 'signal', 'quote'] },
  broadcast: { visuals: ['orbit'], treatments: ['outline', 'mono', 'native'], textures: ['scan', 'grain'], alignments: ['center', 'right'], widgets: ['progress', 'coordinates', 'signal'] },
  ledger: { visuals: ['orbit', 'neural'], treatments: ['mono', 'native'], textures: ['grid', 'clean'], alignments: ['center', 'right'], widgets: ['coordinates', 'stats', 'mission'] }
};

const generatedPrefixes = ['Aster', 'Silent', 'Far', 'Helio', 'Signal', 'Nova', 'Liminal', 'Outer', 'Vector', 'Echo'];
const generatedSuffixes = ['Memory', 'Relay', 'Atlas', 'Engine', 'Survey', 'Protocol', 'Horizon', 'Field', 'Archive', 'Dawn'];
const scenes = [earth, copper, ice, ringWorld, gravityLens, oceanWorld, solarSail, farObservatory];

type CopyPack = Pick<Design, 'kicker' | 'title' | 'titleLine2' | 'summary' | 'action'>;

const copyPacks: CopyPack[] = [
  { kicker: 'Observation begins with attention', title: 'Make distance', titleLine2: 'observable', summary: 'Patient systems reveal structure in signals that arrive faint, late, and incomplete.', action: 'See the field' },
  { kicker: 'A machine can learn to look', title: 'Teach machines', titleLine2: 'to wonder', summary: 'Useful intelligence starts by knowing the difference between an answer and a better question.', action: 'Open the inquiry' },
  { kicker: 'Field note / the work continues', title: 'The sky', titleLine2: 'is unfinished', summary: 'Every observation changes the map and gives the next mission somewhere new to begin.', action: 'Read the notes' },
  { kicker: 'Quiet evidence / live', title: 'Notice', titleLine2: 'what waits', summary: 'We build instruments for the patterns that only appear when nothing is rushed.', action: 'Begin observing' },
  { kicker: 'Autonomy across distance', title: 'Farther out.', titleLine2: 'Clearer in.', summary: 'Reasoning at the edge makes each transmission smaller, sharper, and more useful.', action: 'Follow the signal' },
  { kicker: 'Listening is a technical discipline', title: 'Let silence', titleLine2: 'become evidence', summary: 'Absence has structure. The right model can tell quiet from empty.', action: 'Inspect the signal' },
  { kicker: 'A living index of elsewhere', title: 'A map', titleLine2: 'that keeps learning', summary: 'Observations remain connected as instruments, missions, and hypotheses evolve.', action: 'Enter the atlas' },
  { kicker: 'Mission systems / delay tolerant', title: 'Build for', titleLine2: 'the long delay', summary: 'When Earth cannot answer in time, bounded intelligence keeps the work moving.', action: 'View the system' },
  { kicker: 'Detection threshold / 0.04', title: 'Find the', titleLine2: 'almost invisible', summary: 'The most important discovery may begin as a difference too small to trust at first glance.', action: 'Examine the trace' },
  { kicker: 'Signals are only the beginning', title: 'Turn signals', titleLine2: 'into questions', summary: 'A good observatory does more than collect. It helps a team decide what deserves another look.', action: 'Ask what follows' },
  { kicker: 'Shared context / one observable world', title: 'One sky.', titleLine2: 'More context.', summary: 'A common intelligence layer lets distant missions contribute to the same evolving picture.', action: 'Connect the field' },
  { kicker: 'Local inference / orbital time', title: 'Reason at', titleLine2: 'orbital speed', summary: 'Models close to the instrument can protect the moments that matter before they pass.', action: 'See the runtime' },
  { kicker: 'Continuous survey / night side', title: 'Keep watch', titleLine2: 'beyond daylight', summary: 'Autonomous observation carries the research forward through every communications window.', action: 'Track the survey' },
  { kicker: 'From observation to intent', title: 'Where data', titleLine2: 'becomes direction', summary: 'Evidence becomes useful when scientists can trace how it changed the next decision.', action: 'Follow the path' },
  { kicker: 'Decision support / deep field', title: 'See earlier.', titleLine2: 'Decide better.', summary: 'Faster recognition leaves more time for the careful human judgment that follows.', action: 'Review the model' },
  { kicker: 'Tools for unhurried discovery', title: 'Machines for', titleLine2: 'patient science', summary: 'The goal is not instant certainty. It is disciplined attention at impossible scale.', action: 'Meet the instruments' },
  { kicker: 'Carrier analysis / adaptive', title: 'Listen past', titleLine2: 'the noise', summary: 'Separate the unusual from the accidental without pretending uncertainty has disappeared.', action: 'Tune the relay' },
  { kicker: 'Protocol / uncertainty remains', title: 'Leave room', titleLine2: 'for the unknown', summary: 'A trustworthy system preserves ambiguity instead of smoothing it into a convenient answer.', action: 'Read the protocol' },
  { kicker: 'Research principle / 01', title: 'Observe first.', titleLine2: 'Assume less.', summary: 'Better models begin with evidence that remains inspectable, contestable, and alive.', action: 'Explore the method' },
  { kicker: 'Progress measured in clarity', title: 'A quieter', titleLine2: 'kind of progress', summary: 'Not louder predictions. Better context, clearer limits, and decisions a team can understand.', action: 'See the approach' },
  { kicker: 'Photon archive / faint source', title: 'Learn from', titleLine2: 'the faintest light', summary: 'Very old light still carries new information when every trace can be compared in context.', action: 'Open the archive' },
  { kicker: 'Intelligence belongs in context', title: 'Intelligence', titleLine2: 'with a horizon', summary: 'Models should know where their view ends and where another instrument must take over.', action: 'Find the boundary' },
  { kicker: 'Inquiry survives the distance', title: 'Keep asking', titleLine2: 'from farther away', summary: 'Exploration advances when missions can form useful next questions before Earth replies.', action: 'Continue outward' },
  { kicker: 'The useful output is curiosity', title: 'Not answers.', titleLine2: 'Better questions.', summary: 'We design intelligence to expand scientific judgment, not to perform certainty.', action: 'Start a question' }
];

const storySlogans = [
  'The next observation changes the map.',
  'Distance changes what intelligence must become.',
  'Some answers arrive as faint differences.',
  'The unknown is mostly a matter of attention.',
  'A better question can travel farther.',
  'Not every discovery announces itself.',
  'What looks empty is often unresolved.',
  'Exploration begins where certainty ends.',
  'The signal is only the beginning.',
  'Far away still belongs in context.',
  'The map should remember how it changed.',
  'Patience is part of the instrument.',
  'The faintest evidence deserves a second look.',
  'Good systems leave room for doubt.',
  'A long delay changes the decision.',
  'Every mission sees one part of the whole.',
  'Observation is how distance becomes knowledge.',
  'A quieter signal can carry the larger idea.',
  'The edge of the map is still data.',
  'We learn by noticing what does not fit.',
  'Autonomy starts with knowing the limits.',
  'The universe rarely speaks at full volume.',
  'A model should know when to keep looking.',
  'The work continues between transmissions.',
  'One strange pixel can change the mission.',
  'Discovery is a sequence, not a moment.',
  'Context is what makes a signal matter.',
  'Nothing out there arrives without noise.',
  'The next question is already in the data.',
  'Understanding travels slower than light.',
  'The map is never the sky.',
  'Attention is our longest-range instrument.'
];

const seededRandom = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const seededPick = <T>(random: () => number, values: readonly T[]): T => values[Math.floor(random() * values.length)]!;

const pickWidgets = (random: () => number, pool: WidgetName[]): WidgetName[] => {
  if (pool.includes('stats') && random() < 0.28) return ['stats'];
  const compact = pool.filter((widget) => widget !== 'stats').sort(() => random() - 0.5);
  return compact.slice(0, random() > 0.72 ? 3 : 2);
};

export function randomSeed(): number {
  if (globalThis.crypto) return globalThis.crypto.getRandomValues(new Uint32Array(1))[0]!;
  return Math.floor(Math.random() * 0xffffffff);
}

const selectCopy = (copySeed: number, layout: Layout): CopyPack => {
  const random = seededRandom(copySeed ^ 0x9e3779b9);
  const compact = layout === 'origin' || layout === 'console' || layout === 'aperture' || layout === 'ledger';
  const medium = layout === 'split' || layout === 'diagonal' || layout === 'broadcast';
  const maxLength = compact ? 28 : medium ? 34 : 46;
  const compatible = copyPacks.filter((copy) => `${copy.title} ${copy.titleLine2}`.length <= maxLength);
  return seededPick(random, compatible.length ? compatible : copyPacks);
};

const selectStorySlogan = (copySeed: number): string => {
  const random = seededRandom(copySeed ^ 0x85ebca6b);
  return seededPick(random, storySlogans);
};

export function remixCopy(design: Design, copySeed: number): Design {
  const copy = selectCopy(copySeed, design.layout);
  return { ...design, ...copy, storyTitle: selectStorySlogan(copySeed), copySeed };
}

export function generateDesign(seed: number, catalogIndex?: number, copySeed = seed): Design {
  const random = seededRandom(seed);
  const base = seededPick(random, curatedDesigns);
  const rules = familyRules[base.layout];
  const sameTonePalettes = curatedDesigns.filter((design) => (design.tone ?? 'dark') === (base.tone ?? 'dark'));
  const palette = random() < 0.68 ? base : seededPick(random, sameTonePalettes);
  const copy = selectCopy(copySeed, base.layout);
  const visual = seededPick(random, rules.visuals);
  const copyLength = `${copy.title} ${copy.titleLine2}`.length;
  const treatmentPool = copyLength > 30 ? rules.treatments.filter((treatment) => treatment !== 'editorial') : rules.treatments;
  const prefix = generatedPrefixes[seed % generatedPrefixes.length]!;
  const suffix = generatedSuffixes[Math.floor(seed / generatedPrefixes.length) % generatedSuffixes.length]!;

  return {
    ...base,
    id: `signal-${seed.toString(36)}`,
    index: catalogIndex ? `G${catalogIndex.toString().padStart(2, '0')}` : `R${(seed % 100).toString().padStart(2, '0')}`,
    name: `${prefix} ${suffix}`,
    note: `${base.name} family · ${visual} core`,
    generated: true,
    seed,
    copySeed,
    visual,
    scene: seededPick(random, scenes),
    accent: palette.accent,
    accent2: palette.accent2,
    bg: palette.bg,
    text: palette.text,
    muted: palette.muted,
    panel: palette.panel,
    tone: palette.tone,
    kicker: copy.kicker,
    title: copy.title,
    titleLine2: copy.titleLine2,
    summary: copy.summary,
    action: copy.action,
    storyTitle: selectStorySlogan(copySeed),
    widgets: pickWidgets(random, rules.widgets),
    stats: seededPick(random, curatedDesigns).stats,
    treatment: seededPick(random, treatmentPool.length ? treatmentPool : ['native']),
    texture: seededPick(random, rules.textures),
    sceneAlign: seededPick(random, rules.alignments)
  };
}

export const generatedDesigns: Design[] = Array.from({ length: 50 }, (_, index) => generateDesign(12001 + index, index + 1));
export const designs: Design[] = [...curatedDesigns, ...generatedDesigns];

export function randomDesign(exceptId?: string): Design {
  return pick(designs, designs.find((design) => design.id === exceptId));
}

export function crazyMix(): Design {
  return generateDesign(randomSeed());
}
