import React, { Component } from 'react';
import './Popup.css';

import { connect } from "react-redux"
import action from "./actions.js"

class Popup extends Component {


  componentDidMount(){
    //if User owns list dispatch ownerOfPlayList:true

  }
  render() {
    let allowedToEdit = this.props.popup.ownerOfPlayList;
    let listGenres = this.props.popup.genres;
    let showPopup = this.props.popup.showPopup;

    if(showPopup !== true){
      return (
          <React.Fragment>
          </React.Fragment>
      )
    }
      if (allowedToEdit) {
        return (
          <div className="popup">
            <div className={"popup_inner"}>
              <div className="informationPlayList">
                <input className="playListTitleEdit" value={this.props.popup.playListName} /> <br />
                <h3 className="playListInformation">Genres:</h3>

                <ul>{listGenres.map(function (genre, index) {
                  return <li key={index}><input value={genre} /></li>
                })}</ul>

                <h3 className="playListInformation">Playlist name:</h3>
                <input className="editInformation" value={this.props.popup.playListName} /> <br />
                <h3 className="playListInformation">Created by:</h3>
                <input className="editInformation" value={this.props.popup.userName} /> <br />
                <h3 className="playListInformation">Description:</h3>
                <input className="editInformation" value={this.props.popup.description} /> <br />
                <h3 className="playListInformation">Spotify link:</h3>
                <input className="editInformation" value={this.props.popup.spotify} />
              </div>
              <br />

            </div>
            <button className="closeBtn">Close</button>

          </div>

        );
      } else {
        return (
          <div className="popup">
            <div className={"popup_inner"}>
              <div className="informationPlayList">
                <h1 className="playListTitle">{this.props.popup.playListName}</h1> <br />
                <h3 className="playListInformation">Genres:</h3>

                <ul>{listGenres.map(function (genre, index) {
                  return <li key={index}>{genre}</li>
                })}</ul>

                <h3 className="playListInformation">Playlist name:</h3>
                <span>{this.props.popup.playListName}</span> <br />
                <h3 className="playListInformation">Created by:</h3>
                <span>{this.props.popup.userName}</span> <br />
                <h3 className="playListInformation">Description:</h3>
                <span>{this.props.popup.description}</span> <br />
                <a className="spotifyLink" href={this.props.popup.spotify} target="_blank">Listen to it now!</a>
              </div>
              <br />
            </div>
            <button className="closeBtn">Close</button>
          </div>
        );
      }
  }
}

const mapStateToProps = (state)=>{
  return{
    popup : state.popup
  }
}

export default connect(mapStateToProps)(Popup);
