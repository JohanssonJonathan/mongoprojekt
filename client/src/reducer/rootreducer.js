
const initState ={
  post:"javascript",
  popup:{
    ownerOfPlayList: false,
    showPopup: false,
    playListName: "Working out like Hackerman",
    userName: "Hackerman",
    genres: ["Electro", "Jazz", "Blues"],
    description: "This is what I use when I want to get PUMPED lifting computers at the gym",
    spotify: "https://open.spotify.com/user/smeknoob/playlist/3x4mBCp6ICZOBRfBmEXoS9?si=7M9X9NDWT3iK1fHfsZ0sBQ",
  }
}

const rootReducer = (state = initState, action)=>{

    console.log(action)
    switch(action.type){

      case "ADD":
        return {
          ...state,
          post:action.data
        }
      case "DELETE":
        return{
          ...state,
          post:action.data
        }

      default :
        return state
    }

}


export default rootReducer
