import React, { useContext, useState, Fragment } from "react";

// import { Link } from "react-router-dom";

// style file
import "./AddNewPost.scss";

// assets
// import default_pp from "../../assets/Images/default_pp.png";

// components
import FormSubmitButton from "../../components/Buttons/FormSubmitButton/FormSubmitButton";
import AddNewPostInput from "./AddNewPostInput";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
// import UserContext from "../../context/UserContext";

import { types, extraInputs } from "../../util/constants";

// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import VideoConverter from "../../util/convertvideo";

const AddNewPost = ({ inputId, setOpen }) => {
  // ******* start global state ******* //

  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // language context
  const { isEnglish, english, korean } = useContext(LanguageContext);
  var language = isEnglish ? english : korean;

  // user context
  // const { userData } = useContext(UserContext);

  // ******* end global state ******* //

  // local state
  const [textarea, setTextarea] = useState({
    value: "",
    rows: 1,
    minRows: 1,
    maxRows: 100,
  });

  const [imageStatus, setImageStatus] = useState({
    image: [],
  });

  const [videoStatus, setVideoStatus] = useState({
    select: false,
    videoPath: null,
    video: null,
  });

  const [extra, setExtra] = useState({});

  const [type, setType] = useState("post");

  const handleExtraInput = (e) => {
    setExtra({ ...extra, ...{ [e.target.id]: e.target.value } });
  };

  const handleSelect = (e) => {
    setType(e.target.value);
  };

  // auto resize textarea box, when user type long text
  const handleChange = (event) => {
    const textareaLineHeight = 24;
    let { minRows, maxRows } = textarea;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setTextarea({
      ...textarea,
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  const handleImageChange = (event) => {
    const images = [...event.target.files];

    if (images.length > 0) {
      console.log(images);
      setImageStatus({
        image: images,
      });
    }
  };

  const handleImageUpload = () => {
    const fileInput = document.getElementById(inputId);
    fileInput.click();
  };

  const getVideoDuration = async (f) => {
    const fileCallbackToPromise = (fileObj) => {
      return Promise.race([
        new Promise((resolve) => {
          if (fileObj instanceof HTMLImageElement) fileObj.onload = resolve;
          else fileObj.onloadedmetadata = resolve;
        }),
        new Promise((_, reject) => {
          setTimeout(reject, 1000);
        }),
      ]);
    };

    const objectUrl = URL.createObjectURL(f);
    // const isVideo = type.startsWith('video/');
    const video = document.createElement("video");
    console.log(video);
    console.log(await video.canPlayType);
    video.src = objectUrl;
    await fileCallbackToPromise(video);
    return {
      duration: video.duration,
      width: video.videoWidth,
      height: video.videoHeight,
    };
  };


  const handleVideoChange = async (event) => {
    const videoFile = event.target.files[0];
    // const { name } = videoFile;

    const videoMeta = await getVideoDuration(videoFile);
    console.log(videoFile);
    console.log(videoMeta);
    
    if (videoFile.type !== "video/quicktime" && videoFile.type !== "video/mp4") {
      alert(`Video Format(${videoFile.type}) is not supported, Use mp4 file.`);
      return;
    }
    if (videoMeta.duration > 60) {
      alert("Video is over 1min, only 1min video can upload");
      return;
    }

    if (videoFile.type === "video/quicktime") {
      let targetVideoFormat = 'mp4';
      let convertedVideoDataObj = await VideoConverter.convert(videoFile, targetVideoFormat);
  
      setVideoStatus({
        select: true,
        videoPath: convertedVideoDataObj.data,
        video: convertedVideoDataObj.blob,
      });
    } else {
      setVideoStatus({
        select: true,
        videoPath: URL.createObjectURL(videoFile),
        video: videoFile,
      });
    }
  };

  const handleVideoUpload = () => {
    const fileInput = document.getElementById(inputId + "_video");
    fileInput.click();
  };

  const imageDelete = (index: number) => {
    let images = Array.from(imageStatus.image);
    images.splice(index, 1);
    setImageStatus({
      image: images,
    });
  };

  const videoDelete = () => {
    setVideoStatus({
      select: false,
      videoPath: null,
      video: null,
    });
  };

  return (
    <div>
      <div className="addNewPost">
        <div className="addNewPost__rightSide">
          <div className="addNewPost__rightSide__inputBox">
            <textarea
              style={{
                border: "0",
                color: theme.typoMain,
              }}
              rows={textarea.rows}
              value={textarea.value}
              placeholder={language.home.addPostPlaceholder}
              className="addNewPost__rightSide__inputBox__textarea"
              onChange={(event) => handleChange(event)}
            />
          </div>

          {imageStatus.image.map((el, index) => {
            return (
              <div
                key={`ix${index}`}
                className="addNewPost__rightSide__postImageBox"
              >
                <div
                  className="addNewPost__rightSide__postImageBox__iconBox"
                  onClick={() => imageDelete(index)}
                >
                  <i
                    className="fal fa-times"
                    style={{ color: "#fff", zIndex: "10" }}
                  ></i>
                  <div
                    className="addNewPost__rightSide__postImageBox__iconBox__background"
                    style={{
                      background: theme.mainColor,
                    }}
                  ></div>
                </div>
                <div className="addNewPost__rightSide__postImageBox__imageWrapper">
                  <img alt="post" src={URL.createObjectURL(el)} />
                </div>
              </div>
            );
          })}

          <div className="addNewPost__rightSide__postImageBox">
            {videoStatus.select ? (
              <Fragment>
                <div
                  className="addNewPost__rightSide__postImageBox__iconBox"
                  onClick={videoDelete}
                >
                  <i
                    className="fal fa-times"
                    style={{ color: "#fff", zIndex: "10" }}
                  ></i>
                  <div
                    className="addNewPost__rightSide__postImageBox__iconBox__background"
                    style={{
                      background: theme.mainColor,
                    }}
                  ></div>
                </div>
                <div className="addNewPost__rightSide__postImageBox__imageWrapper">
                  <video controls>
                    <source src={videoStatus.videoPath} />
                  </video>
                </div>
              </Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-auto me-auto">
          <div className="row">
            <div className="col-auto">
              <select
                className="form-select"
                aria-label="Select Post Type"
                value={type}
                onChange={handleSelect}
              >
                {types.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-auto addNewPost__rightSide__buttonsBox__imageUpload p-2">
              <input
                type="file"
                multiple
                id={inputId}
                accept="image/x-png,image/png,image/jpeg"
                onChange={(event) => handleImageChange(event)}
              />
              <div className="button" onClick={() => handleImageUpload()}>
                <i
                  className="fas fa-image"
                  style={{ color: theme.inputIcon }}
                ></i>
              </div>
            </div>

            <div className="col-auto addNewPost__rightSide__buttonsBox__imageUpload p-2">
              <input
                type="file"
                id={inputId + "_video"}
                accept=".mp4,.mov"
                onChange={(event) => handleVideoChange(event)}
              />
              <div className="button" onClick={() => handleVideoUpload()}>
                <i
                  className="fas fa-video"
                  style={{ color: theme.inputIcon }}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div
          className="addNewPost__rightSide__buttonsBox__postShare col-auto"
          style={{ alignItems: "flex-end" }}
        >
          <FormSubmitButton
            textarea={textarea}
            setTextarea={setTextarea}
            imageStatus={imageStatus}
            setImageStatus={setImageStatus}
            videoStatus={videoStatus}
            setVideoStatus={setVideoStatus}
            setOpen={setOpen}
            extra={extra}
            setExtra={setExtra}
            type={type}
          />
        </div>
      </div>

      {Object.keys(extraInputs).map((key) => {
        if (type === key) {
          return (
            <div key={`x${key}`}>
              {extraInputs[key].map((v, index) => {
                return (
                  <AddNewPostInput
                    key={`${key}x${index}`}
                    v={v}
                    onChange={(event) => handleExtraInput(event)}
                  />
                );
              })}
            </div>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
};

export default AddNewPost;
