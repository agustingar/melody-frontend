import axios from "axios";
import React from "react";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { useGetLikedSongsQuery } from "../../redux/services/melodyApi";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Favorite } from "@mui/icons-material";

function LikedSongs({ song }) {
  const token = localStorage.getItem("userToken");
  const { data, isFetching, error } = useGetLikedSongsQuery();

  const favorite = async (id) => {
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
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  // DISPLAY LIKED HEART ICON //
  //Get ids for each song object passed to player
  let songIdPassToPlayer = Object.values(song)[0];
  //Get ids for each song liked by the user
  const allLikedSongsIds = data.songs.map((id) => id._id);
  // Check in every heart button if song is liked or not
  let isSongLiked = allLikedSongsIds.includes(songIdPassToPlayer);

  return (
    <>
      {isSongLiked ? (
        <button onClick={() => favorite(song._id)}>
          <Favorite className="favoriteIcon" />
        </button>
      ) : (
        <button onClick={() => favorite(song._id)}>
          <FavoriteBorderIcon className="favoriteIcon" />
        </button>
      )}
    </>
  );
}

export default LikedSongs;
