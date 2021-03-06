import React, { Component } from "react";

import "../App.css";
import { connect } from "react-redux";
import action from "../actions";
import Genres from "./Genres.js";
import CreateList from "./CreateList.js";
import { logoutUser } from "../actions/authActions";
import RemoveLists from "./RemoveLists.js";

import { clearCurrentProfile } from "../actions/authActions";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      createList: "Create list",
      clicked: false,
      clickedCreateList: {
        opacity: 0,
        height: 0,
        zIndex: -1
      },

      clickedInfo: false,
      clickedGetUserInfo: {
        opacity: 0,
        height: 0,
        zIndex: -1
      }
    };
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.dispatch(clearCurrentProfile());
    this.props.dispatch(logoutUser());
  }

  createListClick() {
    if (this.state.clickedInfo) {
      this.setState({
        clickedInfo: false,
        clickedGetUserInfo: {
          opacity: 0,
          height: "0px",
          zIndex: -1
        }
      });
    }

    if (this.state.clicked) {
      this.setState({
        createList: "Create list",
        clicked: false,
        clickedCreateList: {
          opacity: 0,
          height: "0px",
          zIndex: -1
        }
      });
    } else {
      this.setState({
        createList: "Return",
        clicked: true,
        clickedCreateList: {
          opacity: 1,
          height: "470px",
          zIndex: 1
        }
      });
    }
  }

  getUserInfo() {
    if (this.state.clickedInfo) {
      this.setState({
        clickedInfo: false,
        clickedGetUserInfo: {
          opacity: 0,
          height: "0px",
          zIndex: -1
        }
      });
    } else {
      this.setState({
        clickedInfo: true,
        clickedGetUserInfo: {
          opacity: 1,
          height: "470px",
          zIndex: 1
        }
      });
    }
  }
  changeInp(e) {
    this.props.dispatch(action.searchField(e.target.value));
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      let genreObj = this.props.searchInfo;
      let searchField = this.props.searchField;

      let genreArray = [];

      for (let element in genreObj) {
        if (genreObj[element]) {
          genreArray.push(element);
        }
      }

      fetch(
        `/search?searchText=${searchField}&firstGenre=${
          genreArray[0]
        }&secondGenre=${genreArray[1]}&thirdGenre=${genreArray[2]}`
      ).then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.props.dispatch(action.updateList(json));
          });
        }
      });
    }
  }

  removeAll(ev) {
    const { user } = this.props.auth;

    let self = this;
    fetch("/deleteall", {
      //mode: 'no-cors',
      method: "POST",
      // headers: {
      // Accept: 'application/json',
      // },
      body: JSON.stringify(user.id)
    }).then(function(response) {
      return response;
    });
    self.props.dispatch(action.deleteAllLists(user.id));
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <div className="user" onClick={e => this.getUserInfo()}>
        <span id="username">{user.name}</span>
        <button onClick={this.onLogoutClick.bind(this)}>Log out</button>
      </div>
    );
    return (
      <React.Fragment>
        <div className="sidebarHeader">
          <span id="createList" onClick={e => this.createListClick()}>
            {this.state.createList}
          </span>
          <div style={this.state.clickedCreateList} className="styleTransition">
            <CreateList />
          </div>
          <div
            style={this.state.clickedGetUserInfo}
            className="styleTransition"
          >
            <RemoveLists />
          </div>
          <span id="username">{isAuthenticated ? authLinks : ""} </span>
        </div>

        <div className="header">
          <img className="userImg" alt="" src={user.img} />
          <Genres />
          <div className="inputfield">
            <div className="clip" />
            <input
              type="text"
              value={this.props.searchField}
              onChange={e => this.changeInp(e)}
              onKeyPress={e => this.handleKeyPress(e)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.playlist.userName,
    searchField: state.playlist.searchField,
    searchInfo: state.playlist.searchInfo,
    userImg: state.playlist.userImg,
    auth: state.auth,
    playlist: state.playlist.playListArray,
    id: state.playlist.id
  };
};

export default connect(mapStateToProps)(Header);
