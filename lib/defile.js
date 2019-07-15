module.exports.defile = (file_path, options) => {

	const path = require('path')
	const chalk = require('chalk')
	const fse = require('fs-extra')
	const marked = require('marked')


	if (file_path === undefined) { file_path = path.join('interim', 'tmp', 'prepared.markdown') }

	fse.readFile(file_path, 'utf8').then((masala) => {

		marked.setOptions({
				renderer: new marked.Renderer(),
				gfm: true,
				tables: false,
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





