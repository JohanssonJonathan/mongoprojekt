import React, { Component } from "react";

import "../App.css";
import { connect } from "react-redux";
import action from "../actions.js";

class CreateList extends Component {
  constructor() {
    super();
    this.state = {
      newList: {},
      name: true,
      description: true,
      spotify: true,
      message: "",
      listName: "",
      listDescription: "",
      listUrl: "",
      listGenres: [],
      clickedGenres: {
        ROCK: false,
        METAL: false,
        CLASSICAL: false,
        COUNTRY: false,
        POPMUSIC: false,
        BLUES: false,
        JAZZ: false,
        ELECTRO: false,
        HIPHOP: false
      }
    };
  }

  handleChange(e, val) {
    if (val === "name") {
      if (this.state.listName.length > 15) {
        this.setState({
          name: false
        });
      } else {
        this.setState({
          name: true
        });
      }
      this.setState({
        listName: e.target.value
      });
    } else if (val === "description") {
      if (this.state.listDescription.length > 150) {
        this.setState({
          description: false
        });
      } else {
        this.setState({
          description: true
        });
      }
      this.setState({
        listDescription: e.target.value
      });
    } else if (val === "spotify") {
      this.setState({
        listUrl: e.target.value
      });
    }
  }

  checkIfExist(val) {
    let newList = this.state.listGenres.filter(data => data === val);
    if (newList.length === 0) {
      if (this.state.listGenres.length === 3) {
        this.setState({
          message: "You can only have max three genres"
        });
        return;
      }

      let newClickedGenres = {};

      for (let x in this.state.clickedGenres) {
        if (val === x) {
          newClickedGenres[val] = true;
        } else {
          newClickedGenres[x] = this.state.clickedGenres[x];
        }
      }

      this.setState({
        clickedGenres: newClickedGenres,
        message: "",
        listGenres: [...this.state.listGenres, val]
      });
    } else {
      let newClickedGenres = {};

      for (let x in this.state.clickedGenres) {
        if (val === x) {
          newClickedGenres[val] = false;
        } else {
          newClickedGenres[x] = this.state.clickedGenres[x];
        }
      }

      let newList = this.state.listGenres.filter(data => data !== val);

      this.setState({
        clickedGenres: newClickedGenres,
        message: "",
        listGenres: [...newList]
      });
    }
  }

  clickGenre(val, fromCheckIfExist) {
    switch (val) {
      case "ROCK":
        this.checkIfExist(val);
        break;
      case "METAL":
        this.checkIfExist(val);
        break;
      case "POPMUSIC":
        this.checkIfExist(val);
        break;
      case "CLASSICAL":
        this.checkIfExist(val);
        break;
      case "COUNTRY":
        this.checkIfExist(val);
        break;
      case "JAZZ":
        this.checkIfExist(val);
        break;
      case "BLUES":
        this.checkIfExist(val);
        break;
      case "HIPHOP":
        this.checkIfExist(val);
        break;
      case "ELECTRO":
        this.checkIfExist(val);
        break;
      default:
    }
  }

  sendValues() {
    const { user } = this.props.auth;
    let newPlayList = {};
    let url = "/createplaylist";
    let regex = new RegExp("https://open.spotify.com/");
    let validateSpotify = regex.test(this.state.listUrl);

    if (!this.state.description || !this.state.name || !validateSpotify) {
      this.setState({
        message: "Something went wrong try again"
      });
    } else if (
      this.state.listName &&
      this.state.listDescription &&
      this.state.listUrl
    ) {
      //Här görs en fetch med alla värden!
      if (this.state.listGenres.length === 0) {
        this.setState({
          message: "You have to add at least one genre"
        });
      } else {
        let lowerCaseBeforePost = [];
        for (let i = 0; i < this.state.listGenres.length; i++) {
          lowerCaseBeforePost.push(this.state.listGenres[i].toLowerCase());
        }
        newPlayList = {
          playListName: this.state.listName,
          userName: user.name,
          description: this.state.listDescription,
          spotify: this.state.listUrl,
          genres: lowerCaseBeforePost,
          creator: user.id
        };
        this.setState({
          message: "List added!",
          listName: "",
          listDescription: "",
          listUrl: "",
          name: true,
          description: true,
          spotify: true
        });
      }
    } else {
      this.setState({
        message: "Something went wrong try again"
      });
    }
    let self = this;
    if (newPlayList.playListName || newPlayList.userName) {
      newPlayList.playListName = newPlayList.playListName.toLowerCase();
      newPlayList.userName = newPlayList.userName.toLowerCase();

      fetch(url, {
        method: "post",
        body: JSON.stringify(newPlayList),
        headers: {
          Authorization: `${localStorage.getItem("jwtToken")}`
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          self.props.dispatch(action.addPlaylist(data));
        });
    }
  }

  render() {
    let rock = this.state.clickedGenres.ROCK;
    let metal = this.state.clickedGenres.METAL;
    let classical = this.state.clickedGenres.CLASSICAL;
    let country = this.state.clickedGenres.COUNTRY;
    let popMusic = this.state.clickedGenres.POPMUSIC;
    let blues = this.state.clickedGenres.BLUES;
    let jazz = this.state.clickedGenres.JAZZ;
    let electro = this.state.clickedGenres.ELECTRO;
    let hiphop = this.state.clickedGenres.HIPHOP;

    let nameInp = this.state.name;
    let descriptionInp = this.state.description;
    let spotifyInp = this.state.spotify;

    return (
      <React.Fragment>
        <div>
          <h4>Create your own list</h4>

          <div className="inputDivs">
            {!nameInp && <span id="nameX">x</span>}
            <input
              type="text"
              placeholder="Name"
              value={this.state.listName}
              onChange={e => this.handleChange(e, "name")}
            />
          </div>

          <div className="inputDivs">
            {!descriptionInp && <span>x</span>}
            <input
              id="description"
              type="text"
              value={this.state.listDescription}
              onChange={e => this.handleChange(e, "description")}
              placeholder="Description"
            />
          </div>

          <div className="inputDivs">
            {!spotifyInp && <span id="spotifyX">x</span>}
            <input
              type="text"
              value={this.state.listUrl}
              onChange={e => this.handleChange(e, "spotify")}
              placeholder="Spotify url"
            />
          </div>

          {this.state.message === "List added!" ? (
            <span id="added">{this.state.message}</span>
          ) : (
            <span>{this.state.message}</span>
          )}
          <ul>
            {rock ? (
              <li
                id="rockUnderline"
                className="onClick"
                onClick={e => this.clickGenre("ROCK")}
              >
                Rock
              </li>
            ) : (
              <li id="rockUnderline" onClick={e => this.clickGenre("ROCK")}>
                Rock
              </li>
            )}
            {metal ? (
              <li
                id="metalUnderline"
                className="onClick"
                onClick={e => this.clickGenre("METAL")}
              >
                Metal
              </li>
            ) : (
              <li id="metalUnderline" onClick={e => this.clickGenre("METAL")}>
                Metal
              </li>
            )}
            {popMusic ? (
              <li
                id="popUnderline"
                className="onClick"
                onClick={e => this.clickGenre("POPMUSIC")}
              >
                Pop
              </li>
            ) : (
              <li id="popUnderline" onClick={e => this.clickGenre("POPMUSIC")}>
                Pop
              </li>
            )}
            {classical ? (
              <li
                id="classicalUnderline"
                className="onClick"
                onClick={e => this.clickGenre("CLASSICAL")}
              >
                Classical
              </li>
            ) : (
              <li
                id="classicalUnderline"
                onClick={e => this.clickGenre("CLASSICAL")}
              >
                Classical
              </li>
            )}
            {country ? (
              <li
                id="countryUnderline"
                className="onClick"
                onClick={e => this.clickGenre("COUNTRY")}
              >
                Country
              </li>
            ) : (
              <li
                id="countryUnderline"
                onClick={e => this.clickGenre("COUNTRY")}
              >
                Country
              </li>
            )}
            {jazz ? (
              <li
                id="jazzUnderline"
                className="onClick"
                onClick={e => this.clickGenre("JAZZ")}
              >
                Jazz
              </li>
            ) : (
              <li id="jazzUnderline" onClick={e => this.clickGenre("JAZZ")}>
                Jazz
              </li>
            )}
            {blues ? (
              <li
                id="bluesUnderline"
                className="onClick"
                onClick={e => this.clickGenre("BLUES")}
              >
                Blues
              </li>
            ) : (
              <li id="bluesUnderline" onClick={e => this.clickGenre("BLUES")}>
                Blues
              </li>
            )}
            {electro ? (
              <li
                id="electroUnderline"
                className="onClick"
                onClick={e => this.clickGenre("ELECTRO")}
              >
                Electro
              </li>
            ) : (
              <li
                id="electroUnderline"
                onClick={e => this.clickGenre("ELECTRO")}
              >
                Electro
              </li>
            )}
            {hiphop ? (
              <li
                id="hiphopUnderline"
                className="onClick"
                onClick={e => this.clickGenre("HIPHOP")}
              >
                Hiphop
              </li>
            ) : (
              <li id="hiphopUnderline" onClick={e => this.clickGenre("HIPHOP")}>
                Hiphop
              </li>
            )}
          </ul>

          <div className="saveDiv" onClick={e => this.sendValues()}>
            <span>Save list</span>
            <img alt="" src="compact-disc.png" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userName,
    searchField: state.playlist.searchField,
    searchInfo: state.playlist.searchInfo,
    userImg: state.playlist.userImg,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(CreateList);
