#!/usr/local/bin/node

const { lstatSync } = require('fs');
const fs = require('fs');
const path = require("path");
const inquirer = require("inquirer");
const yargs = require("yargs");
// const readline = require("readline");
// const fs = require("fs/promises");


// console.log(process.argv)
// const [filePath] = process.argv.slice(2);

// const options = yargs
//     .usage('Usage: -p <path to the file')
//     .option('p', {
//         alias: 'path',
//         describe: 'Path to tha file',
//         type: 'string',
//         demandOption: 'true'
//     }).argv;
// console.log(options);
// fs.readFile(options.p, 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// })

// rl.question("Введите путь до файла: ", (filePath) => {
//     console.log(filePath);
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(data)
//         }
//     })
//     rl.close();
// })

// const question = async (query) => new Promise(resolve => rl.question(query, resolve));

// (async () => {
//     const filePath = await question('Введите путь до файла: ');
//     const encode = await question('Введите кодировку: ');
//     const fullPath = path.resolve(__dirname, filePath);
//     const data = await fs.readFile(fullPath, encode);
//     console.log(fullPath);
//     console.log(data);
//     rl.close();
// })();
// isDir = (file) => {
//     lstatSync(file).isDirectory();
// }

const executionDir = process.cwd();
const options = yargs
    .usage('Usage: -p <path to the file or directory')
    .option('p', {
        alias: 'path',
        describe: 'Path to the file',
        type: 'string',
        default: executionDir,
    })
    .option(
        'f', {
        alias: 'find',
        describe: 'Find in the file',
        type: 'string',
        demandOption: 'false',
        default: null,
    }).argv;
console.log(options);

const dirpath = options.p;
let fileNames = [];
async function readingDirectory(directory) {
    fileNames = await fs.promises.readdir(directory);

    const answer = await inquirer.prompt(
        {
            name: 'fileName',
            type: 'list',
            message: 'Выберите файл для чтения',
            choices: fileNames,
        }
    ).then(answer => answer.fileName);

    let stat = lstatSync(path.resolve(directory, answer));
    if (stat.isDirectory()) {

        currentDirectory = path.resolve(executionDir, answer);

        return await readingDirectory(currentDirectory);
    } else {

        const fullPath = path.join(directory, answer);

        const data = fs.readFileSync(fullPath, 'utf-8');

        if (options.f == null) {
            console.log(data);
            console.log("No criteria for search");
        } else {
            const regExp = new RegExp(options.f, 'igm');
            console.log(data.match(regExp));
        }
    }
}
readingDirectory(dirpath)


