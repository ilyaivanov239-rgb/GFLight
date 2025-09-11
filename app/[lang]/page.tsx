import Image from 'next/image';
import { dict, Lang } from '../../components/i18n';

export default function Page({ params }: { params: { lang: Lang } }) {
  const t = dict[params.lang];
  return (
    <main>
      <section id="home" className="container py-24 md:py-32 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-slate-100 border">{t.hero.badge}</span>
          <h1 className="text-4xl md:text-5xl font-semibold mt-4 leading-tight">{t.hero.title}</h1>
          <p className="text-slate-600 mt-4 max-w-prose">{t.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-slate-900 text-white shadow-soft">{t.cta.talk}</a>
            <a href="#projects" className="inline-flex items-center gap-2 text-sm hover:opacity-80">{t.cta.viewProjects} →</a>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-soft aspect-[4/3] bg-gradient-to-br from-slate-100 to-white flex items-center justify-center">
          <Image src="/og-image.jpg" alt="Glare Free Light" width={800} height={600} className="object-contain"/>
        </div>
      </section>

      <section id="about" className="container py-20">
        <div className="mb-10">
          <p className="uppercase tracking-widest text-sm text-slate-500">{t.about.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">{t.about.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="prose max-w-none">
            {t.about.paragraphs.map((p: string, i: number)=> (<p key={i}>{p}</p>))}
            <ul className="grid gap-2 list-none pl-0">
              {t.about.bullets.map((li: string)=> (<li key={li}>✔ {li}</li>))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">{t.about.factsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><div className="text-slate-500">{t.about.baseLabel}</div><div>Cascais, Portugal</div></div>
              <div><div className="text-slate-500">Instagram</div><a className="hover:opacity-80" href="https://www.instagram.com/glarefreelight">@glarefreelight</a></div>
              <div><div className="text-slate-500">{t.about.segmentsLabel}</div><div>{t.about.segments}</div></div>
              <div><div className="text-slate-500">{t.about.collabLabel}</div><div>{t.about.collab}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="container py-20">
        <div className="mb-10">
          <p className="uppercase tracking-widest text-sm text-slate-500">{t.services.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">{t.services.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.services.items.map((s: any)=>(
            <div className="card p-6" key={s.title}><h3 className="font-semibold text-lg mb-2">{s.title}</h3><p className="text-slate-600">{s.desc}</p></div>
          ))}
        </div>
      </section>

      <section id="philosophy" className="container py-20">
        <div className="mb-10">
          <p className="uppercase tracking-widest text-sm text-slate-500">{t.philo.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">{t.philo.title}</h2>
        </div>
        <ul className="grid md:grid-cols-2 gap-4 list-disc pl-6">
          {t.philo.points.map((x: string)=> (<li key={x}>{x}</li>))}
        </ul>
      </section>

      <section id="projects" className="container py-20">
        <div className="mb-10">
          <p className="uppercase tracking-widest text-sm text-slate-500">{t.projects.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">{t.projects.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.projects.items.map((p: any, i: number)=> (
            <div className="card overflow-hidden" key={i}>
              <div className="aspect-[4/3] bg-slate-100"></div>
              <div className="p-6"><h3 className="font-semibold text-lg">{p.title}</h3><p className="text-slate-600 mt-2">{p.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="container py-20">
        <div className="mb-10">
          <p className="uppercase tracking-widest text-sm text-slate-500">{t.contact.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">{t.contact.title}</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-8">
          <form className="card p-6 md:col-span-3" onSubmit={(e)=>{ e.preventDefault(); const m=(document.getElementById('m') as HTMLTextAreaElement).value; window.location.href = `mailto:hello@glarefreelight.com?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${encodeURIComponent(m)}`; }}>
            <h3 className="text-lg font-semibold mb-4">{t.contact.formTitle}</h3>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input className="border rounded-xl px-3 py-2" placeholder={t.contact.name} />
                <input className="border rounded-xl px-3 py-2" placeholder="Email" type="email" />
              </div>
              <input className="border rounded-xl px-3 py-2" placeholder={t.contact.subject} />
              <textarea id="m" className="border rounded-xl px-3 py-2 min-h-[140px]" placeholder={t.contact.message}></textarea>
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">{t.contact.privacyNote}</div>
                <button type="submit" className="px-4 py-2 rounded-xl bg-slate-900 text-white">{t.contact.send}</button>
              </div>
            </div>
          </form>
          <div className="md:col-span-2 grid gap-4">
            <div className="flex items-center gap-3">📞 +351 910 075 868</div>
            <div className="flex items-center gap-3">✉️ hello@glarefreelight.com</div>
            <div className="flex items-center gap-3">📍 Cascais, Portugal</div>
          </div>
        </div>
      </section>
    </main>
  );
}
