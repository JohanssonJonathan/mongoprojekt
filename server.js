let {createUser, loginUser, getAllPlaylists, getUserPlaylist} = require("./database.js")
const express = require("express");
const app = express();
const port = 5000;



app.get("/", (req,res) => {
    console.log("requsted URL: " + req.url);
    console.log(ConnectToDB)
    res.send("Default");
});

app.post("/login", (req,res) => {
    console.log("requsted URL: " + req.url);
    // REQ = username, email, pw
    //check if user has written correct username and password
    loginUser();
    res.send("Login");
});

app.post("/create", (req,res) => {
    console.log("requsted URL: " + req.url);
    // REQ = username, email, pw
    let user = ""
    req.on("data", (data)=>{
      user += data;
    })

    req.on("end", function(){
      let obj = JSON.parse(user);
      createUser(obj);

    })
    //check if user allready exists if not create new user.
    res.send("Post user to DB");
});

app.get("/playlist", (req,res) => {
  //when user is logged in all the playlist should show up on the homepage
    getAllPlaylists();

  //when user is logged in all his or her playlists should be added to the state
    getUserPlaylist();
    console.log("requsted URL: " + req.url);
    res.send("fetch all the music");
});

app.get("/search", (req,res) => {
    console.log("requsted URL: " + req.url);
    // REQ - genres, username, playlist name
    res.send("Search");
});

app.listen(port, () => {
    console.log("Listening on port " + port );
});
