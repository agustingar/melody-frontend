import "./HomeHeader.css";
import "../../Top/Top.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Clear, SearchRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  useGetAllSongsQuery,
  useGetUserQuery,
} from "../../../redux/services/melodyApi";
import convertDuration from "../../../functions/ConvertDuration";
import SongCart from "../../Top/SongCart";
import HeadsetIcon from "@mui/icons-material/Headset";

function HomeHeader() {
  const { data, isFetching, error } = useGetAllSongsQuery();
  const {
    data: user,
    isFetching: userFetching,
    error: userError,
  } = useGetUserQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  //Handle Search explorer feature
  const [inputTrack, setInputTrack] = useState("");
  const [querySong, setQuerySong] = useState({
    song: "",
    i: "",
  });
  const [hasQuery, setHasQuery] = useState(false);
  const [displayPlayer, setDisplayPlayer] = useState(false);

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
        setHasQuery(true);
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
    setDisplayPlayer(false);
  }

  const handleClick = () => {
    if (Object.keys(querySong).length === 0) {
      return;
    } else {
      setDisplayPlayer(true);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleClick();
    } else return;
  };

  const searchBar = (
    <div className="search_explorer__bar">
      <div className="search_container" onKeyPress={(e) => handleEnter(e)}>
        <div className="search_input_container">
          <SearchRounded sx={{ marginRight: 2 }} />
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
      {hasQuery && (
        <div className="query-container">
          <div className="query-song">
            <SearchRounded className="btn-search--icon" onClick={handleClick} />
            <p>{querySong.song.artist}</p>
            <p>{querySong.song.title}</p>
          </div>
        </div>
      )}
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
    <div className="header-container-home">
      <p className="header-user--name">
        <b>Hello</b> {user?.user.name}!
      </p>
      <div>{searchBar}</div>
      {displayPlayer && (
        <div className="listen-songs-container">
          <div>
            <HeadsetIcon sx={{ marginRight: 1 }} />
          </div>
          <section>
            <SongCart
              key={querySong.song._id}
              song={querySong.song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={querySong.i}
              convertDuration={convertDuration}
            />
          </section>
        </div>
      )}
    </div>
  );
}

export default HomeHeader;
