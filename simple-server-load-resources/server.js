var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer((req, res) => {

    // Get URL
    var filePath = req.url;
    if ('/' == filePath) {
        filePath = './index.html';
    } else {
        filePath = '.' + filePath;
    }

    // Get Extension for MIME
    var extName = path.extname(filePath);
    var contentType = 'text/html';
    switch(extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    // Load resources
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content, 'utf-8');
                }
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    });
}).listen(8000);
