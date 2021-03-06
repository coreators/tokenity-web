import React, { createContext, Component } from "react";

// import data files
import English from "../util/Languages/English";
import Korean from "../util/Languages/Korean";

export const LanguageContext = createContext();

class LanguageContextProvider extends Component {
  state = {
    isEnglish: true,
    english: English,
    korean: Korean,
  };

  componentDidMount() {
    // 브라우저 기본언어 한글인 경우 한글 그외에는 영어
    /**
     * before render the component, check first if user have selected language before?
     * if yes, update the state according to localStorage value
     */
    const _isEnglish = window.localStorage.getItem("isEnglish");
    if (_isEnglish === "false") {
      this.setState({
        isEnglish: false,
      });
    }
    if (_isEnglish === "true") {
      this.setState({
        isEnglish: true,
      });
    }
  }

  // toggle current language
  toggleLanguage = () => {
    if (this.state.isEnglish === false) {
      window.localStorage.setItem("isEnglish", true);
      this.setState({
        isEnglish: true,
      });
    } else {
      window.localStorage.setItem("isEnglish", false);
      this.setState({
        isEnglish: false,
      });
    }
  };

  render() {
    return (
      // pass state and fun to whole app
      <LanguageContext.Provider
        value={{ ...this.state, toggleLanguage: this.toggleLanguage }}
      >
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

export default LanguageContextProvider;
