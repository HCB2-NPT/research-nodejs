var http = require("http");
var url = require("url");

function start(route, handle) {
    http.createServer(function(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received");
        if (request.method.toLowerCase() == 'post') {
            request.setEncoding("utf8");

            request.addListener("data", function(postDataChunk) {
                postData += postDataChunk;
                console.log("Received POST data chunk '" +
                    postDataChunk + "'.");
            });

            request.addListener("end", function() {
                route(handle, pathname, response, postData);
            });
        } else if (request.method.toLowerCase() == 'get') {
            route(handle, pathname, response, request.url.split('?')[1]);
        }

        //response.writeHead(200, {"Content-Type": "text/plain"});

        //var content = route(handle, pathname, response);
        //response.write(content);

        //response.end();
    }).listen(8888);
    console.log("Server Start!");
}
exports.start = start;
