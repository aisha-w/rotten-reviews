# Rotten Reviews API

- [scrapeReviews](#scrapereviews)
- [searchByQuery](#searchbyquery)

### scrapeReviews
`scrapeReviews(slug, desiredReviewCount?)`

Returns the desired number of reviews for the specified slug. Each review consists of the reviewer's name, date of review, number of stars given, and their comments.

**Sample Request**
```js
// using require (commonjs)
const { scrapeReviews } = require('rotten-reviews')

// using import (es module)
import { scrapeReviews } from 'rotten-reviews'

scrapeReviews('m/venom_2018').then(results => {
  console.log(JSON.stringify(results, null, 2))
})
```
##### Parameters
`slug` (string) **required**  
-- A shorthand given to a title.
`desiredReviewCount?` (number) **required**  
-- The number of reviews you want to scrape.
**Sample Output (truncated, fetched on December 20, 2018)**
```json
[
  {
    "reviewer": "Cory L",
    "date": "December 19, 2018",
    "stars": 4,
    "review": "After watching the movie I gotta say it was good. It doesn't need spider Man though I would love to see that interaction. I am looking forward to seeing a sequel."
  },
  {
    "reviewer": "Shawn R",
    "date": "December 19, 2018",
    "stars": 4,
    "review": "Critics be damned, I liked it. Lots of action, and it doesn't take itself too seriously. Venom was given a bit of personality rather than being a glorified sticky suit."
  },
  ...
]
```

#### searchByQuery
`searchByQuery(query)`

Returns title, year, type, and slug information for every title with the same name.

**Sample Request**
```js
// using require (commonjs)
const { searchByQuery } = require('rotten-reviews')

// using import (es module)
import { searchByQuery } from 'rotten-reviews'

searchByQuery('venom').then(results => {
  console.log(JSON.stringify(results, null, 2))
})
```
##### Parameters
`query` (string) **required**  
-- The name of the movie you're searching for.
**Sample Output (truncated, fetched on December 20, 2018)**
```json
[
  {
    "title": "Venom",
    "year": 2018,
    "type": "m",
    "slug": "m/venom_2018"
  },
  {
    "title": "Venom",
    "year": 2016,
    "type": "m",
    "slug": "m/venom"
  },
  ...
]
```
