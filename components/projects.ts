// components/projects.ts
export type Lang = 'ru' | 'en' | 'pt';

type Localized = {
  title: string;
  blurb: string;   // короткое описание (карточка)
  desc?: string;   // развёрнутое на странице (опционально)
};

export type Project = {
  slug: string;           // используется в URL
  cover: string;          // обложка (hero)
  images: string[];       // галерея
  meta: Record<Lang, Localized>;
};

// Порядок в массиве == порядок показа на главной
export const PROJECTS: Project[] = [
  // 1) RESTAURANT
  {
    slug: 'restaurant',
    cover: '/projects/restaurant/cover.jpg',
    images: [
      '/projects/restaurant/1.jpg',
      '/projects/restaurant/2.jpg',
      '/projects/restaurant/3.jpg',
    ],
    meta: {
      ru: {
        title: 'Ресторан',
        blurb:
          'Атмосферная подсветка залов, акценты на текстурах и высокий визуальный комфорт.',
      },
      en: {
        title: 'Restaurant',
        blurb:
          'Atmospheric dining lighting with texture accents and high visual comfort.',
      },
      pt: {
        title: 'Restaurante',
        blurb:
          'Iluminação atmosférica com acentos nas texturas e alto conforto visual.',
      },
    },
  },

  // 2) COSMONAUTICS
  {
    slug: 'cosmonautics',
    cover: '/projects/cosmonautics/cover.jpg',
    images: [
      '/projects/cosmonautics/1.jpg',
      '/projects/cosmonautics/2.jpg',
      '/projects/cosmonautics/3.jpg',
    ],
    meta: {
      ru: {
        title: 'Музей космонавтики',
        blurb:
          'Экспозиции высотой до 15 м, узкая оптика 6° — эффект «лунного света» и читаемые тени.',
      },
      en: {
        title: 'Museum of Cosmonautics',
        blurb:
          'Up to 15 m exhibits, 6° optics — a “moonlight” effect with readable contrast.',
      },
      pt: {
        title: 'Museu da Cosmonáutica',
        blurb:
          'Exposições até 15 m, óptica de 6° — efeito “luz da lua” com contraste legível.',
      },
    },
  },

  // 3) GLOBALONE
  {
    slug: 'globalone',
    cover: '/projects/globalone/cover.jpg',
    images: [
      '/projects/globalone/1.jpg',
      '/projects/globalone/2.jpg',
      '/projects/globalone/3.jpg',
    ],
    meta: {
      ru: {
        title: 'Офис GlobalOne',
        blurb:
          'Функциональная офисная световая среда: равномерность, акценты и комфорт UGR.',
      },
      en: {
        title: 'GlobalOne Office',
        blurb:
          'Functional office lighting: uniformity, accents and comfortable UGR.',
      },
      pt: {
        title: 'Escritório GlobalOne',
        blurb:
          'Iluminação funcional: uniformidade, acentos e conforto UGR.',
      },
    },
  },

  // 4) HOTEL
  {
    slug: 'hotel',
    cover: '/projects/hotel/cover.jpg',
    images: [
      '/projects/hotel/1.jpg',
      '/projects/hotel/2.jpg',
      '/projects/hotel/3.jpg',
    ],
    meta: {
      ru: {
        title: 'Отель',
        blurb:
          'Интимная световая атмосфера для лобби и номеров — баланс теплоты и читаемости.',
      },
      en: {
        title: 'Hotel',
        blurb:
          'Warm, intimate lighting for lobby and rooms with clear visual hierarchy.',
      },
      pt: {
        title: 'Hotel',
        blurb:
          'Ambiente acolhedor no lobby e nos quartos com hierarquia visual clara.',
      },
    },
  },

  // 5) YACHT CLUB
  {
    slug: 'yachtclub',
    cover: '/projects/yachtclub/cover.jpg',
    images: [
      '/projects/yachtclub/1.jpg',
      '/projects/yachtclub/2.jpg',
      '/projects/yachtclub/3.jpg',
    ],
    meta: {
      ru: {
        title: 'Яхт-клуб',
        blurb:
          'Архитектурная подсветка с акцентами на фактуры и береговую линию.',
      },
      en: {
        title: 'Yacht Club',
        blurb:
          'Architectural lighting with material accents and shoreline highlights.',
      },
      pt: {
        title: 'Clube de Iates',
        blurb:
          'Iluminação arquitetônica com acentos de materiais e destaque do litoral.',
      },
    },
  },

  // 6) APARTMENT
  {
    slug: 'apartment',
    cover: '/projects/apartment/cover.jpg',
    images: [
      '/projects/apartment/1.jpg',
      '/projects/apartment/2.jpg',
      '/projects/apartment/3.jpg',
    ],
    meta: {
      ru: {
        title: 'Квартира',
        blurb:
          'Интерьерное освещение: сценарии, акценты, отсутствие бликов и слепящего света.',
      },
      en: {
        title: 'Apartment',
        blurb:
          'Residential lighting: scenes, accents and glare-free comfort.',
      },
      pt: {
        title: 'Apartamento',
        blurb:
          'Iluminação residencial: cenas, acentos e conforto sem ofuscamento.',
      },
    },
  },

  // 7) QUICK SKETCHES
  {
    slug: 'quick-sketches', // удобный slug для URL
    cover: '/projects/quick-sketches/cover.jpg',
    images: [
      '/projects/quick-sketches/1.jpg',
      '/projects/quick-sketches/2.jpg',
      '/projects/quick-sketches/3.jpg',
    ],
    meta: {
      ru: {
        title: 'Быстрые эскизы',
        blurb:
          'Серия быстрых концептов и мокапов — показываем идею до финального проекта.',
      },
      en: {
        title: 'Quick sketches',
        blurb:
          'A series of quick concepts and mockups — conveying the idea before final design.',
      },
      pt: {
        title: 'Esboços rápidos',
        blurb:
          'Série de conceitos rápidos e mockups — ideia antes do projeto final.',
      },
    },
  },
];

export const findProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);
