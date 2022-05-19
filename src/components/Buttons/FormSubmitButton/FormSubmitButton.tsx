import React, { useContext, useState } from "react";

// style
import "./FormSubmitButton.scss";
// Global vars import
import variables from "../../../style/CssVariables.scss";

// api service
import PostService from "../../../services/PostService";

// context (global state)
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";
import UserContext from "../../../context/UserContext";
import PostsContext from "../../../context/PostsContext";
import UserProfileContext from "../../../context/UserProfileContext";

import { nftTypes } from "../../../util/constants";


// api https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md

const FormSubmitButton = ({
  textarea,
  setTextarea,
  imageStatus,
  setImageStatus,
  videoStatus,
  setVideoStatus,
  setOpen,
  extra,
  setExtra,
  type,
}) => {
  // ******* start global state *******//
  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // language context
  const { isEnglish, english, korean } = useContext(LanguageContext);
  var language = isEnglish ? english : korean;

  // user context
  const { userData } = useContext(UserContext);

  // posts context
  const { posts, setPostsData } = useContext(PostsContext);

  // user profile data context
  const { userProfileData, setUserProfileData } =
    useContext(UserProfileContext);
  // ******* end global state *******//

  // local state
  const [isLoading, setLoading] = useState({
    switch: false,
    state: "",
  });

  var ButtonDisabledFlag =
    textarea.value.trim().length > 0 || imageStatus.image.length > 0 ? false : true;

  // add new post
  const sharePost = async () => {

    // check if no image and video
    if (!(imageStatus.image.length > 0) && !videoStatus.select) {
      alert('Select image or video');
      return;
    }

    let postTextContent = textarea.value.trim();
    let post = {
      postContent: postTextContent.length > 0 ? postTextContent : "",
      postImage: null,
      postImages: [],
      postVideo: null,
      postExtra: extra,
      type: type,
      isNft: false,
    };

    // nft type check
    if (nftTypes.includes(type)) post.isNft = true;
    
    if (imageStatus.image.length > 0) {
      // the post has image
      setLoading({
        switch: true,
        state: "Uploading Images",
      });

      await Promise.all(imageStatus.image.map(async (image, index) => {
        const formData = new FormData();
        formData.append("image", image, image.name);
        let res = await PostService.uploadPostImage(formData, userData.token);
        let url = res.data.postImage;
        if (index === 0) post.postImage = url;
        post.postImages.push(url);
      }));
    }

    if (videoStatus.select) {
      setLoading({
        switch: true,
        state: "Uploading Video",
      });

      // the post has video
      const formData = new FormData();
      formData.append("video", videoStatus.video, videoStatus.video.name);
      // upload image to server and get url

      await PostService.uploadPostVideo(formData, userData.token)
        .then((res) => {
          let url = res.data.postVideo;
          post.postVideo = url;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // add post to database
    PostService.addNewPost(post, userData.token)
      .then((res) => {
        return res;
      })
      .then((res) => {
        let newPosts = [...posts];
        // add to first
        newPosts.splice(0, 0, res.data);

        // 1- add the new post to global state to show it immediately in home page
        setPostsData(newPosts);

        // 2- update posts in session storage (cache)
        window.sessionStorage.setItem("posts", JSON.stringify(newPosts));

        // 3- add this post to user profile data (global state),
        // only if current profile belongs to the logged in user.
        if (
          userProfileData.user.userName === userData.user.credentials.userName
        ) {
          let userNewPosts = [...userProfileData.posts];
          userNewPosts.unshift(res.data);
          setUserProfileData({
            ...userProfileData,
            posts: userNewPosts,
          });
        }

        // 4- update user profile data in session storage (cache)
        // get user profile data from cache
        let cachedUserProfileData = JSON.parse(
          window.sessionStorage.getItem(userData.user.credentials.userName)
        );
        if (cachedUserProfileData) {
          let userNewPostsCache = [...cachedUserProfileData.posts];
          userNewPostsCache.unshift(res.data);
          window.sessionStorage.setItem(
            userData.user.credentials.userName,
            JSON.stringify({
              ...cachedUserProfileData,
              posts: userNewPostsCache,
            })
          );
        }

        // 5- clear inputs
        setTextarea({
          value: "",
          rows: 1,
          minRows: 1,
          maxRows: 100,
        });
        setImageStatus({
          image: [],
        });
        setVideoStatus({
          select: false,
          videoPath: null,
          video: "",
        });
        setLoading({
          switch: false,
          state: "",
        });
        setExtra({});
        // close the modal
        if (setOpen) {
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading({
          switch: false,
          state: ""
        });
        // close the modal
        if (setOpen) {
          setOpen(false);
        }
      });
  };

  return (
    <button
      className="postButton"
      style={{
        color: "#fff",
        backgroundColor: theme.mainColor,
        borderRadius: variables.radius,
        opacity: ButtonDisabledFlag || isLoading.switch ? 0.6 : 1,
      }}
      onClick={sharePost}
      disabled={ButtonDisabledFlag || isLoading.switch}
    >
      {isLoading.switch
        ? language.home.addPostButtonLoading
        : language.home.addPostButton}
    </button>
  );
};

export default FormSubmitButton;
