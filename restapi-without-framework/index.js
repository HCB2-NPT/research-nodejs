var server = require("./server.js");
var router = require("./router.js");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.all;
handle["/new_alb"] = requestHandlers.new_alb;
handle["/upload"] = requestHandlers.upload;
handle["/add"] = requestHandlers.add;
handle["/update"] = requestHandlers.update;
handle["/edit_alb"] = requestHandlers.edit_alb;
handle["/delete_alb"] = requestHandlers.delete_alb;
handle["/delete_confirm_alb"] = requestHandlers.delete_confirm_alb;
handle["/all"] = requestHandlers.all;
handle["/blocking"] = requestHandlers.blocking;
handle["/non_blocking"] = requestHandlers.non_blocking;

server.start(router.route, handle);
