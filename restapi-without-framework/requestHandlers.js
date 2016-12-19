var action_db = require("./action_db");
var exec = require("child_process").exec;

var querystring = require("querystring"); //,
/*			fs = require("fs"),
			formidable = require("formidable");
*/

function new_alb(response, postData) {
    console.log("Request handler 'new_alb' was called");

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

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/add" method="post">' +
        '<label name = "album">Album</label>' +
        '</br>' +
        '<input type="text" name="album" />' +
        '</br>' +
        '<label name = "artist">Artist</label>' +
        '</br>' +
        '<input type="text" name="artist" />' +
        '</br>' +
        /*	
        '<label name = "name_tracks">Name Tracks</label>'+
        '</br>'+
        '<input type="text" name="name_tracks" />'+ 
        '</br>'+
        '<textarea name="artist" rows="20" cols="60"></textarea>'+ 
        '</br>'+
        */
        '<label name = "name_tracks">Name Tracks</label>' +
        '</br>' +
        '<textarea name="name_tracks" rows="5" cols="50"></textarea>' +
        '</br>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();

    //return content;
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called");
    //return "Hello upload";
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("You've sent: " + querystring.parse(postData).name_tracks);

    action_db.start_db("add");

    response.end();
}

function add(response, postData) {
    console.log("Request handler 'upload' was called");
    //return "Hello upload";
    response.writeHead(200, { "Content-Type": "text/html" });
    console.log("You've sent: " + querystring.parse(postData).name_tracks);

    data_post = querystring.parse(postData);

    var arr_tracks = [];
    // var s_tracks_tmp = "[";
    data_post.name_tracks.replace(/\s+/g, '').split(",").forEach(function(track, index) {
        arr_tracks.push(JSON.parse('{"name":' + '"' + track + '"}'));
        // s_tracks_tmp += '"name":' + '"' + track + '",';
    });
    // s_tracks_tmp = s_tracks_tmp.slice(0, -1);
    // s_tracks_tmp += "]";

    debugger;
    // var arr_tracks = JSON.parse(s_tracks_tmp);

    var o = {
        album: data_post.album,
        artist: data_post.artist,
        tracks: arr_tracks
    };
    var tb = '';
    action_db.start_db("add", function(success) {
        if (success == true) {
            // response.write('function() { alert("Add Album Success!"); }');
            tb = "Add Album Success!";
        } else {
            // response.write('alert("Add Album Error!")');
            tb = "Add Album Error!";
        }

        var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        tb+
        '<br />'+
        '<a href="/">' + "Về trang chủ " + '</a>';
        '</body>' +
        '</html>';

        response.write(body);

        response.end();
    }, o);
}

function delete_confirm_alb(response, rawData) {
    debugger;
    var _id = querystring.parse(rawData)._id;
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/delete_alb" method="post" style="text-align: center">' +
        'Bạn có muốn xóa album này?' +
        '</br>' +
        '<input type="hidden" name="_id" value="' + _id + '" />' +
        '<input type="submit" value="OK" />' +
        '<input type="button" value="Cancel" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function delete_alb(response, postData) {
    console.log("Request handler 'delete' was called");

    response.writeHead(200, { "Content-Type": "text/html" });

    action_db.start_db("delete", function(success) {
        var tb = '';
        if (success == true) {
            tb = "Album Deleted Success!";
        } else {
            tb = "Album Deleted Error!";
        }
        
        var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        tb+
        '<br />'+
        '<a href="/">' + "Về trang chủ " + '</a>';
        '</body>' +
        '</html>';

        response.write(body);

        response.end();
    }, querystring.parse(postData));
}

function edit_alb(response, rawData) {
    console.log("rawData: " + rawData);
    data = querystring.parse(rawData);
    console.log("data: " + data);

    console.log("Request handler 'edit_alb' was called");

    action_db.start_db("find", function(arr_data) {
        debugger;
        var data_r = arr_data[0];
        var arr_tracks = [];
        data_r.tracks.forEach(function(item) { arr_tracks.push(item.name) });

        var body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' +
            'charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<form action="/update" method="post">' +
            '<input type="hidden" name="_id" value="' + data._id + '" />' +
            '<label name = "album">Album</label>' +
            '</br>' +
            '<input type="text" name="album" value=" ' + data_r.album + '" />' +
            '</br>' +
            '<label name = "artist">Artist</label>' +
            '</br>' +
            '<input type="text" name="artist" value=" ' + data_r.artist + '" />' +
            '</br>' +
            '<label name = "name_tracks">Name Tracks</label>' +
            '</br>' +
            '<textarea name="name_tracks" rows="5" cols="50">' + arr_tracks.join(", ") + '</textarea>' +
            '</br>' +
            '<input type="submit" value="Submit text" />' +
            '</form>' +
            '</body>' +
            '</html>';

        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(body);
        response.end();
    }, data);

    //return content;
}

function update(response, postData) {
    console.log("Request handler 'update' was called");
    //return "Hello upload";
    response.writeHead(200, { "Content-Type": "text/html" });
    console.log("You've sent: " + querystring.parse(postData).name_tracks);

    data_post = querystring.parse(postData);

    var arr_tracks = [];
    data_post.name_tracks.replace(/,\s+/g, ',').split(",").forEach(function(track, index) {
        arr_tracks.push(JSON.parse('{"name":' + '"' + track + '"}'));
    });
    debugger;

    var o = {
        _id: data_post._id,
        album: data_post.album,
        artist: data_post.artist,
        tracks: arr_tracks
    };

    action_db.start_db("update", function(success) {
        var tb = '';
        if (success == true) {
            tb = "Album Updated Success!";
        } else {
            tb = "Album Updated Error!";
        }
        
        var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        tb+
        '<br />'+
        '<a href="/">' + "Về trang chủ " + '</a>';
        '</body>' +
        '</html>';

        response.write(body);

        response.end();
    }, o);
}

function all(response, postData) {
    console.log("Request handler 'all' was called");
    //return "Hello upload";
    response.writeHead(200, { "Content-Type": "text/html" });

    var data_return;
    console.log("data_return1: " + data_return);

    var tmp = '';
    // debugger;
    action_db.start_db("all", function(response_db_all) {
        data_return = response_db_all;
        console.log("type of data_return: " + typeof data_return);

        data_return.forEach(function(item, index) {
            tmp += '  <tr>';
            tmp += '    <td>' + item.album + '</td>' +
                '    <td>' + item.artist + '</td>' +
                '    <td>' + '    <ul>';

            var tmp_tracks = "";
            item.tracks.forEach(function(item2, index) {
                console.log("tracks: " + JSON.stringify(item2));
                tmp_tracks += '    <li>' + item2.name + '</li>';
                //+
                //'    <li>' + item.album + '</li>'+
                //'    <li>' + item.tracks + '</li></ul>'+
            });
            tmp += tmp_tracks;
            tmp += '</ul>' + '</td>';
            // onClick="function { confirm("Press a button!"); }"
            tmp += '    <td><a href="/delete_confirm_alb?_id=' + item._id + '">' + "Xóa " + '</a></td>';
            tmp += '    <td><a href="/edit_alb?_id=' + item._id + '">' + "Sửa " + '</a></td>';
            tmp += '  </tr>';
        });

        // console.log("data_return[0] " + typeof data_return[0]);
        // console.log("data_return[0] " + JSON.stringify(data_return[0]));

        var body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' +
            'charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<table style="width:100%" border="1">' +
            '  <tr>' +
            '    <th>Album</th>' +
            '    <th>Artist</th> ' +
            '    <th>Name Tracks</th>' +
            '    <th colspan="2">Action</th>' +
            '  </tr>' +
            tmp +
            '</table>' +
            '<a href="./new_alb">Add Album</a>';
        '</body>' +
        '</html>';
        response.write(body);

        response.end();
    });

    //response.write("You've sent: " + querystring.parse(postData).name_tracks);
    // exec("find ./", {timeout: 10000, maxBuffer: 20000*1024 }, function(error, stdout, stderr){
    // 	// console.log("data_return2: " + data_return);

    // 	// data_return.forEach(function(item, index) {
    // 	// tmp = '    <td>' + item.album + '</td>'+
    // 	// '    <td>' + item.album + '</td>'+
    // 	// '    <td>' + '    <ul>';
    // 	// 	item.tracks.forEach(function(item2, index) {
    // 	// 		 '    <li>' + item2.name + '</li>';
    // 	// 		//+
    // 	// 		//'    <li>' + item.album + '</li>'+
    // 	// 		//'    <li>' + item.tracks + '</li></ul>'+
    // 	// 	});
    // 	// '</ul>'	+ '</td>';
    // 	// });

    // 	// var body = '<html>'+
    // 	// '<head>'+
    // 	// '<meta http-equiv="Content-Type" content="text/html; '+
    // 	// 'charset=UTF-8" />'+
    // 	// '</head>'+
    // 	// '<body>'+
    // 	// '<table style="width:100%">'+
    // 	// '  <tr>'+
    // 	// '    <th>Album</th>'+
    // 	// '    <th>Artist</th> '+
    // 	// '    <th>Name Tracks</th>'+
    // 	// '  </tr>'+
    // 	// '  <tr>'+ tmp + '  </tr>'+
    // 	// '</table>'+
    // 	// '</body>'+
    // 	// '</html>';
    // 	// response.write(body);

    // 	// response.end();
    // });


    // console.log("data_return2: " + data_return);

    // // data_return.forEach(function(item, index) {
    // // tmp = '    <td>' + item.album + '</td>'+
    // // '    <td>' + item.album + '</td>'+
    // // '    <td>' + '    <ul>';
    // // 	item.tracks.forEach(function(item2, index) {
    // // 		 '    <li>' + item2.name + '</li>';
    // // 		//+
    // // 		//'    <li>' + item.album + '</li>'+
    // // 		//'    <li>' + item.tracks + '</li></ul>'+
    // // 	});
    // // '</ul>'	+ '</td>';
    // // });

    // var body = '<html>'+
    // '<head>'+
    // '<meta http-equiv="Content-Type" content="text/html; '+
    // 'charset=UTF-8" />'+
    // '</head>'+
    // '<body>'+
    // '<table style="width:100%">'+
    // '  <tr>'+
    // '    <th>Album</th>'+
    // '    <th>Artist</th> '+
    // '    <th>Name Tracks</th>'+
    // '  </tr>'+
    // '  <tr>'+ tmp + '  </tr>'+
    // '</table>'+
    // '</body>'+
    // '</html>';
    // response.write(body);
    // tmp = '';

    // response.end();
}

exports.new_alb = new_alb;
exports.upload = upload;
exports.add = add;
exports.delete_confirm_alb = delete_confirm_alb;
exports.delete_alb = delete_alb;
exports.edit_alb = edit_alb;
exports.update = update;
exports.all = all;
