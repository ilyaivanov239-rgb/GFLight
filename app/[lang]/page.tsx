'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getDictionary } from '../../components/i18n'

export default function Page() {
  const { lang } = useParams() as { lang: 'en' | 'ru' | 'pt' }
  const dict = getDictionary(lang)

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
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
            {dict.hero?.title || 'Glare Free Light'}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            {dict.hero?.subtitle || 'Lighting solutions for interiors, facades and landscapes'}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={`/${lang}/#services`}
              className="px-6 py-3 bg-white text-black rounded-xl shadow hover:bg-gray-200 transition"
            >
              {dict.hero?.button1 || 'Our Services'}
            </Link>
            <Link
              href={`/${lang}/#contact`}
              className="px-6 py-3 bg-transparent border border-white text-white rounded-xl hover:bg-white hover:text-black transition"
            >
              {dict.hero?.button2 || 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">{dict.services?.title || 'Services'}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {(dict.services?.items || []).map((item: any, i: number) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
            >
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

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">{dict.projects?.title || 'Projects'}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {(dict.projects?.items || []).map((item: any, i: number) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition"
            >
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

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{dict.contact?.title || 'Contact Us'}</h2>
        <p className="mb-6 text-gray-600">
          {dict.contact?.desc || 'Leave a request and we will contact you soon.'}
        </p>
        <Link
          href="https://wa.me/971501596400"
          target="_blank"
          className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
        >
          WhatsApp
        </Link>
      </section>
    </main>
  )
}
