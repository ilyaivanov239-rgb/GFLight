'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { dict, type Lang } from '../../components/i18n'
import { PROJECTS } from '../../components/projects'

export default function Page() {
  const { lang } = useParams() as { lang: Lang }
  const t = dict[lang] ?? dict.en

  // Логотипы брендов — просто замени пути на свои
  const BRANDS: { name: string; src: string }[] = [
    { name: 'Brand 1', src: '/images/brands/brand1.png' },
    { name: 'Brand 2', src: '/images/brands/brand2.png' },
    { name: 'Brand 3', src: '/images/brands/brand3.png' },
    { name: 'Brand 4', src: '/images/brands/brand4.png' },
    { name: 'Brand 5', src: '/images/brands/brand5.png' },
    { name: 'Brand 6', src: '/images/brands/brand6.png' },
  ]

  // FAQ — берём из словаря, если есть; иначе дефолты
  const FAQ_ITEMS: { q: string; a: string }[] =
    (t as any)?.faq?.items ??
    [
      { q: 'В чём отличие ваших проектов?', a: 'Грамотная оптика, контроль бликов — комфорт без ослепления.' },
      { q: 'Берёте на себя поставку?', a: 'Да. Подбор, поставка, сопровождение монтажа.' },
      { q: 'Работаете только в Португалии?', a: 'База — Кашкайш; работаем по всей Португалии и удалённо — по запросу.' },
    ]
// Тексты CTA по умолчанию (если в dict нет hero.button1 / hero.button2)
const CTA = {
  ru: { services: 'Услуги', contact: 'Связаться' },
  en: { services: 'Our Services', contact: 'Contact Us' },
  pt: { services: 'Serviços', contact: 'Contactar' }, // PT-PT
} as const;

const ctaServices =
  (t as any)?.hero?.button1 ||
  (t as any)?.hero?.cta1 ||
  CTA[lang].services;

const ctaContact =
  (t as any)?.hero?.button2 ||
  (t as any)?.hero?.cta2 ||
  CTA[lang].contact;
  const heroBtn =
  "w-full sm:w-auto px-6 py-3 rounded-xl border border-white text-white bg-transparent hover:bg-white hover:text-black transition text-center";

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
  {/* градиент для лучшей читаемости текста */}
  <div className="absolute inset-0 md:bg-gradient-to-r md:from-black/35 md:via-black/10 md:to-transparent bg-black/15" />

  <div className="relative z-10 max-w-3xl px-6">
    <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] mb-4">
      {t?.hero?.title ?? 'GFLight'}
    </h1>

    <p className="text-white/90 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
      {t?.hero?.subtitle ??
        'We design lighting for interiors, facades and landscapes — combining optics, aesthetics and visual comfort.'}
    </p>

    {/* кнопки: на мобиле — в столбик */}
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
  {/* фон секции */}
  <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
    {/* вертикальный мягкий градиент */}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white" />
    {/* точечная сетка */}
   <div
  className="absolute inset-0 opacity-[0.08]"
  style={{
    backgroundImage:
      "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAI0lEQVQoU2NkYGD4z0AEYBxVhGEwCkYGwzEwGQYqGKwAAKp8B/3cY0wEAAAAASUVORK5CYII=\")",
    backgroundRepeat: "repeat",
    backgroundSize: "10px 10px"
  }}
/>

  </div>

  {/* контент */}
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



     {/* PROJECTS */}
<section id="projects" className="py-20 px-6 max-w-6xl mx-auto text-center">
  <h2 className="text-3xl font-bold mb-12">
    {t?.projects?.title ?? (lang === 'ru' ? 'Избранные проекты' : 'Selected projects')}
  </h2>

  <div className="grid md:grid-cols-3 gap-8 text-left">
    {PROJECTS.slice(0, 3).map((p) => {
      const m = p.meta[lang] ?? p.meta.en; // локализованный заголовок и тизер

      return (
        <Link
          key={p.slug}
          href={`/${lang}/projects/${p.slug}`}
          className="group bg-white rounded-2xl shadow hover:shadow-lg transition block overflow-hidden"
        >
          <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
            <img
              src={p.cover}                 // или `/projects/${p.slug}/cover.jpg`
              alt={m.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>

          <div className="p-4">
            <div className="font-medium">{m.title}</div>
            {m.blurb && (
              <p className="text-gray-600 mt-2 text-sm">{m.blurb}</p>
            )}
          </div>
        </Link>
      );
    })}
  </div>
</section>


      {/* BRANDS — новый блок */}
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
              <img src={b.src} alt={b.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
        {(t as any)?.brands?.note && (
          <p className="text-sm text-gray-600 mt-4">{(t as any).brands.note}</p>
        )}
      </section>

      {/* FAQ — новый блок */}
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
{/* ABOUT — теперь ниже FAQ */}
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

      {/* CONTACT — твой блок, без изменений */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{t?.contact?.title ?? 'Contact Us'}</h2>
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

      {/* Плавающая кнопка WhatsApp — новый элемент */}
      <a
        href={`https://wa.me/+351910000000?text=${encodeURIComponent('Olá! Quero falar sobre iluminação para um projeto.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white"
      >
        WhatsApp
      </a>
    </main>
  )
}
