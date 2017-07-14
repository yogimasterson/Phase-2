const cheerio = require('cheerio')
const rp = require('request-promise')

function queryIMDB(search, cb) {

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
		.then(function ($) {
			const movieNames = $('.findSection')
				.first()
				.find('.result_text')
				.map((i, elem) => $(elem).text())
				.toArray()
			console.log(movieNames.join('\n'))
			return movieNames.join('\n')
		})
		.catch(function (err) {
			console.log('You have an error: ' + err)
			throw err
		})
}	

function run() {
	const search = process.argv[2]

	queryIMDB(search)
}

if (!module.parent) { 
	run()
}

module.exports = queryIMDB