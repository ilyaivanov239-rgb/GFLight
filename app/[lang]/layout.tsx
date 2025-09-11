import type { Metadata } from 'next';
import '../../styles/globals.css';
import Link from 'next/link';
import { dict, Lang } from '../../components/i18n';

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const t = dict[params.lang];
  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      images: ['/og-image.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['/og-image.jpg'],
    },
    icons: { icon: '/favicon.ico' },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const t = dict[params.lang];
  return (
    <html lang={params.lang}>
      <body className="bg-gradient-to-b from-white to-slate-50 text-slate-900">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
          <nav className="container h-16 flex items-center justify-between">
            <Link href={`/${params.lang}`} className="font-semibold">
              Glare Free Light
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#about" className="hover:opacity-80">
                {t.nav.about}
              </a>
              <a href="#services" className="hover:opacity-80">
                {t.nav.services}
              </a>
              <a href="#projects" className="hover:opacity-80">
                {t.nav.projects}
              </a>
              <a href="#contact" className="hover:opacity-80">
                {t.nav.contact}
              </a>
            </div>

            {/* Language switcher */}
            <div className="flex items-center gap-2">
              <Link
                href={`/ru`}
                className={`px-2 py-1 rounded-full text-xs border ${
                  params.lang === 'ru'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'border-slate-300 hover:bg-slate-100'
                }`}
              >
                RU
              </Link>
              <Link
                href={`/en`}
                className={`px-2 py-1 rounded-full text-xs border ${
                  params.lang === 'en'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'border-slate-300 hover:bg-slate-100'
                }`}
              >
                EN
              </Link>
              <Link
                href={`/pt`}
                className={`px-2 py-1 rounded-full text-xs border ${
                  params.lang === 'pt'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'border-slate-300 hover:bg-slate-100'
                }`}
              >
                PT
              </Link>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t py-10 bg-white">
          <div className="container flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Glare Free Light
            </div>
            <div className="text-sm text-slate-500">{t.footer.rights}</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
