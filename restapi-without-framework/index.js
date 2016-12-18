var server = require("./server.js");
var router = require("./router.js");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.all;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/add"] = requestHandlers.add;
handle["/update"] = requestHandlers.update;
handle["/delete"] = requestHandlers.delete_a;
handle["/all"] = requestHandlers.all;

server.start(router.route, handle);
