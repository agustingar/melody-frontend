import "./HomeHeader.css";
import "../../Top/Top.css";
import React from "react";
import { useGetUserQuery } from "../../../redux/services/melodyApi";
import UserAvatar from "../../AppBar/UserAvatar";

function HomeHeader() {
  const { data, isFetching, error } = useGetUserQuery();

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <div className="header-container-home">
      <div className="header-user--name">
        <div>Buenos días</div>
       <div style={{display:'flex',justifyContent: 'space-between',
    width: '31%'}}> <div><b>Hello</b> <span>{data?.user.name}!</span></div>
        <UserAvatar /></div>
      </div>
    </div>
  );
}

export default HomeHeader;
