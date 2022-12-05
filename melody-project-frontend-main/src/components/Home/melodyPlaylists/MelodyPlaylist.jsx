import React from "react";
import { useGetAllPlaylistQuery } from "../../../redux/services/melodyApi";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Grid, Typography } from "@mui/material";

export const MelodyPlaylist = () => {
  const responsive = useMediaQuery({
    query: "(max-width: 450px)",
  });
  const { data, isFetching, error } = useGetAllPlaylistQuery();
  console.log(data);
  const playlists = data?.data;
  const navigate = useNavigate();

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <>
      {responsive ?
        <Grid>
          <Grid >
            <Grid xs={12} style={{padding:'2rem 0rem', textAlign:'center'}} >
              <Typography style={{color:'white'}}>
                Melody playlists
              </Typography>
              <Typography style={{color:'white'}}>{playlists.length} Playlists</Typography>
            </Grid>
          </Grid>
          <Grid  xs={6} style={{display:'flex' ,justifyContent: 'center',
    flexWrap: 'wrap'}}>
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="flex flex-col w-[150px] h-[180px] p-4 m-2 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
              >
                <Grid className="relative w-full h-56 group">
                  <img
                    alt="song_img"
                    src={playlist.thumbnail}
                    className="w-full h-full rounded-sm"
                    onClick={() => navigate(`/playlist/public/${playlist._id}`)}
                  />
                </Grid>

                <div className="mt-4 flex flex-col">
                  <Typography className="font-semibold text-sm text-white truncate">
                    {playlist.name}
                  </Typography>
                </div>
              </div>
            ))}
        </Grid>
    </Grid> : <div className="home_playlist_container">
    <header className="flex h-44 mb-1">
      <section className="flex flex-col justify-center  grow ">
        <h className=" not-italic text-2xl font-black whitespace-nowrap text-ellipsis leading-80">
          Melody playlists
        </h>
        <div>{playlists.length} Playlists</div>
      </section>
    </header>
    <div className="flex flex-wrap sm:justify-flex-start justify-flex-start gap-5">
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
              onClick={() => navigate(`/playlist/public/${playlist._id}`)}
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
}
    </>
  );
};
