import "./createSong.css";
import "../Favorites/Favorites.css";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useGetUserSongsQuery } from "../../redux/services/melodyApi";
import convertDuration from "../../functions/ConvertDuration";
import convertDurationPlaylist from "../../functions/ConvertDurationPlaylist";
import SongCard from "../SongCard/SongCard";
//Material UI
import { MusicNoteOutlined } from "@mui/icons-material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "react-responsive";

const Songs = () => {
  const token = localStorage.getItem("userToken");
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetUserSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [submitMsg, setSubmitMsg] = useState("");
  const [success, setSuccess] = useState("");

 
  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#303030",
    border: "2px solid #000",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectFile = (fileSelect) => {
    submitSelectFileToCloudinary(fileSelect);
  };

  const submitSelectFileToCloudinary = async (fileUpload) => {
    const formData = new FormData();
    formData.append("song", fileUpload);

    await fetch(
      "https://melody-music-stream-production.up.railway.app/cloud/uploadsong",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setSongUrl(result);
        setSuccess("File successfully upload");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://melody-music-stream-production.up.railway.app/song",
        {
          title: name,
          artist: artist,
          genre: "Pop",
          url: songUrl.url,
          duration: songUrl.duration,
        },
        {
          headers: {
            auth_token: token,
          },
        }
      );

      handleClose();
      setSubmitMsg("Song successfully upload");
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  const totalDuration = data.songs.map((song) => song.duration);

  return (
    <>{responsive ?
    <div className="container-responsive">
      <header className="head">
        <section className="info">
          <h2 style={{ color: "white" }}>
            Your upload songs
            <LibraryMusicIcon />
          </h2>
          <div className="details">
            <p>{data.songs.length} Songs</p>
            <p id="dot">&bull;</p>
            <p>{convertDurationPlaylist(totalDuration)}</p>
          </div>
        </section>
        <h3>{submitMsg}</h3>
        <Button
          onClick={handleOpen}
          startIcon={<AddCircleOutlineIcon style={{ color: "white" }} />}
          label="Add New Song"
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <Paper>
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <div className="inputText">
                  <TextField
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    label="Enter song name"
                    required={true}
                  />
                </div>
                <div className="inputArtist">
                  <TextField
                    name="artist"
                    label="Artist name"
                    required={true}
                    onChange={(e) => setArtist(e.target.value)}
                  />
                </div>
                <div>
                  <div className="inputDiv">
                    <Button
                      variant="contained"
                      component="label"
                      className="buttonFile"
                    >
                      {<MusicNoteOutlined />}
                      <input
                        className="inputs"
                        label="Choose song"
                        type="file"
                        accept="audio/*"
                        name="song"
                        onChange={(e) => handleSelectFile(e.target.files[0])}
                        hidden
                      />
                      Add song
                    </Button>
                  </div>
                </div>

                <h3 style={{ textAlign: "center", color: "#25dc8b" }}>
                  {success}
                </h3>

                <div className="inputSubmit">
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </Paper>
          </Box>
        </Modal>
      </header>
      <table className="upload-table ">
        <tbody className="uploads-responsive">
          {data.songs.map((song, i) => (
            <SongCard
              key={song._id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
              convertDuration={convertDuration}
            />
          ))}
        </tbody>
      </table>
    </div> :  <div className="container">
      <header className="head">
        <section className="info">
          <h1 style={{ color: "white" }}>
            Your upload songs
            <LibraryMusicIcon />
          </h1>
          <div className="details">
            <p>{data.songs.length} Songs</p>
            <p id="dot">&bull;</p>
            <p>{convertDurationPlaylist(totalDuration)}</p>
          </div>
        </section>
        <h3>{submitMsg}</h3>
        <Button
          onClick={handleOpen}
          startIcon={<AddCircleOutlineIcon style={{ color: "white" }} />}
          label="Add New Song"
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <Paper>
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <div className="inputText">
                  <TextField
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    label="Enter song name"
                    required={true}
                  />
                </div>
                <div className="inputArtist">
                  <TextField
                    name="artist"
                    label="Artist name"
                    required={true}
                    onChange={(e) => setArtist(e.target.value)}
                  />
                </div>
                <div>
                  <div className="inputDiv">
                    <Button
                      variant="contained"
                      component="label"
                      className="buttonFile"
                    >
                      {<MusicNoteOutlined />}
                      <input
                        className="inputs"
                        label="Choose song"
                        type="file"
                        accept="audio/*"
                        name="song"
                        onChange={(e) => handleSelectFile(e.target.files[0])}
                        hidden
                      />
                      Add song
                    </Button>
                  </div>
                </div>

                <h3 style={{ textAlign: "center", color: "#25dc8b" }}>
                  {success}
                </h3>

                <div className="inputSubmit">
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </Paper>
          </Box>
        </Modal>
      </header>
      <Typography sx={{ color: "white", fontSize: "1.5em", ml: "1.5em" }}>
        {data.songs.length === 0 && "You don't have any song uploaded!"}
      </Typography>
      <table className="favorites-table ">
        <tbody className="favorites_line__bottom">
          {data.songs.map((song, i) => (
            <SongCard
              key={song._id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
              convertDuration={convertDuration}
            />
          ))}
        </tbody>
      </table>
    </div>}
     </>
  );
};

export default Songs;
