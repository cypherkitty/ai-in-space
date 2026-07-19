import type { Design, ResearchPrinciple } from './designs';
import type { CopyPack } from './slogans';
import russianManifests from './content/manifests.ru.json';

export type Locale = 'en' | 'ru';

const messages = {
  en: {
    mission: 'Mission', technology: 'Technology', research: 'Research', missionOpen: 'Mission channel open', join: 'Join the Mission',
    alternate: 'Alternate signal', newInterface: 'New interface', all: 'All', remix: 'Remix', newMessage: 'New message', explore: 'Explore the Research',
    scroll: 'Scroll to transmit', working: 'Working beyond Earth', storyFallback: 'The next observation changes the map.',
    storyA: 'Not replacing people. Extending what a small team can observe, compare, and decide when the answer is millions of kilometres away.',
    storyB: 'AI in Space develops legible, resilient systems for autonomous science, mission planning, and the discovery of patterns too faint for a hurried eye.',
    footer: 'INTELLIGENCE FOR ELSEWHERE', close: 'Close signup form', channel: 'Mission channel / open', received: 'Transmission received',
    manifest: 'You’re on the manifest.', nextSignal: 'The next meaningful signal will find its way to', returnMission: 'Return to the mission',
    signupCopy: 'Receive occasional transmissions from AI in Space. No noise—only meaningful updates.', email: 'Your email', submit: 'Join',
    signupMeta: 'Project updates · Research notes · Launch announcements', randomLaunch: 'Random launch', crazyMix: 'Crazy mix', atlas: 'Design atlas',
    transmissions: 'transmissions', atlasTitleA: 'One system.', atlasTitleB: 'Millions of skies.', coherent: 'Coherent by design',
    atlasCopy: 'Art-direction families and visual worlds constrain the generator. Intelligence changes form—from instrument to ecosystem—without losing the shared visual language.',
    curated: 'Curated', generated: 'Generated', generativeMix: 'Generative mix', generatorMeta: 'Layout × scene × palette × widgets', generate: 'Generate',
    galleryFooterA: 'Choose what survives.', galleryFooterB: 'Everything else stays possible.', telemetry: 'Mission telemetry', language: 'Русский',
    share: 'Share', copied: 'Copied', shareFailed: 'Copy URL'
  },
  ru: {
    mission: 'Миссия', technology: 'Технологии', research: 'Исследования', missionOpen: 'Канал миссии открыт', join: 'Стать частью миссии',
    alternate: 'Альтернативный сигнал', newInterface: 'Новый интерфейс', all: 'Все', remix: 'Ремикс', newMessage: 'Новое сообщение', explore: 'Изучить исследования',
    scroll: 'Прокрутите для передачи', working: 'Работаем за пределами Земли', storyFallback: 'Следующее наблюдение меняет карту.',
    storyA: 'Не заменяем людей. Расширяем возможности небольшой команды наблюдать, сравнивать и принимать решения за миллионы километров от Земли.',
    storyB: 'AI in Space создаёт понятные и устойчивые системы для автономной науки, планирования миссий и поиска закономерностей, слишком слабых для торопливого взгляда.',
    footer: 'ИНТЕЛЛЕКТ ДЛЯ ДАЛЬНИХ МИРОВ', close: 'Закрыть форму', channel: 'Канал миссии / открыт', received: 'Передача принята',
    manifest: 'Вы в составе миссии.', nextSignal: 'Следующий важный сигнал найдёт вас по адресу', returnMission: 'Вернуться к миссии',
    signupCopy: 'Получайте редкие передачи от AI in Space. Без шума — только значимые обновления.', email: 'Ваш email', submit: 'Вступить',
    signupMeta: 'Новости проекта · Исследования · Анонсы запусков', randomLaunch: 'Случайный запуск', crazyMix: 'Смелый ремикс', atlas: 'Атлас дизайнов',
    transmissions: 'передач', atlasTitleA: 'Одна система.', atlasTitleB: 'Миллионы небес.', coherent: 'Цельность по замыслу',
    atlasCopy: 'Семейства арт-дирекшена и визуальные миры задают границы генератору. Интеллект меняет форму — от прибора до экосистемы — сохраняя общий визуальный язык.',
    curated: 'Отобранные', generated: 'Созданные', generativeMix: 'Генеративный микс', generatorMeta: 'Макет × сцена × палитра × виджеты', generate: 'Создать',
    galleryFooterA: 'Выберите то, что останется.', galleryFooterB: 'Всё остальное всё ещё возможно.', telemetry: 'Телеметрия миссии', language: 'English',
    share: 'Ссылка', copied: 'Скопировано', shareFailed: 'Копировать URL'
  }
} as const;

export type MessageKey = keyof typeof messages.en;
export const t = (locale: Locale, key: MessageKey): string => messages[locale][key];

const ruCopyPacks: CopyPack[] = russianManifests;

const hash = (value: string): number => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
};

export const localizeDesign = (design: Design, locale: Locale): Design => {
  if (locale === 'en') return design;
  const key = `${design.id}:${design.copySeed ?? design.seed ?? design.index}`;
  const copy = ruCopyPacks[hash(key) % ruCopyPacks.length]!;
  return {
    ...design,
    kicker: copy.kicker,
    title: copy.title,
    titleLine2: copy.titleLine2,
    summary: copy.summary,
    action: copy.action,
    storyTitle: copy.titleLine2,
    stats: design.stats.map(([value, label]) => [value, label === 'missions' ? 'миссий' : label === 'space data' ? 'космических данных' : 'моделей', label === 'supported' ? 'поддержано' : label === 'processed' ? 'обработано' : 'развёрнуто']) as [string, string, string][]
  };
};

const ruPrinciples: ResearchPrinciple[][] = [
  [
    { title: 'Наблюдать', description: 'Превращать необработанные данные приборов в свидетельства, не стирая неопределённость.' },
    { title: 'Связывать', description: 'Соединять наблюдения во времени, между инструментами и миссиями.' },
    { title: 'Действовать', description: 'Принимать ограниченные решения, когда Земля слишком далеко для мгновенного ответа.' }
  ],
  [
    { title: 'Слушать', description: 'Сохранять слабый сигнал достаточно долго, чтобы отличить структуру от случайности.' },
    { title: 'Проверять', description: 'Держать альтернативные объяснения открытыми до следующего независимого наблюдения.' },
    { title: 'Помнить', description: 'Передавать вместе с результатом его происхождение, границы и контекст.' }
  ],
  [
    { title: 'Замечать', description: 'Находить события, которые слишком редки, коротки или слабы для торопливого взгляда.' },
    { title: 'Объяснять', description: 'Делать путь от измерения до вывода видимым для исследовательской команды.' },
    { title: 'Продолжать', description: 'Поддерживать научную работу между сеансами связи и сменами поколений миссии.' }
  ]
];

export const localizedPrinciples = (design: Design, locale: Locale, fallback: ResearchPrinciple[]): ResearchPrinciple[] =>
  locale === 'en' ? fallback : ruPrinciples[hash(`${design.id}:principles`) % ruPrinciples.length]!;

export const telemetryText = (locale: Locale, value: string): string => {
  if (locale === 'en') return value;
  const map: Record<string, string> = {
    'Signal analysis': 'Анализ сигнала', 'Pulsar timing': 'Тайминг пульсара', 'Optical downlink': 'Оптический канал', 'Magnetic survey': 'Магнитный обзор', 'Neutrino watch': 'Нейтринный мониторинг',
    'Current field': 'Текущее поле', 'Lagrange fix': 'Точка Лагранжа', 'Lunar baseline': 'Лунная база', 'Transit chord': 'Хорда транзита', 'Deep field': 'Глубокое поле',
    'Model traversal': 'Обход модели', 'Survey mosaic': 'Мозаика обзора', 'Spectral reduction': 'Обработка спектра', 'Orbit solution': 'Решение орбиты', 'Archive recovery': 'Восстановление архива',
    'Solar weather': 'Солнечная погода', 'Radiation watch': 'Радиационный контроль', 'Sail pressure': 'Давление на парус', 'Auroral forecast': 'Прогноз сияния',
    'Onboard memory': 'Бортовая память', 'Observation cache': 'Кэш наблюдений', 'Model archive': 'Архив моделей', 'Event buffer': 'Буфер событий',
    'Thermal envelope': 'Тепловой диапазон', 'Cryogenic stage': 'Криогенная ступень', 'Ocean surface': 'Поверхность океана', 'Sail membrane': 'Мембрана паруса',
    'Field archive': 'Полевой архив', 'Decision ledger': 'Журнал решений', 'Night log': 'Ночной журнал', 'Discovery chain': 'Цепочка открытия',
    'FIELD PRINCIPLE': 'ПРИНЦИП ПОЛЯ', 'Next mission': 'Следующая миссия', 'LAUNCH WINDOW': 'ОКНО ЗАПУСКА',
    'Spectral fingerprint': 'Спектральный отпечаток', 'Light delay': 'Задержка света', 'Anomaly review': 'Проверка аномалии',
    'OPEN': 'ОТКРЫТО', 'MODEL AGREEMENT': 'СОГЛАСИЕ МОДЕЛИ', 'REVIEW': 'ПРОВЕРИТЬ', 'Orbital phase': 'Орбитальная фаза',
    'PERIOD': 'ПЕРИОД', 'USED': 'ЗАНЯТО', 'CAPACITY': 'ЁМКОСТЬ', 'LOW': 'МИН', 'HIGH': 'МАКС',
    'TRACE PRESERVED': 'СЛЕД СОХРАНЁН', 'EVENTS': 'СОБЫТИЯ', 'MIN': 'МИН'
  };
  return map[value] ?? value;
};
