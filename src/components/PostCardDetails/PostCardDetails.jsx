import { useContext } from "react";
import { Link } from "react-router-dom";

// style
import "./PostCardDetails.scss";

// libraries
import moment from "moment";
import Linkify from "linkify-react";

// component
import DeletePostButton from "../../components/Buttons/DeletePostButton/DeletePostButton";
import CommentButton from "../../components/Buttons/CommentButton";
import LikeButton from "../../components/Buttons/LikeButton";
import LikesModal from "../../components/LikesModal/LikesModal";
import CheckVerifiedUserName from "../CheckVerifiedUserName";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import ImageModal from "../../components/ImageModal/ImageModal";
import UserContext from "../../context/UserContext";

const PostCardDetails = ({ postData, likes, setLikes, setPostData }) => {
  // ******* start global state *******//
  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // language context
  const { isEnglish, english, korean } = useContext(LanguageContext);
  var language = isEnglish ? english : korean;

  // user context
  const { userData } = useContext(UserContext);
  // ******* end global state *******//

  var arabic = /[\u0600-\u06FF]/;

  const ProfilePicture = userData.isAuth
    ? postData.userName === userData.user.credentials.userName
      ? userData.user.credentials.profilePicture
      : postData.profilePicture
    : postData.profilePicture;

  return (
    <div
      className="postDetails__post"
      style={{
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div className="postDetails__post__header">
        <div className="postDetails__post__header__userImage">
          <div className="postDetails__post__header__userImage__wrapper">
            <Link to={"/users/" + postData.userName}>
              <img
                className="postDetails__post__header__userImage__wrapper__image"
                src={ProfilePicture}
                alt="profile"
              />
            </Link>
          </div>
        </div>
        <div className="postDetails__post__header__col2">
          <div className="postDetails__post__header__col2__box">
            <CheckVerifiedUserName userName={postData.userName} />
            <span
              style={{
                color: theme.typoSecondary,
              }}
              className="postDetails__post__header__col2__time"
            >
              {moment(postData.createdAt).fromNow()}
            </span>
          </div>
          <div className="postDetails__post__header__col2__delete">
            <DeletePostButton post={postData} />
          </div>
        </div>
      </div>
      <div className="postDetails__post__content">
        <div
          className="postDetails__post__content__line2"
          style={{
            color: theme.typoMain,
            textAlign: `${
              arabic.test(postData.postContent) ? "right" : "left"
            }`,
            direction: `${arabic.test(postData.postContent) ? "rtl" : "ltr"}`,
          }}
        >
          <Linkify>{postData.postContent}</Linkify>
        </div>
        {postData ? (
          <ImageModal
            post={postData}
            className="postDetails__post__content__line3__image"
          />
        ) : (
          ""
        )}

        <div className="postDetails__post__content__counters">
          <div className="postDetails__post__content__counters__comments">
            <span
              className="postDetails__post__content__counters__numbers"
              style={{
                color: `${theme.typoMain}`,
              }}
            >
              {postData.commentCount}
            </span>
            <span
              style={{
                color: `${theme.typoSecondary}`,
              }}
            >
              {language.postDetails.comments}
            </span>
          </div>
          <LikesModal likes={likes} postData={postData} />
        </div>

        <div
          className="postDetails__post__content__line4"
          style={{
            color: theme.mobileNavIcon,
          }}
        >
          <CommentButton post={postData} />
          <LikeButton
            post={postData}
            postData={postData}
            likes={likes}
            setPostData={setPostData}
            setLikes={setLikes}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCardDetails;
