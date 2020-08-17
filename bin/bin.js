#! /usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const { Command } = require('commander')

const program = new Command()

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString())


program
  .command('fetch <url>')
  .alias('f')
  .description('Fetches a longscroll webpage')
  .option("-f, --force", "Force a fetch")
  .action(function(url, options) {
    var original = require(path.join('..', 'lib', 'fetch.js'))
    original.fetch(url, options)
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ pure fetch http(s)://url.html');
    console.log('    $ pure f http://url.html');
    console.log(chalk.bold('    $ pure f https://full_url_here.html    # shortform'));
    console.log();
  });


program
  .command('defile <file_path>')
  .alias('d')
  .description('Defile a file ')
  .option("-f, --force", "Force a sharding")
  .action(function(file_path, options) {
    var file = require(path.join('..', 'lib', 'defile.js'))
    file.defile(file_path, options)
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ pure defile _path_to_file_');
    console.log('    $ pure d _path_to_file_');
    console.log(chalk.bold('    $ p d _path_to_file_    # shortform'));
    console.log();
  });

program
  .command('turndown <file_path>')
  .alias('t')
  .option("-f, --force", "Force a sharding")
  .description('Ugly HTML to a clean markdown!')
  .action(function(file_path, options) {
    var file = require(path.join('..', 'lib', 'turndown.js'))
    file.defile(file_path, options)
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ pure turndown _path_to_html_');
    console.log('    $ pure t _path_to_html_');
    console.log(chalk.bold('    $ p t _path_to_html_    # shortform'));
    console.log();
  });


program
  .command('sanitize')
  .alias('s')
  .description('Sanitize your HTML inline with Bookiza requirements')
  .action(options => {
    const html = require(path.join('..', 'lib', 'sanitize.js'));
    html.sanitize(options)
  }).on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log('    $ pure sanitize ')
    console.log('    $ pure s ')
    console.log(chalk.bold.bgGreen('    $ a s'))
    console.log()
  });


program
  .command('assetize')
  .alias('a')
  .description('Fill in assets / html')
  .action(function() {
    var page = require(path.join('..', 'lib', 'assetize.js'))
    page.assetize()
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ abelone assetize ');
    console.log('    $ abelone a ');
    console.log(chalk.bold('    $ a a   #shortform'));
    console.log();
  });

// Command catchall
program
  .command('*')
  .on('--help', () => {
    console.log('  Examples:');
    console.log();
    console.log('    $ m2s <fetch> <url>');
    console.log();
  });

// Library version
program
  .version(packageJson.version, '-v, --VERSION', 'New version @bookiza')
  .parse(process.argv)


if (!program.args.length) {
  program.help();
}
