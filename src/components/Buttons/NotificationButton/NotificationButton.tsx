import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import UserContext from "../../../context/UserContext";
import "./NotificationButton.scss";

const NotificationButton = () => {
  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // user context
  const { userData } = useContext(UserContext);

  // notification number
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

  }, [userData.isAuth, userData.user.notifications]);

  const clearCounter = () => {
    setNotsCount(0);
  };
  return (
    <div className="box__tab" onClick={clearCounter}>
      <Link to="/notifications">
        <span className="box__tab__icon">
          <i
            className={"fal fa-bell"}
            style={{
              color: 'white'
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
      </Link>
    </div>
  );
};
export default NotificationButton;
