// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import '../../styles/globals.css';
import { dict, Lang } from '../../components/i18n'; // meta берём из словаря; меню — локальные подписи

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  // ✅ dict — объект, читаем по ключу языка
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

// Подписи меню — локальные, чтобы не зависеть от словаря и не ломать билд
const NAV_LABELS: Record<
  Lang,
  { about: string; services: string; projects: string; brands: string; faq: string; contact: string }
> = {
  ru: {
    about: 'О нас',
    services: 'Услуги',
    projects: 'Проекты',
    brands: 'Бренды',
    faq: 'FAQ',
    contact: 'Контакты',
  },
  en: {
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    brands: 'Brands',
    faq: 'FAQ',
    contact: 'Contact',
  },
  pt: {
    about: 'Sobre',
    services: 'Serviços',
    projects: 'Projetos',
    brands: 'Marcas',
    faq: 'FAQ',
    contact: 'Contato',
  },
};

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
      <body className="bg-slate-50 text-slate-900 antialiased">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
            <Link href={`/${params.lang}`} className="font-semibold text-lg">
              Glare Free Light
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-[17px]">
              <a href="#about" className="hover:opacity-80 transition">{l.about}</a>
              <a href="#services" className="hover:opacity-80 transition">{l.services}</a>
              <a href="#projects" className="hover:opacity-80 transition">{l.projects}</a>
              <a href="#brands" className="hover:opacity-80 transition">{l.brands}</a>
              <a href="#faq" className="hover:opacity-80 transition">{l.faq}</a>
              <a href="#contact" className="hover:opacity-80 transition">{l.contact}</a>
            </nav>
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
