import { defineQuery } from 'next-sanity'

export const featuredArticlesQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    author,
    readingTimeMinutes,
    publishedAt,
    workTitle,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt
  }
`)

export const articlesByCategoryQuery = defineQuery(`
  *[_type == "article" && category == $category && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    author,
    readingTimeMinutes,
    publishedAt,
    workTitle,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt
  }
`)

export const allArticlesQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    author,
    readingTimeMinutes,
    publishedAt,
    workTitle,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt
  }
`)

export const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    category,
    excerpt,
    author,
    readingTimeMinutes,
    publishedAt,
    workTitle,
    body,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    "coverImageCaption": coverImage.caption
  }
`)
