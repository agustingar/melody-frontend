import React from "react";
import Top from "../Top/Top";
import ExplorerSongs from "./DiscoverSong/DiscoverSongs";
import HomeHeader from "./HomeHeader/HomeHeader";
import YourPlaylists from "./YourPlaylists/YourPlaylists";
import "./home.css";
import { MelodyPlaylist } from "./melodyPlaylists/MelodyPlaylist";
import SideMenu from "../SideMenu/SideMenu";

function Home() {
  return (
    <>
      <SideMenu />
      <header className="home_header">
        <HomeHeader />
      </header>
      <div className="home_container">
        <div className="home_playlist">
          <div className="home_playlist__allPlaylist">
            <YourPlaylists />
          </div>
          <div className="home_playlist__randomPlaylist">
            <MelodyPlaylist />
          </div>
        </div>
        <aside className="home_aside">
          <div className="home_aside__top">
            <Top />
          </div>
          <div className="home_aside__explorerSongs">
            <ExplorerSongs />
          </div>
        </aside>
      </div>
    </>
  );
}

export default Home;
