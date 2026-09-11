/* eslint-disable @next/next/no-img-element */
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { notFound } from 'next/navigation'

import { ArticleCard, type ArticlePreview } from '@/components/article-card'
import { EditorialShell } from '@/components/editorial-shell'
import { isSanityConfigured, sanityClient } from '@/sanity/lib/client'
import { articleBySlugQuery, articlesByCategoryQuery } from '@/sanity/lib/queries'

type Article = ArticlePreview & { subtitle?: string; body?: PortableTextBlock[]; coverImageCaption?: string }

const categoryNames: Record<string, string> = { livros: 'Livros', quadrinhos: 'Quadrinhos', jogos: 'Jogos', filmes: 'Filmes', 'materias-especiais': 'Matérias Especiais' }

function dateLabel(date?: string) {
  if (!date) return ''
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!isSanityConfigured) notFound()
  const article = await sanityClient.fetch<Article | null>(articleBySlugQuery, { slug }, { next: { revalidate: 60 } })
  if (!article) notFound()
  const related = await sanityClient.fetch<ArticlePreview[]>(articlesByCategoryQuery, { category: article.category }, { next: { revalidate: 60 } })

  return (
    <EditorialShell>
      <main className="article-page">
        <header className="article-header page-width">
          <p className="article-category">{categoryNames[article.category] || article.category}</p>
          <h1>{article.title}</h1>
          {article.workTitle && <p className="article-work">{article.workTitle}</p>}
          {article.subtitle && <p className="article-subtitle">{article.subtitle}</p>}
          <p className="article-byline">Por {article.author || 'R. R. Cardoso'} · {dateLabel(article.publishedAt)}{article.readingTimeMinutes ? ` · ${article.readingTimeMinutes} min de leitura` : ''}</p>
        </header>
        {article.coverImageUrl && (
          <figure className="article-cover page-width">
            {/* Cover photos are Sanity-managed and paired with alt text in the schema. */}
            <img src={article.coverImageUrl} alt={article.coverImageAlt || ''} />
            {article.coverImageCaption && <figcaption>{article.coverImageCaption}</figcaption>}
          </figure>
        )}
        <article className="article-body">
          {article.body ? <PortableText value={article.body} /> : <p>{article.excerpt}</p>}
        </article>
        {related.filter((item) => item._id !== article._id).length > 0 && (
          <section className="related page-width" aria-labelledby="related-title">
            <p className="section-label">Continua neste caderno</p>
            <h2 id="related-title">Outras leituras</h2>
            <div>{related.filter((item) => item._id !== article._id).slice(0, 3).map((item) => <ArticleCard key={item._id} article={item} />)}</div>
          </section>
        )}
      </main>
    </EditorialShell>
  )
}
