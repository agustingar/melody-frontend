import React, { useState, useEffect } from "react";
import "./HomeHeader.css";
import { Clear, SearchRounded } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import UserAvatar from "../../AppBar/UserAvatar";
import { useNavigate } from "react-router-dom";

function HomeHeader() {
  const [inputTrack, setInputTrack] = useState("");
  console.log(inputTrack);
  const [allSongs, setAllSongs] = useState("");
  console.log(allSongs);
  const [artistSongs, setArtistSongs] = useState({});
  console.log(artistSongs);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllSongs = async () => {
      const res = await fetch(
        // "https://melodystream.herokuapp.com/song/all-songs"
        "http://localhost:4000/song/all-songs"
      );
      const songs = await res.json();
      setAllSongs(songs);
    };
    getAllSongs();
  }, []);

  const handleSearch = (event) => {
    setInputTrack(event.target.value);
    allSongs.songs
      .filter((song) => {
        if (inputTrack === "") {
          return;
        } else if (
          song.artist.toLowerCase().includes(inputTrack.toLowerCase())
        ) {
          return song;
        }
      })
      .map((song, i) => setArtistSongs(song));
  };

  function handleSearchClear(e) {
    setInputTrack("");
  }

  const handleClick = () => {
    if (Object.keys(artistSongs).length === 0) {
      return;
    } else navigate("/explorer", { replace: true, state: { artistSongs } });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleClick();
    } else return;
  };

  const searchBar = (
    <div className="container" onKeyPress={(e) => handleEnter(e)}>
      <div className="search_input_container">
        <IconButton onClick={handleClick}>
          <SearchRounded />
        </IconButton>
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

  return (
    <div className="header-container-home">
      <div>
        <h1>
          <strong>Hello</strong> User!
        </h1>
      </div>

      {searchBar}
      <div className="settings-container">
        <IconButton className="classes.settings">
          <SettingsIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <Badge color="secondary" variant="dot">
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
        <UserAvatar />
      </div>
    </div>
  );
}

export default HomeHeader;
