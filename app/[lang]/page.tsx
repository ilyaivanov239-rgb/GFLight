'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { dict, type Lang } from '../../components/i18n'

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

  return (
    <main>
      {/* HERO */}
      <section
        className="relative h-[600px] flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/images/bg/Hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
            {t?.hero?.title ?? 'Glare Free Light'}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            {t?.hero?.subtitle ?? 'Lighting solutions for interiors, facades and landscapes'}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={`/${lang}/#services`}
              className="px-6 py-3 bg-white text-black rounded-xl shadow hover:bg-gray-200 transition"
            >
              {t?.hero?.button1 ?? 'Our Services'}
            </Link>
            <Link
              href={`/${lang}/#contact`}
              className="px-6 py-3 bg-transparent border border-white text-white rounded-xl hover:bg-white hover:text-black transition"
            >
              {t?.hero?.button2 ?? 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>

     

      {/* SERVICES — твой блок, без изменений */}
      <section id="services" className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">{t?.services?.title ?? 'Services'}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {(t?.services?.items ?? []).map((item: any, i: number) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">
                {typeof item === 'string' ? item : item.title}
              </h3>
              {typeof item !== 'string' && item.desc && (
                <p className="text-gray-600">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS — твой блок, без изменений */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">{t?.projects?.title ?? 'Projects'}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {(t?.projects?.items ?? []).map((item: any, i: number) => (
            <div key={i} className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">
                  {typeof item === 'string' ? item : item.title}
                </span>
              </div>
              {typeof item !== 'string' && item.desc && (
                <div className="p-4 text-gray-600">{item.desc}</div>
              )}
            </div>
          ))}
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
