import type { Metadata } from 'next';
import '../../styles/globals.css';
import Link from 'next/link';
import { dict, Lang } from '../../components/i18n';

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const t = dict[params.lang];
  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: { title: t.meta.title, description: t.meta.description, images: ['/og-image.jpg'], type: 'website' },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: ['/og-image.jpg'] },
    icons: { icon: '/favicon.ico' }
  };
}

export default function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: { lang: Lang } }>) {
  const t = dict[params.lang];
  return (
    <html lang={params.lang}>
      <body className="bg-gradient-to-b from-white to-slate-50 text-slate-900">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <nav className="container h-16 flex items-center justify-between">
            <Link href={`/${params.lang}`} className="font-semibold text-lg">Glare Free Light</Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#about" className="hover:opacity-80">{t.nav.about}</a>
              <a href="#services" className="hover:opacity-80">{t.nav.services}</a>
              <a href="#projects" className="hover:opacity-80">{t.nav.projects}</a>
              <a href="#contact" className="hover:opacity-80">{t.nav.contact}</a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/ru`} className={params.lang==='ru' ? 'font-semibold' : ''}>RU</Link>
              <span>·</span>
              <Link href={`/en`} className={params.lang==='en' ? 'font-semibold' : ''}>EN</Link>
              <span>·</span>
              <Link href={`/pt`} className={params.lang==='pt' ? 'font-semibold' : ''}>PT</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="border-t py-10">
          <div className="container flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="text-sm text-slate-500">© {new Date().getFullYear()} Glare Free Light</div>
            <div className="text-sm text-slate-500">{t.footer.rights}</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
