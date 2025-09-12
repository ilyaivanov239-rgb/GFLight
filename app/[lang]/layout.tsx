// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import '../../styles/globals.css';
import { dict, type Lang } from '../../components/i18n'; // meta берём из словаря; меню — локальные подписи

import { Manrope } from 'next/font/google';
const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['300','400','600','700','800'] });

export default function RootLayout({ children, params }: { children: React.ReactNode; params:{lang:'ru'|'en'|'pt'} }) {
  // ...
  return (
    <html lang={params.lang}>
      <body className={`${manrope.className} bg-slate-50 text-slate-900 antialiased scroll-smooth`}>
        {/* ... */}
      </body>
    </html>
  );
}


export async function generateMetadata({
  params,
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const t = (dict as Record<Lang, any>)[params.lang];

  return {
    title: t?.meta?.title ?? 'Glare Free Light',
    description: t?.meta?.description ?? 'Technical lighting without glare',
    openGraph: {
      title: t?.meta?.title ?? 'Glare Free Light',
      description: t?.meta?.description ?? 'Technical lighting without glare',
      type: 'website',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t?.meta?.title ?? 'Glare Free Light',
      description: t?.meta?.description ?? 'Technical lighting without glare',
      images: ['/og-image.jpg'],
    },
    icons: { icon: '/favicon.ico' },
  };
}

// Подписи меню — локальные
const NAV_LABELS: Record<
  Lang,
  { about: string; services: string; projects: string; brands: string; faq: string; contact: string }
> = {
  ru: { about: 'О нас', services: 'Услуги', projects: 'Проекты', brands: 'Бренды', faq: 'FAQ', contact: 'Контакты' },
  en: { about: 'About', services: 'Services', projects: 'Projects', brands: 'Brands', faq: 'FAQ', contact: 'Contact' },
  pt: { about: 'Sobre', services: 'Serviços', projects: 'Projetos', brands: 'Marcas', faq: 'FAQ', contact: 'Contato' },
};

// Языки для переключателя
const LANGS: Lang[] = ['ru', 'en', 'pt'];

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const l = NAV_LABELS[params.lang];

  return (
    <html lang={params.lang}>
      <body className="bg-slate-50 text-slate-900 antialiased scroll-smooth">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
            <Link href={`/${params.lang}`} className="select-none" aria-label="GFLight — home">
  <span className="block text-2xl md:text-3xl leading-none tracking-tight">
    <span className="font-extrabold">GF</span><span className="font-semibold">Light</span>
  </span>
</Link>


            <nav className="hidden md:flex items-center gap-8 text-[17px]">
  <a href="#services" className="hover:opacity-80 transition">{l.services}</a>
  <a href="#projects" className="hover:opacity-80 transition">{l.projects}</a>
  <a href="#brands"   className="hover:opacity-80 transition">{l.brands}</a>
  <a href="#faq"      className="hover:opacity-80 transition">{l.faq}</a>
  <a href="#about"    className="hover:opacity-80 transition">{l.about}</a>   {/* ← перенесли сюда */}
  <a href="#contact"  className="hover:opacity-80 transition">{l.contact}</a>
</nav>

            {/* Language switcher */}
            <div className="flex items-center gap-2">
              {LANGS.map((lng) => (
                <Link
                  key={lng}
                  href={`/${lng}`}
                  prefetch={false}
                  className={`px-2 py-1 rounded-md text-xs border transition ${
                    lng === params.lang
                      ? 'bg-slate-100 border-slate-300'
                      : 'border-transparent hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {lng.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-slate-200 mt-24">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
            © {new Date().getFullYear()} Glare Free Light. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
