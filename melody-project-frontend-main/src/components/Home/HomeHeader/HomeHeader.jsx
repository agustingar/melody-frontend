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
    <header className="header-container-home">
      <b>Hello</b>
      <span>{data?.user.name}!</span>
    </header>
  );
}

export default HomeHeader;
