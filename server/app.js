const http = require('http')
const fs = require('fs')
const path = require('path')

const projectRoot = path.dirname(__dirname)
const publicRoot = projectRoot + path.sep + 'dist' + path.sep

const getFileName = (filePath) => {
    if (filePath === '/') return publicRoot + 'index.html'
    return path.join(publicRoot, ...filePath.split(path.sep))
}

http.createServer((req, res) => {
    const filename = getFileName(req.url)
    try {
        const file = fs.readFileSync(filename)
        res.end(file)
    } catch(e) {
        res.statusCode = 404
        res.end('not found path: ' + req.url)
    }
}).listen(8080, () => {
    console.log('server was started on http://localhost:8080')
})