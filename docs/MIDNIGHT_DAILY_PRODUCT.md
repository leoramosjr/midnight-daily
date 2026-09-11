# Midnight Daily

## Norte editorial

**Midnight Daily** e um jornal cultural brasileiro independente para quem le apos a meia-noite. Sua promessa e oferecer analises culturais que valorizam contexto, observacao e reflexao. O tom e intimo, intelectual, noturno, levemente melancolico e acolhedor.

O leitor chega para desacelerar, nao para acompanhar um ciclo de noticias. Filmes, livros, quadrinhos e jogos sao tratados como obras culturais capazes de abrir conversas sobre historia, politica, identidade, fe, etica, filosofia, critica social e sensibilidade artistica.

Frase-conceito: **"Analises culturais para quem le apos a meia-noite."**

Assinatura editorial: **R. R. Cardoso**, autor e anfitriao.

## Publico e resultado esperado

O publico sao leitores brasileiros que ja possuem repertorio cultural ou desejam construí-lo por meio de ensaios longos e cuidadosos. A experiencia deve convidar a:

1. Descobrir uma materia significativa.
2. Ler com conforto e sem distracao.
3. Explorar o acervo por linguagem cultural.
4. Conhecer a perspectiva e o manifesto da publicacao.

## Arquitetura de informacao

| Area | Papel |
| --- | --- |
| Inicio | Apresenta destaques recentes, manifesto e caminhos para os acervos. |
| Materias Especiais | Reune reportagens e ensaios fora da cobertura tradicional, incluindo cultura local e experiencias vividas. |
| Livros | Literatura popular, classicos, filosofia, historia e reflexao social. |
| Quadrinhos | Graphic novels e super-herois por suas camadas humanas, politicas e psicologicas. |
| Jogos | Experiencias interativas analisadas culturalmente e, quando relevante, tecnicamente. |
| Filmes | Cinema como impacto social, visual e humano. |
| Sobre | Explica o manifesto, o projeto e R. R. Cardoso. |
| Busca | Pesquisa global de materias do acervo. |

Cada categoria e um acervo editorial: introducao especifica, uma materia em destaque, lista ou grid de textos recentes e caminho para o arquivo completo.

## Paginas-chave

### Inicio

- Tres ou quatro materias recentes ou em destaque, em composicao editorial forte e nao repetitiva.
- Manifesto breve, com chamadas como **"Leia sem pressa"** e **"Afinal, isto e so um jornal."**
- Blocos de descoberta por categoria.
- Convites claros para entrar em uma materia ou acervo; evitar chamadas promocionais urgentes.

### Materia

- Categoria, titulo, obra analisada, subtitulo opcional, autor, data, tempo estimado de leitura e imagem de capa.
- Texto em coluna estreita, com tipografia confortavel, hierarquia discreta e espaco para concentracao.
- Ao final: textos relacionados da mesma categoria e navegacao para materia anterior/proxima.
- Sem comentarios, notas, rankings, banners invasivos, publicidade visualmente agressiva ou carrosseis automaticos.

### Busca

- Campo de busca global sempre compreensivel e resultados com titulo, categoria, data, resumo breve e, quando disponivel, obra analisada.
- Projetar estados iniciais, sem resultado, carregamento e erro.

## Direcao visual

- Revista/jornal cultural contemporaneo, sofisticado e sereno.
- Paleta-base: preto-grafite, azul-marinho profundo e cinza quente; texto em off-white; um acento contido (vinho, ambar envelhecido ou azul eletrico discreto).
- Titulos em serifada expressiva; interface e corpo em sans-serif de alta legibilidade.
- Espaco negativo generoso, linhas finas, ritmos calmos e grids assimetricos discretos.
- Capas com aparencia curada, cinematografica e autoral. Evitar imagens genericas de banco de imagens.
- A referencia e biblioteca noturna, redacao independente e caderno cultural; nao neon/cyberpunk nem estetica de site geek.

## Requisitos de experiencia

- Design responsivo, com menu mobile simples.
- Alto contraste, fontes em tamanho confortavel, foco visivel e navegacao por teclado.
- Modo/leiaute de leitura sem distracoes quando houver uma materia aberta.
- Movimento somente quando for sutil, opcional e nao interromper a leitura; respeitar `prefers-reduced-motion`.

## Modelo editorial inicial

Uma materia deve poder conter, no minimo:

```ts
type Category = 'livros' | 'quadrinhos' | 'jogos' | 'filmes' | 'materias-especiais'

type Article = {
  slug: string
  title: string
  subtitle?: string
  category: Category
  workTitle?: string
  excerpt: string
  author: 'R. R. Cardoso'
  publishedAt: string
  readingTimeMinutes: number
  coverImage: string
  coverImageAlt: string
  body: string
  featured?: boolean
}
```

Mantenha os dados mockados tipados e independentes da camada de apresentacao, para que um CMS ou API possa substituir a fonte sem reescrever as telas.

## Plataforma de publicação

O conteúdo será administrado no **Sanity Studio**, sem edição de código. R. R. Cardoso poderá criar, revisar, agendar e publicar matérias pela rota `/studio` após a configuração do projeto Sanity. O frontend público é uma aplicação Next.js, preparada para hospedagem na Vercel.

Os artigos já publicados no Google Sites serão inseridos manualmente no novo CMS, como parte da surpresa. Não é necessário criar uma migração automatizada.

A referência inicial no Lovable consolidou a direção **Warm Nocturnal Editorial**: âmbar envelhecido como acento, Libre Baskerville + IBM Plex Sans como referência tipográfica e composição em “grade de caderno”. O projeto do Lovable estava pausado, portanto não há arquivos ou tela final a reproduzir literalmente.

## Decisões ainda em aberto

- Autenticacao, se houver conta de leitor, newsletter ou favoritos.
- Taxonomia alem das cinco categorias (temas, autores, obras, tags).
- Estrategia de SEO, analytics e newsletter.
- Identidade final: fontes licenciadas, logotipo e direcao definitiva para capas.
