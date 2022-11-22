import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Top from "../Top/Top";
import AlbumCarrousel from "../Albums/AlbumCarrousel";
import HomeHeader from "./HomeHeader/HomeHeader";
import { useGetPlaylistQuery } from "../../redux/services/melodyApi";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { Grid } from "@mui/material";
import ExplorerSongs from "../Explorer/Explorer";

function Home() {
  const { data, isFetching, error } = useGetPlaylistQuery();
  const token = localStorage.getItem("userToken");

  const [random, setRandom] = useState([]);
  const fetchRandom = async () => {
    const res = await fetch(
      "https://melodystream.herokuapp.com/playlist/random/music",
      {
        headers: {
          auth_token: token,
        },
      }
    );
    const random = await res.json();
    setRandom(random);
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  return (
    <>
      <Grid container spacing={2}>
        <HomeHeader />
        <Grid xs={8}>
          {" "}
          <AlbumCarrousel data={data.data} random={random.data} />
        </Grid>
        <Grid xs={4}>
          {" "}
          <ExplorerSongs />
          <Top />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
