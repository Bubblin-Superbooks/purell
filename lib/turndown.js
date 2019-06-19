module.exports.defile = async (file_path, options) => {

	const path = require('path')
	const chalk = require('chalk')
	const fse = require('fs-extra')
	const TurndownService = require('turndown')



	if (file_path === undefined) { file_path = path.join('interim', 'original.html') }



		let content = await fse.readFile(file_path).catch(err => { console.log(`HTML => Markdown conversion failed. Exiting process due to… ${err}`); process.exit(0) })

		let turndownService = new TurndownService()

		let [ html = '<h1> 404 </h1>'] = [ content.toString() ]

		let md = turndownService.turndown(html)

		await fse.outputFile(path.join('.', 'interim', 'prepared.markdown'), md).catch(err => {console.log(`Outputting alternate markdown ${err}`)})

		console.log('prepare.markdown inside interim/ folder')

}





