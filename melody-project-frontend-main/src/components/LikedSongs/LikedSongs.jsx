import { Error, Favorite } from "@mui/icons-material";
import axios from "axios";
import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function LikedSongs({ song }) {
  const token = localStorage.getItem("userToken");

  const favorite = async (id) => {
    console.log(id);
    try {
      const result = await axios.put(
        `https://melody-music-stream-production.up.railway.app/song/like/${id}`,

        {
          id: song._id,
        },
        {
          headers: {
            auth_token: token,
          },
        }
      );
      console.log(song.likedBy);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(favorite);

  return (
    <button onClick={() => favorite(song._id)}>
     {favorite  ? <FavoriteBorderIcon className="favoriteIcon" /> :<Favorite className="favoriteIcon" /> } 
    </button>
  );
}

export default LikedSongs;
