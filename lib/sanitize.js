function sanitize() {

    const fse = require('fs-extra')
    const path = require('path')

    fse.readFile(path.join('interim', 'original.html'), 'utf8', (err, original) => {
        if (err) throw err

        const cheerio = require('cheerio')

        const $ = cheerio.load(original, {
            normalizeWhitespace: true,
            xmlMode: true,
            decodeEntities: false
        })

        // Remove Gutenberg declarations
        $('pre').first().remove()
        $('pre').last().remove()

        // Remove Table of Contents from the webpage.
        $('p.toc').remove()
        $('div.toc').remove()
        $('table[summary="ToC"]').remove()
        $('table[summary="toc"]').remove()

        // Get rid of 'By' from Author Name.
        // $('h2').first().replaceWith(`<h1> ${ $('h2').first().text().replace('By','') } </h1>`)

        let aboriginal = $('body').html()

        const cleaner = require('clean-html')
        const sanitizeHtml = require('sanitize-html')


        const strippedHTML = sanitizeHtml(aboriginal, {
            allowedTags: ['p', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'em', 'strong', 'i', 'b', 'pre', 'img', 'ul', 'ol', 'li', 'a', 'figure', 'figcaption'],
            allowedAttributes: {
                img: ['src', 'name', 'alt', 'width'],
                hr: ['class'],
                '*': []
            },
            nonTextTags: ['style', 'script', 'textarea', 'noscript', 'title'],
            selfClosing: ['img', 'hr'],
            exclusiveFilter({tag, text}) {
                return tag !== 'img' && tag !== 'hr' && !text.trim();
            },
            transformTags: {
                'i' (tagName, attribs) {
                    return {
                        tagName: 'em'
                    }
                }
            },
            allowedSchemes: ['http', 'https', 'mailto'],
            allowedSchemesByTag: {
                img: ['http', 'data', 'https']
            },
            textFilter: (text) => text.replace(/\-\-/g, '—').replace(/\.\.\./g, '…')
            
        })

        cleaner.clean(strippedHTML, { wrap: 0 }, book => {
            const path = require('path');
            const fse = require('fs-extra');
            const chalk = require('chalk');


            fse.readJson(path.join('.', '.bookrc'))
                .then((bookrc) => {
                    if (bookrc.asset_url === '') return
                    
                    let asset_url = bookrc.asset_url

                    return book.replace(new RegExp("src=\"images/", 'g'), `class=\"overlay\" width=\"100\%\" height=\"100\%\" src=\"${asset_url}/images/`)
                }).then(book => book.replace(new RegExp("&quot;", 'g'), '"')).then((book) => {
                    let finalbook = `<body>${book}</body>`;

                    const saver = require(path.join('..', 'lib', 'saver.js'));
                    const filename = 'sanitized';

                    saver.save(finalbook, filename);

                }).catch((err) => {
                    if (err)
                        console.log(chalk.bold.red('Failed to pick up contents', err))

                })
        })
    })

    return

}

module.exports.sanitize = sanitize;
