var action_db = require("./action_db");
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
	'<label name = "album">Album</label>'+
	'</br>'+
	'<input type="text" name="album" />'+ 
	'</br>'+
	'<label name = "artist">Artist</label>'+
	'</br>'+
	'<input type="text" name="artist" />'+ 
	'</br>'+
	/*	
	'<label name = "name_tracks">Name Tracks</label>'+
	'</br>'+
	'<input type="text" name="name_tracks" />'+ 
	'</br>'+
	'<textarea name="artist" rows="20" cols="60"></textarea>'+ 
	'</br>'+
	*/	
	'<label name = "name_tracks">Name Tracks</label>'+
	'</br>'+
	'<textarea name="name_tracks" rows="20" cols="60"></textarea>'+ 
	'</br>'+
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
	response.write("You've sent: " + querystring.parse(postData).name_tracks);
	
	action_db.start_db("add");

	response.end();
}

function add(response, postData){
	console.log("Request handler 'upload' was called");
	//return "Hello upload";
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("You've sent: " + querystring.parse(postData).name_tracks);
	
	action_db.start_db("add", querystring.parse(postData));

	response.end();
}

function delete_a(response, postData){
	console.log("Request handler 'delete' was called");
	//return "Hello upload";
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("You've sent: " + querystring.parse(postData).name_tracks);
	
	action_db.start_db("delete", querystring.parse(postData));

	response.end();
}

function update(response, postData){
	console.log("Request handler 'update' was called");
	//return "Hello upload";
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("You've sent: " + querystring.parse(postData).name_tracks);
	
	action_db.start_db("update", querystring.parse(postData));

	response.end();
}

function all(response, postData){
	console.log("Request handler 'all' was called");
	//return "Hello upload";
	response.writeHead(200, {"Content-Type" : "text/html"});
	
	var data_return;
	action_db.start_db("all", data_return);
	//response.write("You've sent: " + querystring.parse(postData).name_tracks);

	var tmp = '';
	debugger;
	console.log("data_return: " + data_return);

	// data_return.forEach(function(item, index) {
	// tmp = '    <td>' + item.album + '</td>'+
	// '    <td>' + item.album + '</td>'+
	// '    <td>' + '    <ul>';
	// 	item.tracks.forEach(function(item2, index) {
	// 		 '    <li>' + item2.name + '</li>';
	// 		//+
	// 		//'    <li>' + item.album + '</li>'+
	// 		//'    <li>' + item.tracks + '</li></ul>'+
	// 	});
	// '</ul>'	+ '</td>';
	// });
	
	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<table style="width:100%">'+
	'  <tr>'+
	'    <th>Album</th>'+
	'    <th>Artist</th> '+
	'    <th>Name Tracks</th>'+
	'  </tr>'+
	'  <tr>'+ tmp + '  </tr>'+
	'</table>'+
	'</body>'+
	'</html>';
	response.write(body);
	tmp = '';

	response.end();
}

exports.start = start;
exports.upload = upload;
exports.add = add;
exports.delete_a = delete_a;
exports.update = update;
exports.all = all;
