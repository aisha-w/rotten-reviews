<div align='center'>

# rotten-reviews

Scrape audience reviews from [Rotten Tomatoes](https://www.rottentomatoes.com) 🍅

[![NPM version](https://img.shields.io/npm/v/rotten-reviews.svg)](https://www.npmjs.com/package/rotten-reviews)
[![NPM download count](https://img.shields.io/npm/dt/rotten-reviews.svg)](https://www.npmjs.com/package/rotten-reviews)
[![Greenkeeper badge](https://badges.greenkeeper.io/ninetwenty-one/rotten-reviews.svg)](https://greenkeeper.io/)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/ninetwenty-one/rotten-reviews)

[![Rotten GIF](https://media.giphy.com/media/101t9QwTM6y5oc/giphy.gif)](https://spectrum.chat/ninetwenty-one/rotten-reviews)

</div>

- [Description](#description)
- [Usage](#usage)
  - [Adding to your project](#adding-to-your-project)
  - [Search titles using `searchByQuery`](#search-titles-using-searchbyquery)
  - [Fetch reviews using `scrapeReviews`](#fetch-reviews-using-scrapereviews)
  - [CLI usage](#cli-usage)
  - [Lambda Deployment](#lambda-deployment)
- [API](#api)
- [Related](#related)
- [License](#license)

## Description

This Node.js package fetches [Rotten Tomatoes](https://www.rottentomatoes.com) audience reviews (movies and TV shows) by scraping pages using [`cheerio`](https://github.com/cheeriojs/cheerio) and [`node-fetch`](https://github.com/bitinn/node-fetch). Notable features such as:

- Search movie or TV show titles
- Fetch whole audience reviews or by defined value
- Compiled from Typescript to CommonJS and ES modules
- Typescript declaration file available

Note that this package doesn't use official packages or API endpoints provided by RT.

## Usage

### Adding to your project

- Using `npm`

  ```sh
  npm install rotten-reviews
  ```

- Using `yarn`

  ```sh
  yarn add rotten-reviews
  ```

### Search titles using `searchByQuery`

- Script

  ```js
  // using require (commonjs)
  const { searchByQuery } = require('rotten-reviews')

  // using import (es module)
  import { searchByQuery } from 'rotten-reviews'

  searchByQuery('venom').then(results => {
    console.log(JSON.stringify(results, null, 2))
  })
  ```

- Output (truncated, fetched on December 20, 2018)

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

### Fetch reviews using `scrapeReviews`

- Script

  ```js
  // using require (commonjs)
  const { scrapeReviews } = require('rotten-reviews')

  // using import (es module)
  import { scrapeReviews } from 'rotten-reviews'

  scrapeReviews('m/venom_2018').then(results => {
    console.log(JSON.stringify(results, null, 2))
  })
  ```

- Output (truncated, fetched on December 20, 2018)

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

### CLI usage

Starting from version 2, `rotten-reviews` does not include any runnables. Instead, we made [`rotten-reviews-cli`](https://github.com/ninetwenty-one/rotten-reviews-cli) which is a CLI wrapper for `rotten-reviews`.

### Lambda Deployment

Powered with [Zeit Now](https://zeit.co/now), we created a lambda deployment that you can consume to search and scrape on [`rotten-lambda.now.sh`](https://rotten-lambda.now.sh) using these queries:

- `q` to search titles (e.g. `spider verse`)
- `s` to scrape reviews using title slugs obtained from search (e.g. `m/venom_2018`)
- `c` to define how many to scrape (works only with `s`)

Example queries:

- [`rotten-lambda.now.sh/?q=spider%20verse`](https://rotten-lambda.now.sh/?q=spider%20verse) to search titles
- [`rotten-lambda.now.sh/?s=m/venom_2018`](https://rotten-lambda.now.sh/?s=m/venom_2018) to scrape reviews
- [`rotten-lambda.now.sh/?s=m/venom_2018&c=3`](https://rotten-lambda.now.sh/?s=m/venom_2018&c=3) to scrape only 3 first reviews

You can view the source code for the deployment on the [demo directory](demo) or on the [deployment source page](https://rotten-lambda.now.sh/_src).

## API

Haven't done this part. Do [submit a pull request](https://github.com/ninetwenty-one/rotten-reviews/compare) if you want to contribute.

## Related

- [`murf`](https://github.com/grikomsn/murf) - [Metacritic Movie](https://www.metacritic.com/movie) user review fetcher

## License

MIT
