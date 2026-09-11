import { defineField, defineType } from 'sanity'

const categoryOptions = [
  { title: 'Livros', value: 'livros' },
  { title: 'Quadrinhos', value: 'quadrinhos' },
  { title: 'Jogos', value: 'jogos' },
  { title: 'Filmes', value: 'filmes' },
  { title: 'Matérias Especiais', value: 'materias-especiais' },
]

export const articleType = defineType({
  name: 'article',
  title: 'Matéria',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (rule) => rule.required().max(120) }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3, validation: (rule) => rule.max(240) }),
    defineField({
      name: 'slug', title: 'URL da matéria', type: 'slug',
      options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category', title: 'Categoria', type: 'string',
      options: { list: categoryOptions, layout: 'radio' }, validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'workTitle', title: 'Obra analisada',
      description: 'Filme, livro, quadrinho, jogo ou experiência em foco.', type: 'string',
    }),
    defineField({
      name: 'excerpt', title: 'Resumo', type: 'text', rows: 3,
      description: 'Usado nas páginas de acervo e nos resultados de busca.',
      validation: (rule) => rule.required().min(80).max(320),
    }),
    defineField({
      name: 'coverImage', title: 'Imagem de capa', type: 'image', options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt', title: 'Descrição da imagem', type: 'string',
          description: 'Explique a imagem para leitores que usam leitores de tela.',
          validation: (rule) => rule.required(),
        }),
        defineField({ name: 'caption', title: 'Legenda', type: 'string' }),
      ], validation: (rule) => rule.required(),
    }),
    defineField({ name: 'author', title: 'Autor', type: 'string', initialValue: 'R. R. Cardoso', validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Data de publicação', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({
      name: 'readingTimeMinutes', title: 'Tempo estimado de leitura (minutos)', type: 'number',
      validation: (rule) => rule.required().integer().positive().max(180),
    }),
    defineField({
      name: 'featured', title: 'Exibir como destaque', type: 'boolean', initialValue: false,
      description: 'Use com parcimônia para manter a home editorialmente seletiva.',
    }),
    defineField({
      name: 'body', title: 'Texto da matéria', type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' }, { title: 'Intertítulo', value: 'h2' },
            { title: 'Título menor', value: 'h3' }, { title: 'Citação', value: 'blockquote' },
          ],
          marks: {
            decorators: [{ title: 'Negrito', value: 'strong' }, { title: 'Itálico', value: 'em' }],
            annotations: [{
              name: 'link', title: 'Link', type: 'object',
              fields: [defineField({ name: 'href', title: 'URL', type: 'url' })],
            }],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ], validation: (rule) => rule.required(),
    }),
    defineField({ name: 'seoDescription', title: 'Descrição para mecanismos de busca', type: 'text', rows: 3, validation: (rule) => rule.max(160) }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
})
