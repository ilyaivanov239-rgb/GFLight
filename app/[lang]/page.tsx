'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { dict, type Lang } from '../../components/i18n'
import { PROJECTS } from '../../components/projects'

export default function Page() {
  const { lang } = useParams() as { lang: Lang }
  const t = dict[lang] ?? dict.en

  // ---- CTA подписи (фолбэки) -----------------------------------------------
  const CTA = {
    ru: { services: 'Услуги', contact: 'Связаться' },
    en: { services: 'Our Services', contact: 'Contact Us' },
    pt: { services: 'Serviços', contact: 'Contactar' },
  } as const

  const ctaServices =
    (t as any)?.hero?.button1 ||
    (t as any)?.hero?.cta1 ||
    CTA[lang].services

  const ctaContact =
    (t as any)?.hero?.button2 ||
    (t as any)?.hero?.cta2 ||
    CTA[lang].contact

  // ---- Лайтбокс состояние ---------------------------------------------------
  const [lbOpen, setLbOpen] = useState(false)
  const [lbSlug, setLbSlug] = useState<string | null>(null)
  const [lbIndex, setLbIndex] = useState(0)

  const activeProject = lbSlug
    ? PROJECTS.find((p) => p.slug === lbSlug)
    : null

  function openLightbox(slug: string, startIndex = 0) {
    setLbSlug(slug)
    setLbIndex(startIndex)
    setLbOpen(true)
  }
  function closeLightbox() {
    setLbOpen(false)
    setLbSlug(null)
  }
  function next() {
    if (!activeProject) return
    setLbIndex((i) => (i + 1) % activeProject.images.length)
  }
  function prev() {
    if (!activeProject) return
    setLbIndex((i) => (i - 1 + activeProject.images.length) % activeProject.images.length)
  }

  // Блокируем скролл фона и вешаем клавиатуру
  useEffect(() => {
    if (!lbOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lbOpen, activeProject?.images.length])

  // ---- Свайпы на мобильной версии ------------------------------------------
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const swiping = useRef(false)
  const lastSwipeAt = useRef(0)

  const onTouchStart = (e: React.TouchEvent) => {
    if (!lbOpen) return
    const t = e.touches[0]
    touchStartX.current = t.clientX
    touchStartY.current = t.clientY
    swiping.current = true
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!lbOpen || !swiping.current) return
    // Можно добавить визуальный shift изображения — не обязательно
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!lbOpen || !swiping.current) return
    const now = Date.now()
    if (now - lastSwipeAt.current < 250) return // антидребезг

    const t = e.changedTouches[0]
    const startX = touchStartX.current ?? t.clientX
    const startY = touchStartY.current ?? t.clientY
    const dx = t.clientX - startX
    const dy = t.clientY - startY

    swiping.current = false
    touchStartX.current = null
    touchStartY.current = null

    // горизонтальный жест (порог ~40px и угол не слишком крутой)
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next()
      else prev()
      lastSwipeAt.current = now
    }
  }

  // ---- Бренды (как было) ----------------------------------------------------
  const BRANDS: { name: string; src: string }[] = [
    { name: 'Brand 1', src: '/images/brands/brand1.png' },
    { name: 'Brand 2', src: '/images/brands/brand2.png' },
    { name: 'Brand 3', src: '/images/brands/brand3.png' },
    { name: 'Brand 4', src: '/images/brands/brand4.png' },
    { name: 'Brand 5', src: '/images/brands/brand5.png' },
    { name: 'Brand 6', src: '/images/brands/brand6.png' },
  ]

  // ---- FAQ (фолбэки) --------------------------------------------------------
  const FAQ_ITEMS: { q: string; a: string }[] =
    (t as any)?.faq?.items ??
    [
      {
        q: 'В чём отличие ваших проектов?',
        a: 'Грамотная оптика, контроль бликов — комфорт без ослепления.',
      },
      {
        q: 'Берёте на себя поставку?',
        a: 'Да. Подбор, поставка, сопровождение монтажа.',
      },
      {
        q: 'Работаете только в Португалии?',
        a: 'База — Кашкайш; работаем по всей Португалии и удалённо — по запросу.',
      },
    ]

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
            <a
              href={`#services`}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-white text-white rounded-xl hover:bg-white hover:text-black transition text-center"
            >
              {ctaServices}
            </a>
            <a
              href={`#contact`}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-white text-white rounded-xl hover:bg-white hover:text-black transition text-center"
            >
              {ctaContact}
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {/* мягкий вертикальный градиент */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white" />
          {/* лёгкий «шум» вместо точек, чтобы не рябило */}
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 0 0.45'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundRepeat: 'repeat',
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        <div className="relative z-10 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t?.services?.title ?? 'Services'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t?.services?.items ?? []).map((item: any, i: number) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm ring-1 ring-slate-200/70 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-center text-xl font-semibold mb-3">
                  {typeof item === 'string' ? item : item.title}
                </h3>

                {typeof item !== 'string' && item.desc && (
                  <p className="text-slate-700 text-[15px] md:text-base leading-6 md:leading-7 tracking-[-0.005em] bg-slate-50 border border-slate-200/60 rounded-xl p-4 mb-4">
                    {item.desc}
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

      {/* PROJECTS — карточки открывают лайтбокс */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">
          {t?.projects?.title ?? 'Примеры проектов'}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {PROJECTS.slice(0, 3).map((p) => {
            const m = p.meta[lang] ?? p.meta.en
            return (
              <button
                key={p.slug}
                onClick={() => openLightbox(p.slug, 0)}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition block overflow-hidden text-left"
              >
                <div className="h-40 bg-gray-100">
                  <img
                    src={p.cover}
                    alt={m.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="font-medium">{m.title}</div>
                  {m.blurb && (
                    <p className="text-gray-600 mt-2 text-sm">{m.blurb}</p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">
          {(t as any)?.brands?.title ?? 'Бренды'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {BRANDS.map((b) => (
            <div
              key={b.name}
              className="aspect-[3/2] relative rounded-2xl bg-white border border-gray-200 flex items-center justify-center p-4"
            >
              <img
                src={b.src}
                alt={b.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
        {(t as any)?.brands?.note && (
          <p className="text-sm text-gray-600 mt-4">{(t as any).brands.note}</p>
        )}
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">
          {(t as any)?.faq?.title ?? 'FAQ'}
        </h2>
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
            <img
              src="/images/about/office.jpg"
              alt="About"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          {t?.contact?.title ?? 'Contact Us'}
        </h2>
        <p className="mb-6 text-gray-600">
          {t?.contact?.desc ?? 'Leave a request and we will contact you soon.'}
        </p>
        <Link
          href="mailto:hello@glarefreelight.com"
          className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition"
        >
          Email
        </Link>
      </section>

      {/* Плавающий WhatsApp */}
      <a
        href={`https://wa.me/+351910000000?text=${encodeURIComponent('Olá! Quero falar sobre iluminação para um projeto.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white"
      >
        WhatsApp
      </a>

      {/* LIGHTBOX OVERLAY */}
      {lbOpen && activeProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            // закрываем только при клике по подложке
            if (e.target === e.currentTarget) closeLightbox()
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="absolute inset-0 flex flex-col">
            {/* top bar */}
            <div className="flex items-center justify-between p-3 md:p-4 text-white">
              <div className="text-sm opacity-80">
                {activeProject.meta[lang]?.title ?? activeProject.meta.en.title}
              </div>
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="p-2 rounded hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* image area */}
            <div className="flex-1 relative select-none">
              <img
                src={activeProject.images[lbIndex]}
                alt={`${activeProject.meta[lang]?.title ?? activeProject.meta.en.title} ${lbIndex + 1}`}
                className="absolute inset-0 m-auto max-h-full max-w-full object-contain"
                draggable={false}
              />

              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white bg-black/40 rounded-full hover:bg-black/60"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white bg-black/40 rounded-full hover:bg-black/60"
                aria-label="Next"
              >
                ›
              </button>

              <div className="absolute bottom-3 left-0 right-0 text-center text-white text-xs opacity-80">
                {lbIndex + 1} / {activeProject.images.length}
              </div>
            </div>

            {/* thumbs (скрываем на узких экранах) */}
            <div className="p-2 overflow-x-auto gap-2 hidden md:flex justify-center">
              {activeProject.images.map((src, idx) => (
                <button
                  key={src}
                  onClick={(e) => { e.stopPropagation(); setLbIndex(idx) }}
                  className={`h-16 w-24 flex-shrink-0 rounded overflow-hidden border ${idx === lbIndex ? 'border-white' : 'border-white/30'}`}
                >
                  <img src={src} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
