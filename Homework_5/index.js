
const dirWorker = require('../Homework_4/cli')
const url = require('url');



const express = require('express');
const app = express();
app.set('view engine', 'ejs')

app.use('/', function (req, res) {
    const queryParams = url.parse(req.url, true).query;
    const pathFromReq = queryParams.path || ".";
    console.log('-----------', dirWorker.isDir(pathFromReq))
    if (dirWorker.isDir(pathFromReq)) {
        const files = dirWorker.readDir(pathFromReq);
        res.render('directory', {
            title: pathFromReq,
            files: files,
        })
    } else {
        const fileContent = dirWorker.readFile(pathFromReq);
        res.render('fileContent', {
            content: fileContent,
            title: pathFromReq,
        }
        )
    }
})
app.listen(5555);












