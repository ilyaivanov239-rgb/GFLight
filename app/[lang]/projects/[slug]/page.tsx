// app/[lang]/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROJECTS, findProject, type Lang } from '../../../../components/projects'

// Предгенерация всех комбинаций языков и слагов
export function generateStaticParams() {
  const langs: Lang[] = ['ru', 'en', 'pt']
  return langs.flatMap((lang) =>
    PROJECTS.map((p) => ({ lang, slug: p.slug }))
  )
}

// Мета-теги на основе локали проекта
export function generateMetadata({
  params,
}: {
  params: { lang: Lang; slug: string }
}): Metadata {
  const project = findProject(params.slug)
  if (!project) return {}

  const m = project.meta[params.lang] ?? project.meta.en
  return {
    title: m.title,
    description: m.blurb,
    openGraph: {
      title: m.title,
      description: m.blurb,
      images: [project.cover],
      type: 'article',
    },
  }
}

export default function ProjectPage({
  params,
}: {
  params: { lang: Lang; slug: string }
}) {
  const project = findProject(params.slug)
  if (!project) notFound()

  const lang = params.lang
  const m = project.meta[lang] ?? project.meta.en

  return (
    <main className="px-6 max-w-6xl mx-auto py-12">
      {/* hero */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 mb-8">
        <img
          src={project.cover}
          alt={m.title}
          className="w-full h-[360px] md:h-[460px] object-cover"
        />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{m.title}</h1>
      {m.blurb && (
        <p className="text-gray-700 mb-10 leading-relaxed">{m.blurb}</p>
      )}

      {/* ГАЛЕРЕЯ */}
      <div className="grid md:grid-cols-2 gap-6">
        {project.images.map((src, i) => (
          <div
            key={src}
            className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50"
          >
            <img
              src={src}
              alt={`${m.title} #${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          href={`/${lang}#projects`}
          className="inline-block text-sm text-gray-600 hover:text-black"
        >
          ← {lang === 'ru' ? 'Назад к проектам' : lang === 'pt' ? 'Voltar' : 'Back to projects'}
        </a>
      </div>
    </main>
  )
}
