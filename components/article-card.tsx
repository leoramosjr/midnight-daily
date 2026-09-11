/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export type ArticlePreview = {
  _id: string
  title: string
  slug: string
  category: string
  excerpt: string
  author?: string
  readingTimeMinutes?: number
  coverImageUrl?: string
  coverImageAlt?: string
  publishedAt?: string
  workTitle?: string
}

export function ArticleCard({ article, compact = false }: { article: ArticlePreview; compact?: boolean }) {
  return (
    <article className="article-card">
      {!compact && article.coverImageUrl && (
        <Link href={`/materia/${article.slug}`} tabIndex={-1}>
          {/* The image URL is authored in Sanity and must always carry supplied alt text. */}
          <img src={article.coverImageUrl} alt={article.coverImageAlt || ''} />
        </Link>
      )}
      <p className="article-category">{article.category}</p>
      <h3><Link href={`/materia/${article.slug}`}>{article.title}</Link></h3>
      <p className="article-excerpt">{article.excerpt}</p>
      {article.readingTimeMinutes && <p className="article-reading">{article.readingTimeMinutes} min de leitura</p>}
    </article>
  )
}
