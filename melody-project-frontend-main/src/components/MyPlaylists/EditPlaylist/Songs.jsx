import * as React from "react";
import { useDispatch } from "react-redux";
import PlayPause from "../../SongCard/PlayPause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { playPause, setActiveSong } from "../../../redux/features/playerSlice";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LikedSongs from "../../LikedSongs/LikedSongs";
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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



  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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

  const updateSong = async (e, songId, playlist_Id) => {
    e.preventDefault();
    const playId = playlist_Id;
    const songsId = songId;
    let endPoint;

    //change endpoint dynamically based onClick button
    const map = e.currentTarget.dataset;
    const obj = { ...map };

    if (obj.testId === "add-song") {
      endPoint = obj.testId;
    }
    if (obj.testId === "remove-song") {
      endPoint = obj.testId;
    }

    const options = {
      url: `https://melody-music-stream-production.up.railway.app/playlist/${endPoint}/${playId}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        auth_token: token,
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        songsId,
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

  //Render all user playlists in add to playlist button
  const allUserPlaylists = playlists?.data.map((playlist) => {
    return (
      <>
        <div
          key={playlist?._id}
          data-test-id="add-song"
          className="addToPlaylist_box"
          onClick={(e) => updateSong(e, song?._id, playlist?._id)}
        >
          <div className="addToPlaylist_img">
            <img src={playlist?.thumbnail} alt={playlist.title} />
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
      <LikedSongs song={song} key={song._id} data={data} />
      <Box sx={{ display: "flex" }}>

        <Typography sx={{ p: 1 }}>
          {convertDuration(song.duration)}
        </Typography>

        {/* vertical dots */}

        <Button
          aria-describedby={"options"}
          style={{ color: "black" }}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>

        <Popover
          id={"options"}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}

        >
          <div style={{ width: '300px' }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleAccordion('panel1')} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{<div style={{display:'flex'}}><PlaylistAddIcon/> <Typography>Add to playlist</Typography></div>}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ mt: 0, pt: 0 }}>
                  <Typography component={"span"} variant={"body2"}>
                    {allUserPlaylists}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordion('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>{<div style={{display:'flex'}}> <DeleteIcon /> <Typography>Delete song</Typography></div>} </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div
                    data-test-id="remove-song"
                    onClick={(e) => updateSong(e, song?._id, playlistId)}
                  >
                    <Button style={{ color: "black" }}>
                      <DeleteIcon />
                      <Typography sx={{ fontSize: "10px" }}>
                        Remove from playlist
                      </Typography>
                    </Button>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Popover>

      </Box>
    </div>
  );
}

export default Songs;
