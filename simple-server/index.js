var http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end('Ahihi Đồ\' Ngok\'s!');
}).listen(8000);
