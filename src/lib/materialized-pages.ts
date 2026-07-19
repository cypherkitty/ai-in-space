import type { Design } from './designs';

export type MaterializedScene = 'origami-probes';

export interface MaterializedPage {
  path: string;
  canonicalUrl: string;
  metaTitle: string;
  metaDescription: string;
  scene: MaterializedScene;
  design: Omit<Design, 'scene'>;
}

export const materializedPages: readonly MaterializedPage[] = [
  {
    path: '/design/outer-atlas/',
    canonicalUrl: 'https://ai-in.space/design/outer-atlas/',
    metaTitle: 'Outer Atlas — AI in Space',
    metaDescription: 'Make autonomy answerable. Independent action remains traceable to its evidence, constraints, and intended scientific goal.',
    scene: 'origami-probes',
    design: {
      id: 'signal-9a3',
      index: 'G27',
      name: 'Outer Atlas',
      note: 'Genesis Line family · orbit core · graphite exposure',
      layout: 'poster',
      visual: 'orbit',
      accent: '#ff573e',
      accent2: '#ffdfb1',
      bg: '#2e2723',
      text: '#fff0dc',
      muted: '#b7957e',
      panel: 'rgba(36, 30, 27, .82)',
      kicker: 'Flight logic / audit ready',
      title: 'Make autonomy',
      titleLine2: 'answerable',
      summary: 'Independent action remains traceable to its evidence, constraints, and intended scientific goal.',
      action: 'Open the inquiry',
      storyTitle: 'The next observation changes the map.',
      widgets: ['delay', 'mission', 'signal'],
      stats: [
        ['046', 'candidate', 'object'],
        ['7σ', 'signal', 'strength'],
        ['12', 'review', 'passes']
      ],
      generated: true,
      seed: 12027,
      copySeed: 12027,
      treatment: 'outline',
      texture: 'grain',
      sceneAlign: 'center',
      composition: 'native',
      headerMode: 'split',
      exposure: 0.14314048889791592,
      exposureBand: 'graphite'
    }
  }
] as const;

export function normalizeMaterializedPath(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function materializedPageForPath(pathname: string): MaterializedPage | undefined {
  const normalized = normalizeMaterializedPath(pathname);
  return materializedPages.find((page) => page.path === normalized);
}

export function materializedPageForDesignId(designId: string): MaterializedPage | undefined {
  return materializedPages.find((page) => page.design.id === designId);
}
