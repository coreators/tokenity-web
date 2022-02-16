import React, { useContext } from "react";

// style file
import "./Join.scss";

// assets
import JoinTokenity from "../../assets/ci/Tokenity_Logo_Signature_292x56.svg";

// components
import LoginButton from "../../components/Buttons/LoginButton";
import SignupButton from "../../components/Buttons/SignupButton";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";

const Join = () => {
  // ******* start global state ******* //

  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // language context
  const { isEnglish, english, korean } = useContext(LanguageContext);
  var language = isEnglish ? english : korean;

  // ******* end global state ******* //
  return (
    <div className='JoinTokenity' >
      <div className='JoinTokenity__box' style={{ backgroundColor: theme.foreground }}>
        <div className='JoinTokenity__box__imageBox'>
          <img alt='join tokenity' src={JoinTokenity} />
        </div>
        <div className='JoinTokenity__box__body'>
          <div className='JoinTokenity__box__body__Title'>
            <h2 style={{ color: theme.typoMain }}>{language.rightSide.JoinTokenity}</h2>
            <p style={{ color: theme.typoSecondary }}>{language.rightSide.JoinTokenitySub}</p>
          </div>
          <div className='JoinTokenity__box__body__buttons'>
            <SignupButton />
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
