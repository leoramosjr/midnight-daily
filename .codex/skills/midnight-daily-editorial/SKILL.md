---
name: midnight-daily-editorial
description: Cria ou ajusta a experiencia editorial do Midnight Daily — paginas, componentes, conteudo de interface e modelo de materias — preservando seu tom cultural noturno e focado em leitura lenta.
metadata:
  short-description: Construir a experiencia editorial do Midnight Daily
---

# Midnight Daily editorial

Use esta skill ao implementar ou revisar telas, componentes, textos de interface, dados mockados ou fluxos de leitura do Midnight Daily. Nao a use para mudancas de infraestrutura que nao afetem a experiencia editorial.

Leia primeiro [../../../docs/MIDNIGHT_DAILY_PRODUCT.md](../../../docs/MIDNIGHT_DAILY_PRODUCT.md). Ele define o produto, arquitetura obrigatoria, direcao visual e o modelo editorial inicial.

## Decisoes que devem permanecer coerentes

- Projetar para leitura lenta e concentrada, nao para consumo acelerado de noticias ou reviews.
- Manter toda a navegacao e microcopy em portugues brasileiro, salvo instrucao contraria.
- Valorizar titulos, capas e excertos sem competir com a materia em si. Dar preferencia a composicoes calmas, espacosas e editorialmente assimetricas quando isso melhorar a hierarquia.
- Para uma pagina de materia, priorizar a coluna de leitura, metadados discretos, contraste, largura de linha confortavel e continuidade entre textos relacionados.
- Ao modelar dados, separar conteudo de apresentacao e manter os mocks tipados para futura troca por CMS/API.

## Limites de produto

Nao incluir, por padrao, notas numericas, rankings, caixas de comentarios, banners invasivos, publicidade agressiva ou carrosseis automaticos. Tambem evite cliches de neon, cyberpunk e "site geek".

Quando uma solicitacao exigir nova secao, avalie primeiro se ela reforca a arquitetura existente (Inicio, Materias Especiais, Sobre, Livros, Quadrinhos, Jogos, Filmes e Busca). Caso altere essa arquitetura ou o modelo editorial, explicite a decisao antes de implementa-la.

## Criterio de pronto para UI editorial

Antes de concluir uma entrega visual, verificar em desktop e mobile: navegacao clara, contraste, foco de teclado, alternativa textual para imagens, ausencia de distracoes automaticas e ritmo de leitura preservado.
