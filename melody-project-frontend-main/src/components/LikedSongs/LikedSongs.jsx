import { Favorite } from "@mui/icons-material";
import axios from "axios";
import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";

function LikedSongs({ song }) {
  const token = localStorage.getItem("userToken");
const [isFav, setIsFav] = useState("")
  const favorite = async (id) => {
    console.log(id);
    try {
      const data = await axios.put(
        // `https://melody-music-stream-production.up.railway.app/song/like/${id}`,
`http://localhost:4000/song/like/${id}`,
        {
          id: song._id,
        },
        {
          headers: {
            auth_token: token,
          },
        }
      );
      console.log(data);
      setIsFav(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={() => favorite(song._id)}>
      {isFav ? <Favorite className="favoriteIcon" /> : <FavoriteBorderIcon className="favoriteIcon" /> }
    </button>
  );
}

export default LikedSongs;
