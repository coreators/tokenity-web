import React from "react";
import styles from "./PostBox.module.scss";

function PostBox({ post }) {
  return (
    <div className={styles.postBox}>
      {post.postImage ? <img src={post.postImage} alt="" /> : ""}
    </div>
  );
}

export default PostBox;
