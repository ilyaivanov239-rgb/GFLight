// components/projects.ts
export type Lang = 'ru' | 'en' | 'pt';

type Localized = {
  title: string;
  blurb: string;   // короткое описание (то, что было на карточке)
  desc?: string;   // развёрнутое (опционально)
};

export type Project = {
  slug: string;               // используется в URL
  cover: string;              // обложка для hero
  images: string[];           // галерея
  meta: Record<Lang, Localized>;
};

export const PROJECTS: Project[] = [
  {
    slug: 'ermitage',
    cover: '/projects/ermitage/cover.jpg',
    images: [
      '/projects/ermitage/1.jpg',
      '/projects/ermitage/2.jpg',
      '/projects/ermitage/3.jpg',
    ],
    meta: {
      ru: {
        title: 'Государственный Эрмитаж',
        blurb:
          'Равномерное вертикальное освещение и акценты в витринах для читаемых объёмов.',
      },
      en: {
        title: 'State Hermitage Museum',
        blurb:
          'Even vertical lighting with showcase accents for clearly readable volumes.',
      },
      pt: {
        title: 'Museu do Hermitage',
        blurb:
          'Iluminação vertical uniforme e acentos nas vitrines para volumes legíveis.',
      },
    },
  },
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
          'Экспозиции 15 м, оптика 6° — эффект «лунного света» с контрастными тенями.',
      },
      en: {
        title: 'Museum of Cosmonautics',
        blurb:
          '15 m exhibits, 6° optics — a “moonlight” effect with high-contrast shadows.',
      },
      pt: {
        title: 'Museu da Cosmonáutica',
        blurb:
          'Exposições de 15 m, óptica de 6° — efeito de “luz da lua” com sombras contrastantes.',
      },
    },
  },
  {
    slug: 'railway-museum',
    cover: '/projects/railway/cover.jpg',
    images: [
      '/projects/railway/1.jpg',
      '/projects/railway/2.jpg',
      '/projects/railway/3.jpg',
    ],
    meta: {
      ru: {
        title: 'Музей железных дорог России',
        blurb:
          'Трековые прожекторы, узкая оптика и высокий визуальный комфорт.',
      },
      en: {
        title: 'Russian Railway Museum',
        blurb:
          'Track spots, narrow optics and high visual comfort.',
      },
      pt: {
        title: 'Museu Ferroviário Russo',
        blurb:
          'Projetores de trilho, óptica estreita e alto conforto visual.',
      },
    },
  },
];

// удобный хелпер
export const findProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);
