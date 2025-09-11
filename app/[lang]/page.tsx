'use client';

import { dict, Lang } from '../../components/i18n';
import Link from 'next/link';

// Нормализуем элементы: и строка, и {title, desc} → в {title, desc}
function normalizeItems(arr: any): { title: string; desc?: string }[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((it) =>
    typeof it === 'string' ? { title: it, desc: '' } : { title: it?.title ?? '', desc: it?.desc ?? '' }
  );
}

export default function Page({ params }: { params: { lang: Lang } }) {
  const t = dict[params.lang] ?? ({} as any);

  const hero = t.hero ?? {};
  const servicesTitle = t.services?.title ?? 'Services';
  const servicesItems = normalizeItems(t.services?.items);
  const projectsTitle = t.projects?.title ?? 'Selected projects';
  const projectsItems = normalizeItems(t.projects?.items);
  const contact = t.contact ?? {};

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-slate-900 text-white">
        <div className="container mx-auto px-6 py-28 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {hero.title ?? t?.heroTitle ?? 'Light changes everything.'}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            {hero.subtitle ?? t?.heroSubtitle ?? ''}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="#services"
              className="px-6 py-3 rounded-full bg-white text-slate-900 font-medium hover:bg-slate-100 transition"
            >
              {hero.cta1 ?? t?.cta?.talk ?? 'See services'}
            </Link>
            <Link
              href="#projects"
              className="px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-slate-900 transition"
            >
              {hero.cta2 ?? t?.cta?.viewProjects ?? 'See projects'}
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">{servicesTitle}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {servicesItems.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-6 shadow-card hover:shadow-lg border border-slate-200 transition"
            >
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              {s.desc ? <p className="text-slate-600 text-sm">{s.desc}</p> : null}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{projectsTitle}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {projectsItems.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white overflow-hidden shadow-card hover:shadow-lg border border-slate-200 transition"
              >
                <div className="h-40 bg-slate-200" />
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  {p.desc ? <p className="text-slate-600 text-sm mt-1">{p.desc}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">{contact.title ?? 'Get in touch'}</h2>
        {contact.description ? <p className="text-slate-600 mb-6">{contact.description}</p> : null}
        <Link
          href={`mailto:${contact.email ?? 'hello@glarefreelight.com'}`}
          className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
        >
          {contact.cta ?? 'Send email'}
        </Link>
      </section>
    </div>
  );
}
