import React from "react";
import "./yourplaylist.css";
import { useGetPlaylistQuery } from "../../../redux/services/melodyApi";
import { useNavigate } from "react-router-dom";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useMediaQuery } from "react-responsive";
import { Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

function AllPlaylists() {
  const responsive = useMediaQuery({
    query: "(max-width: 450px)",
  });
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const { data, isFetching, error } = useGetPlaylistQuery();
  console.log(data);
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
    <>
    {responsive ?
    <Grid xs={6} >
      <header className="mt-6 ">
        <section className="flex flex-col justify-center grow pl-4">
          <Typography >
            Your Playlists <LibraryMusicIcon sx={{ fontSize: "3rem" }} />
          </Typography>
          <Typography>{playlists.length} Playlists</Typography>
        </section>
      </header>
      <Grid xs={6} style={{display:'flex' ,justifyContent: 'center',
    flexWrap: 'wrap' }} >
        {playlists.map((playlist) => (
          <Item key={playlist._id} className='flex flex-col w-[150px] h-[180px] p-4 m-2 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
            <Item className='h-40' >
              <img
                alt="song_img"
                src={playlist.thumbnail}
                className="w-full rounded-sm"
                onClick={() => navigate(`/playlist/${playlist._id}`)}
              />
            </Item>

            <Grid xs={6}>
              <Typography className="font-semibold text-sm text-black truncate">
                {playlist.name}
              </Typography>
            </Grid>
          </Item>
        ))}
      </Grid>
    </Grid> : <div className="home_playlist_container">
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
  </div> }
  </>
  );
}

export default AllPlaylists;
