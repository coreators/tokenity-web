import React, { useContext, useEffect, Fragment } from "react";

// style file
import "./RightSide.scss";

// context (global state)
import UserContext from "../../context/UserContext";

// libraries
// import WhoToAdd from '../WhoToAdd/WhoToAdd';
import Join from "../Join/Join";
// import CurrentUser from "../CurrentUser/CurrentUser";
import UserProfileCard from "../CurrentUser/UserProfileCard";

const RightSide = () => {
  // ******* start global state ******* //

  // user context
  const { userData } = useContext(UserContext);

  // ******* end global state ******* //
  useEffect(() => {}, [userData.isAuth]);

  return (
    <div className="rightSide">
      <div className="rightSide__box">
        {userData.isAuth && window.screen.width > 991 ? (
          <Fragment>
            <UserProfileCard />

            {/* <CurrentUser /> */}
            {/* <div
              className="rightSide__box__whoToAddBox"
              style={{
                backgroundColor: `${theme.foreground}`,
              }}
            >
              <WhoToAdd />
            </div> */}
          </Fragment>
        ) : (
          <Join />
        )}
      </div>
    </div>
  );
};

export default RightSide;
