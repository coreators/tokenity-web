import React, { useContext, useEffect } from "react";

// context (global state)
// import { ThemeContext } from '../../context/ThemeContext';
import PostsContext from "../../context/PostsContext";

import IconComment from "../Icons/IconComment";
const CommentButton = ({ post, className }) => {
  // ******* start global state ******* //

  // theme context
  // const { isLightTheme, light, dark } = useContext(ThemeContext);
  // const theme = isLightTheme ? light : dark;

  //

  // posts context
  const { posts } = useContext(PostsContext);

  // ******* end global state ******* //

  useEffect(() => {}, [posts]);

  return (
    <div className={`postCard__content__line4__comment ${className}`}>
      <div className="comment__box">
        {/* <i className="fal fa-comment"></i> */}
        <IconComment />
        {/* <div className="comment__background"></div> */}
      </div>
      {/* {post.commentCount === 0 ? "" : post.commentCount} */}
    </div>
  );
};

export default CommentButton;
