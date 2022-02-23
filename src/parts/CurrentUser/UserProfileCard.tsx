import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./UserProfileCard.module.scss";

// style

// assets

import DefaultAvatar from "../../assets/Images/default_pp.png";
import DefaultCover from "../../assets/Images/default_cp.png";

// libraries
import moment from "moment";
import Linkify from "linkify-react";

// component
import ImageModal from "../../components/ImageModal/ImageModal";

import CheckVerifiedUserName from "../../components/CheckVerifiedUserName";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import UserContext from "../../context/UserContext";

const UserProfileCard = () => {
  // const { userName } = useParams();

  // ******* start global state *******//
  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // language context
  const { isEnglish, english, korean } = useContext(LanguageContext);
  var language = isEnglish ? english : korean;

  // user context
  const { userData } = useContext(UserContext);

  // user profile data context

  // ******* start local state *******//

  // set page title
  document.title = language.userProfile.pageTitle;

  return (
    <div className={styles.card}>
      <div className={styles.backImageOverlay}></div>
      <div
        className={styles.backImage}
        style={{
          backgroundImage: `url(${
            userData.user.credentials.coverPicture
              ? userData.user.credentials.coverPicture
              : DefaultCover
          })`,
        }}
      ></div>
      <Link to={`/users/${userData.user.credentials.userName}`}>
        <div className={styles.profileImageLine}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="138.001"
            height="138"
            viewBox="0 0 138.001 138"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="1"
                x2="0"
                y2="1"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0" stopColor="#5a21ff" />
                <stop offset="1" stopColor="#00fffa" />
              </linearGradient>
            </defs>
            <path
              d="M72,141a68.679,68.679,0,0,1-38.579-11.784,69.2,69.2,0,0,1-25-30.358,68.908,68.908,0,0,1,6.362-65.436,69.2,69.2,0,0,1,30.358-25,68.91,68.91,0,0,1,65.437,6.362,69.2,69.2,0,0,1,25,30.358,68.909,68.909,0,0,1-6.362,65.436,69.2,69.2,0,0,1-30.358,25A68.568,68.568,0,0,1,72,141ZM72,5A66.686,66.686,0,0,0,34.54,16.443,67.2,67.2,0,0,0,10.266,45.921a66.912,66.912,0,0,0,6.177,63.54,67.2,67.2,0,0,0,29.478,24.275,66.912,66.912,0,0,0,63.54-6.177A67.2,67.2,0,0,0,133.735,98.08a66.911,66.911,0,0,0-6.177-63.54A67.2,67.2,0,0,0,98.08,10.266,66.582,66.582,0,0,0,72,5Z"
              transform="translate(-3 -3.001)"
              fill="url(#linear-gradient)"
            />
          </svg>
          <div
            className={styles.profileImage}
            style={{
              backgroundImage: `url(${
                userData.user.credentials.profilePicture
                  ? userData.user.credentials.profilePicture
                  : DefaultCover
              })`,
            }}
          ></div>
        </div>
      </Link>
      <div className={styles.name}>
        <h2
          style={{
            color: `${theme.typoMain}`,
          }}
        >
          <CheckVerifiedUserName
            userName={userData.user.credentials.userName}
          />
        </h2>
        <p style={{ color: theme.typoMain }}>
          <Linkify>{userData.user.credentials.bio}</Linkify>
        </p>
      </div>
      <div className={styles.stats}>
        <div>
          <h6>0</h6>
          <p>Posts</p>
        </div>
        <div>
          <h6>0</h6>
          <p>Followers</p>
        </div>
        <div>
          <h6>0</h6>
          <p>Followings</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
