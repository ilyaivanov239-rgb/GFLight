// components/projects.ts
import type { Lang } from './i18n';

// Хелпер: /projects/<slug>/1.jpg ... /N.jpg
const seq = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/projects/${slug}/${i + 1}.jpg`);

export type Project = {
  slug: string;                 // используется в URL
  cover: string;                // обложка (hero)
  images: string[];             // галерея
  title: Record<Lang, string>;  // заголовок
  blurb: Record<Lang, string>;  // короткое описание (карточка)
  desc?: Record<Lang, string>;  // развёрнутое описание (опционально)
};

// Порядок в массиве == порядок показа на главной
export const PROJECTS: Project[] = [
  {
    slug: 'restaurant',
    cover: '/projects/restaurant/cover.jpg',
    images: seq('restaurant', 8), // есть 1..8.jpg
    title: { ru: 'Ресторан', en: 'Restaurant', pt: 'Restaurante' },
    blurb: {
      ru: 'Атмосферная подсветка залов, акценты на текстурах и высокий визуальный комфорт.',
      en: 'Atmospheric dining lighting with texture accents and high visual comfort.',
      pt: 'Iluminação atmosférica com acentos nas texturas e alto conforto visual.',
    },
  },
  {
    slug: 'cosmonautics',
    cover: '/projects/cosmonautics/cover.jpg',
    images: seq('cosmonautics', 3),
    title: { ru: 'Музей космонавтики', en: 'Museum of Cosmonautics', pt: 'Museu da Cosmonáutica' },
    blurb: {
      ru: 'Экспозиции высотой до 15 м, узкая оптика 6° — эффект «лунного света» и читаемые тени.',
      en: 'Up to 15 m exhibits, 6° optics — a “moonlight” effect with readable contrast.',
      pt: 'Exposições até 15 m, óptica de 6° — efeito “luz da lua” com contraste legível.',
    },
  },
  {
    slug: 'globalone',
    cover: '/projects/globalone/cover.jpg',
    images: seq('globalone', 3),
    title: { ru: 'Офис GlobalOne', en: 'GlobalOne Office', pt: 'Escritório GlobalOne' },
    blurb: {
      ru: 'Функциональная офисная световая среда: равномерность, акценты и комфорт UGR.',
      en: 'Functional office lighting: uniformity, accents and comfortable UGR.',
      pt: 'Iluminação funcional: uniformidade, acentos e conforto UGR.',
    },
  },
  {
    slug: 'hotel',
    cover: '/projects/hotel/cover.jpg',
    images: seq('hotel', 3),
    title: { ru: 'Отель', en: 'Hotel', pt: 'Hotel' },
    blurb: {
      ru: 'Интимная световая атмосфера для лобби и номеров — баланс теплоты и читаемости.',
      en: 'Warm, intimate lighting for lobby and rooms with clear visual hierarchy.',
      pt: 'Ambiente acolhedor no lobby e nos quartos com hierarquia visual clara.',
    },
  },
  {
    slug: 'yachtclub',
    cover: '/projects/yachtclub/cover.jpg',
    images: seq('yachtclub', 3),
    title: { ru: 'Яхт-клуб', en: 'Yacht Club', pt: 'Clube de Iates' },
    blurb: {
      ru: 'Архитектурная подсветка с акцентами на фактуры и береговую линию.',
      en: 'Architectural lighting with material accents and shoreline highlights.',
      pt: 'Iluminação arquitetônica com acentos de materiais e destaque do litoral.',
    },
  },
  {
    slug: 'apartment',
    cover: '/projects/apartment/cover.jpg',
    images: seq('apartment', 3),
    title: { ru: 'Квартира', en: 'Apartment', pt: 'Apartamento' },
    blurb: {
      ru: 'Интерьерное освещение: сценарии, акценты, отсутствие бликов и слепящего света.',
      en: 'Residential lighting: scenes, accents and glare-free comfort.',
      pt: 'Iluminação residencial: cenas, acentos e conforto sem ofuscamento.',
    },
  },
  {
    slug: 'quick-sketches',
    cover: '/projects/quick-sketches/cover.jpg',
    images: seq('quick-sketches', 3),
    title: { ru: 'Быстрые эскизы', en: 'Quick sketches', pt: 'Esboços rápidos' },
    blurb: {
      ru: 'Серия быстрых концептов и мокапов — показываем идею до финального проекта.',
      en: 'A series of quick concepts and mockups — conveying the idea before final design.',
      pt: 'Série de conceitos rápidos e mockups — ideia antes do projeto final.',
    },
  },
];

export const findProject = (slug: string) => PROJECTS.find(p => p.slug === slug);
