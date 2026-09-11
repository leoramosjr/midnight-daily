import { isSanityConfigured } from '@/sanity/lib/client'

import { Studio } from './Studio'

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="setup-page">
        <p className="eyebrow">Midnight Daily — Redação</p>
        <h1>Conecte a redação ao Sanity</h1>
        <p>
          Adicione <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> e{' '}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> ao arquivo <code>.env.local</code>{' '}
          para abrir o painel editorial.
        </p>
      </main>
    )
  }

  return <Studio />
}
