import origamiProbes from './assets/origami-probes.jpg';
import type { Design } from './designs';
import { materializedPageForPath, type MaterializedPage, type MaterializedScene } from './materialized-pages';

const scenes: Record<MaterializedScene, string> = {
  'origami-probes': origamiProbes
};

export function designForMaterializedPage(page: MaterializedPage): Design {
  return { ...page.design, scene: scenes[page.scene] };
}

export function materializedDesignForPath(pathname: string): Design | undefined {
  const page = materializedPageForPath(pathname);
  return page ? designForMaterializedPage(page) : undefined;
}
