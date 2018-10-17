let {
  createUser,
  loginUser,
  getAllPlaylists,
  getUserPlaylist,
  createPlaylist,
  searchSelected,
  updatePlaylist,
  deleteListBackEnd
} = require("./database.js");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Default");
});

app.post("/login", (req, res) => {
  // REQ = username, email, pw
  //check if user has written correct username and password
  loginUser();
  res.send("Login");
});

app.post("/createUser", (req, res) => {
  // REQ = username, email, pw
  let user = "";
  req.on("data", data => {
    user += data;
  });

  req.on("end", function() {
    let obj = JSON.parse(user);
    createUser(obj);
  });
  //check if user allready exists if not create new user.
  res.send("Post user to DB");
});

app.post(
  "/createplaylist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let playlist = "";
    req.on("data", data => {
      playlist += data;
    });

    req.on("end", function() {
      let obj = JSON.parse(playlist);
      createPlaylist(obj, function(err, docs) {
        console.log("this is the docs: ", docs);
        res.send(JSON.stringify(docs));
      });
    });
  }
);

app.post(
  "/updateplaylist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let updatedPlaylist = "";
    req.on("data", data => {
      updatedPlaylist += data;
    });

    req.on("end", function() {
      let obj = JSON.parse(updatedPlaylist);
      updatePlaylist(obj, function(err, docs) {
        console.log("this is the docs: ", docs);
        res.send("updated");
      });
      res.send("updated");
    });
  }
);

app.get("/playlist", (req, res) => {
  //when user is logged in all the playlist should show up on the homepage

  let doc;
  getAllPlaylists("_", function(err, docs) {
    doc = docs;
    res.send(doc);
  });

  //when user is logged in all his or her playlists should be added to the state
  getUserPlaylist();
  // res.send("fetch all ");
});

app.get("/search", (req, res) => {
  //
  let searchText = req.query.searchText.toLowerCase();
  let firstGenre = req.query.firstGenre.toLowerCase();
  let secondGenre = req.query.secondGenre.toLowerCase();
  let thirdGenre = req.query.thirdGenre.toLowerCase();

  searchSelected(searchText, firstGenre, secondGenre, thirdGenre, function(
    err,
    docs
  ) {
    res.send(JSON.stringify(docs));
  });
  // REQ - genres, username, playlist name
  // res.send("Search");
});
app.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let listToDelete = "";
    // res.send(deleteList1)

    req.on("data", data => {
      listToDelete += data;
    });

    req.on("end", function() {
      deleteListBackEnd(JSON.parse(listToDelete));
      res.send("hej");

      //   createPlaylist(obj, function(err,docs){
      //     console.log("this is the docs: ", docs)
      //     res.send(JSON.stringify(docs))
      //})
      //});
    });
  }
);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
