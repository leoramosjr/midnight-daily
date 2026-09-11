# Midnight Daily

Frontend do Midnight Daily, um jornal cultural brasileiro independente. O site público usa Next.js; as matérias serão cadastradas no Sanity Studio, sem mudanças no código.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. O painel editorial estará em `http://localhost:3000/studio` depois de configurar o Sanity.

## Configurar o Sanity

1. Crie um projeto em [sanity.io/manage](https://www.sanity.io/manage).
2. Copie `.env.example` para `.env.local` e preencha o ID do projeto e o dataset.
3. Rode `npm run dev` e acesse `/studio`.
4. Convide R. R. Cardoso como editor no painel do Sanity.

Não exponha tokens de escrita no frontend. As variáveis `NEXT_PUBLIC_` deste projeto são identificadores públicos necessários para leitura e para o Studio.

## Verificações

```bash
npm run typecheck
npm run lint
npm run build
```
