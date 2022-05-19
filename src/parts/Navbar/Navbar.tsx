import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// style file
import "./Navbar.scss";
import TokenityLogo from "../../assets/ci/Tokenity_Logo_white.svg";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import UserContext from "../../context/UserContext";

// components
import TokenityBtnNavbar from "../../components/Buttons/TokenityBtnNavbar/TokenityBtnNavbar";
// import UserProfileCard from "../CurrentUser/UserProfileCard";
import UserImage from "../CurrentUser/UserImage";

const Navbar = () => {
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

  const defaultActive = {
    home: false,
    notifications: false,
    profile: false,
    settings: false,
    wallet: false,
    trend: false,
  };

  // local state
  const [isActive, setActive] = useState({ ...defaultActive });
  const [page, setPage] = useState("home");

  const [notsCount, setNotsCount] = useState(0);

  useEffect(() => {
    if (userData.isAuth) {
      let userNotifications = userData.user.notifications;

      if (userNotifications && userNotifications.length > 0) {
        userNotifications.filter((not) => not.read === false).length > 0
          ? setNotsCount(
              userNotifications.filter((not) => not.read === false).length
            )
          : setNotsCount(0);
      } else {
        setNotsCount(0);
      }
    }

    setActive({ ...defaultActive, [page]: true });
  }, [page, userData.isAuth]);

  const clearCounter = () => {
    setNotsCount(0);
  };

  return (
    <div className="Navbar">
      <div
        className="Navbar__main"
        style={{
          backgroundColor: `${theme.background}`,
        }}
      >
        {userData.isAuth ? (
          <div className="Navbar__box">
            <div className="Navbar__box__logo">
              <div className="Navbar__box__logo__box">
                <img alt="Tokenity" src={TokenityLogo} />
              </div>
            </div>

            {/* -------------- Start Tabs -------------- */}
            <div className="Navbar__box__tabs">
              {/* Home Tab */}
              <div className="Navbar__box__tab">
                <Link
                  to="/"
                  onClick={() => {
                    setPage("home");
                  }}
                >
                  <span className="Navbar__box__tab__icon">
                    <i
                      className={
                        isActive.home ? "fas fa-home-alt" : "fal fa-home-alt"
                      }
                      style={{
                        color: `${
                          isActive.home ? theme.mainColor : theme.typoMain
                        }`,
                      }}
                    ></i>
                  </span>
                  <span
                    className="Navbar__box__tab__text"
                    style={{
                      color: `${
                        isActive.home ? theme.mainColor : theme.typoMain
                      }`,
                    }}
                  >
                    {language.navbar.home}
                  </span>
                </Link>
              </div>

              {/* Home Tab */}
              <div className="Navbar__box__tab">
                <Link
                  to="/trends/"
                  onClick={() => {
                    setPage("trend");
                  }}
                >
                  <span className="Navbar__box__tab__icon">
                    <i
                      className={
                        isActive.trend
                          ? "fas fa-chart-line"
                          : "fal fa-chart-line"
                      }
                      style={{
                        color: `${
                          isActive.trend ? theme.mainColor : theme.typoMain
                        }`,
                      }}
                    ></i>
                  </span>
                  <span
                    className="Navbar__box__tab__text"
                    style={{
                      color: `${
                        isActive.trend ? theme.mainColor : theme.typoMain
                      }`,
                    }}
                  >
                    {language.navbar.trend}
                  </span>
                </Link>
              </div>

              {/* Wallet Tab */}
              <div className="Navbar__box__tab">
                <Link to={"/wallet/"} onClick={() => setPage("wallet")}>
                  <span className="Navbar__box__tab__icon">
                    <i
                      className={
                        isActive.wallet ? "fas fa-wallet" : "fal fa-wallet"
                      }
                      style={{
                        color: `${
                          isActive.wallet ? theme.mainColor : theme.typoMain
                        }`,
                      }}
                    ></i>
                  </span>
                  <span
                    className="Navbar__box__tab__text"
                    style={{
                      color: `${
                        isActive.wallet ? theme.mainColor : theme.typoMain
                      }`,
                    }}
                  >
                    {language.navbar.wallet}
                  </span>
                </Link>
              </div>
              {/* Notification Tab */}
              <div className="Navbar__box__tab" onClick={clearCounter}>
                <Link
                  to="/notifications"
                  onClick={() => {
                    setPage("notifications");
                  }}
                >
                  <span className="Navbar__box__tab__icon">
                    <i
                      className={
                        isActive.notifications
                          ? "fas fa-bell Navbar__box__tab__icon--not"
                          : "fal fa-bell Navbar__box__tab__icon--not"
                      }
                      style={{
                        color: `${
                          isActive.notifications
                            ? theme.mainColor
                            : theme.typoMain
                        }`,
                      }}
                    ></i>
                    {notsCount > 0 && (
                      <span
                        style={{
                          backgroundColor: theme.mainColor,
                          border: `2px solid ${theme.background}`,
                          color: "#fff",
                        }}
                      >
                        {notsCount}
                      </span>
                    )}
                  </span>
                  <span
                    className="Navbar__box__tab__text"
                    style={{
                      color: `${
                        isActive.notifications
                          ? theme.mainColor
                          : theme.typoMain
                      }`,
                    }}
                  >
                    {language.navbar.notifications}
                  </span>
                </Link>
              </div>
              <div className="navbar_profile">
                <Link
                  to={"/users/" + userData.user.credentials.userName}
                  onClick={() => setPage("profile")}
                >
                  <UserImage />
                </Link>
              </div>
            
              {/* More Tab */}
              {/* <div className="Navbar__box__tab">
                <Link to={'/settings/'} onClick={() => setPage('settings')}>
                  <span className="Navbar__box__tab__icon">
                    <i
                      className={
                        isActive.settings
                          ? 'fas fa-ellipsis-h-alt'
                          : 'fal fa-ellipsis-h-alt'
                      }
                      style={{
                        color: `${
                          isActive.settings ? theme.mainColor : theme.typoMain
                        }`,
                      }}
                    ></i>
                  </span>
                  <span
                    className="Navbar__box__tab__text"
                    style={{
                      color: `${
                        isActive.settings ? theme.mainColor : theme.typoMain
                      }`,
                    }}
                  >
                    {language.navbar.more}
                  </span>
                </Link>
              </div> */}
              {/* Twittern button Tab */}
              <div className="Navbar__box__tab --formSubmitButton">
                <TokenityBtnNavbar />
              </div>
            </div>
            {/* -------------- End Tabs -------------- */}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
