import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import PlayPause from "../../SongCard/PlayPause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { playPause, setActiveSong } from "../../../redux/features/playerSlice";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LikedSongs from "../../LikedSongs/LikedSongs";
import axios from "axios";

function Songs({
  song,
  playlists,
  isPlaying,
  activeSong,
  data,
  i,
  convertDuration,
  playlistId,
}) {
  const token = localStorage.getItem("userToken") || null;

  const [successMsg, setSuccessMsg] = React.useState("");
  const [isSongAdd, setIsSongAdd] = React.useState(false);

  const [errorMsg, setErrorMsg] = React.useState("");
  const [hasServerError, hasSeverError] = React.useState(false);

  const [openError, setOpenError] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const addSuggestSong = async (e, songId, playlistId) => {
    e.preventDefault();
    const playId = playlistId;
    const songsId = songId;

    const options = {
      //url: `https://melodystream.herokuapp.com/playlist/add-song/${playId}`,
      url: `http://localhost:4000/playlist/add-song/${playId}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        auth_token: token,
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        song_id: songsId,
      },
    };

    try {
      const result = await axios(options);
      console.log(result.data.msg);
      setSuccessMsg(result.data.msg);
      setIsSongAdd(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
        setErrorMsg(error.response.data.msg);
        hasSeverError(true);
      }
    }
  };

  const allUserPlaylists = playlists?.data.map((playlist) => {
    return (
      <>
        <div
          key={playlist?._id}
          className="addToPlaylist_box"
          onClick={(e) => addSuggestSong(e, song?._id, playlist?._id)}
        >
          <div className="addToPlaylist_img">
            <img src={playlist?.thumbnail}></img>
          </div>
          <div className="addToPlaylist_list">
            <p>
              <b>{playlist?.name}</b>
            </p>
            <p className="addToPlaylist_list__numbersOfSong">
              {playlist?.tracks.length} songs
            </p>
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="container-song">
      <div className="cover-container">
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          className="playpause"
        />
      </div>
      <div className="info-container">
        <span>{song.title}</span>
        <div className="contributors">
          <p className="track-artist">{song.artist}</p>
        </div>
      </div>
      <LikedSongs song={song} />
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography sx={{ p: 1 }}>
            {convertDuration(song.duration)}
          </Typography>
        </div>
        <div>
          <Button
            aria-describedby={id}
            style={{ color: "black" }}
            onClick={handleClick}
          >
            <PlaylistAddIcon />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                pl: 3,
                pt: 2,
                pb: 2,
                borderBottom: "1px solid grey",
                fontWeight: "600",
              }}
            >
              Add to playlist
              <Button>
                <CloseIcon />
              </Button>
            </Typography>
            <Typography
              sx={{
                pl: 3,
                mt: 2,
                fontWeight: "400",
              }}
            >
              All playlist
            </Typography>
            <Box sx={{ mt: 0, pt: 0, p: 2 }}>
              <Typography component={"span"} variant={"body2"}>
                {allUserPlaylists}
              </Typography>
            </Box>
          </Popover>
        </div>
      </Box>
    </div>
  );
}

export default Songs;
