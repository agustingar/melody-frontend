import React, { useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetPlaylistQuery } from "../../redux/services/melodyApi";
import { useNavigate } from "react-router-dom";
import CreatePlaylistModal from "./CreatePlaylist/CreatePlaylistModal";

function Playlists() {
  const token = localStorage.getItem("userToken");
  const { data, isFetching, error } = useGetPlaylistQuery();
  const playlists = data?.data;
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const deletePlaylist = async (playlistId) => {
    const result = await fetch(
      `https://melodystream.herokuapp.com/playlist/${playlistId}`,
      {
        method: "DELETE",
        headers: { auth_token: token },
        id: playlistId,
      }
    );

    console.log(result);

    navigate(`/playlists`);
  };

  const getPlaylist = async (playlistId) => {
    await fetch(`https://melodystream.herokuapp.com/playlist/${playlistId}`, {
      method: "GET",
      headers: { auth_token: token },
      id: playlistId,
    });
    navigate(`/playlist/${playlistId}`);
  };

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <div className="home_playlist_container">
      <header className="flex h-44 mb-1">
        <section className="flex flex-col justify-center grow ml-5">
          <h1 className=" not-italic text-3xl font-black whitespace-nowrap text-ellipsis leading-80">
            Your Playlists
          </h1>
          <div>{playlists.length} Playlists</div>
        </section>
      </header>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        <div className="flex flex-col w-[200px] h-[230px]  p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
          <div className="relative w-full h-56 group">
            <PlaylistAddIcon sx={{ fontSize: "100px", marginTop: "-8%" }} />
          </div>

          <div className="mt-4 flex flex-col">
            <CreatePlaylistModal />
          </div>
        </div>
        {playlists.map((playlist) => (
          <div
            key={playlist._id}
            className="flex flex-col w-[200px] h-[230px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer playlist-delete"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <div className="relative w-full h-56 group">
              <img
                alt="song_img"
                src={playlist.thumbnail}
                className="w-full h-full rounded-lg"
                onClick={() => getPlaylist(playlist._id)}
              />
            </div>
            {isHovering ? (
              <DeleteIcon onClick={() => deletePlaylist(playlist._id)} />
            ) : null}
            <div className="mt-4 flex flex-col">
              <p className="font-semibold text-sm text-white truncate">
                {playlist.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlists;
