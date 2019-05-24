function fetchAssets() {
    const fse = require('fs-extra');
    const path = require('path');
    const chalk = require('chalk');
    const glob = require('glob');

    let bookrc = {};

    fse.readJson(path.join('.', '.bookrc'))
        .then((bookrc) => {
            let promiseOne = fse.copy(path.join('.', 'interim', bookrc.basename, 'images'), path.join('.', 'assets', 'images'))
                .then(() => {
                    return console.log(chalk.blue(`Filling in images @bookiza: ${path.join('.', 'assets', 'images')}`));
                }).catch((err) => {
                    if (err)
                        console.log(chalk.bold.red('Failed to move images…', err));
                });

            let promiseTwo = '';

            glob(path.join('interim', bookrc.basename, '*.htm*'), '', (er, files) => {
                // console.log(files)
                promiseTwo = fse.readFile(path.join('.', files[0]), { encoding: 'utf16' })
                    .then((contents) => {

                        fse.writeFile(path.join('.', 'interim', 'original.html'), contents)
                            .then(() => {
                                return console.log(chalk.blue(`Original html @interim: ${path.join('.', 'interim')}`));
                            }).catch(() => {
                                if (err)
                                    console.log(chalk.bold.red('[Assetize] Failed to write HTML…', err));

                            });
                            // console.log('all good')
                    }).catch((err) => {
                        if (err)
                            console.log(chalk.bold.red('[Assetize] Failed to pick up contents', err));
                    });

            });

            return Promise.all([promiseOne, promiseTwo]);

        }).catch((err) => {
            console.log(err)
        })

}

module.exports.assetize = fetchAssets;
