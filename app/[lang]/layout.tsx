import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { dict, Lang } from '@/components/i18n';

export const metadata: Metadata = {
  title: 'Glare Free Light',
  description: 'Technical lighting without glare',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Glare Free Light',
    description: 'Technical lighting without glare',
    images: ['/og-image.jpg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const t = dict[params.lang];

  // Fallback на случай, если в JSON ещё нет новых ключей
  const nav = {
    about: t?.nav?.about ?? (params.lang === 'ru' ? 'О нас' : params.lang === 'pt' ? 'Sobre' : 'About'),
    services: t?.nav?.services ?? (params.lang === 'ru' ? 'Услуги' : params.lang === 'pt' ? 'Serviços' : 'Services'),
    projects: t?.nav?.projects ?? (params.lang === 'ru' ? 'Проекты' : params.lang === 'pt' ? 'Projetos' : 'Projects'),
    brands: t?.nav?.brands ?? (params.lang === 'ru' ? 'Бренды' : params.lang === 'pt' ? 'Marcas' : 'Brands'),
    faq: t?.nav?.faq ?? 'FAQ',
    contact: t?.nav?.contact ?? (params.lang === 'ru' ? 'Контакты' : params.lang === 'pt' ? 'Contatos' : 'Contact'),
  };

  return (
    <html lang={params.lang}>
      <body className="bg-slate-50 text-slate-900 antialiased">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="container mx-auto max-w-6xl px-4">
            <nav className="flex h-16 items-center justify-between">
              {/* Лого/название — сделаем крупнее */}
              <Link href={`/${params.lang}`} className="font-semibold tracking-tight text-slate-900 text-xl md:text-2xl">
                Glare Free Light
              </Link>

              <ul className="flex items-center gap-6 md:gap-10 text-[15px] md:text-[17px]">
                <li><Link href={`/${params.lang}#about`}    className="hover:opacity-70">{nav.about}</Link></li>
                <li><Link href={`/${params.lang}#services`} className="hover:opacity-70">{nav.services}</Link></li>
                <li><Link href={`/${params.lang}#projects`} className="hover:opacity-70">{nav.projects}</Link></li>
                <li><Link href={`/${params.lang}#brands`}   className="hover:opacity-70">{nav.brands}</Link></li>
                <li><Link href={`/${params.lang}#faq`}      className="hover:opacity-70">{nav.faq}</Link></li>
                <li><Link href={`/${params.lang}#contact`}  className="hover:opacity-70">{nav.contact}</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-slate-200">
          <div className="container mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
            © {new Date().getFullYear()} Glare Free Light. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
