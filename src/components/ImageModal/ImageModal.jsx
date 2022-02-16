// import React from "react";
import "./ImageModal.scss";

const ImageModal = ({ imageUrl, className }) => {
  return <img src={imageUrl} className={className} alt="" />;
};

export default ImageModal;
