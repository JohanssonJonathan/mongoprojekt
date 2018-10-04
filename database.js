const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'sharemusic';  // Database Name


//check if user allready exists if not create new user.
function createUser(user){
  console.log(user)
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "users";

      db.collection(collectionName).insertOne(user)

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

//check if user has written correct username and password
function loginUser(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "users";

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

//when user is logged in all the playlist should show up on the homepage
function getAllPlaylists(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

//when user is logged in all his or her playlists should be added to the state
function getUserPlaylist(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}





module.exports = {createUser, loginUser, getAllPlaylists, getUserPlaylist };
