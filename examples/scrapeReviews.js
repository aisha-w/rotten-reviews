const { scrapeReviews } = require('..')

scrapeReviews('m/venom_2018').then(results => {
  console.log(JSON.stringify(results, null, 2))
})
