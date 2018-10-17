import functions from "./functions.js";

let setLoading = () => {
  return {
    type: "PLAYLIST_LOADING"
  };
};
let showPopup = payload => {
  return {
    type: "SHOW_POPUP",
    payload
  };
};

let closePopup = () => {
  return {
    type: "CLOSE_POPUP"
  };
};

let clearPopupUpdate = () => {
  return {
    type: "CLEAR_POPUP_UPDATE"
  };
};

let updatePopup = (payload, oldData) => {
  return {
    type: "UPDATE_POPUP",
    payload,
    oldData
  };
};
let deleteList = deleteData => {
  return {
    type: "DELETE_POPUP",
    deleteData
  };
};

let deleteAllLists = deleteAllListData => {
  return {
    type: "DELETE_ALL_LISTS",
    deleteAllListData
  };
};

let rockClicked = searchInfo => {
  return functions.onClickedGenre(searchInfo, "ROCK");
};

let rockUnclicked = searchInfo => {
  return functions.offClickedGenre(searchInfo, "ROCK");
};

let countryClicked = searchInfo => {
  return functions.onClickedGenre(searchInfo, "COUNTRY");
};

let countryUnclicked = searchInfo => {
  return functions.offClickedGenre(searchInfo, "COUNTRY");
};

let metalClicked = searchInfo => {
  return functions.onClickedGenre(searchInfo, "METAL");
};

let metalUnclicked = searchInfo => {
  return functions.offClickedGenre(searchInfo, "METAL");
};

let classicalClicked = searchInfo => {
  return functions.onClickedGenre(searchInfo, "CLASSICAL");
};

let classicalUnclicked = searchInfo => {
  return functions.offClickedGenre(searchInfo, "CLASSICAL");
};

let popClicked = searchInfo => {
  return functions.onClickedGenre(searchInfo, "POPMUSIC");
};

let popUnclicked = searchInfo => {
  return functions.offClickedGenre(searchInfo, "POPMUSIC");
};

let jazzClicked = searchInfo => {
  return functions.onClickedGenre(searchInfo, "JAZZ");
};

let jazzUnclicked = searchInfo => {
  return functions.offClickedGenre(searchInfo, "JAZZ");
};

let bluesClicked = searchInfo => {
  return functions.onClickedGenre(searchInfo, "BLUES");
};

let bluesUnclicked = searchInfo => {
  return functions.offClickedGenre(searchInfo, "BLUES");
};

let hiphopClicked = searchInfo => {
  return functions.onClickedGenre(searchInfo, "HIPHOP");
};

let hiphopUnclicked = searchInfo => {
  return functions.offClickedGenre(searchInfo, "HIPHOP");
};

let electroClicked = searchInfo => {
  return functions.onClickedGenre(searchInfo, "ELECTRO");
};

let electroUnclicked = searchInfo => {
  return functions.offClickedGenre(searchInfo, "ELECTRO");
};

let searchField = value => {
  return {
    type: "UPDATE_SEARCHFIELD",
    data: value
  };
};

let updateList = value => {
  return {
    type: "UPDATE_LIST",
    data: value
  };
};
let addPlaylist = value => {
  return {
    type: "ADD_PLAYLIST",
    data: value
  };
};
export default {
  showPopup,
  closePopup,
  clearPopupUpdate,
  updatePopup,
  deleteList,
  deleteAllLists,
  addPlaylist,
  rockClicked,
  rockUnclicked,
  countryClicked,
  countryUnclicked,
  metalClicked,
  metalUnclicked,
  classicalClicked,
  classicalUnclicked,
  popClicked,
  popUnclicked,
  jazzClicked,
  jazzUnclicked,
  bluesClicked,
  bluesUnclicked,
  hiphopClicked,
  hiphopUnclicked,
  electroClicked,
  electroUnclicked,
  searchField,
  updateList,
  setLoading
};
