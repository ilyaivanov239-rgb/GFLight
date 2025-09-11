import { dict, Lang } from '../../components/i18n';
import Link from 'next/link';

export default function Page({ params }: { params: { lang: Lang } }) {
  const t = dict[params.lang];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 text-white">
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="#services"
              className="px-6 py-3 rounded-full bg-white text-slate-900 font-medium hover:bg-slate-100 transition"
            >
              {t.hero.cta1}
            </Link>
            <Link
              href="#projects"
              className="px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-slate-900 transition"
            >
              {t.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">{t.services.title}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {t.services.items.map((item: string, i: number) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2">{item}</h3>
              <p className="text-slate-600 text-sm">
                {t.services.descriptions[i] || ''}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t.projects.title}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {t.projects.items.map((item: string, i: number) => (
              <div
                key={i}
                className="rounded-2xl bg-white overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="h-40 bg-slate-200" />
                <div className="p-4">
                  <h3 className="font-semibold">{item}</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    {t.projects.descriptions[i] || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">{t.contact.title}</h2>
        <p className="text-slate-600 mb-6">{t.contact.description}</p>
        <Link
          href={`mailto:${t.contact.email}`}
          className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
        >
          {t.contact.cta}
        </Link>
      </section>
    </div>
  );
}
