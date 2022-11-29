import "./HomeHeader.css";
import React from "react";

function HomeHeader() {
  const {
    data: user,
    isFetching: userFetching,
    error: userError,
  } = useGetUserQuery();

  return (
    <div className="header-container-home">
      <div className="header-user--name">
        <b>Hello</b> {user?.user.name}!
      </div>
    </div>
  );
}

export default HomeHeader;
