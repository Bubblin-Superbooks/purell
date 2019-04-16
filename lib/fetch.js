function fetch(options) {
	const path = require('path')
	const request = require('request')
	const rp = require('request-promise')
	const chalk = require('chalk')
	const fse = require('fs-extra')

	let url = ''
	let abelonerc = {}

	abelonerc.START_PAGE = '5' // start page for pagination
	abelonerc.repo_url = ''

	if (options !== undefined && options.file !== undefined) {
		file_path = options.file

		fse.readFile(path.join('interim', 'prepared.markdown'), 'utf8').then((masala) => {
			const marked = require('marked')

			marked.setOptions({
				renderer: new marked.Renderer(),
				gfm: true,
				tables: true,
				breaks: false,
				pedantic: false,
				sanitize: true,
				smartLists: true,
				smartypants: false
			})

			fse.outputFile(path.join('interim', 'original.html'), `<body> ${marked(masala)} </body>`)

		}).catch(err => {
			console.log(err)
		})
	}

	if (options !== undefined && options.url !== undefined) {
		url = options.url

		abelonerc.url = url // provided by the user.
		abelonerc.basename = path.basename(url, path.extname(url))

		fse.outputFile('.abelonerc', JSON.stringify(abelonerc, null, 2)).then(() => {
			fse.ensureDir('interim')
		}).then(() => {
			const extension = path.extname(url)

			// TODO: Automatic fallback for exception cases
			switch (extension) {
				case '.txt':
					rp(url)
						.then(content => {
							fse.outputFile(path.join('interim', 'tmp', 'content.md'), content)
							const marked = require('marked')

							marked.setOptions({
								renderer: new marked.Renderer(),
								gfm: true,
								tables: true,
								breaks: false,
								pedantic: false,
								sanitize: true,
								smartLists: true,
								smartypants: false
							})

							fse.outputFile(path.join('interim', 'original.html'), `<body> ${marked(content)} </body>`)


						}).catch(err => {
							console.log(err)
						})
					break
				default:
					console.log('No suitable extensions')
					break;
			}

		}).catch(err => {
			console.error(err)
		})

	}

}

module.exports.fetch = fetch
