import "./HomeHeader.css";
import "../../Top/Top.css";
import React from "react";
import { useGetUserQuery } from "../../../redux/services/melodyApi";

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
        <b>Hello</b> {data?.user.name}!
      </div>
    </div>
  );
}

export default HomeHeader;
