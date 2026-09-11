# Midnight Daily — contexto do projeto

## Produto

Midnight Daily e um jornal cultural brasileiro independente, feito para leitores que leem apos a meia-noite. A proposta e leitura lenta, profunda, subjetiva e critica sobre filmes, livros, quadrinhos, jogos e experiencias culturais. A frase-conceito e: **"Analises culturais para quem le apos a meia-noite."**

O produto nao e um portal de noticias, agregador de reviews, site de entretenimento generico, nem um espaco para rankings e notas numericas. R. R. Cardoso e o autor e anfitriao editorial.

## Regras de implementacao

- Ao criar ou alterar uma experiencia editorial, use a skill local `midnight-daily-editorial` e consulte `docs/MIDNIGHT_DAILY_PRODUCT.md`.
- Preserve a arquitetura principal: Inicio, Materias Especiais, Sobre, Livros, Quadrinhos, Jogos, Filmes e busca global.
- Escreva conteudo de interface em portugues brasileiro, salvo pedido explicito em contrario.
- Priorize leitura, concentracao, acessibilidade e navegacao tranquila. Evite elementos de interface que imitem portais de noticia acelerados.
- Nao introduza comentarios, notas, rankings, publicidade agressiva, banners intrusivos ou carrosseis automaticos, a menos que o usuario revogue expressamente essa diretriz.
- Antes de integrar um backend ou CMS, manter os dados de demonstracao tipados e separados dos componentes de interface.

## Estado atual

O repositório usa Next.js + TypeScript. O Sanity Studio está integrado na rota `/studio`; a configuração é ativada com `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` em `.env.local`. O schema inicial de matérias está em `sanity/schemaTypes/articleType.ts` e os artigos existentes serão cadastrados manualmente, sem migração automática do Google Sites.

O design de referência no Lovable está pausado. Sua direção documentada é Warm Nocturnal Editorial: âmbar envelhecido, tipografia editorial serifada com sans-serif sóbria e composição em grade de caderno.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
