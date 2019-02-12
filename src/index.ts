import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import encode from 'strict-uri-encode'

const BASE_URL = 'https://www.rottentomatoes.com'
const MAX_REVIEWS_PER_PAGE = 20
const MAX_VISITABLE_PAGE = 51
const MAX_TOTAL_REVIEWS = MAX_VISITABLE_PAGE * MAX_REVIEWS_PER_PAGE

declare interface SearchMovieResult {
  name: string
  year: number
  url: string
}

declare interface SearchTvResult {
  title: string
  startYear: number
  url: string
}

declare interface RawSearchResult {
  movies: SearchMovieResult[]
  tvSeries: SearchTvResult[]
}

declare interface SearchResult {
  title: string
  year: number
  type: string
  slug: string
}

declare interface ScrapeResult {
  reviewer: String
  date: String
  stars: Number
  review: String
}

function createSearchUrl(query: string) {
  return `${BASE_URL}/api/private/v2.0/search?q=${encode(query)}`
}

function sortByYear(a: SearchResult, b: SearchResult) {
  if (a.year > b.year) return -1
  if (a.year < b.year) return 1
  return 0
}

export async function searchByQuery(query: string) {
  const res = await fetch(createSearchUrl(query))

  const { movies, tvSeries }: RawSearchResult = await res.json()

  const movieResults: SearchResult[] = movies.map(
    ({ name, year, url }): SearchResult => ({
      title: name,
      year,
      type: url.split('/')[1],
      slug: url.substring(1),
    })
  )

  const tvResults: SearchResult[] = tvSeries.map(
    ({ title, startYear, url }): SearchResult => ({
      title,
      year: startYear,
      type: url.split('/')[1],
      slug: url.substring(1),
    })
  )

  return [...movieResults, ...tvResults].sort(sortByYear)
}

export function createUrlFromSlug(slug: string, pageNumber: number = 1) {
  const page = Math.min(Math.max(1, pageNumber), MAX_VISITABLE_PAGE)

  return `${BASE_URL}/${slug}/reviews/?page=${page}&type=user&sort=`
}

export async function scrapeFromPageUrl(url: string) {
  const reviews: ScrapeResult[] = []

  const res = await fetch(url)
  const $ = cheerio.load(await res.text())

  $('.review_table_row').each((i, element) => {
    const stars = $(element).find('.glyphicon.glyphicon-star').length
    const hasHalfStar = $(element).find('span:contains("½")').length ? 0.5 : 0

    const [reviewer, date, review] = [
      '.bold.unstyled.articleLink',
      '.fr.small.subtle',
      '.user_review',
    ].map(classes =>
      $(element)
        .find(classes)
        .text()
        .trim()
    )

    reviews.push({
      reviewer,
      date,
      stars: stars + hasHalfStar,
      review,
    })
  })

  return reviews
}

export async function scrapeReviews(slug: string, desiredReviewCount?: number) {
  const reviewCount =
    typeof desiredReviewCount === 'undefined'
      ? MAX_REVIEWS_PER_PAGE
      : Math.max(
          MAX_REVIEWS_PER_PAGE,
          Math.min(desiredReviewCount, MAX_TOTAL_REVIEWS)
        )

  const pageCount = Math.ceil(reviewCount / MAX_REVIEWS_PER_PAGE)

  const pagesReviews: ScrapeResult[][] = await Promise.all(
    Array.from(Array(pageCount), (x, i) => {
      const url = createUrlFromSlug(slug, i)
      return scrapeFromPageUrl(url)
    })
  )

  return pagesReviews.reduce((a, b) => a.concat(b)).slice(0, desiredReviewCount)
}
