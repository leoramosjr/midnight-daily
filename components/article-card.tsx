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
      <Link className="article-card-link" href={`/materia/${article.slug}`}>
        {/* The image URL is authored in Sanity and must always carry supplied alt text. */}
        {!compact && article.coverImageUrl && (
          <img src={article.coverImageUrl} alt={article.coverImageAlt || ''} />
        )}
        <div className="article-card-content">
          <p className="article-category">{article.category}</p>
          <h3>{article.title}</h3>
          <p className="article-excerpt">{article.excerpt}</p>
          {article.readingTimeMinutes && <p className="article-reading">{article.readingTimeMinutes} min de leitura</p>}
        </div>
      </Link>
    </article>
  )
}
