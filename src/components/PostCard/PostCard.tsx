// modals
import NiceModal from "@ebay/nice-modal-react";

import { useContext } from "react";
import { Link } from "react-router-dom";

// style
import "./PostCard.scss";

// libraries
import moment from "moment";
import ImageModal from "../ImageModal/ImageModal";

// import Linkify from "react-linkify";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import UserContext from "../../context/UserContext";
import UserProfileContext from "../../context/UserProfileContext";
import PostsContext from "../../context/PostsContext";
import { LanguageContext } from "../../context/LanguageContext";

// component
// import DeletePostButton from "../Buttons/DeletePostButton/DeletePostButton";
import LikeButton from "../Buttons/LikeButton";
import CommentButton from "../Buttons/CommentButton";
import CheckVerifiedUserName from "../CheckVerifiedUserName";
import AddComment from "../AddComment/AddComment";

// api service
import PostService from "../../services/PostService";
import PostType from "./PostType";

const PostCard = ({ post }) => {
  // ******* start global state ******* //
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

  // posts context
  const { posts, setPostsData } = useContext(PostsContext);

  // ******* end global state ******* //

  var arabic = /[\u0600-\u06FF]/;

  const deletePostConfirm = (post) => {
    console.log("deletePost");
    let isConfirm = window.confirm(language.postDetails.confirmDeletePost);
    if (isConfirm) {
      deletePost(post);
    } else {
      NiceModal.remove("postcard-more");
    }
  };
  const showModal = () => {
    NiceModal.show("postcard-more", { post }).then((result: any) => {
      if (result.type === "delete") {
        NiceModal.remove("postcard-more");
        deletePostConfirm(post);
      }
    });
  };

  // delete post by id
  const deletePost = (post) => {
    PostService.deletePost(post.postId, userData.token)
      .then(() => {
        let newPosts = posts.filter(
          (current) => current.postId !== post.postId
        );
        // 1- update posts state in global state
        setPostsData(newPosts);

        // 2- update posts in session storage (cache)
        window.sessionStorage.setItem("posts", JSON.stringify(newPosts));

        // 3- delete this post from cache
        window.sessionStorage.removeItem(post.postId);

        // 4- delete this post from user profile data (global state)
        /**
         * check if current profile page belongs to the logged in user or not,
         * bcz if not, should no update be applied to the userProfileData state.
         */
        if (
          userProfileData.user.userName === userData.user.credentials.userName
        ) {
          let userNewPosts = userProfileData.posts.filter(
            (current) => current.postId !== post.postId
          );
          setUserProfileData({
            ...userProfileData,
            posts: userNewPosts,
          });
        }

        // 5- update user profile data in session storage (cache)
        // get user profile data from cache
        let cachedUserProfileData = JSON.parse(
          window.sessionStorage.getItem(userData.user.credentials.userName)
        );
        if (cachedUserProfileData) {
          let userNewPostsCache = cachedUserProfileData.posts.filter(
            (current) => current.postId !== post.postId
          );
          window.sessionStorage.setItem(
            userData.user.credentials.userName,
            JSON.stringify({
              ...cachedUserProfileData,
              posts: userNewPostsCache,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let linkStyle = {
    background: `${theme.card}`,
  };

  const ProfilePicture = userData.isAuth
    ? post.userName === userData.user.credentials.userName
      ? userData.user.credentials.profilePicture
      : post.profilePicture
    : post.profilePicture;

  return (
    <div className="postCard" style={linkStyle}>
      <div className="postCard__header d-flex px-2 pb-2">
        <div className="">
          <div className="d-flex align-items-center">
            <div className="postCard__userImage">
              <div className="postCard__userImage__wrapper">
                <Link to={userData.isAuth ? "/users/" + post.userName : "#"}>
                  <img
                    className="postCard__userImage__wrapper__image"
                    src={ProfilePicture}
                    alt="profile"
                  />
                </Link>
              </div>
            </div>
            <div className="ms-2">
              <div
                className="h6 mb-1"
                style={{
                  color: theme.typoMain,
                  direction: `${arabic.test(post.userName) ? "rtl" : "ltr"}`,
                }}
              >
                <CheckVerifiedUserName userName={post.userName} />
                <div
                  style={{
                    color: theme.typoSecondary,
                  }}
                  className="time"
                >
                  {moment(post.createdAt).fromNow()}
                </div>
              </div>

              {/* <span className="d-block text-sm text-muted"></span> */}
            </div>
          </div>
        </div>
        {userData.isAuth && (
          <div className="ms-auto">
            <div className="dropdown">
              <button className="btn btn-link" onClick={showModal}>
                <span className="far fa-ellipsis-h"></span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="postCard__content">
        {post ? (
          <ImageModal post={post} className="postCard__content__line3__image" />
        ) : (
          ""
        )}

        <div
          className="postCard__content__line4 px-3"
          style={{
            color: theme.mobileNavIcon,
          }}
        >
          <LikeButton
            post={post}
            postData={undefined}
            likes={undefined}
            setLikes={undefined}
            setPostData={undefined}
          />
          <Link to={"/posts/" + post.postId} className="text-decoration-none">
            <CommentButton post={post} className="" />
          </Link>
        </div>

        <PostType post={post} />

        {/* add comment input */}
        {userData.isAuth ? (
          <AddComment
            postId={post.postId}
            comments={undefined}
            setComments={undefined}
            postData={undefined}
            setPostData={setPostsData}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PostCard;
