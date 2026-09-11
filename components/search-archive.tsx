'use client'

import { useMemo, useState } from 'react'

import type { ArticlePreview } from '@/components/article-card'

const categoryNames: Record<string, string> = {
  livros: 'Livros',
  quadrinhos: 'Quadrinhos',
  jogos: 'Jogos',
  filmes: 'Filmes',
  'materias-especiais': 'Matérias Especiais',
}

function dateLabel(date?: string) {
  if (!date) return ''
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))
}

export function SearchArchive({ articles }: { articles: ArticlePreview[] }) {
  const [term, setTerm] = useState('')
  const normalizedTerm = term.trim().toLocaleLowerCase('pt-BR')
  const matches = useMemo(() => articles.filter((article) => {
    if (!normalizedTerm) return true
    return [article.title, article.excerpt, article.workTitle, categoryNames[article.category]]
      .filter(Boolean).join(' ').toLocaleLowerCase('pt-BR').includes(normalizedTerm)
  }), [articles, normalizedTerm])

  return (
    <div className="search-archive">
      <label className="search-field">
        <span className="sr-only">Buscar no acervo</span>
        <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Título, obra, tema ou categoria" type="search" autoComplete="off" />
      </label>
      <p className="search-count">{normalizedTerm ? `${matches.length} resultado${matches.length === 1 ? '' : 's'}` : `${articles.length} matéria${articles.length === 1 ? '' : 's'} no acervo`}</p>

      {matches.length > 0 ? (
        <div className="search-results">
          {matches.map((article) => (
            <a key={article._id} className="search-result" href={`/materia/${article.slug}`}>
              <p className="article-category">{categoryNames[article.category] || article.category}</p>
              <h2>{article.title}</h2>
              {article.workTitle && <p className="result-work">Sobre {article.workTitle}</p>}
              <p>{article.excerpt}</p>
              <span>{dateLabel(article.publishedAt)}{article.readingTimeMinutes ? ` · ${article.readingTimeMinutes} min de leitura` : ''}</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="search-empty">Nenhuma matéria encontrada. Tente outro título, obra ou palavra do acervo.</p>
      )}
    </div>
  )
}
