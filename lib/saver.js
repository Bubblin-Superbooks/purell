function saveFile(html, filename) {

    const path = require('path');
    const chalk = require('chalk');
    const fse = require('fs-extra');

    filename = `${filename}.html`;

    fse.mkdirs('interim')
        .then(() => {
            fse.writeFile(path.join('interim', filename), html)
                .then(() => {
                    console.log(`${filename} page saved!`);
                }).catch((err) => {
                    if (err) return console.log(err);
                });
        }).catch((err) => {
            if (err)
                console.log(chalk.bold.yellow('Failed to create interim/ directory…', err));
        });

}


module.exports.save = saveFile;
