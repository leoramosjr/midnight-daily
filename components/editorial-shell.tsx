import Link from 'next/link'
import type { ReactNode } from 'react'

import { CurrentDate } from '@/components/current-date'

const navigation = [
  ['Início', '/'],
  ['Especiais', '/especiais'],
  ['Livros', '/livros'],
  ['Quadrinhos', '/quadrinhos'],
  ['Jogos', '/jogos'],
  ['Filmes', '/filmes'],
  ['Sobre', '/sobre'],
] as const

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.25 4.25" />
    </svg>
  )
}

export function EditorialShell({ children }: { children: ReactNode }) {
  return (
    <div className="editorial-shell">
      <header className="masthead">
        <div className="page-width">
          <div className="edition-line">
            <span>Edição da madrugada</span>
            <span className="edition-location">Rio Grande do Sul · depois da meia-noite</span>
            <CurrentDate />
            <details className="mobile-nav">
              <summary>
                <span className="sr-only">Abrir menu</span>
                <span className="hamburger-icon" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </summary>
              <nav aria-label="Principal">
                {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
                <Link href="/busca">Buscar matérias</Link>
              </nav>
            </details>
          </div>

          <div className="masthead-brand">
            <Link href="/">Midnight Daily</Link>
            <p>Análises culturais para quem lê após a meia-noite.</p>
          </div>

          <nav className="main-nav" aria-label="Principal">
            {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link className="search-link" href="/busca" aria-label="Buscar matérias"><SearchIcon /></Link>
          </nav>

        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="page-width">
          <div>
            <p className="footer-title">Afinal, isto é só um jornal.</p>
            <p className="footer-copy">Um caderno cultural independente, escrito e editado por R. R. Cardoso para leitores sem pressa.</p>
          </div>
          <p className="footer-location">Midnight Daily · Rio Grande do Sul</p>
        </div>
      </footer>
    </div>
  )
}
