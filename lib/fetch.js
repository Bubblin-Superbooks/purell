function fetch(url, options) {
    const path = require('path')
    const request = require('request')
    const rp = require('request-promise')
    const chalk = require('chalk')
    const fse = require('fs-extra')
    const fs = require('fs')


    let abelonerc = {}

    abelonerc.url = url // provided by the user.
    abelonerc.basename = path.basename(url, path.extname(url))
    abelonerc.START_PAGE = '5' // start page for pagination
    abelonerc.repo_url = ''

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
