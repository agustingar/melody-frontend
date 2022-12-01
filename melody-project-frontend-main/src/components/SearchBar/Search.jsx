import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Clear, SearchRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import HeadsetIcon from "@mui/icons-material/Headset";

//Components
import { useGetAllSongsQuery } from "../../redux/services/melodyApi";
import convertDuration from "../../functions/ConvertDuration";
import SongCart from "../Top/SongCart";
import BrowserAll from "./BrowserAll";

import "./SearchBar.css";
import "./search.css";

export default function Search() {
  //Handle player
  const { data, isFetching, error } = useGetAllSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  //Handle Search explorer feature
  const [hasQuery, setHasQuery] = useState(false);
  const [inputTrack, setInputTrack] = useState("");
  const [querySong, setQuerySong] = useState({
    song: "",
    i: "",
  });

  const handleSearch = (event) => {
    setInputTrack(event.target.value);
    data.songs
      .filter((song) => {
        if (inputTrack === "") {
          return;
        } else if (
          song.artist.toLowerCase().includes(inputTrack.toLowerCase()) ||
          song.title.toLowerCase().includes(inputTrack.toLocaleLowerCase())
        ) {
          return song;
        }
      })
      .map((song, i) => {
        setQuerySong((prevSong) => {
          return {
            ...prevSong,
            song: song,
            i: i,
          };
        });
      });
  };

  function handleSearchClear(e) {
    setInputTrack("");
    setHasQuery(false);
  }

  console.log(inputTrack.length);

  const handleClick = () => {
    if (Object.keys(querySong).length === 0) {
      return;
    } else {
      setHasQuery(true);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleClick();
    } else return;
  };

  const searchBar = (
    <div onKeyPress={(e) => handleEnter(e)}>
      <div className="search_input_container">
        <SearchRounded sx={{ marginRight: 2 }} onClick={handleClick} />
        <input
          type="text"
          placeholder="Explorer"
          name="songTitle"
          onChange={handleSearch}
          value={inputTrack}
        />
        <IconButton onClick={handleSearchClear}>
          <Clear />
        </IconButton>
      </div>
    </div>
  );

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <main>
      <header className="search_bar">{searchBar}</header>
      <div className="search_container">
        {hasQuery ? (
          <div className="top-result">
            <h2 className="mb-3 not-italic font-bold font-mons text-xl text-white">
              Top result <HeadsetIcon sx={{ fontSize: "2rem" }} />
            </h2>

            <div className="top-result">
              <SongCart
                key={querySong.song._id}
                song={querySong.song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                i={querySong.i}
                convertDuration={convertDuration}
              />
            </div>
          </div>
        ) : (
          <aside className="browser-all">
            <h1 className="mb-3 not-italic font-bold font-mons text-xl text-white">
              Browser all
            </h1>
            <div>
              <BrowserAll />
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
