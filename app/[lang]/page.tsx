'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { dict, type Lang } from '../../components/i18n';
import { PROJECTS } from '../../components/projects';

type ModalState =
  | null
  | {
      projectIndex: number;
      imageIndex: number;
    };
type Brand = { name: string; src: string; href?: string; invert?: boolean; scale?: number };

export default function Page() {
  const { lang } = useParams() as { lang: Lang };
  const t = dict[lang] ?? dict.en;

  // CTA
  const CTA = {
    ru: { services: 'Услуги', contact: 'Связаться' },
    en: { services: 'Our Services', contact: 'Contact Us' },
    pt: { services: 'Serviços', contact: 'Contactar' },
  } as const;

  const ctaServices =
    (t as any)?.hero?.button1 || (t as any)?.hero?.cta1 || CTA[lang].services;
  const ctaContact =
    (t as any)?.hero?.button2 || (t as any)?.hero?.cta2 || CTA[lang].contact;

  // Метки "Было / Стало"
  const BEFORE_AFTER = {
    ru: { before: 'Было', after: 'Стало' },
    en: { before: 'Before', after: 'After' },
    pt: { before: 'Antes', after: 'Depois' },
  } as const;

  // ---------- Modal ----------
  const [modal, setModal] = useState<ModalState>(null);
  const openProjectAt = (projectIndex: number, imageIndex = 0) =>
    setModal({ projectIndex, imageIndex });
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
    const t = e.touches[0];
    setTouchX(t.clientX);
    setTouchY(t.clientY);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX == null || touchY == null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchX;
    const dy = t.clientY - touchY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? nextImage() : prevImage();
    }
    setTouchX(null);
    setTouchY(null);
  };

  // Поддержка "Было/Стало" — флаг из данных или распознавание по slug/title
  const activeProject = modal ? PROJECTS[modal.projectIndex] : null;

  const isBeforeAfterProject = (p: any) => {
    if (!p) return false;
    if (p.beforeAfter === true) return true;
    const slug = (p.slug || '').toLowerCase();
    const titles = [
      p.title?.ru ?? '',
      p.title?.en ?? '',
      p.title?.pt ?? '',
    ].map((s: string) => s.toLowerCase());

    // Лояльные эвристики: quick/sketch/эскиз/esboço и т.п.
    const slugHit = ['quick', 'sketch', 'sketches', 'beforeafter', 'before-after'].some((k) =>
      slug.includes(k)
    );
    const titleHit = titles.some((s) =>
      /быстры|эскиз|quick|sketch|esbo|rápid/.test(s)
    );
    return slugHit || titleHit;
  };

  const showBeforeAfter = !!activeProject && isBeforeAfterProject(activeProject);
  const baDict = BEFORE_AFTER[lang] ?? BEFORE_AFTER.en;
  const baLabel =
    modal && showBeforeAfter
      ? modal.imageIndex % 2 === 0
        ? baDict.before // 1-я, 3-я, 5-я...
        : baDict.after  // 2-я, 4-я, 6-я...
      : '';

  // Бренды (заглушки)
  const BRANDS: Brand[] = [
   { name: 'ERCO', src: '/images/brands/erco.svg', href: 'https://www.erco.com/en/', scale: 1.3  },
  { name: 'XAL',  src: '/images/brands/xal-white.webp', href: 'https://www.xal.com/en', invert: true, scale: 1.0  },
  { name: 'BEGA', src: '/images/brands/bega.svg', href: 'https://www.bega.com/en/', scale: 1.3  },
    { name: 'Luce&Light', src: '/images/brands/Luceandlight.svg', href: 'https://www.lucelight.it/en/', scale: 1.2  },
    { name: 'FLOS', src: '/images/brands/flos.svg', href: 'https://flos.com/en/it/', scale: 1.2 },
  { name: 'Artemide', src: '/images/brands/artemide.svg', href: 'https://www.artemide.com/en/', scale: 1.15 },
  { name: 'Brand 7', src: '/images/brands/placeholder.svg' },
  { name: 'Brand 8', src: '/images/brands/placeholder.svg' },
  { name: 'Brand 9', src: '/images/brands/placeholder.svg' },
  { name: 'Brand 10', src: '/images/brands/placeholder.svg' },
  { name: 'Brand 11', src: '/images/brands/placeholder.svg' },
  { name: 'Brand 12', src: '/images/brands/placeholder.svg' },
  ];

  const FAQ_ITEMS: { q: string; a: string }[] =
    (t as any)?.faq?.items ?? [
      { q: 'В чём отличие ваших проектов?', a: 'Грамотная оптика, контроль бликов — комфорт без ослепления.' },
      { q: 'Берёте на себя поставку?', a: 'Да. Подбор, поставка, сопровождение монтажа.' },
      { q: 'Работаете только в Португалии?', a: 'База — Кашкайш; работаем по всей Португалии и удалённо — по запросу.' },
    ];

  // ----------------- Render -----------------
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
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t?.services?.title ?? 'Services'}
          </h2>

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

                {typeof item !== 'string' &&
                  Array.isArray(item.features) &&
                  item.features.length > 0 && (
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

      {/* PROJECTS — мобилка: свайп; md+: сетка 4×2 */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {t?.projects?.title ?? 'Примеры проектов'}
        </h2>

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
                  <h3 className="font-semibold text-center text-[17px] leading-snug line-clamp-2">
                    {p.title[lang]}
                  </h3>
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
                  <h3 className="font-semibold text-center text-[17px] leading-snug line-clamp-2">
                    {p.title[lang]}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">
          {(t as any)?.brands?.title ?? 'Бренды'}
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
        className={`object-contain w-auto h-14 sm:h-16 md:h-20 lg:h-24 max-w-[88%] opacity-80 group-hover:opacity-100 transition ${b.invert ? 'invert' : ''}`}
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
        <h2 className="text-3xl font-bold mb-8">{(t as any)?.faq?.title ?? 'FAQ'}</h2>
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
      <section id="about-section" className="scroll-mt-24 py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">
          {(t as any)?.about?.title ?? 'О нас'}
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <p className="text-gray-700 text-lg leading-relaxed">
            {(t as any)?.about?.text ??
              'Проектируем свет, который подчёркивает архитектуру и не слепит. Работаем с архитекторами и дизайнерами.'}
          </p>
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <img src="/images/about/office.jpg" alt="About" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{t?.contact?.title ?? 'Contact Us'}</h2>
        <p className="mb-6 text-gray-600">{t?.contact?.desc ?? 'Leave a request and we will contact you soon.'}</p>
        <Link
          href="mailto:hello@glarefreelight.com"
          className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition"
        >
          Email
        </Link>
      </section>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/+351910000000?text=${encodeURIComponent(
          'Olá! Quero falar sobre iluminação para um projeto.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white"
      >
        WhatsApp
      </a>

      {/* MODAL */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full bg-black rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-20 rounded-full bg-white/90 hover:bg-white p-2"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="px-4 pt-3 pb-4 text-sm bg-black/70 text-white/90">
              <p className="whitespace-pre-line leading-relaxed">
                {PROJECTS[modal.projectIndex].desc?.[lang] ??
                  PROJECTS[modal.projectIndex].blurb[lang]}
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

            {/* Метка "Было/Стало" */}
            {showBeforeAfter && (
              <div className="py-3 text-center text-white/90 text-sm font-medium select-none">
                {baLabel}
              </div>
            )}

            <div className="py-2 text-center text-white/70 text-xs">
              {modal.imageIndex + 1}/{PROJECTS[modal.projectIndex].images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

