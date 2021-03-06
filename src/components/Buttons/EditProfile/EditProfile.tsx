import React, { useContext, useEffect, useState } from "react";

// style
import "./EditProfile.scss";
// Global vars import
import variables from "../../../style/CssVariables.scss";

// api service
import UserService from "../../../services/UserService";

// bootstrap components
import { Modal } from "react-bootstrap";

// context (global state)
import UserContext from "../../../context/UserContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";
import UserProfileContext from "../../../context/UserProfileContext";

const EditProfile = () => {
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
  // ******* end global state *******//

  // local state
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setName(userProfileData.user.name ? userProfileData.user.name : "");
    setBio(userProfileData.user.bio ? userProfileData.user.bio : "");
    setLocation(
      userProfileData.user.location ? userProfileData.user.location : ""
    );
    setWebsite(
      userProfileData.user.website ? userProfileData.user.website : ""
    );
  }, [userProfileData]);

  let closeModal = () => setOpen(false);

  let openModal = () => setOpen(true);

  let saveAndClose = () => {
    setLoading(true);

    let extraData = {
      name,
      bio,
      location,
      website,
    };

    // send data to server
    UserService.addUserDetails(extraData, userData.token)
      .then(() => {
        // 1- update user profile state to show new user details
        setUserProfileData({
          friends: userProfileData.friends,
          posts: userProfileData.posts,
          user: {
            ...userProfileData.user,
            name: extraData.name,
            bio: extraData.bio,
            location: extraData.location,
            website: extraData.website,
          },
        });

        // 2- update user profile in cache
        let cachedCurrentUser = JSON.parse(
          window.sessionStorage.getItem(userData.user.credentials.userName)
        );
        if (cachedCurrentUser) {
          window.sessionStorage.setItem(
            userData.user.credentials.userName,
            JSON.stringify({
              friends: cachedCurrentUser.friends,
              posts: cachedCurrentUser.posts,
              user: {
                ...cachedCurrentUser.user,
                name: extraData.name,
                bio: extraData.bio,
                location: extraData.location,
                website: extraData.website,
              },
            })
          );
        }
        setLoading(false);
      })
      .then(() => setOpen(false))
      .catch((err) => {
        console.log(err);
        setOpen(false);
        setLoading(false);
      });
  };

  return (
    <div className="editProfile__main">
      <button onClick={openModal} className="editProfile__main__button">
        {language.userProfile.editProfileButton}
      </button>

      <Modal
        show={isOpen}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        className="editProfile__main__modal"
      >
        <Modal.Header
          style={{
            background: theme.background,
            borderBottom: 0,
          }}
          className="editProfile__main__modal__header"
        >
          <div className="left">
            <div
              className="editProfile__main__modal__header__iconBox"
              onClick={() => closeModal()}
            >
              <i
                className="fal fa-times"
                style={{ color: theme.mainColor }}
              ></i>
              <div className="editProfile__main__modal__header__iconBox__background"></div>
            </div>
            <h2
              className="editProfile__main__modal__header__title"
              style={{
                color: theme.typoMain,
              }}
            >
              {language.userProfile.modalTitle}
            </h2>
          </div>
          <button
            className="editProfile__main__modal__header__saveButton"
            style={{
              color: "#fff",
              backgroundColor: theme.mainColor,
              borderRadius: variables.radius,
              opacity: isLoading ? 0.6 : 1,
            }}
            onClick={() => {
              saveAndClose();
            }}
            disabled={isLoading}
          >
            {isLoading
              ? language.userProfile.modalSaveButtonLoading
              : language.userProfile.modalSaveButton}
          </button>
        </Modal.Header>
        <Modal.Body
          style={{
            background: theme.background,
          }}
        >
          <div className="form">
            <form>
              <div
                className="form-group form__inputBox"
                style={{
                  background: theme.foreground,
                  borderBottomColor: theme.mainColor,
                }}
              >
                <label
                  htmlFor="name"
                  className="form__inputBox__label"
                  style={{
                    color: theme.typoSecondary,
                  }}
                >
                  {language.userProfile.modalNameLabel}
                </label>
                <input
                  type="text"
                  className="form-control form__inputBox__input"
                  id="name"
                  style={{
                    color: theme.typoMain,
                    background: theme.foreground,
                    border: 0,
                  }}
                  value={name}
                  autoComplete="off"
                  aria-describedby="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div
                className="form-group form__inputBox"
                style={{
                  background: theme.foreground,
                  borderBottomColor: theme.mainColor,
                }}
              >
                <label
                  htmlFor="bio"
                  className="form__inputBox__label"
                  style={{
                    color: theme.typoSecondary,
                  }}
                >
                  {language.userProfile.modalBioLabel}
                </label>
                <input
                  type="text"
                  className="form-control form__inputBox__input"
                  id="bio"
                  style={{
                    color: theme.typoMain,
                    background: theme.foreground,
                    border: 0,
                  }}
                  value={bio}
                  autoComplete="off"
                  aria-describedby="text"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div
                className="form-group form__inputBox"
                style={{
                  background: theme.foreground,
                  borderBottomColor: theme.mainColor,
                }}
              >
                <label
                  htmlFor="location"
                  className="form__inputBox__label"
                  style={{
                    color: theme.typoSecondary,
                  }}
                >
                  {language.userProfile.modalLocationLabel}
                </label>
                <input
                  type="text"
                  className="form-control form__inputBox__input"
                  id="location"
                  style={{
                    color: theme.typoMain,
                    background: theme.foreground,
                    border: 0,
                  }}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-describedby="text"
                />
              </div>
              <div
                className="form-group form__inputBox"
                style={{
                  background: theme.foreground,
                  borderBottomColor: theme.mainColor,
                }}
              >
                <label
                  htmlFor="website"
                  className="form__inputBox__label"
                  style={{
                    color: theme.typoSecondary,
                  }}
                >
                  {language.userProfile.modalWebsiteLabel}
                </label>
                <input
                  type="text"
                  className="form-control form__inputBox__input"
                  id="website"
                  style={{
                    color: theme.typoMain,
                    background: theme.foreground,
                    border: 0,
                  }}
                  value={website}
                  autoComplete="off"
                  aria-describedby="text"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditProfile;
