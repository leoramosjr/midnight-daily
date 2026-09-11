import { EditorialShell } from '@/components/editorial-shell'
import { SearchArchive } from '@/components/search-archive'
import type { ArticlePreview } from '@/components/article-card'
import { isSanityConfigured, sanityClient } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/lib/queries'

export default async function SearchPage() {
  const articles = isSanityConfigured
    ? await sanityClient.fetch<ArticlePreview[]>(allArticlesQuery, {}, { next: { revalidate: 60 } })
    : []

  return (
    <EditorialShell>
      <main className="search-page page-width">
        <header>
          <p className="section-label">Busca global</p>
          <h1>Procure no acervo.</h1>
          <p>Encontre uma matéria por título, obra, tema ou caderno.</p>
        </header>
        <SearchArchive articles={articles} />
      </main>
    </EditorialShell>
  )
}
