const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'sharemusic';  // Database Name

//WE create two collections named users and playlist
MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
   if( err ) throw err;  // if unable to connect
    const db = client.db(dbName);  // ansluten
    const collectionName = "users";
    console.log("connected")
    db.createCollection(collectionName, function(err, res) {
       if (err) throw err;

       console.log(`Collection created named "${collectionName}"`);
       client.close();  // remember to close connections when done

     });
});

MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
   if( err ) throw err;  // if unable to connect
    const db = client.db(dbName);  // ansluten
    const collectionName = "playlist";

    db.createCollection(collectionName, function(err, res) {
       if (err) throw err;
       console.log(`Collection created named "${collectionName}"`);

       client.close();  // remember to close connections when done
     });
});
