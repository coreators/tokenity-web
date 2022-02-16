import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// style file
import "./Signup.scss";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import UserContext from "../../context/UserContext";

// api service
import UserService from "../../services/UserService";

const Signup = () => {
  // ******* start global state ******* //

  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // language context
  const { isEnglish, english, korean } = useContext(LanguageContext);
  const language = isEnglish ? english : korean;

  // user context
  const { setUserData } = useContext(UserContext);

  // ******* end global state ******* //

  // local state
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  // init
  const history = useNavigate();
  let userToken = "";

  // set page title
  document.title = language.signup.pageTitle;

  // execute sign up operations
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // sign up user
    UserService.signupUser({ userName, email, password, confirmPassword })
      .then((res) => {
        userToken = res.data.userToken;
        localStorage.setItem("auth-token", userToken);
      })
      .then(() => {
        if (userToken) {
          // get data of signed up user, and pass it to global state
          UserService.getAuthenticatedUser(userToken)
            .then((res) => {
              setUserData({ token: userToken, user: res.data, isAuth: true });
            })
            .then(() => history("/"))
            .catch((err) => console.error("Error while get user data", err));
        }
      })
      .then(() => {
        // everything done, so reset our states
        setErrors({});
        setLoading(false);
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.error("Error while sign up", err.response.data);
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div
      className="signupMain-box"
      style={{
        background: theme.background,
      }}
    >
      <div
        className="main"
        style={{
          background: theme.background,
        }}
      >
        <div className="logo">
          <svg
            viewBox="0 0 56 56"
            className="logo__svg"
            style={{
              fill: theme.logo,
            }}
          >
            <g>
              <rect x="10.1" y="16" width="12" height="12" />
              <path d="M34.1,52c-12,0-12-12-12-12V28h12v9c0,1.7,1.3,3,3,3h9v12H34.1" />
              <circle cx="28.1" cy="10" r="6" />
              <circle cx="40.1" cy="22" r="6" />
            </g>
          </svg>
        </div>
        <h4
          className="title"
          style={{
            color: theme.typoMain,
          }}
        >
          {language.signup.header}
        </h4>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div
              className="form-group form__inputBox"
              style={{
                background: theme.foreground,
                borderBottomColor: `${
                  errors.userName ? theme.error : theme.mainColor
                }`,
              }}
            >
              <label
                htmlFor="exampleInputUserName"
                className="form__inputBox__label"
                style={{
                  color: theme.typoSecondary,
                }}
              >
                {language.signup.userNameLabel}
              </label>
              <input
                type="text"
                className="form-control form__inputBox__input"
                id="exampleInputUserName"
                style={{
                  color: theme.typoMain,
                }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.userName && (
                <small
                  className="form-text"
                  style={{
                    color: theme.error,
                  }}
                >
                  * {errors.userName}
                </small>
              )}
            </div>
            <div
              className="form-group form__inputBox"
              style={{
                background: theme.foreground,
                borderBottomColor: `${
                  errors.email ? theme.error : theme.mainColor
                }`,
              }}
            >
              <label
                htmlFor="exampleInputEmail1"
                className="form__inputBox__label"
                style={{
                  color: theme.typoSecondary,
                }}
              >
                {language.signup.emailLabel}
              </label>
              <input
                type="email"
                className="form-control form__inputBox__input"
                id="exampleInputEmail1"
                style={{
                  color: theme.typoMain,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <small
                  className="form-text"
                  style={{
                    color: theme.error,
                  }}
                >
                  * {errors.email}
                </small>
              )}
            </div>
            <div
              className="form-group form__inputBox"
              style={{
                background: theme.foreground,
                borderBottomColor: `${
                  errors.password ? theme.error : theme.mainColor
                }`,
              }}
            >
              <label
                htmlFor="exampleInputPassword1"
                className="form__inputBox__label"
                style={{
                  color: theme.typoSecondary,
                }}
              >
                {language.signup.passwordLabel}
              </label>
              <input
                type="password"
                className="form-control form__inputBox__input"
                id="exampleInputPassword1"
                style={{
                  color: theme.typoMain,
                }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {errors.password && (
                <small
                  className="form-text"
                  style={{
                    color: theme.error,
                  }}
                >
                  * {errors.password}
                </small>
              )}
            </div>
            <div
              className="form-group form__inputBox"
              style={{
                background: theme.foreground,
                borderBottomColor: `${
                  errors.confirmPassword ? theme.error : theme.mainColor
                }`,
              }}
            >
              <label
                htmlFor="exampleInputPasswordConfirm"
                className="form__inputBox__label"
                style={{
                  color: theme.typoSecondary,
                }}
              >
                {language.signup.confirmPasswordLabel}
              </label>
              <input
                type="password"
                className="form-control form__inputBox__input"
                id="exampleInputPasswordConfirm"
                style={{
                  color: theme.typoMain,
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              {errors.confirmPassword && (
                <small
                  className="form-text"
                  style={{
                    color: theme.error,
                  }}
                >
                  * {errors.confirmPassword}
                </small>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary form__button mt-3"
              style={{
                background: theme.mainColor,
              }}
              disabled={isLoading}
            >
              {isLoading
                ? language.signup.loading
                : language.signup.signupButton}
            </button>
          </form>
        </div>
        <div className="login">
          <span
            style={{
              color: theme.mainColor,
            }}
          >
            {language.signup.question}
            {"  "}
            <Link
              to="/login"
              className="login__link"
              style={{
                color: theme.mainColor,
              }}
            >
              {language.signup.link}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
