import React from "react";
import "./yourplaylist.css";
import { useGetPlaylistQuery } from "../../../redux/services/melodyApi";
import { useNavigate } from "react-router-dom";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

function AllPlaylists() {
  const { data, isFetching, error } = useGetPlaylistQuery();
  const navigate = useNavigate();
  const playlists = data?.data;

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
        <section className="flex flex-col justify-center grow ">
          <h className=" not-italic text-2xl font-black whitespace-nowrap text-ellipsis leading-80">
            Your Playlists <LibraryMusicIcon sx={{ fontSize: "3rem" }} />
          </h>
          <div>{playlists.length} Playlists</div>
        </section>
      </header>
      <div className="home_display_playlists">
        {playlists.map((playlist) => (
          <div key={playlist._id} className="playlist_album">
            <div className="relative w-full h-56 group">
              <img
                alt="song_img"
                src={playlist.thumbnail}
                className="w-full h-full rounded-sm"
                onClick={() => navigate(`/playlist/${playlist._id}`)}
              />
            </div>

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

export default AllPlaylists;
