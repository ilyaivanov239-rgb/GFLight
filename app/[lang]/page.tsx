'use client';

import { useEffect, useState, useCallback, type CSSProperties } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { dict, type Lang } from '../../components/i18n';
import { PROJECTS } from '../../components/projects';

/* ---------------- Types ---------------- */

type ModalState =
  | null
  | {
      projectIndex: number;
      imageIndex: number;
    };

type Brand = {
  name: string;
  src: string;
  href?: string;
  invert?: boolean;
  scale?: number;
};

type Person = {
  id: string;
  photo: string;
  name: { ru: string; en: string; pt: string };
  role: { ru: string; en: string; pt: string };
  bio: { ru: string[]; en: string[]; pt: string[] };
  // индивидуальное кадрирование фото
  imgClass?: string; // напр. 'object-top'
  imgStyle?: CSSProperties; // напр. { objectPosition: '60% 50%' }
};

/* -------------- ABOUT data + helpers -------------- */

const PEOPLE: Person[] = [
  {
    id: 'ivanov',
    photo: '/images/team/Ilya.jpg',
    imgClass: 'object-top',
    name: { ru: 'Илья Иванов', en: 'Ilia Ivanov', pt: 'Ilia Ivanov' },
    role: { ru: 'Менеджер проектов', en: 'Project Manager', pt: 'Gestor de projetos' },
    bio: {
      ru: [
        'Более 15-ти лет в световом проектировании и продажах. Высшее строительное образование и опыт строительства частных домов позволяют глубоко вникать во все детали проекта.',
        'С 2008 по 2021 год представлял компанию XAL. Регулярно принимал участие в выставках Light+Building во Франкфурте и Euroluce в Милане.',
        'Ключевая компетенция — «переводить» между языком клиентов/дизайнеров и языком инженеров/строителей.',
      ],
      en: [
        '15+ years in lighting design and sales. Civil engineering background and private housing construction experience help to dive deep into all project details.',
        'From 2008 to 2021 he represented XAL. Regular participant of Light+Building (Frankfurt) and Euroluce (Milan).',
        'Core skill — to “translate” between the language of clients/designers and the language of engineers/builders.',
      ],
      pt: [
        'Mais de 15 anos em projeto de iluminação e vendas. Formação em engenharia civil e experiência em construção residencial permitem aprofundar todos os detalhes do projeto.',
        'De 2008 a 2021 representou a XAL. Participante regular da Light+Building (Frankfurt) e Euroluce (Milão).',
        'Competência central — “traduzir” entre a linguagem de clientes/designers e a dos engenheiros/empreiteiros.',
      ],
    },
  },
  {
    id: 'berezin',
    photo: '/images/team/Mikhail.jpg',
    name: { ru: 'Михаил Берзин', en: 'Mikhail Berzin', pt: 'Mikhail Berzin' },
    role: { ru: 'Основной генератор идей', en: 'Chief Idea Generator', pt: 'Gerador principal de ideias' },
    bio: {
      ru: [
        'Более 20-ти лет в светодизайне и проектировании. Сочетание инженерно-электротехнического и психологического образований позволяет создавать технически выверенные и эмоционально наполненные проекты.',
        'Последние 11 лет — представитель ERCO Lighting GmbH. Регулярно участвует в выставках Light+Building во Франкфурте.',
        'С 2007 года читает курс лекций по светодизайну для архитекторов и дизайнеров в Москве и Санкт-Петербурге.',
      ],
      en: [
        '20+ years in lighting design and engineering. With both engineering and psychology background, Mikhail creates technically precise yet emotionally rich projects.',
        'For the last 11 years — representative of ERCO Lighting GmbH. Regularly participates in Light+Building (Frankfurt).',
        'Since 2007 he has been giving lectures on lighting design for architects and interior designers in Moscow and St. Petersburg.',
      ],
      pt: [
        'Mais de 20 anos em design de iluminação e engenharia. A combinação de formação técnica e psicológica permite criar projetos precisos e emocionalmente ricos.',
        'Nos últimos 11 anos — representante da ERCO Lighting GmbH. Participante regular da Light+Building (Frankfurt).',
        'Desde 2007 ministra cursos de light design para arquitetos e designers em Moscou e São Petersburgo.',
      ],
    },
  },
  {
  id: 'chochobekov',
  photo: '/images/team/Ilyas.jpg',
  imgStyle: { objectPosition: '62% 50%' }, // слегка смещаем фокус вправо
  name: { ru: 'Ильяс Чожобеков', en: 'Ilyas Chozhobekov', pt: 'Ilyas Chozhobekov' },
  role: { ru: 'Визуализатор-виртуоз', en: 'Visualization Lead', pt: 'Líder de visualização' },
  bio: {
    ru: [
      'Опыт работы более 10-ти лет. Высшее образование: СПбГАСУ — архитектурное проектирование.',
      'Благодаря Ильясу наши заказчики могут увидеть наши идеи и планы в виде фотореалистичных рендеров.',
      'В совершенстве владеет всем инструментарием для этого (3ds Max, Photoshop, Revit, AutoCAD, After Effects). Может делать как статичные рендеры, так и реалистичные 3D-видеоролики с облётом объекта и различными сценариями освещения.',
    ],
    en: [
      'With over 10 years of experience, he holds a degree in architectural design from SPbGASU.',
      'Thanks to Ilyas, our clients can visualize our ideas and plans through photorealistic renders.',
      'He excels in all the necessary tools for this (3ds Max, Photoshop, Revit, AutoCAD, After Effects). He is skilled in creating both static renders and realistic 3D videos, including flyovers of the objects and various lighting scenarios.',
    ],
    pt: [
      'Com mais de 10 anos de experiência, possui uma licenciatura em design arquitetónico pela SPbGASU.',
      'Graças ao Ilyas, os nossos clientes podem visualizar as nossas ideias e planos através de renders fotorrealistas.',
      'Ele destaca-se no uso de ferramentas necessárias para isso (3ds Max, Photoshop, Revit, AutoCAD, After Effects). É competente na criação tanto de renders estáticos como de vídeos 3D realistas, incluindo sobrevoos dos objetos e diversos cenários de iluminação.',
    ],
  },
},
];

const getName = (p: Person, lang: Lang) => p.name[lang] ?? p.name.ru;
const getRole = (p: Person, lang: Lang) => p.role[lang] ?? p.role.ru;
const getBio = (p: Person, lang: Lang) => p.bio[lang] ?? p.bio.ru;

/* ---------------- Page ---------------- */

export default function Page() {
  const { lang } = useParams() as { lang: Lang };
  const t = dict[lang] ?? dict.en;

  // CTA
  const CTA = {
    ru: { services: 'Услуги', contact: 'Связаться' },
    en: { services: 'Our Services', contact: 'Contact Us' },
    pt: { services: 'Serviços', contact: 'Contactar' },
  } as const;

  const ctaServices = (t as any)?.hero?.button1 || (t as any)?.hero?.cta1 || CTA[lang].services;
  const ctaContact = (t as any)?.hero?.button2 || (t as any)?.hero?.cta2 || CTA[lang].contact;

  // Метки "Было / Стало"
  const BEFORE_AFTER = {
    ru: { before: 'Было', after: 'Стало' },
    en: { before: 'Before', after: 'After' },
    pt: { before: 'Antes', after: 'Depois' },
  } as const;

  // ---------- Modal ----------
  const [modal, setModal] = useState<ModalState>(null);
  const openProjectAt = (projectIndex: number, imageIndex = 0) => setModal({ projectIndex, imageIndex });
  const closeModal = useCallback(() => setModal(null), []);

  const nextImage = () => {
    if (!modal) return;
    const proj = PROJECTS[modal.projectIndex];
    const n = (modal.imageIndex + 1) % proj.images.length;
    setModal({ projectIndex: modal.projectIndex, imageIndex: n });
  };

  const prevImage = () => {
    if (!modal) return;
    const proj = PROJECTS[modal.projectIndex];
    const n = (modal.imageIndex - 1 + proj.images.length) % proj.images.length;
    setModal({ projectIndex: modal.projectIndex, imageIndex: n });
  };

  // keyboard
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, closeModal]);

  // touch swipe
  const [touchX, setTouchX] = useState<number | null>(null);
  const [touchY, setTouchY] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t0 = e.touches[0];
    setTouchX(t0.clientX);
    setTouchY(t0.clientY);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX == null || touchY == null) return;
    const t1 = e.changedTouches[0];
    const dx = t1.clientX - touchX;
    const dy = t1.clientY - touchY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? nextImage() : prevImage();
    }
    setTouchX(null);
    setTouchY(null);
  };

  // Поддержка "Было/Стало"
  const activeProject = modal ? PROJECTS[modal.projectIndex] : null;

  const isBeforeAfterProject = (p: any) => {
    if (!p) return false;
    if (p.beforeAfter === true) return true;
    const slug = (p.slug || '').toLowerCase();
    const titles = [p.title?.ru ?? '', p.title?.en ?? '', p.title?.pt ?? ''].map((s: string) => s.toLowerCase());
    const slugHit = ['quick', 'sketch', 'sketches', 'beforeafter', 'before-after'].some((k) => slug.includes(k));
    const titleHit = titles.some((s) => /быстры|эскиз|quick|sketch|esbo|rápid/.test(s));
    return slugHit || titleHit;
  };

  const showBeforeAfter = !!activeProject && isBeforeAfterProject(activeProject);
  const baDict = BEFORE_AFTER[lang] ?? BEFORE_AFTER.en;
  const baLabel =
    modal && showBeforeAfter ? (modal.imageIndex % 2 === 0 ? baDict.before : baDict.after) : '';

  // Бренды
  const BRANDS: Brand[] = [
    { name: 'ERCO', src: '/images/brands/erco.svg', href: 'https://www.erco.com/en/', scale: 1.3 },
    { name: 'XAL', src: '/images/brands/xal-white.webp', href: 'https://www.xal.com/en', invert: true, scale: 0.9 },
    { name: 'BEGA', src: '/images/brands/bega.svg', href: 'https://www.bega.com/en/', scale: 1.3 },
    { name: 'Luce&Light', src: '/images/brands/Luceandlight.svg', href: 'https://www.lucelight.it/en/', scale: 1.2 },
    { name: 'FLOS', src: '/images/brands/flos.svg', href: 'https://flos.com/en/it/', scale: 1.2 },
    { name: 'Artemide', src: '/images/brands/artemide.svg', href: 'https://www.artemide.com/en/', scale: 1.3 },
    { name: 'DGA', src: '/images/brands/dga.svg', href: 'https://www.dga.it/en', scale: 1.05 },
    { name: 'iGuzzini', src: '/images/brands/iguzzini.svg', href: 'https://www.iguzzini.com/', scale: 1.3 },
    { name: 'Targetti', src: '/images/brands/targetti.svg', href: 'https://www.targetti.com/en', invert: true, scale: 1.25 },
    { name: 'Bel-lighting', src: '/images/brands/bellighting.png', href: 'https://bel-lighting.com/', scale: 1.3 },
    { name: 'Hunza', src: '/images/brands/Hunza.png', href: 'https://hunzalighting.com/', scale: 1.25 },
    { name: 'Vibia', src: '/images/brands/vibia.svg', href: 'https://vibia.com/en/int', scale: 1.15 },
  ];
  // ---------- Contact form state ----------
const [formName, setFormName] = useState('');
const [formEmail, setFormEmail] = useState('');
const [formMsg, setFormMsg] = useState('');

const CONTACT_EMAIL = 'studio@gflight.pt';
const CONTACT_PHONE = '+351910075868';

const submitContact = (e: React.FormEvent) => {
  e.preventDefault();

  // подготавливаем письмо
  const subject = encodeURIComponent('GFLight — Enquiry');
  const bodyLines = [
    `Name: ${formName}`,
    `Email: ${formEmail}`,
    '',
    'Message:',
    formMsg,
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));

  // открываем почтовый клиент / веб-почту
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
};

// --- Contact constants ---
const CONTACT_EMAIL = 'studio@gflight.pt';
const CONTACT_PHONE_E164 = '351910075868'; // без '+' для wa.me
const CONTACT_PHONE_DISPLAY = '+351 910 075 868';
const WA_TEXT = encodeURIComponent('Olá! Quero falar sobre iluminação para um projeto.');

const SOCIAL = [
  {
    name: 'WhatsApp',
    href: `https://wa.me/${CONTACT_PHONE_E164}?text=${WA_TEXT}`,
    bg: 'bg-emerald-500 hover:bg-emerald-600',
    // иконка WhatsApp (SVG)
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.77 11.77 0 0 0 12.01 0C5.39 0 .03 5.36.03 11.98c0 2.01.52 3.98 1.5 5.73L0 24l6.47-1.48A11.9 11.9 0 0 0 12 23.96c6.62 0 11.98-5.36 11.98-11.98 0-3.2-1.25-6.2-3.46-8.5zM12 21.3c-1.75 0-3.47-.46-4.99-1.33l-.36-.21-3.84.88.82-3.74-.24-.38A9.3 9.3 0 0 1 2.7 12 9.3 9.3 0 0 1 12 2.7 9.3 9.3 0 0 1 21.3 12 9.3 9.3 0 0 1 12 21.3zm5.1-6.79c-.28-.14-1.65-.81-1.9-.9-.25-.09-.44-.14-.63.14-.19.28-.73.9-.9 1.08-.17.19-.33.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.62-1.55-1.9-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.48-.63-.49h-.54c-.19 0-.49.07-.75.35-.26.28-1 1.02-1 2.48 0 1.46 1.03 2.87 1.17 3.06.14.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z"/>
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/GFLightPortugal',
    bg: 'bg-sky-500 hover:bg-sky-600',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M23.95 3.5a1.38 1.38 0 0 0-1.58-.27L1.6 13.12c-.67.32-.67 1.3.01 1.6l5.65 2.44 2.2 4.66c.31.66 1.26.77 1.74.21l3.1-3.58 5.68 2.45c.66.29 1.42-.13 1.54-.84l2.34-14.6c.08-.5-.18-1-.61-1.26zM8.36 16.1l-.05 2.87 1.27-1.45 7.8-9.03-9.02 7.61z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/glarefreelight/',
    bg: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:brightness-110',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 2.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zM18.4 6.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/>
      </svg>
    ),
  },
];

  const FAQ_ITEMS: { q: string; a: string }[] = Array.isArray((t as any)?.faq?.items)
    ? (t as any).faq.items.slice(0, 5)
    : [];

  /* ---------------- Render ---------------- */
  return (
    <main>
      {/* HERO */}
      <section
        className="relative min-h-[480px] h-[70vh] md:h-[600px] flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/images/bg/Hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 md:bg-gradient-to-r md:from-black/35 md:via-black/10 md:to-transparent bg-black/15" />
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] mb-4">
            {t?.hero?.title ?? 'GFLight'}
          </h1>
          <p className="text-white/90 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
            {t?.hero?.subtitle ??
              'We design lighting for interiors, facades and landscapes — combining optics, aesthetics and visual comfort.'}
          </p>
          <div className="mt-2 flex flex-col sm:flex-row justify-center gap-3 w-full max-w-md mx-auto">
            <Link
              href={`/${lang}/#services`}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-white text-white rounded-xl hover:bg-white hover:text-black transition text-center"
            >
              {ctaServices}
            </Link>
            <Link
              href={`/${lang}/#contact`}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-white text-white rounded-xl hover:bg-white hover:text-black transition text-center"
            >
              {ctaContact}
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAI0lEQVQoU2NkYGD4z0AEYBxVhGEwCkYGwzEwGQYqGKwAAKp8B/3cY0wEAAAAASUVORK5CYII=")',
              backgroundRepeat: 'repeat',
              backgroundSize: '10px 10px',
            }}
          />
        </div>

        <div className="relative z-10 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t?.services?.title ?? 'Services'}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {(t?.services?.items ?? []).map((item: any, i: number) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm ring-1 ring-slate-200/70 rounded-2xl p-6 shadow-sm hover:shadow-md transition h-full flex flex-col"
              >
                <h3 className="text-center text-xl font-semibold leading-tight line-clamp-2 min-h-[3.5rem] mb-3">
                  {typeof item === 'string' ? item : item.title}
                </h3>

                {typeof item !== 'string' && (
                  <p
                    className="text-slate-700 text-[15px] md:text-base leading-6 md:leading-7 tracking-[-0.005em] bg-slate-50 border border-slate-200/60 rounded-xl p-4 mb-4
                               flex-none min-h-[176px] max-h-[176px] md:min-h-[200px] md:max-h-[200px]
                               overflow-hidden line-clamp-6 md:line-clamp-6"
                  >
                    {item.desc ?? ''}
                  </p>
                )}

                {typeof item !== 'string' && Array.isArray(item.features) && item.features.length > 0 && (
                  <ul className="space-y-2 text-sm text-gray-600">
                    {item.features.map((f: string, idx: number) => (
                      <li key={idx} className="pl-4 relative">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">{t?.projects?.title ?? 'Примеры проектов'}</h2>

        {/* mobile swipe */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4">
          {PROJECTS.map((p, idx) => (
            <button
              key={p.slug}
              onClick={() => openProjectAt(idx, 0)}
              className="snap-start shrink-0 w-[85vw] bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden text-left"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <img src={p.cover} alt={p.title[lang]} className="absolute inset-0 block w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="min-h-[48px] flex items-center justify-center">
                  <h3 className="font-semibold text-center text-[17px] leading-snug line-clamp-2">{p.title[lang]}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-8 text-left">
          {PROJECTS.map((p, idx) => (
            <button
              key={p.slug}
              onClick={() => openProjectAt(idx, 0)}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden text-left"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <img src={p.cover} alt={p.title[lang]} className="absolute inset-0 block w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="min-h-[48px] flex items-center justify-center">
                  <h3 className="font-semibold text-center text-[17px] leading-snug line-clamp-2">{p.title[lang]}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {(t as any)?.brands?.title ?? (lang === 'pt' ? 'Marcas' : lang === 'ru' ? 'Бренды' : 'Brands')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5 sm:gap-6">
          {BRANDS.map((b) => (
            <div
              key={b.name}
              className="relative aspect-[3/2] rounded-2xl bg-white border border-gray-200 grid place-items-center p-4 md:p-5 group"
              title={b.name}
            >
              <img
                src={b.src}
                alt={b.name}
                loading="lazy"
                decoding="async"
                className={`object-contain w-auto h-14 sm:h-16 md:h-20 lg:h-24 max-w-[88%] opacity-80 group-hover:opacity-100 transition ${
                  b.invert ? 'invert' : ''
                }`}
                style={b.scale ? { transform: `scale(${b.scale})` } : undefined}
              />

              {b.href && (
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={`Открыть сайт ${b.name}`}
                  className="absolute bottom-2 right-2 z-10 text-xs px-2 py-1 rounded-md bg-white/90 text-gray-700 shadow-sm
                     opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                >
                  ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{(t as any)?.faq?.title ?? 'FAQ'}</h2>

        <div className="space-y-3">
          {FAQ_ITEMS.map((it, i) => (
            <details key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer font-medium">{it.q}</summary>
              <p className="text-gray-700 mt-2">{it.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24 py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-10 items-start">
          {/* ЛЕВО */}
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4">{lang === 'en' ? 'About' : lang === 'pt' ? 'Sobre' : 'О нас'}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {lang === 'en' &&
                'For over 15 years we have been designing and delivering luxury-class lighting projects for interiors and palace-scale façades.'}
              {lang === 'pt' &&
                'Há mais de 15 anos projetamos e realizamos projetos de iluminação de classe premium para interiores e fachadas de escala palaciana.'}
              {lang === 'ru' &&
                'Более 15 лет мы проектируем и реализуем световые проекты класса люкс как в интерьерах, так и на фасадах масштаба дворцовых ансамблей.'}
            </p>
          </div>

          {/* ПРАВО */}
          <div className="space-y-8">
            {PEOPLE.map((p) => (
              <article
  key={p.id}
  className="grid md:grid-cols-[400px,1fr] gap-6 bg-white text-zinc-900 rounded-2xl p-5 md:p-6 shadow"
>
  {/* Фото: одинаковое окно и одинаковый кроп для всех */}
  <figure className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl">
  <img
    src={p.photo}
    alt={`${getName(p, lang)}, ${getRole(p, lang)}`}
    /* важное: абсолютное позиционирование + небольшой «bleed», чтобы не было полос */
    className={`absolute inset-0 block h-[101%] w-[101%] -left-[0.5%] -top-[0.5%] object-cover ${p.imgClass ?? ''}`}
    style={p.imgStyle}
    loading="lazy"
    decoding="async"
  />
</figure>

  {/* Текст */}
  <div>
    <h3 className="text-2xl font-semibold mb-1">{getName(p, lang)}</h3>
    <div className="text-sm text-gray-500 mb-5">{getRole(p, lang)}</div>

    {getBio(p, lang).map((paragraph, i) => (
      <p key={i} className="mb-3 leading-relaxed">
        {paragraph}
      </p>
    ))}
  </div>
</article>


            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
<section id="contact" className="py-20 px-6 max-w-3xl mx-auto text-center">
  <h2 className="text-3xl font-bold mb-6">
    {t?.contact?.title ?? 'Напишите нам'}
  </h2>
  <p className="mb-10 text-gray-600">
    {t?.contact?.desc ?? 'Leave a request and we will contact you soon.'}
  </p>

  {/* Почта и телефон */}
  <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="text-sm text-gray-500 mb-1">Эл. почта</div>
      <div className="flex items-center justify-between gap-3">
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-lg hover:underline">
          {CONTACT_EMAIL}
        </a>
        <button
          onClick={() => navigator.clipboard?.writeText(CONTACT_EMAIL)}
          className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
          aria-label="Скопировать email"
        >
          Copy
        </button>
      </div>
    </div>

    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="text-sm text-gray-500 mb-1">Телефон / WhatsApp</div>
      <div className="flex items-center justify-between gap-3">
        <a href={`tel:+${CONTACT_PHONE_E164}`} className="font-medium text-lg hover:underline">
          {CONTACT_PHONE_DISPLAY}
        </a>
        <a
          href={`https://wa.me/${CONTACT_PHONE_E164}?text=${WA_TEXT}`}
          target="_blank" rel="noopener noreferrer"
          className="text-xs px-2 py-1 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
          aria-label="Написать в WhatsApp"
        >
          WhatsApp
        </a>
      </div>
    </div>
  </div>

  {/* Соц-кнопки */}
  <div className="flex items-center justify-center gap-3">
    {SOCIAL.map(s => (
      <a
        key={s.name}
        href={s.href}
        target="_blank" rel="noopener noreferrer nofollow"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-white shadow ${s.bg} transition hover:scale-[1.02]`}
        aria-label={s.name}
      >
        {s.icon}
        <span className="font-medium">{s.name}</span>
      </a>
    ))}
  </div>
</section>




      {/* WhatsApp FAB */}
      <a
  href="https://wa.me/351910075868?text=Olá! Quero falar sobre iluminação para um projeto."
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-5 md:bottom-8 md:right-8 inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white"
>
  WhatsApp
</a>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <div
            className="relative max-w-5xl w-full bg-black rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button onClick={closeModal} className="absolute top-3 right-3 z-20 rounded-full bg-white/90 hover:bg-white p-2" aria-label="Close">
              ✕
            </button>

            <div className="px-4 pt-3 pb-4 text-sm bg-black/70 text-white/90">
              <p className="whitespace-pre-line leading-relaxed">
                {PROJECTS[modal.projectIndex].desc?.[lang] ?? PROJECTS[modal.projectIndex].blurb[lang]}
              </p>
            </div>

            <div className="relative flex-1 min-h-[60vh] flex items-center justify-center">
              <img
                src={PROJECTS[modal.projectIndex].images[modal.imageIndex]}
                alt={PROJECTS[modal.projectIndex].title[lang]}
                className="max-h-[70vh] w-auto object-contain"
              />

              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white p-2 shadow"
                aria-label="Prev"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white p-2 shadow"
                aria-label="Next"
              >
                ›
              </button>
            </div>

            {showBeforeAfter && <div className="py-3 text-center text-white/90 text-sm font-medium select-none">{baLabel}</div>}

            <div className="py-2 text-center text-white/70 text-xs">
              {modal.imageIndex + 1}/{PROJECTS[modal.projectIndex].images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
