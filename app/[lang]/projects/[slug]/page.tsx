// app/[lang]/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROJECTS, findProject } from '../../../../components/projects'
import type { Lang } from '../../../../components/i18n'

// Предгенерация всех комбинаций языков и слагов
export function generateStaticParams() {
  const langs: Lang[] = ['ru', 'en', 'pt']
  return langs.flatMap((lang) =>
    PROJECTS.map((p) => ({ lang, slug: p.slug }))
  )
}

// Метаданные страницы проекта
export function generateMetadata({
  params,
}: {
  params: { lang: Lang; slug: string }
}): Metadata {
  const p = findProject(params.slug)
  if (!p) return {}

  const metaAny: any = p as any
  const loc = metaAny.meta?.[params.lang]
  const title: string =
    loc?.title ?? metaAny.title?.[params.lang] ?? 'Project'
  const description: string | undefined =
    loc?.blurb ?? metaAny.summary?.[params.lang] ?? undefined

  const cover: string = metaAny.cover ?? `/projects/${p.slug}/cover.jpg`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [cover],
      type: 'article',
    },
  }
}

export default function ProjectPage({
  params,
}: {
  params: { lang: Lang; slug: string }
}) {
  const p = findProject(params.slug)
  if (!p) notFound()

  const metaAny: any = p as any
  const loc = metaAny.meta?.[params.lang]
  const title: string =
    loc?.title ?? metaAny.title?.[params.lang] ?? p.slug
  const blurb: string =
    loc?.blurb ?? metaAny.summary?.[params.lang] ?? ''

  const cover: string = metaAny.cover ?? `/projects/${p.slug}/cover.jpg`
  const images: string[] = Array.isArray(metaAny.images) ? metaAny.images : []

  return (
    <main className="px-6 max-w-5xl mx-auto py-10">
      {/* Hero / cover */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 aspect-[16/9] mb-8">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </div>

      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      {blurb && <p className="text-gray-600 mb-8">{blurb}</p>}

      {images.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6">
          {images.map((src: string, i: number) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
            >
              <img src={src} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
