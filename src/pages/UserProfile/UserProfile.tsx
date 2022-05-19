import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";

// style
import "./UserProfile.scss";
import styles from "./UserProfile.module.scss";

// assets
import Empty from "../../assets/Images/empty.svg";
import DefaultAvatar from "../../assets/Images/default_pp.png";
import DefaultCover from "../../assets/Images/default_cp.png";

// libraries
// import moment from "moment";
import Linkify from "linkify-react";

// api service
import UserService from "../../services/UserService";

// component
// import ImageModal from "../../components/ImageModal/ImageModal";
// import PostCard from "../../components/PostCard/PostCard";
import EditProfileImageButton from "../../components/Buttons/EditProfileImageButton/EditProfileImageButton";
import EditCoverImageButton from "../../components/Buttons/EditCoverImageButton/EditCoverImageButton";
import EditProfile from "../../components/Buttons/EditProfile/EditProfile";
import FriendsModal from "../../components/FriendsModal/FriendsModal";
import AddFriendButton from "../../components/Buttons/AddFriendButton/AddFriendButton";
import CheckVerifiedUserName from "../../components/CheckVerifiedUserName";
import Spinner from "../../components/Spinner/Spinner";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import UserContext from "../../context/UserContext";
import UserProfileContext from "../../context/UserProfileContext";
import PostBox from "../../components/PostBox/PostBox";
import Stories from "../../components/Story/Stories";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, styled, Tab } from "@mui/material";

import IconCoins from "../../components/Icons/IconCoins";
import IconGrid from "../../components/Icons/IconGrid";
import IconNft from "../../components/Icons/IconNft";

import walletData from "../../dummy_data/wallet.js";
import NFTItem from "../../components/UserProfile/NFTItem";

const UserProfile = (props) => {
  const { userName } = useParams();

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
  const { userProfileData, setUserProfileData } =
    useContext(UserProfileContext);

  // ******* start local state *******//
  const [profileLoader, setProfileLoader] = useState(false);

  // set page title
  document.title = language.userProfile.pageTitle;

  // tab
  const [value, setValue] = useState("grid");
  const TTab = styled(Tab)({
    textTransform: "none",
  });
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    // add query on value
  };

  // history init
  // const history = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // get user profile data from cache
      let cachedUserProfileData = JSON.parse(
        window.sessionStorage.getItem(userName)
      );
      if (cachedUserProfileData) {
        // user profile data was cached, so fetch it from cache
        setUserProfileData(cachedUserProfileData);
        setProfileLoader(false);
      } else {
        // user profile data is not cached, so execute an api request to fetch it.
        setProfileLoader(true);

        if (userName) {
          UserService.getUserDetails(userName)
            .then((res) => {
              setUserProfileData(res.data);
              setProfileLoader(false);
              // add user profile data to session storage (cache)
              window.sessionStorage.setItem(userName, JSON.stringify(res.data));
            })
            .catch((err) => {
              console.log(err);
              setProfileLoader(false);
            });
        }
      }
    }
    return () => {
      mounted = false;
    };
  }, [setUserProfileData, userName]);

  // const goToBack = () => {
  //   history(-1);
  // };

  const location = userProfileData.user.location ? (
    <div
      style={{
        color: theme.typoSecondary,
      }}
    >
      <i className="fal fa-map-marker-alt"></i>
      {userProfileData.user.location}
    </div>
  ) : (
    ""
  );

  const website = userProfileData.user.website ? (
    <div
      style={{
        color: theme.typoSecondary,
      }}
    >
      <i className="fal fa-link"></i>
      <a
        href={userProfileData.user.website}
        rel="noopener noreferrer"
        target="_blank"
      >
        {userProfileData.user.website}
      </a>{" "}
    </div>
  ) : (
    ""
  );

  // direct to post details page on click on post
  // const toPostDetails = (postID) => {
  //   history("/posts/" + postID);
  // };

  const userNft = () => {};

  const userCoins = () => {};

  const userPosts =
    userProfileData.posts.length > 0 ? (
      <Fragment>
        {userProfileData.posts.map((post) => {
          return (
            <div key={post.postId}>
              <Link
                to={"/posts/" + post.postId}
                className="text-decoration-none"
              >
                {<PostBox post={post} />}
              </Link>
            </div>
          );
        })}
      </Fragment>
    ) : (
      <div className="posts__empty">
        <img src={Empty} alt="empty" />
        <p
          style={{
            color: `${theme.typoSecondary}`,
          }}
        >
          {language.userProfile.noPosts}
        </p>
      </div>
    );

  const editAvatar = userData.isAuth ? (
    userName === userData.user.credentials.userName ? (
      <EditProfileImageButton />
    ) : (
      ""
    )
  ) : (
    ""
  );

  const editCover = userData.isAuth ? (
    userName === userData.user.credentials.userName ? (
      <EditCoverImageButton />
    ) : (
      ""
    )
  ) : (
    ""
  );

  return (
    <div
      className="userProfile__main home-box"
      style={{ background: `${theme.background}` }}
    >
      {/* user details section */}
      {profileLoader ? (
        <Spinner />
      ) : (
        <div className="userProfile__main__userDetails">
          {/* header image */}
          {/* <div className="userProfile__main__userDetails__headerImageBox">
            <img
              src={
                userProfileData.user.coverPicture
                  ? userProfileData.user.coverPicture
                  : DefaultCover
              }
              alt="cover"
              className="userProfile__main__userDetails__headerImageBox__image"
            />
            {editCover}
          </div> */}
          {/* user data section */}

          <div className="position-relative">
            <div className={styles.backImageOverlay}></div>

            <div
              className={styles.backImage}
              style={{
                backgroundImage: `url(${
                  userProfileData.user.profilePicture
                    ? userProfileData.user.profilePicture
                    : DefaultCover
                })`,
              }}
            ></div>
            <div className="userProfile__main__userDetails__userData">
              <div>
                <div className="userProfile__main__userDetails__userData__userName">
                  <h2 style={{ color: theme.typoMain }}>
                    <CheckVerifiedUserName
                      userName={userProfileData.user.userName}
                    />
                  </h2>
                </div>
                <div className="userProfile__main__userDetails__userData__bio">
                  <p style={{ color: theme.typoMain }}>
                    <Linkify>{userProfileData.user.bio}</Linkify>
                  </p>
                </div>
                <div className="userProfile__main__userDetails__userData__extraData">
                  {location}
                  {website}
                </div>
              </div>

              <div className="userProfile__main__userDetails__userData__buttonBox">
                {userData.isAuth ? (
                  userName === userData.user.credentials.userName ? (
                    <EditProfile />
                  ) : (
                    <AddFriendButton userName={userName} />
                  )
                ) : (
                  <Link to="/login">
                    <AddFriendButton userName="" />
                  </Link>
                )}
              </div>

              <div>
                <div className="userProfile__main__userDetails__userData__pp">
                  <div className="userProfile__main__userDetails__userData__pp__userImageBox">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="90"
                      height="90"
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
                    <img
                      src={
                        userProfileData.user.profilePicture
                          ? userProfileData.user.profilePicture
                          : DefaultAvatar
                      }
                      alt="profile"
                      className="userProfile__main__userDetails__userData__pp__userImageBox__userImage"
                    />
                    {editAvatar}
                  </div>
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
            </div>
            <div className={styles.statsBarWrap}>
              <div className={styles.statsBar}>
                <div>
                  <p>Coin In Circulation</p>
                  <h6>≈ 301.8685</h6>
                </div>
                <div>
                  <p>Total USD Locked</p>
                  <h6>≈ 2.085M</h6>
                </div>
                <div>
                  <p>USD Market Cap</p>
                  <h6>≈ $6.255M</h6>
                </div>
              </div>
            </div>
          </div>
          {/* <FriendsModal /> */}
          {/* user post section */}

          {/* stories */}

          <div className="mt-3">
            <Stories />
          </div>

          <TabContext value={value}>
            <Box
              sx={{ borderBottom: 1, marginBottom: 2, borderColor: "divider" }}
            >
              <TabList
                onChange={handleChange}
                aria-label="tabs"
                TabIndicatorProps={{
                  style: {
                    background: "#38baff",
                    // top: "0",
                    // color: "#fff",
                    border: "none",
                  },
                }}
                variant="fullWidth"
                textColor="inherit"
              >
                <TTab label={<IconGrid />} value="grid" />
                <TTab label={<IconCoins />} value="coins" />
                <TTab label={<IconNft />} value="nft" />
              </TabList>
              <TabPanel value="grid" sx={{ padding: 0 }}>
                {/* Lists */}
                <div
                  className={`userProfile__main__userDetails__posts ${
                    userProfileData.posts.length > 0 ? "grid" : "empty"
                  }`}
                >
                  {userPosts}
                </div>
              </TabPanel>
              <TabPanel value="coins">
                {/* coins */}
                <div>
                  <div>Username or Pubkey</div>
                  <div>Coin Held</div>
                  <div>NFT</div>
                </div>
              </TabPanel>
              <TabPanel value="nft">
                {/* nft */}
                {walletData.nfts.map((nft) => {
                  return <NFTItem key={nft.id} nft={nft} />;
                })}
              </TabPanel>
            </Box>
          </TabContext>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
