async function fetch(url, options) {
    const path = require('path')
    const request = require('request')
    const rp = require('request-promise')
    const chalk = require('chalk')
    const fse = require('fs-extra')
    const fs = require('fs')


    let bookrc = await fse.readJson(path.join('.', '.bookrc'))

    bookrc.source_url = url // Source url provided by the user.
    bookrc.basename = path.basename(url, path.extname(url))
    bookrc.start_page = '9' // start page for pagination

    fse.outputFile('.bookrc', JSON.stringify(bookrc, null, 2)).then(() => {
            fse.ensureDir('interim')
        }).then(() => {
            const extension = path.extname(url)

            // TODO: Automatic fallback for exception cases
            switch (extension) {
                case '.txt':
                    rp(url)
                        .then(content => {
                            fse.outputFile(path.join('interim', 'tmp', 'prepared.markdown'), content)
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

                            fse.outputFile(path.join('interim', 'markdown.html'), `<body> ${marked(content)} </body>`)


                        }).catch(err => {
                            console.log(err)
                        })
                    break
                case '.html':
                    rp(url)
                        .then(content => {
                            fse.outputFile(path.join('interim', 'original.html'), content)
                        }).catch(err => {
                            console.log(err)
                        })
                    break;
                case '.htm':
                    rp(url)
                        .then(content => {
                            fse.outputFile(path.join('interim', 'original.html'), content)
                        }).catch(err => {
                            console.log(err)
                        })
                    break;
                case '.pdf':
                    console.log(extension)
                    break;
                case '.zip':
                    const unzip = require('unzip')

                    request(url)
                        .pipe(fs.createWriteStream(path.join('.', 'interim', 'book.zip')))
                        .on('close', function() {
                            console.log(chalk.blue('Prebook zip downloaded.'))
                            fs.createReadStream(path.join('.', 'interim', 'book.zip')).pipe(unzip.Extract({ path: path.join('.', 'interim') }))
                        })

                    break;
                default:
                    break;
            }

        }).catch(err => {
            console.error(err)
        })

}

module.exports.fetch = fetch
