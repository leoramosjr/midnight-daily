import { EditorialShell } from '@/components/editorial-shell'

export default function AboutPage() {
  return (
    <EditorialShell>
      <main className="about-page page-width">
        <header>
          <p className="section-label">Sobre o Midnight Daily</p>
          <h1>Um jornal para depois da meia-noite.</h1>
          <p className="about-lead">O Midnight Daily é um caderno cultural independente para quem ainda encontra tempo para olhar uma obra de perto.</p>
        </header>
        <div className="about-copy">
          <p>Filmes, livros, quadrinhos e jogos não aparecem aqui como uma corrida por novidades. São pontos de partida para observar história, política, identidade, fé, ética e as pequenas inquietações que ficam depois do fim.</p>
          <p>Este é um espaço de leitura lenta: sem notas, rankings, publicidade agressiva ou distrações que disputem atenção com o texto.</p>
          <h2>R. R. Cardoso</h2>
          <p>Autor e anfitrião do Midnight Daily. A publicação nasce do desejo de manter uma conversa cultural íntima, crítica e generosa — como uma redação acesa quando a cidade já diminuiu o volume.</p>
        </div>
      </main>
    </EditorialShell>
  )
}
