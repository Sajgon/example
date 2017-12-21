const express = require('express');
const app = express();


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


app.listen(3000, function () {
  console.log('Webserver listening on port 3000');
});



app.use(myLogger);
app.use(express.static(__dirname + '/www'));


// Super simple middleware
function myLogger(req, res, next) {
    
    // Connection URL
    const dbName = "Vintergatan5a-analystics";
    var url = 'mongodb://localhost:27017/Vintergatan5a-analystics';

    
    // Add visitor statistics
    var insertDocuments = function(db, callback) {
          // Get the documents collection
          var collection = db.collection('visitors');
          // Insert some documents
          let d = new Date();
          let URL = req.headers.host;
          
          
        collection.insertMany([{date: d.getTime(), url: URL || null}], function(err, result) {
            assert.equal(err, null);
            //console.log("Inserted "+result.ops.length+" documents into the document collection");
            callback(result);
        });
    }

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, database) {
        assert.equal(null, err);
        // console.log("Connected correctly to server");
        
        const myDB = database.db(dbName);
        const collection = myDB.collection('visitors');
    
        insertDocuments(myDB, function() {
            console.log("Inserted Vistor data!");
        });
    });
    
    // redirect user to index.html
    //res.redirect('/index.html');
    
    // or send it to the next middleware or route
    next();
};










