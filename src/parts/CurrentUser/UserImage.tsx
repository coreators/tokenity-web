import React, { useContext, useEffect } from "react";

// style file
import "./CurrentUser.scss";

// assets
import default_pp from "../../assets/Images/default_pp.png";

// components
import Spinner from "../../components/Spinner/Spinner";

// context (global state)
import UserContext from "../../context/UserContext";

const UserImage = () => {
  // ******* start global state ******* //


  // user context
  const { userData, setUserData } = useContext(UserContext);

  // ******* end global state ******* //

  useEffect(() => {}, [userData.isAuth, setUserData]);

  return (
    <>
      {userData.isAuth ? (
        <>
          <div className="userImage">
              <img
                alt="profile"
                src={
                  userData.user.credentials.profilePicture
                    ? userData.user.credentials.profilePicture
                    : default_pp
                }
              />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default UserImage;
