var exec = require("child_process").exec;

var querystring = require("querystring");//,
/*			fs = require("fs"),
			formidable = require("formidable");
*/

function start(response, postData){
	console.log("Request handler 'start' was called");

	function sleep(milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds);
	}

	var content = "emtry";

	//exec("ls -lah", function(error, stdout, stderr){
	//	sleep(10000);
	//	content = stdout;
	//	response.writeHead(200,  {"Content-Type" : "text/plain"});
	//	response.write(stdout);
	//	response.end();
	//});

	/*	
	exec("find /", {timeout: 10000, maxBuffer: 20000*1024 }, function(error, stdout, stderr){
		content = stdout;
		response.writeHead(200,  {"Content-Type" : "text/plain"});
		response.write(stdout);
		response.end();
	});
	*/

	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" method="post">'+
	'<textarea name="text" rows="20" cols="60"></textarea>'+
	'<input type="submit" value="Submit text" />'+
	'</form>'+
	'</body>'+
	'</html>';
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
	
	//return content;
}

function upload(response, postData){
	console.log("Request handler 'upload' was called");
	//return "Hello upload";
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("You've sent: " + querystring.parse(postData).text);
	response.end();
}

exports.start = start;
exports.upload = upload;
