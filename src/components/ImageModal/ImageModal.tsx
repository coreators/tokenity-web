// import React from "react";
import styles from "./ImageModal.module.scss";
import { Carousel } from "react-responsive-carousel";

const ImageModal = ({ post, className }) => {
  if (post.postVideo) {
    return (
      <video className={styles.video} controls autoPlay={false} loop>
        <source src={post.postVideo} type="video/mp4" />
      </video>
    );
  }
  if (post.postImages && post.postImages.length > 1) {
    return (
      <Carousel
        dynamicHeight={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        {post.postImages.map((image, i: number) => (
          <div key={`${post.id}${i}`}>
            <img src={image} alt={`post-${i}`} />
          </div>
        ))}
      </Carousel>
    );
  }
  if (post.postImage) {
    return <img src={post.postImage} className={className} alt="" />;
  }
};

export default ImageModal;
