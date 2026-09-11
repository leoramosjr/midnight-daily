import { notFound } from 'next/navigation'

import { ArticleCard, type ArticlePreview } from '@/components/article-card'
import { EditorialShell } from '@/components/editorial-shell'
import { isSanityConfigured, sanityClient } from '@/sanity/lib/client'
import { articlesByCategoryQuery } from '@/sanity/lib/queries'

const archives = {
  livros: { title: 'Livros', label: 'Caderno de leitura', description: 'Literatura popular, clássica, filosofia, história e reflexão social — páginas que atravessam seu próprio tempo.' },
  quadrinhos: { title: 'Quadrinhos', label: 'Caderno de imagem', description: 'Graphic novels e super-heróis lidos por suas camadas humanas, políticas e psicológicas.' },
  jogos: { title: 'Jogos', label: 'Caderno de experiências', description: 'Experiências interativas observadas como linguagem, cultura e, quando necessário, técnica.' },
  filmes: { title: 'Filmes', label: 'Caderno de cinema', description: 'Cinema como impacto social, visual e humano — imagens que permanecem depois dos créditos.' },
  especiais: { title: 'Matérias Especiais', label: 'Fora da cobertura tradicional', description: 'Reportagens e ensaios entre cultura local, memória, cidade e experiências vividas.', category: 'materias-especiais' },
} as const

export function generateStaticParams() {
  return Object.keys(archives).map((category) => ({ category }))
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const archive = archives[category as keyof typeof archives]
  if (!archive) notFound()

  const sanityCategory = 'category' in archive ? archive.category : category
  const articles = isSanityConfigured
    ? await sanityClient.fetch<ArticlePreview[]>(articlesByCategoryQuery, { category: sanityCategory }, { next: { revalidate: 60 } })
    : []
  const [featured, ...recent] = articles

  return (
    <EditorialShell>
      <main className="archive-page page-width">
        <header className="archive-intro">
          <p className="section-label">{archive.label}</p>
          <h1>{archive.title}</h1>
          <p>{archive.description}</p>
        </header>

        {featured ? (
          <>
            <section className="archive-feature" aria-label="Matéria em destaque">
              <ArticleCard article={featured} />
              <div>
                <p className="section-label">Em destaque</p>
                <p>Uma leitura para atravessar com mais calma.</p>
              </div>
            </section>
            {recent.length > 0 && (
              <section className="archive-list" aria-labelledby="archive-list-title">
                <p className="section-label">Arquivo</p>
                <h2 id="archive-list-title">Mais leituras neste caderno.</h2>
                <div className="archive-grid">{recent.map((article) => <ArticleCard key={article._id} article={article} />)}</div>
              </section>
            )}
          </>
        ) : (
          <p className="archive-empty">Este caderno está sendo organizado. As próximas leituras chegarão em breve.</p>
        )}
      </main>
    </EditorialShell>
  )
}
