/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import { ArticleCard, type ArticlePreview } from '@/components/article-card'
import { EditorialShell } from '@/components/editorial-shell'
import { isSanityConfigured, sanityClient } from '@/sanity/lib/client'
import { featuredArticlesQuery } from '@/sanity/lib/queries'

const categories = [
  { title: 'Livros', href: '/livros', description: 'Literatura popular, clássica, filosofia, história e reflexão social — páginas que atravessam seu próprio tempo.' },
  { title: 'Quadrinhos', href: '/quadrinhos', description: 'Graphic novels e super-heróis lidos por suas camadas humanas, políticas e psicológicas.' },
  { title: 'Jogos', href: '/jogos', description: 'Experiências interativas observadas como linguagem, cultura e, quando necessário, técnica.' },
  { title: 'Filmes', href: '/filmes', description: 'Cinema como impacto social, visual e humano — imagens que permanecem depois dos créditos.' },
  { title: 'Matérias Especiais', href: '/especiais', description: 'Reportagens e ensaios fora da cobertura tradicional, entre cultura local e experiências vividas.' },
]

async function getFeaturedArticles(): Promise<ArticlePreview[]> {
  if (!isSanityConfigured) return []
  return sanityClient.fetch<ArticlePreview[]>(featuredArticlesQuery, {}, { next: { revalidate: 60 } })
}

function LeadArticle({ article }: { article: ArticlePreview }) {
  return (
    <article className="lead-article">
      <Link className="lead-article-link" href={`/materia/${article.slug}`}>
        {/* Sanity provides the editorial image and its author-provided alt text. */}
        {article.coverImageUrl && (
          <img src={article.coverImageUrl} alt={article.coverImageAlt || ''} />
        )}
        <div className="lead-article-content">
          <p className="article-category">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="lead-excerpt">{article.excerpt}</p>
          <p className="article-reading">{article.author || 'R. R. Cardoso'}{article.readingTimeMinutes ? ` · ${article.readingTimeMinutes} min de leitura` : ''}</p>
        </div>
      </Link>
    </article>
  )
}

export default async function HomePage() {
  const articles = await getFeaturedArticles()
  const [lead, firstSide, ...remaining] = articles

  return (
    <EditorialShell>
      <main className="homepage page-width">
        {lead ? (
          <>
            <section className="feature-grid" aria-label="Matérias em destaque">
              <LeadArticle article={lead} />
              <div className="feature-sidebar">
                {firstSide && <ArticleCard article={firstSide} />}
                <div className="compact-articles">
                  {remaining.slice(0, 2).map((article) => <ArticleCard key={article._id} article={article} compact />)}
                </div>
              </div>
            </section>

            <section className="manifesto" aria-labelledby="manifesto-title">
              <p className="section-label">O Midnight Daily</p>
              <div>
                <h2 id="manifesto-title">Leia sem pressa.</h2>
                <p>Um jornal cultural independente para obras, ideias e noites que pedem mais do que uma resposta rápida.</p>
                <Link href="/sobre">Conheça o jornal <span aria-hidden="true">→</span></Link>
              </div>
            </section>

            <section className="notebooks" aria-labelledby="notebooks-title">
              <div className="section-intro">
                <p className="section-label">Cadernos</p>
                <h2 id="notebooks-title">Por onde a leitura começa.</h2>
              </div>
              <div className="category-grid">
                {categories.map((category) => (
                  <Link key={category.href} className="category-card" href={category.href}>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </section>

            {remaining.length > 2 && (
              <section className="specials" aria-labelledby="specials-title">
                <div className="section-intro section-intro-row">
                  <div>
                    <p className="section-label">Matérias Especiais</p>
                    <h2 id="specials-title">Outras horas da madrugada.</h2>
                  </div>
                  <Link href="/especiais">Ver arquivo completo <span aria-hidden="true">→</span></Link>
                </div>
                <div className="specials-grid">
                  {remaining.slice(2, 5).map((article) => <ArticleCard key={article._id} article={article} />)}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="editorial-empty" aria-labelledby="opening-title">
            <p className="section-label">A redação está abrindo as portas</p>
            <h1 id="opening-title">A primeira edição está sendo preparada.</h1>
            <p>Em breve, este espaço receberá as matérias já publicadas por R. R. Cardoso — agora em um caderno feito para ler sem pressa.</p>
          </section>
        )}
      </main>
    </EditorialShell>
  )
}
