import React from "react";
import { useGetPlaylistQuery } from "../../../redux/services/melodyApi";
import { useNavigate } from "react-router-dom";

function AllPlaylists() {
  const { data, isFetching, error } = useGetPlaylistQuery();
  const navigate = useNavigate();
  const playlists = data?.data;
  // const token = localStorage.getItem("userToken");

  //This section navigate to clicked playlist
  // function getPlaylistId(id) {
  //   const playlistId = id;

  //   const fetchPlaylist = async (id) =>
  //     await fetch(`https://melodystream.herokuapp.com/playlist/${playlistId}`, {
  //       method: "GET",
  //       headers: { auth_token: token },
  //       id: playlistId,
  //     });
  //   fetchPlaylist();
  //   navigate(`/playlist/${playlistId}`);
  // }
  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <div className="flex flex-col ml-80 font-mons text-white h-full">
      <header className="flex h-44 mb-1">
        <section className="flex flex-col justify-center grow ml-5">
          <h className=" not-italic text-2xl font-black whitespace-nowrap text-ellipsis leading-80">
            Your Playlists
          </h>
          <div>{playlists.length} Playlists</div>
        </section>
      </header>
      <div className="flex flex-wrap sm:justify-start justify-center gap-5">
        {playlists.map((playlist) => (
          <div
            key={playlist._id}
            className="flex flex-col w-[150px] h-[180px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
          >
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