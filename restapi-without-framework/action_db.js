var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/album';

function start_db(act, callback, data) {
	// debugger;
	data = data || null;
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected successfully to server");

	  switch(act)
	  {
	    case "add":
		console.log("data: " + data);
		// {
		//     album:"Kobukovu",
		//     artist:"Đen",
		//     tracks: [
		//     	{"name":"Mơ"},{"name":"Cô gái bàn bên"}
		//     ]
		// };

		insertDocuments(db, data, function(success) {
		  console.log("success: " + success);
		  db.close();
		  return callback(success);
		});
	    break;
	    case "delete":
		  console.log("data: " + data);
		  removeDocument(db, data, function() {
		    db.close();
		  });
	    break;
	    case "update":
		  console.log("data: " + data);
		  updateDocument(db, function() {
		    db.close();
		  });
	    break;
	    default:
		  console.log("data: " + data);
		  findDocuments(db, function(data_r) {
		  	console.log("data_r: " + JSON.stringify(data_r));
		    	db.close();
		    	return callback(data_r);
		  });
	    break;
	  }

	  /*
	  insertDocuments(db, function() {
	    db.close();
	  });
	  */

	  /*
	  findDocuments(db, function() {
	    db.close();
	  });
	  */
	  
	  /*
	  updateDocument(db, function() {
	    db.close();
	  });
	  */  

	  /*
	  removeDocument(db, function() {
	    db.close();
	  });
	  */
	  
	  /*
	  indexCollection(db, function() {
	    db.close();
	  });
	  */

	  /*
	  insertDocuments(db, function() {
	    db.close();
	  });
	  */
	});
};

var insertDocuments = function(db, data, callback) {
  // Get the documents collection
  var collection = db.collection('albums');
  /*
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
  */

  collection.insertOne(
    data
  , function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.insertedCount);
    console.log("Inserted 1 documents into the collection");
    callback(true);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('albums');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var findDocumentsFilter = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('albums');
  // Find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });      
}

var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('albums');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ _id : data._id }
    , { $set: data }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 1");
    callback(result);
  });  
}

var removeDocument = function(db, data, callback) {
  // Get the documents collection
  var collection = db.collection('albums');
  // Insert some documents
  collection.deleteOne(data, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 1");
    callback(result);
  });    
}

// var indexCollection = function(db, callback) {
//   db.collection('albums').createIndex(
//     { "a": 1 },
//       null,
//       function(err, results) {
//         console.log(results);
//         callback();
//     }
//   );
// };

exports.start_db = start_db;
