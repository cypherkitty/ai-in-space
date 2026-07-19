import englishSlogans from '../src/lib/content/slogans.en.json';
import russianManifests from '../src/lib/content/manifests.ru.json';
import type { CopyPack } from '../src/lib/slogans.ts';

const requiredCounts = { en: 224, ru: 148 } as const;
const requiredFields: (keyof CopyPack)[] = ['kicker', 'title', 'titleLine2', 'summary', 'action'];
const aiVocabulary = /(ИИ|модел|алгоритм|систем|машин|автомат|интеллект|нейросет)/iu;

const auditLibrary = (locale: string, packs: CopyPack[]): void => {
  const requiredCount = requiredCounts[locale as keyof typeof requiredCounts];
  if (packs.length !== requiredCount) throw new Error(`${locale}: expected ${requiredCount} manifests, found ${packs.length}`);

  const headlines = new Set<string>();
  packs.forEach((pack, index) => {
    for (const field of requiredFields) {
      if (!pack[field]?.trim()) throw new Error(`${locale}[${index}]: missing ${field}`);
    }

    const headline = `${pack.title} ${pack.titleLine2}`.toLocaleLowerCase(locale).replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
    if (headlines.has(headline)) throw new Error(`${locale}[${index}]: duplicate headline “${pack.title} ${pack.titleLine2}”`);
    headlines.add(headline);

    if (pack.title.length > 28) throw new Error(`${locale}[${index}]: first title line is too long (${pack.title.length})`);
    if (pack.titleLine2.length > 34) throw new Error(`${locale}[${index}]: second title line is too long (${pack.titleLine2.length})`);
    if (locale === 'ru' && index >= 48 && !aiVocabulary.test(Object.values(pack).join(' '))) {
      throw new Error(`ru[${index}]: new manifesto is not explicitly about AI`);
    }
  });

  console.log(`${locale}: ${packs.length} complete, unique manifests`);
};

auditLibrary('en', englishSlogans);
auditLibrary('ru', russianManifests);
