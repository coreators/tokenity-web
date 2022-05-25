import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

// style file
import './MobileNavbar.scss';

// context (global state)
import { ThemeContext } from '../../context/ThemeContext';
import UserContext from '../../context/UserContext';

// components
import LoginButton from '../../components/Buttons/LoginButton';
import SignupButton from '../../components/Buttons/SignupButton';
import TokenityBtnNavbar from '../../components/Buttons/TokenityBtnNavbar/TokenityBtnNavbar';
import UserImage from '../CurrentUser/UserImage';

// import TrendUpIcon from "../../assets/IconsSvg2/trending_up_black_24dp.svg";

const MobileNavbar = () => {
  // ******* start global state ******* //

  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // user context
  const { userData } = useContext(UserContext);

  // ******* end global state ******* //

  const defaultActive = {
    home: false,
    profile: false,
    settings: false,
    wallet: false,
    trends: false,
    about: false,
  };

  // local state
  const [isActive, setActive] = useState({
    ...defaultActive,
  });
  const [page, setPage] = useState('home');

  useEffect(() => {
    setActive({ ...defaultActive, [page]: true });
  }, [page]);

  return (
    <div className="MobileNavber">
      <div className="MobileNavber__main" style={{}}>
        {userData.isAuth ? (
          <Fragment>
            <div className="MobileNavber__box__formSubmitButton">
              <TokenityBtnNavbar />
            </div>
            <div className="MobileNavber__box">
              {/* -------------- Start Tabs -------------- */}
              <div className="MobileNavber__box__tabs">
                {/* Home Tab */}
                <div className="MobileNavber__box__tab">
                  <Link to="/" onClick={() => setPage('home')}>
                    <span className="MobileNavber__box__tab__icon">
                      <i
                        className={
                          isActive.home ? 'fas fa-home-alt' : 'fal fa-home-alt'
                        }
                        style={{
                          color: `${
                            isActive.home
                              ? theme.mainColor
                              : theme.mobileNavIcon
                          }`,
                        }}
                      ></i>
                    </span>
                  </Link>
                </div>

                {/* Trending Tab */}
                <div className="MobileNavber__box__tab">
                  <Link to={'/trends/'} onClick={() => setPage('trends')}>
                    <span className="MobileNavber__box__tab__icon">
                      <i
                        className={
                          isActive.trends
                            ? 'fas fa-chart-line'
                            : 'fal fa-chart-line'
                        }
                        style={{
                          color: `${
                            isActive.trends
                              ? theme.mainColor
                              : theme.mobileNavIcon
                          }`,
                        }}
                      ></i>
                    </span>
                  </Link>
                </div>

                {/* Wallet Tab */}
                <div className="MobileNavber__box__tab">
                  <Link to={'/wallet/'} onClick={() => setPage('wallet')}>
                    <span className="MobileNavber__box__tab__icon">
                      <i
                        className={
                          isActive.wallet ? 'fas fa-wallet' : 'fal fa-wallet'
                        }
                        style={{
                          color: `${
                            isActive.wallet
                              ? theme.mainColor
                              : theme.mobileNavIcon
                          }`,
                        }}
                      ></i>
                    </span>
                  </Link>
                </div>

                {/* About Tab */}
                <div className="MobileNavber__box__tab">
                  <Link to={'/about/'} onClick={() => setPage('about')}>
                    <span className="MobileNavber__box__tab__icon">
                      <i
                        className={
                          isActive.about? 'fas fa-book' : 'far fa-book'
                        }
                        style={{
                          color: `${
                            isActive.about
                              ? theme.mainColor
                              : theme.mobileNavIcon
                          }`,
                        }}
                      ></i>
                    </span>
                  </Link>
                </div>

                {/* More Tab */}
                {/* <div className="MobileNavber__box__tab">
                  <Link to={"/settings"} onClick={() => setPage("settings")}>
                    <span className="MobileNavber__box__tab__icon">
                      <i
                        className={
                          isActive.settings
                            ? "fas fa-ellipsis-h-alt"
                            : "fal fa-ellipsis-h-alt"
                        }
                        style={{
                          color: `${isActive.settings
                            ? theme.mainColor
                            : theme.mobileNavIcon
                            }`,
                        }}
                      ></i>
                    </span>
                  </Link>
                </div> */}

                {/* Profile Tab */}
                <div className="MobileNavber__box__tab">
                  <Link
                    to={'/users/' + userData.user.credentials.userName}
                    onClick={() => setPage('profile')}
                  >
                    <UserImage />
                  </Link>
                </div>
              </div>

              {/* -------------- End Tabs -------------- */}
            </div>
          </Fragment>
        ) : (
          <div className="buttons__box">
            <LoginButton />
            <SignupButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
