import React, { useContext, useState, Fragment } from "react";

import { Link } from "react-router-dom";

// style file
import "./AddNewPost.scss";

// assets
import default_pp from "../../assets/Images/default_pp.png";

// components
import FormSubmitButton from "../../components/Buttons/FormSubmitButton/FormSubmitButton";
import AddNewPostInput from "./AddNewPostInput";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import UserContext from "../../context/UserContext";

import { types, extraInputs } from "./constants";

const AddNewPost = ({ inputId, setOpen }) => {
  // ******* start global state ******* //

  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // language context
  const { isEnglish, english, korean } = useContext(LanguageContext);
  var language = isEnglish ? english : korean;

  // user context
  const { userData } = useContext(UserContext);

  // ******* end global state ******* //

  // local state
  const [textarea, setTextarea] = useState({
    value: "",
    rows: 1,
    minRows: 1,
    maxRows: 100,
  });

  const [imageStatus, setImageStatus] = useState({
    select: false,
    imagePath: null,
    image: "",
  });

  const [type, setType] = useState("porst");

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
    const image = event.target.files[0];
    setImageStatus({
      select: true,
      imagePath: URL.createObjectURL(image),
      image,
    });
  };

  const handleImageUpload = () => {
    const fileInput = document.getElementById(inputId);
    fileInput.click();
  };

  const handleVideoChange = (event) => {
    const image = event.target.files[0];
    setImageStatus({
      select: true,
      imagePath: URL.createObjectURL(image),
      image,
    });
  };

  const handleVideoUpload = () => {
    const fileInput = document.getElementById(inputId + "_video");
    fileInput.click();
  };

  const imageDelete = () => {
    setImageStatus({
      select: false,
      imagePath: null,
      image: "",
    });
  };

  return (
    <div>
      <div className="addNewPost">
        <div className="addNewPost__leftSide">
          <div className="addNewPost__leftSide__imageBox">
            <Link
              to={
                userData.isAuth
                  ? "/users/" + userData.user.credentials.userName
                  : "#"
              }
            >
              <img
                alt="profile"
                src={
                  userData.isAuth
                    ? userData.user.credentials.profilePicture
                    : default_pp
                }
              />
            </Link>
          </div>
        </div>
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
          <div className="addNewPost__rightSide__postImageBox">
            {imageStatus.select ? (
              <Fragment>
                <div
                  className="addNewPost__rightSide__postImageBox__iconBox"
                  onClick={imageDelete}
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
                  <img alt="post" src={imageStatus.imagePath} />
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
                id={inputId}
                accept="image/x-png,image/jpeg"
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
                accept="video/mp4,video/x-m4v,video/*"
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
            setOpen={setOpen}
          />
        </div>
      </div>

      {Object.keys(extraInputs).map((key) => {
        if (type === key) {
          return (
            <div key={`x${key}`}>
              {extraInputs[key].map((v, index) => {
                return <AddNewPostInput key={`${key}x${index}`} v={v} />;
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
