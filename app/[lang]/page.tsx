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
    imgStyle: { objectPosition: '62% 50%' }, // чуть смещаем вправо
    name: { ru: 'Ильяс Чожобеков', en: 'Ilyas Chozhobekov', pt: 'Ilyas Chozhobekov' },
    role: { ru: 'Визуализатор-виртуоз', en: 'Visualization Lead', pt: 'Líder de visualização' },
    bio: {
      ru: [
        'Опыт работы более 10-ти лет. Высшее образование: СПбГАСУ–архитектурное проектирование.',
        'Благодаря Ильясу наши заказчики могут увидеть наши идеи и планы в виде фотореалистичных 
рендеров. '
        'В совершенстве владеет всем инструментарием для этого (3dMAX, Photoshop, Revit, Autocad, 
After Effects). Может делать как статичные рендеры, так и реалистичные 3D-видеоролики с 
облетом объекта и различными сценариями освещения.
',
      ],
      en: [
        'With over 10 years of experience, he holds a degree in architectural design from SPbGASU.',
        'Thanks to Ilyas, our clients can visualize our ideas and plans through photorealistic renders.',
        'He excels in using all the necessary tools for this (3ds Max, Photoshop, Revit, AutoCAD, After Effects). 
He is skilled in creating both static renders and realistic 3D videos, including flyovers of the objects and 
various lighting scenarios.'
      ],
      pt: [
        'Com mais de 10 anos de experiência, possui uma licenciatura em design arquitetónico pela SPbGASU.',
        'Graças a Ilyas, os nossos clientes podem visualizar as nossas ideias e planos através de renders fotorrealistas.'
        'Ele destaca-se na utilização de todas as ferramentas necessárias para isso (3ds Max, Photoshop, Revit, AutoCAD, After Effects). É competente na criação tanto de renders estáticos como de vídeos 3D realistas, incluindo flyovers (sobrevoos) dos objetos e diversos cenários de iluminação.',
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
  <h2 className="text-3xl font-bold mb-8">{t?.contact?.title ?? 'Contact Us'}</h2>
  <p className="mb-6 text-gray-600">
    {t?.contact?.desc ?? 'Leave a request and we will contact you soon.'}
  </p>

  {/* Кнопка письма */}
  <a
    href={`mailto:studio@gflight.pt?subject=${
      encodeURIComponent((t?.meta?.title ?? 'GFLight') + ' — Enquiry')
    }&body=${
      encodeURIComponent(
        lang === 'ru'
          ? 'Здравствуйте! Хочу обсудить проект освещения.'
          : lang === 'pt'
          ? 'Olá! Quero falar sobre iluminação para um projeto.'
          : 'Hello! I\'d like to discuss a lighting project.'
      )
    }`}
    className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition"
  >
    Email
  </a>
</section>


      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/+351910000000?text=${encodeURIComponent('Olá! Quero falar sobre iluminação para um projeto.')}`}
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
