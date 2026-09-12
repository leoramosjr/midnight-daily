import {getCliClient} from 'sanity/cli'

const site = 'https://sites.google.com/view/midnightdaily'
const featuredDocumentIds = new Set([
  'legacy-ainda-que-ele-me-mate',
  'legacy-dois-homens-em-um-hospicio',
  'legacy-estrangeiros-dentro-da-propria-mente',
])

const articles = [
  ['filmes', 'filmes/blade-runner-humanidade-em-prazo-de-validade'],
  ['livros', 'livros/livros-2/o-amanhã-que-talvez-não-virá'],
  ['filmes', 'filmes/e-se-deus-usasse-capa'],
  ['jogos', 'jogos/como-hollywood-influencia-os-jogos'],
  ['jogos', 'jogos/resident-evil-9-o-réquiem-da-franquia'],
  ['materias-especiais', 'matérias-especiais/no-carnaval-fora-de-época-de-guaíba-entre-fantasias-música-e-encontros-im'],
  ['livros', 'livros/o-caso-de-charles-dexter-ward'],
  ['filmes', 'filmes/a-história-da-gente-é-segredo'],
  ['livros', 'livros/livros-2/a-anatomia-do-saque'],
  ['livros', 'livros/livros-2/o-século-do-cansaço'],
  ['quadrinhos', 'quadrinhos/quadrinhos-2/batman-messias'],
  ['quadrinhos', 'quadrinhos/quadrinhos-2/porque-super-heróis-são-legais-explicado-pelo-homem-animal'],
  ['quadrinhos', 'quadrinhos/quadrinhos-2/superman-laços'],
  ['quadrinhos', 'quadrinhos/quadrinhos-2/ainda-que-ele-me-mate'],
  ['quadrinhos', 'quadrinhos/quadrinhos-2/dois-homens-em-um-hospício'],
  ['quadrinhos', 'quadrinhos/quadrinhos-2/estrangeiros-dentro-da-própria-mente'],
]

const decode = (value) => value
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(x[\da-f]+|\d+);/gi, (_, entity) => String.fromCodePoint(
    entity[0].toLowerCase() === 'x' ? Number.parseInt(entity.slice(1), 16) : Number.parseInt(entity, 10),
  ))

const textFromHtml = (value) => decode(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())

const metadata = (html, name) => {
  const match = html.match(new RegExp(`<meta[^>]+property="${name}"[^>]+content="([^"]*)"`, 'i'))
  return match ? decode(match[1]) : undefined
}

const slugify = (title) => title
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const block = (text, index) => ({
  _type: 'block', _key: `legacy-${index.toString(36)}`, style: 'normal', markDefs: [],
  children: [{_type: 'span', _key: `legacy-span-${index.toString(36)}`, marks: [], text}],
})

async function sourceToDocument(category, path) {
  const sourceUrl = `${site}/${path}`
  const response = await fetch(sourceUrl)
  if (!response.ok) throw new Error(`Não foi possível ler ${sourceUrl}: ${response.status}`)
  const html = await response.text()
  const rawTitle = metadata(html, 'og:title') || path.split('/').at(-1)
  const title = rawTitle.replace(/^Midnight Daily\s*-\s*/i, '').trim()
  const paragraphs = [...html.matchAll(/<p\b[^>]*class="[^"]*zfr3Q[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => textFromHtml(match[1]))
    .filter(Boolean)

  if (!paragraphs.length) throw new Error(`Nenhum texto foi encontrado em ${sourceUrl}`)

  const work = paragraphs.find((paragraph) => /^(obra|título|filme|livro|jogo|quadrinho)\s*:/i.test(paragraph))
    ?.replace(/^[^:]+:\s*/, '')
  const firstEssayParagraph = paragraphs.find((paragraph) => paragraph.length >= 140) || paragraphs[0]
  const timestamp = html.match(/data-last-updated-at-time="(\d+)"/i)?.[1]
  const publishedAt = timestamp ? new Date(Number(timestamp)).toISOString() : new Date().toISOString()
  const words = paragraphs.join(' ').trim().split(/\s+/).length
  const slug = slugify(title)

  return {
    _id: `legacy-${slug}`,
    _type: 'article',
    title,
    slug: {_type: 'slug', current: slug},
    category,
    workTitle: work,
    excerpt: firstEssayParagraph.slice(0, 320),
    author: 'R. R. Cardoso',
    publishedAt,
    readingTimeMinutes: Math.max(1, Math.ceil(words / 200)),
    featured: featuredDocumentIds.has(`legacy-${slug}`),
    body: paragraphs.map(block),
    seoDescription: firstEssayParagraph.slice(0, 160),
    legacyImport: true,
    legacySourceUrl: sourceUrl,
  }
}

const docs = []
for (const [category, path] of articles) {
  const doc = await sourceToDocument(category, path)
  docs.push(doc)
  console.log(`Preparada: ${doc.title}`)
}

const client = getCliClient({apiVersion: '2026-09-11'})
const transaction = docs.reduce((tx, doc) => tx.createIfNotExists(doc), client.transaction())
await transaction.commit()
await Promise.all(docs.map((doc) => client.patch(doc._id)
  .set({legacyImport: true, featured: featuredDocumentIds.has(doc._id)})
  .unset(['legacyCoverUrl', 'legacyCoverAlt'])
  .commit()))
console.log(`${docs.length} matérias importadas com sucesso.`)
