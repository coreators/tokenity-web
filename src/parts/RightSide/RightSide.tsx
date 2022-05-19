import React, { useContext, useEffect, Fragment } from "react";

// style file
import "./RightSide.scss";

// context (global state)
import UserContext from "../../context/UserContext";

// libraries
import Join from "../Join/Join";
import TrendWidget from "../../components/TrendWidget/TrendWidget";
import UserProfileCard from "../CurrentUser/UserProfileCard";

import { useLocation } from "react-router-dom";

const RightSide = () => {
  // ******* start global state ******* //
  const location = useLocation();

  // user context
  const { userData } = useContext(UserContext);

  // ******* end global state ******* //
  useEffect(() => {}, [userData.isAuth]);

  let paths = location.pathname.split("/");

  let path1 = paths[1];

  return (
    <div className="rightSide">
      <div className="rightSide__box">
        {userData.isAuth && window.screen.width > 991 ? (
          <Fragment>
            {path1 !== "users" && <UserProfileCard />}
            {path1 !== "trends" && <TrendWidget />}
          </Fragment>
        ) : (
          <Join />
        )}
      </div>
    </div>
  );
};

export default RightSide;
