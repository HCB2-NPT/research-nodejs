var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
	fs.readFile('./view/index.html', (err, content) => {
		if (err) {
			res.writeHead(500);
			res.end();
		} else {
			res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
			res.end(content, 'utf-8');
		}
	});
}).listen(8000);
