const express = require('express')
const app = express()
const cheerio = require('cheerio')
const rp = require('request-promise')

app.get('/api/imdb/search/:query', (req, res) => {
	const JQuery = req.params.query
	res.send(queryIMDB(JQuery, null))
})

app.listen(3000, () => {
	console.log('Ex app listening on port 3000!')
})

const queryIMDB = (search, cb) => {

	const options = {
		uri: 'http://www.imdb.com/find',
		qs: {
			ref_:'nv_sr_fn',
			q: search,
			s: 'all',
		},
		transform: function (body) {
			return cheerio.load(body)
		}
	}

	return rp(options)
		.then(function ($) {\
			const movieNames = $('.findSection')
				.first()
				.find('.result_text a')
				.not('small a')
				.map((i, elem) => $(elem).text())
				.toArray()
			console.log(movieNames)

			const movieYears = $('.findSection') 
				.first()
				.find('.result_text')
				.not('small a')
				.map((i, elem) => $(elem).text().match(/\(({.*})\)/))
				.toArray()
			console.log(movieYears)
		})
		.catch(function (err) {
			console.log('You have an error: ' + err)
			throw err
		})
}

const run = () => {
	const search = process.argv[2]

	queryIMDB(search)
}

if (!module.parent) { 
	run()
}

module.exports = queryIMDB