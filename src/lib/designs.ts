import earth from './assets/orbital-earth.jpg';
import copper from './assets/copper-eclipse.jpg';
import ringWorld from './assets/ring-world.jpg';
import gravityLens from './assets/gravity-lens.jpg';
import oceanWorld from './assets/ocean-world.jpg';
import solarSail from './assets/solar-sail.jpg';
import farObservatory from './assets/far-observatory.jpg';
import earthPreview from './assets/previews/orbital-earth-preview.jpg';
import copperPreview from './assets/previews/copper-eclipse-preview.jpg';
import ringWorldPreview from './assets/previews/ring-world-preview.jpg';
import gravityLensPreview from './assets/previews/gravity-lens-preview.jpg';
import oceanWorldPreview from './assets/previews/ocean-world-preview.jpg';
import solarSailPreview from './assets/previews/solar-sail-preview.jpg';
import farObservatoryPreview from './assets/previews/far-observatory-preview.jpg';

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
  | 'ledger'
  | 'triptych'
  | 'timeline'
  | 'specimen'
  | 'constellation'
  | 'command'
  | 'signalstack';

export type WidgetName =
  | 'stats'
  | 'signal'
  | 'coordinates'
  | 'progress'
  | 'quote'
  | 'mission'
  | 'spectrum'
  | 'delay'
  | 'anomaly'
  | 'orbit'
  | 'solar'
  | 'memory'
  | 'thermal'
  | 'archive';
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

export type ResearchPrinciple = {
  title: string;
  description: string;
};

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
    summary: 'Advancing intelligence to explore, understand, and shape our future beyond Earth.', action: 'Explore the future', widgets: ['stats', 'orbit'], stats: coreStats
  },
  {
    id: 'solar-archive', index: '01', name: 'Solar Archive', note: 'Copper eclipse', layout: 'split', scene: copper,
    visual: 'orbit',
    accent: '#ff8a45', accent2: '#ffe6c9', bg: '#100806', text: '#fff6ed', muted: '#b58f78', panel: 'rgba(22, 8, 2, .62)',
    kicker: 'A new instrument for discovery', title: 'Read the', titleLine2: 'unknown',
    summary: 'Machine perception for the places where distance turns every observation into history.', action: 'Enter the archive', widgets: ['spectrum', 'delay'], stats: [['04', 'active', 'relays'], ['8.3m', 'light-min', 'latency'], ['99.7', 'signal', 'integrity']]
  },
  {
    id: 'lunar-signal', index: '02', name: 'Lunar Signal', note: 'Quiet intelligence', layout: 'editorial', scene: farObservatory,
    visual: 'orbit',
    accent: '#72f7db', accent2: '#dffcf7', bg: '#e9ece8', text: '#101615', muted: '#596965', panel: 'rgba(236, 241, 237, .74)', tone: 'light',
    kicker: 'Field note 021 / autonomous science', title: 'A signal', titleLine2: 'learns to listen',
    summary: 'We build systems that notice the faint evidence hidden inside very large silences.', action: 'Read field notes', widgets: ['archive', 'anomaly'], stats: [['12k', 'ice spectra', 'indexed'], ['0.04', 'false signal', 'ratio'], ['06', 'outer moon', 'models']]
  },
  {
    id: 'astral-index', index: '03', name: 'Astral Index', note: 'Data as landscape', layout: 'console', scene: earth,
    visual: 'neural',
    accent: '#b7ff5a', accent2: '#f2ffe2', bg: '#050805', text: '#efffe1', muted: '#86937c', panel: 'rgba(7, 13, 5, .78)',
    kicker: 'Index / deep field / live', title: 'Map more', titleLine2: 'than stars',
    summary: 'A living observatory index built for hypotheses, not dashboards.', action: 'Open the index', widgets: ['coordinates', 'memory', 'spectrum'], stats: [['31.4', 'petapixels', 'charted'], ['062', 'candidate', 'worlds'], ['LIVE', 'deep field', 'relay']]
  },
  {
    id: 'deep-field', index: '04', name: 'Deep Field', note: 'Type-first minimalism', layout: 'manifesto', scene: gravityLens,
    visual: 'neural',
    accent: '#b8a7ff', accent2: '#ffffff', bg: '#07060c', text: '#faf8ff', muted: '#9a95aa', panel: 'rgba(12, 9, 19, .62)',
    kicker: 'Deep field intelligence', title: 'The farther', titleLine2: 'we look, the more we learn.',
    summary: 'AI compresses the distance between a strange observation and a useful question.', action: 'See what we see', widgets: ['quote', 'anomaly'], stats: [['14B', 'years of', 'context'], ['01', 'shared', 'sky'], ['∞', 'questions', 'remaining']]
  },
  {
    id: 'genesis-line', index: '05', name: 'Genesis Line', note: 'Mission poster', layout: 'poster', scene: copper,
    visual: 'orbit',
    accent: '#ff4f36', accent2: '#ffdfb1', bg: '#0b0604', text: '#fff0dc', muted: '#b7957e', panel: 'rgba(17, 6, 3, .58)',
    kicker: 'Mission genesis / 2031', title: 'Train here.', titleLine2: 'Think out there.',
    summary: 'Autonomous models prepared for radiation, delay, ambiguity, and the long way home.', action: 'View the mission', widgets: ['mission', 'orbit'], stats: [['2031', 'launch', 'window'], ['18', 'model', 'payloads'], ['227d', 'cruise', 'phase']]
  },
  {
    id: 'cartographer', index: '06', name: 'Cartographer', note: 'Scientific survey', layout: 'radar', scene: earth,
    visual: 'orbit',
    accent: '#49c8ff', accent2: '#e2f7ff', bg: '#02080d', text: '#e9f8ff', muted: '#7293a3', panel: 'rgba(1, 12, 18, .68)',
    kicker: 'Autonomous survey network', title: 'Give space', titleLine2: 'a memory',
    summary: 'One navigable intelligence layer for every observation, model, and mission decision.', action: 'Start mapping', widgets: ['anomaly', 'progress', 'coordinates'], stats: [['68%', 'survey', 'complete'], ['9.1 AU', 'network', 'reach'], ['004', 'silent', 'nodes']]
  },
  {
    id: 'night-relay', index: '07', name: 'Night Relay', note: 'Broadcast system', layout: 'diagonal', scene: copper,
    visual: 'orbit',
    accent: '#ffd24a', accent2: '#fff4c7', bg: '#090804', text: '#fffce8', muted: '#aaa27d', panel: 'rgba(15, 13, 4, .68)',
    kicker: 'Relay 7 is receiving', title: 'No signal', titleLine2: 'left behind',
    summary: 'Adaptive compression and inference for links measured in minutes, not milliseconds.', action: 'Follow the relay', widgets: ['delay', 'signal'], stats: [['7.4kb', 'uplink', 'rate'], ['14:22', 'next', 'window'], ['AOS', 'carrier', 'state']]
  },
  {
    id: 'helix-dawn', index: '08', name: 'Helix Dawn', note: 'New-world biology', layout: 'monolith', scene: oceanWorld,
    visual: 'neural',
    accent: '#e6ff65', accent2: '#ffffff', bg: '#050703', text: '#f9ffe5', muted: '#919a75', panel: 'rgba(9, 12, 3, .57)',
    kicker: 'Life detection / protocol 08', title: 'Is anyone', titleLine2: 'else becoming?',
    summary: 'Patient intelligence for the most consequential yes-or-no question we can ask.', action: 'Examine the evidence', widgets: ['anomaly', 'thermal'], stats: [['0.7', 'confidence', 'threshold'], ['41', 'bio-signature', 'classes'], ['08', 'worlds', 'queued']]
  },
  {
    id: 'pale-machine', index: '09', name: 'Pale Machine', note: 'Lunar modernism', layout: 'atlas', scene: ringWorld,
    visual: 'orbit',
    accent: '#0f6d61', accent2: '#111815', bg: '#e7e9e4', text: '#121714', muted: '#5f6963', panel: 'rgba(242, 244, 239, .82)', tone: 'light',
    kicker: 'An operating system for elsewhere', title: 'Built for', titleLine2: 'the quiet',
    summary: 'Tools for scientists and machines working at the edge of what can be known.', action: 'See the system', widgets: ['memory', 'archive'], stats: [['03', 'research', 'programs'], ['128', 'edge model', 'cores'], ['1.0', 'shared', 'protocol']]
  },
  {
    id: 'event-horizon', index: '10', name: 'Event Horizon', note: 'Machine terminal', layout: 'terminal', scene: earth,
    visual: 'neural',
    accent: '#00ff88', accent2: '#d4ffe9', bg: '#010603', text: '#dcffeb', muted: '#628b73', panel: 'rgba(0, 12, 5, .8)',
    kicker: 'AIS://OBSERVATORY/ONLINE', title: 'Ask bigger', titleLine2: 'questions.',
    summary: 'An open research interface for reasoning across the observable universe.', action: 'Initialize session', widgets: ['coordinates', 'memory', 'anomaly'], stats: [['READY', 'inference', 'fabric'], ['31ms', 'local', 'response'], ['∞', 'context', 'window']]
  },
  {
    id: 'ring-observer', index: '11', name: 'Ring Observer', note: 'Planetary horizon', layout: 'horizon', scene: ringWorld,
    visual: 'orbit',
    accent: '#f0c979', accent2: '#fff8e8', bg: '#080705', text: '#fff9ed', muted: '#aa9a7f', panel: 'rgba(14, 11, 5, .62)',
    kicker: 'Outer system survey / ring plane', title: 'Measure the', titleLine2: 'impossible scale',
    summary: 'Autonomous observation turns a world-sized system into a sequence of testable details.', action: 'Enter the survey', widgets: ['orbit', 'stats'], stats: [['142k', 'ring gaps', 'indexed'], ['29.4y', 'orbital', 'period'], ['07', 'shepherd', 'moons']]
  },
  {
    id: 'gravity-well', index: '12', name: 'Gravity Well', note: 'Lensing aperture', layout: 'aperture', scene: gravityLens,
    visual: 'neural',
    accent: '#8ce8ff', accent2: '#ffd6aa', bg: '#020507', text: '#f4fbff', muted: '#7f959f', panel: 'rgba(2, 8, 11, .7)',
    kicker: 'Lensing study / mass without light', title: 'Read what', titleLine2: 'bends around it',
    summary: 'Inference makes the invisible measurable through the paths that light is forced to take.', action: 'Trace the lens', widgets: ['spectrum', 'anomaly'], stats: [['6.4B', 'solar mass', 'estimate'], ['0.02″', 'arc', 'variance'], ['91%', 'model', 'agreement']]
  },
  {
    id: 'pelagic-night', index: '13', name: 'Pelagic Night', note: 'Exoplanet field study', layout: 'zenith', scene: oceanWorld,
    visual: 'neural',
    accent: '#4ff3e5', accent2: '#dcfffb', bg: '#021016', text: '#edfffd', muted: '#78a4aa', panel: 'rgba(1, 16, 22, .6)',
    kicker: 'Ocean world / first light', title: 'Listen to', titleLine2: 'another ocean',
    summary: 'Models compare tides, chemistry, and faint emissions without mistaking unfamiliar for alive.', action: 'Open the field log', widgets: ['thermal', 'spectrum'], stats: [['2.8km', 'ocean', 'depth'], ['0.7g', 'surface', 'gravity'], ['14', 'chemistry', 'passes']]
  },
  {
    id: 'solar-thread', index: '14', name: 'Solar Thread', note: 'Light-driven mission', layout: 'broadcast', scene: solarSail,
    visual: 'orbit',
    accent: '#fff08c', accent2: '#ffffff', bg: '#040506', text: '#fffdf1', muted: '#a5a49c', panel: 'rgba(5, 6, 7, .6)',
    kicker: 'Photon drive / sail deployed', title: 'Travel on', titleLine2: 'almost nothing',
    summary: 'A film thinner than paper turns steady light into a mission that never needs fuel.', action: 'Follow the sail', widgets: ['solar', 'orbit'], stats: [['0.81g', 'sail', 'mass'], ['84m', 'span', 'deployed'], ['1.6mm/s²', 'solar', 'push']]
  },
  {
    id: 'far-observatory', index: '15', name: 'Far Observatory', note: 'Lunar research ledger', layout: 'ledger', scene: farObservatory,
    visual: 'orbit',
    accent: '#ff6d5c', accent2: '#fff5ec', bg: '#070707', text: '#fff8f2', muted: '#9a918c', panel: 'rgba(11, 9, 8, .72)',
    kicker: 'Far side array / interference zero', title: 'The quietest', titleLine2: 'place to listen',
    summary: 'Shielded by a world, an automated observatory hears the frequencies Earth cannot.', action: 'Review the array', widgets: ['archive', 'delay'], stats: [['0.3K', 'receiver', 'noise'], ['128', 'array', 'elements'], ['18d', 'night', 'cycle']]
  },
  {
    id: 'three-body', index: '16', name: 'Three Body', note: 'Triptych observatory', layout: 'triptych', scene: farObservatory,
    visual: 'neural',
    accent: '#ffcf70', accent2: '#fff6dc', bg: '#090806', text: '#fff9ea', muted: '#a99d82', panel: 'rgba(15, 12, 7, .82)',
    kicker: 'Three instruments / one field', title: 'See it', titleLine2: 'three ways',
    summary: 'Independent instruments compare the same impossible event before the mission decides what it means.', action: 'Compare the field', widgets: ['spectrum', 'coordinates', 'anomaly'], stats: [['03', 'independent', 'views'], ['0.91', 'agreement', 'index'], ['LIVE', 'cross-check', 'state']]
  },
  {
    id: 'light-year-route', index: '17', name: 'Light-Year Route', note: 'Mission chronology', layout: 'timeline', scene: solarSail,
    visual: 'orbit',
    accent: '#ff6a3d', accent2: '#ffe8dc', bg: '#0d0806', text: '#fff7f2', muted: '#b18f82', panel: 'rgba(18, 9, 6, .76)',
    kicker: 'Mission time / not screen time', title: 'Every delay', titleLine2: 'becomes a decision',
    summary: 'A mission unfolds as a sequence of bounded choices, each carrying the context of the one before.', action: 'Follow the route', widgets: ['mission', 'delay'], stats: [['T+00', 'departure', 'phase'], ['227d', 'cruise', 'window'], ['04', 'decision', 'gates']]
  },
  {
    id: 'specimen-forty-six', index: '18', name: 'Specimen Forty-Six', note: 'Scientific dossier', layout: 'specimen', scene: gravityLens,
    visual: 'orbit',
    accent: '#145f52', accent2: '#13221d', bg: '#e8eadf', text: '#101713', muted: '#627068', panel: 'rgba(244, 245, 236, .88)', tone: 'light',
    kicker: 'Object 46 / evidence dossier', title: 'Study the', titleLine2: 'exception',
    summary: 'A single anomaly becomes a living dossier: image, context, disagreement, and the next test.', action: 'Open the dossier', widgets: ['archive', 'anomaly'], stats: [['046', 'candidate', 'object'], ['7σ', 'signal', 'strength'], ['12', 'review', 'passes']]
  },
  {
    id: 'constellation-engine', index: '19', name: 'Constellation Engine', note: 'Networked field map', layout: 'constellation', scene: gravityLens,
    visual: 'neural',
    accent: '#bc9cff', accent2: '#f4edff', bg: '#07050d', text: '#fbf8ff', muted: '#9f94b4', panel: 'rgba(12, 8, 21, .66)',
    kicker: 'Shared sky / distributed memory', title: 'Connect', titleLine2: 'what no one sees alone',
    summary: 'Each mission holds one fragment. The network makes their relationships visible without flattening their differences.', action: 'Enter the network', widgets: ['memory', 'orbit'], stats: [['81', 'active', 'nodes'], ['1.8B', 'linked', 'events'], ['SYNC', 'context', 'state']]
  },
  {
    id: 'periapsis-control', index: '20', name: 'Periapsis Control', note: 'Mission command deck', layout: 'command', scene: earth,
    visual: 'orbit',
    accent: '#71e7ff', accent2: '#e6fbff', bg: '#03090c', text: '#effcff', muted: '#7898a1', panel: 'rgba(3, 15, 20, .82)',
    kicker: 'Command deck / autonomy nominal', title: 'Think near', titleLine2: 'the instrument',
    summary: 'Local models protect fleeting observations while Earth is still minutes away from answering.', action: 'Enter command', widgets: ['progress', 'signal', 'thermal'], stats: [['31ms', 'edge', 'response'], ['08', 'bounded', 'agents'], ['NOM', 'mission', 'state']]
  },
  {
    id: 'carrier-bloom', index: '21', name: 'Carrier Bloom', note: 'Layered signal study', layout: 'signalstack', scene: copper,
    visual: 'neural',
    accent: '#ff4fa3', accent2: '#ffe5f2', bg: '#0c0409', text: '#fff5fa', muted: '#b5889e', panel: 'rgba(20, 5, 13, .72)',
    kicker: 'Carrier 91.4 / pattern emerging', title: 'Let the signal', titleLine2: 'change shape',
    summary: 'A transmission is not one thing. It is frequency, timing, uncertainty, and the pattern between them.', action: 'Tune the carrier', widgets: ['signal', 'spectrum', 'delay'], stats: [['91.4', 'carrier', 'band'], ['06', 'signal', 'layers'], ['AOS', 'receiver', 'state']]
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
  origin: { visuals: ['orbit'], treatments: ['native', 'outline'], textures: ['grid', 'grain'], alignments: ['center', 'right'], widgets: ['stats', 'orbit', 'coordinates', 'solar'] },
  split: { visuals: ['orbit'], treatments: ['native', 'outline'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['signal', 'spectrum', 'delay', 'mission'] },
  editorial: { visuals: ['orbit', 'neural'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['quote', 'archive', 'anomaly', 'thermal'] },
  console: { visuals: ['neural', 'orbit'], treatments: ['mono', 'native'], textures: ['grid', 'scan'], alignments: ['center', 'right'], widgets: ['coordinates', 'memory', 'archive', 'spectrum'] },
  poster: { visuals: ['orbit'], treatments: ['outline', 'native'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['mission', 'orbit', 'delay', 'signal'] },
  manifesto: { visuals: ['neural', 'orbit'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['quote', 'anomaly', 'archive', 'memory'] },
  radar: { visuals: ['orbit', 'neural'], treatments: ['native', 'mono'], textures: ['grid', 'scan'], alignments: ['center', 'right'], widgets: ['anomaly', 'progress', 'coordinates', 'spectrum'] },
  diagonal: { visuals: ['orbit'], treatments: ['mono', 'outline'], textures: ['scan', 'grain'], alignments: ['center', 'right'], widgets: ['signal', 'delay', 'solar', 'coordinates'] },
  monolith: { visuals: ['neural', 'orbit'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['anomaly', 'thermal', 'quote', 'mission'] },
  terminal: { visuals: ['neural'], treatments: ['mono'], textures: ['scan', 'grid'], alignments: ['center', 'right'], widgets: ['memory', 'archive', 'anomaly', 'coordinates'] },
  atlas: { visuals: ['orbit', 'neural'], treatments: ['editorial', 'native'], textures: ['clean', 'grid'], alignments: ['center', 'right'], widgets: ['stats', 'archive', 'memory', 'coordinates'] },
  horizon: { visuals: ['orbit'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['orbit', 'solar', 'stats', 'delay'] },
  aperture: { visuals: ['neural', 'orbit'], treatments: ['native', 'mono'], textures: ['clean', 'grid'], alignments: ['center', 'right'], widgets: ['spectrum', 'anomaly', 'progress', 'thermal'] },
  zenith: { visuals: ['neural', 'orbit'], treatments: ['native', 'editorial'], textures: ['grain', 'clean'], alignments: ['center', 'right'], widgets: ['thermal', 'spectrum', 'quote', 'anomaly'] },
  broadcast: { visuals: ['orbit'], treatments: ['outline', 'mono', 'native'], textures: ['scan', 'grain'], alignments: ['center', 'right'], widgets: ['solar', 'delay', 'signal', 'progress'] },
  ledger: { visuals: ['orbit', 'neural'], treatments: ['mono', 'native'], textures: ['grid', 'clean'], alignments: ['center', 'right'], widgets: ['archive', 'memory', 'coordinates', 'stats'] },
  triptych: { visuals: ['neural', 'orbit'], treatments: ['native', 'mono'], textures: ['clean', 'grain'], alignments: ['center', 'right'], widgets: ['spectrum', 'coordinates', 'anomaly', 'thermal'] },
  timeline: { visuals: ['orbit'], treatments: ['native', 'outline'], textures: ['grain', 'scan'], alignments: ['center', 'right'], widgets: ['mission', 'delay', 'progress', 'solar'] },
  specimen: { visuals: ['orbit', 'neural'], treatments: ['editorial', 'native'], textures: ['clean', 'grid'], alignments: ['left', 'center'], widgets: ['archive', 'anomaly', 'quote', 'memory'] },
  constellation: { visuals: ['neural'], treatments: ['native', 'editorial'], textures: ['grid', 'grain'], alignments: ['center'], widgets: ['memory', 'orbit', 'coordinates', 'anomaly'] },
  command: { visuals: ['orbit', 'neural'], treatments: ['mono', 'native'], textures: ['grid', 'scan'], alignments: ['center', 'right'], widgets: ['progress', 'signal', 'thermal', 'memory'] },
  signalstack: { visuals: ['neural', 'orbit'], treatments: ['outline', 'mono'], textures: ['scan', 'grain'], alignments: ['center', 'right'], widgets: ['signal', 'spectrum', 'delay', 'coordinates'] }
};

const generatedPrefixes = ['Aster', 'Silent', 'Far', 'Helio', 'Signal', 'Nova', 'Liminal', 'Outer', 'Vector', 'Echo'];
const generatedSuffixes = ['Memory', 'Relay', 'Atlas', 'Engine', 'Survey', 'Protocol', 'Horizon', 'Field', 'Archive', 'Dawn'];
const scenes = [earth, copper, ringWorld, gravityLens, oceanWorld, solarSail, farObservatory];
const scenePreviews = new Map([
  [earth, earthPreview],
  [copper, copperPreview],
  [ringWorld, ringWorldPreview],
  [gravityLens, gravityLensPreview],
  [oceanWorld, oceanWorldPreview],
  [solarSail, solarSailPreview],
  [farObservatory, farObservatoryPreview]
]);

export const previewSceneFor = (scene: string): string => scenePreviews.get(scene) ?? scene;

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

const principlePacks: ResearchPrinciple[][] = [
  [
    { title: 'Observe', description: 'Turn raw instrument output into evidence without erasing uncertainty.' },
    { title: 'Reason', description: 'Connect observations across time, instruments, and missions.' },
    { title: 'Act', description: 'Make bounded decisions when Earth is too far away to answer in time.' }
  ],
  [
    { title: 'Notice the faint', description: 'Give weak signals enough attention to reveal their structure.' },
    { title: 'Hold the doubt', description: 'Keep uncertainty visible while the evidence is still becoming.' },
    { title: 'Look again', description: 'Let every answer point toward the next useful observation.' }
  ],
  [
    { title: 'Listen', description: 'Separate meaningful quiet from an instrument that has gone silent.' },
    { title: 'Distill', description: 'Send the insight home when the raw data is too large to travel.' },
    { title: 'Return', description: 'Bring each discovery back into the questions that made it possible.' }
  ],
  [
    { title: 'Scan widely', description: 'Keep watch across scales no single observer could hold at once.' },
    { title: 'Trace deeply', description: 'Follow the small anomaly through every instrument that touched it.' },
    { title: 'Choose carefully', description: 'Spend the next observation where it can change the most.' }
  ],
  [
    { title: 'Gather', description: 'Collect evidence without forcing it to agree too early.' },
    { title: 'Test', description: 'Make every promising explanation survive a harder question.' },
    { title: 'Transmit', description: 'Return conclusions with their limits still attached.' }
  ],
  [
    { title: 'Sense', description: 'Extend perception into wavelengths, distances, and durations beyond us.' },
    { title: 'Orient', description: 'Place each signal inside the larger system that shaped it.' },
    { title: 'Explore', description: 'Move toward the unknown without pretending the path is certain.' }
  ],
  [
    { title: 'Detect', description: 'Find the difference that almost disappears inside the noise.' },
    { title: 'Question', description: 'Ask whether the strange result is physics, error, or something new.' },
    { title: 'Revisit', description: 'Return with a sharper instrument and a better reason to look.' }
  ],
  [
    { title: 'Map', description: 'Give every observation a place in an evolving picture of elsewhere.' },
    { title: 'Remember', description: 'Preserve how the map changed, not only what it says now.' },
    { title: 'Extend', description: 'Use what is known to reach one careful step beyond it.' }
  ],
  [
    { title: 'Receive', description: 'Treat every transmission as evidence, not merely information.' },
    { title: 'Resolve', description: 'Compare competing explanations without hiding what remains unclear.' },
    { title: 'Respond', description: 'Turn limited contact time into the next precise instruction.' }
  ],
  [
    { title: 'Watch longer', description: 'Let slow changes emerge from a sky that rarely repeats itself.' },
    { title: 'Compare farther', description: 'Connect distant events through the patterns they share.' },
    { title: 'Decide closer', description: 'Place bounded judgment beside the instrument that needs it.' }
  ],
  [
    { title: 'Find the edge', description: 'Learn where the model stops seeing clearly.' },
    { title: 'Name the limit', description: 'Make uncertainty legible before it becomes a decision.' },
    { title: 'Cross with care', description: 'Advance only when the evidence can support the next step.' }
  ],
  [
    { title: 'Measure', description: 'Turn an immense environment into details that can be tested.' },
    { title: 'Model', description: 'Build explanations that remain open to contradiction.' },
    { title: 'Move', description: 'Let the strongest evidence shape where the mission looks next.' }
  ],
  [
    { title: 'Filter noise', description: 'Reduce the accidental without polishing away the unexpected.' },
    { title: 'Frame context', description: 'Show what came before, what changed, and what may follow.' },
    { title: 'Forward meaning', description: 'Transmit the part a distant team can actually use.' }
  ],
  [
    { title: 'Look outward', description: 'Aim instruments at places where the old map runs out.' },
    { title: 'Think locally', description: 'Reason near the data when a reply from Earth arrives too late.' },
    { title: 'Learn together', description: 'Let every mission add context to the next.' }
  ],
  [
    { title: 'Keep watch', description: 'Continue the science through darkness, delay, and lost contact.' },
    { title: 'Keep context', description: 'Carry the reason for each observation alongside its result.' },
    { title: 'Keep wondering', description: 'Protect the questions that do not yet have clean answers.' }
  ],
  [
    { title: 'Sample', description: 'Take the smallest measurement that can still change the picture.' },
    { title: 'Compare', description: 'Place the new signal beside everything that might explain it.' },
    { title: 'Commit', description: 'Choose the next move without confusing confidence for certainty.' }
  ],
  [
    { title: 'Track change', description: 'Notice what moves, fades, repeats, or refuses to fit.' },
    { title: 'Build memory', description: 'Connect today’s anomaly to years of patient observation.' },
    { title: 'Reveal pattern', description: 'Make structure visible without inventing order.' }
  ],
  [
    { title: 'Slow down', description: 'Give difficult evidence time to remain difficult.' },
    { title: 'Zoom out', description: 'See whether the anomaly survives a wider field of view.' },
    { title: 'Go deeper', description: 'Spend precision where curiosity has earned it.' }
  ],
  [
    { title: 'Read light', description: 'Recover temperature, motion, and chemistry from arriving photons.' },
    { title: 'Read absence', description: 'Treat what is missing as part of the measurement.' },
    { title: 'Read change', description: 'Find the story written between one observation and the next.' }
  ],
  [
    { title: 'Chart', description: 'Turn scattered measurements into a navigable field of evidence.' },
    { title: 'Connect', description: 'Link instruments that see different parts of the same event.' },
    { title: 'Navigate', description: 'Use shared context to decide where attention travels next.' }
  ],
  [
    { title: 'Ask clearly', description: 'Shape each observation around a question that can be tested.' },
    { title: 'Answer lightly', description: 'Prefer an inspectable clue to an impressive certainty.' },
    { title: 'Continue', description: 'Leave the inquiry more useful than you found it.' }
  ],
  [
    { title: 'Catch the moment', description: 'Recognize a transient event before it disappears.' },
    { title: 'Protect the trace', description: 'Preserve the evidence that makes the event worth believing.' },
    { title: 'Point the array', description: 'Bring every available instrument toward the same question.' }
  ],
  [
    { title: 'Stay curious', description: 'Treat an unfamiliar result as an invitation, not a failure.' },
    { title: 'Stay legible', description: 'Keep the path from measurement to decision open for inspection.' },
    { title: 'Stay bounded', description: 'Know what the system can decide and when it must wait.' }
  ],
  [
    { title: 'Cross-check', description: 'Ask another instrument whether the strange thing is still there.' },
    { title: 'Challenge', description: 'Search for the explanation most likely to prove the first one wrong.' },
    { title: 'Converge', description: 'Let independent evidence meet before the mission changes course.' }
  ],
  [
    { title: 'Compress data', description: 'Reduce the payload without losing the reason it matters.' },
    { title: 'Preserve surprise', description: 'Keep room for signals the model was not trained to expect.' },
    { title: 'Send insight', description: 'Use scarce bandwidth for evidence that changes the conversation.' }
  ],
  [
    { title: 'Know the field', description: 'Build context before deciding what counts as unusual.' },
    { title: 'Know the model', description: 'Expose the assumptions shaping every prediction.' },
    { title: 'Know when', description: 'Recognize the moment to act, ask, or simply keep watching.' }
  ],
  [
    { title: 'Make visible', description: 'Reveal patterns too distributed or faint for a hurried eye.' },
    { title: 'Make testable', description: 'Turn a compelling pattern into a claim that can fail.' },
    { title: 'Make useful', description: 'Connect the result to a decision the mission actually faces.' }
  ],
  [
    { title: 'Before contact', description: 'Prepare the system to reason through the long communications gap.' },
    { title: 'During silence', description: 'Continue bounded science while Earth is below the horizon.' },
    { title: 'After signal', description: 'Reconcile local choices with the wider mission story.' }
  ],
  [
    { title: 'One instrument', description: 'See one precise slice of a much larger event.' },
    { title: 'Many viewpoints', description: 'Combine different measurements without flattening their differences.' },
    { title: 'Shared sky', description: 'Build a common picture no mission could make alone.' }
  ],
  [
    { title: 'Spot the strange', description: 'Flag what departs from expectation without calling it discovery.' },
    { title: 'Study the ordinary', description: 'Understand the background well enough to trust the exception.' },
    { title: 'Follow the difference', description: 'Let contrast, not excitement, guide the next observation.' }
  ],
  [
    { title: 'Open the aperture', description: 'Collect enough of the faint source to begin asking why.' },
    { title: 'Narrow the question', description: 'Trade a vague wonder for a measurement that can answer.' },
    { title: 'Widen the horizon', description: 'Use that answer to expose a larger unknown.' }
  ],
  [
    { title: 'Learn the rhythm', description: 'Find cycles hidden across long spans of observation.' },
    { title: 'Catch the break', description: 'Notice the instant a familiar pattern changes.' },
    { title: 'Rewrite the map', description: 'Let new evidence revise the system instead of defending it.' }
  ]
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

const textSeed = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export function researchPrinciplesFor(design: Design): ResearchPrinciple[] {
  const seed = design.copySeed ?? design.seed ?? textSeed(design.id);
  const random = seededRandom(seed ^ 0xc2b2ae35);
  return seededPick(random, principlePacks);
}

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
  const compact = layout === 'origin' || layout === 'console' || layout === 'aperture' || layout === 'ledger' || layout === 'triptych' || layout === 'command';
  const medium = layout === 'split' || layout === 'diagonal' || layout === 'broadcast' || layout === 'timeline' || layout === 'specimen' || layout === 'signalstack';
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
