import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../Top/Top.css";
import {
  useGetAllSongsQuery,
  useGetLikedSongsQuery,
} from "../../redux/services/melodyApi";
import SongCart from "../Top/SongCart";
import { Link } from "react-router-dom";
import convertDuration from "../../functions/ConvertDuration";
import Button from "@mui/material/Button";

function ExplorerSongs() {
  const { data, isFetching, error } = useGetAllSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [randomSongs, setRandomSongs] = useState([]);

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  function randomIndex(count) {
    return Math.floor(Math.random() * count);
  }

  function getRandomSongs() {
    const randomSongs = [];
    const songs = data.songs;
    const count = songs.length;
    const randomIndexes = new Set();
    while (randomIndexes.size < 8) {
      randomIndexes.add(randomIndex(count));
    }
    for (let index of randomIndexes) {
      randomSongs.push(songs[index]);
    }
    setRandomSongs(randomSongs);
  }

  return (
    <div className="top-songs-container all_songs__container">
      <h1 className="mb-3 not-italic font-bold font-mons text-xl text-white">
        Suggestions
      </h1>
      <section>
        {data?.songs.length > 0
          ? randomSongs.map((song, i) => {
              return (
                <SongCart
                  key={song._id}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data}
                  i={i}
                  convertDuration={convertDuration}
                />
              );
            })
          : null}
        <Button
          sx={{
            color: "white",
            borderColor: "white",
            m: 2,
            p: 1,
            pl: 3,
            pr: 3,
          }}
          variant="outlined"
          onClick={getRandomSongs}
        >
          GET SONGS
        </Button>
      </section>
    </div>
  );
}

export default ExplorerSongs;
