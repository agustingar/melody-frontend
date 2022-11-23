import React from "react";
import Top from "../Top/Top";
import ExplorerSongs from "../Explorer/Explorer";
import HomeHeader from "./HomeHeader/HomeHeader";
import AllPlaylists from "./allPlaylist/AllPlaylists";
import "./allPlaylist/allplaylist.css";
import { RandomPlaylist } from "./randomPlaylists/RandomPlaylist";

function Home() {
  return (
    <>
      <header className="home_header">
        <HomeHeader />
      </header>
      <div className="home_container">
        <div className="home_playlist">
          <div className="home_playlist__allPlaylist">
            <AllPlaylists />
          </div>
          <div className="home_playlist__randomPlaylist">
            <RandomPlaylist />
          </div>
        </div>
        <aside className="home_aside">
          <div className="home_aside__explorerSongs">
            <ExplorerSongs />
          </div>
          <div className="home_aside__top">
            <Top />
          </div>
        </aside>
      </div>
    </>
  );
}

export default Home;
