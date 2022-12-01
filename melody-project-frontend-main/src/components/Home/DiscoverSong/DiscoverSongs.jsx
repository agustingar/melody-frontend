 import "../../Top/Top.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllSongsQuery } from "../../../redux/services/melodyApi";
import SongCart from "../../Top/SongCart";
import convertDuration from "../../../functions/ConvertDuration";
import Button from "@mui/material/Button";

function DiscoverSongs() {
  const { data, isFetching, error } = useGetAllSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [randomSongs, setRandomSongs] = useState([]);

  function randomIndex(count) {
    return Math.floor(Math.random() * count);
  }

  function getRandomSongs() {
    const randomSongs = [];
    const songs = data.songs;
    const count = songs.length;
    const randomIndexes = new Set();
    while (randomIndexes.size < 7) {
      randomIndexes.add(randomIndex(count));
    }
    for (let index of randomIndexes) {
      randomSongs.push(songs[index]);
    }
    setRandomSongs(randomSongs);
  }

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <div className="top-songs-container all_songs__container">
      <h1 className="mb-3 not-italic font-bold font-mons text-xl text-white">
        Discover new songs
      </h1>
      <section>
        {randomSongs.map((song, i) => {
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
        })}
        <Button
          className="btn-home--getSongs"
          sx={{
            color: "black",
            backgroundColor: "#fefefe",
            m: 2,
            p: 0.5,
            pl: 3,
            pr: 3,
          }}
          variant="outlined"
          onClick={getRandomSongs}
        >
          Get songs
        </Button>
      </section>
    </div>
  );
}

export default DiscoverSongs;
