const { searchByQuery } = require('../dist')

searchByQuery('venom').then(results => {
  console.log(JSON.stringify(results, null, 2))
})
