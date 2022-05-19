import React, { useContext, useState, Fragment } from "react";

// style
import "./TokenityBtnNavbar.scss";
// Global vars import
import variables from "../../../style/CssVariables.scss";

import AppIcon from "../../../components/AppIcon";

// libraries
import { Modal } from "react-bootstrap";

// context (global state)
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";
import AddNewPost from "../../../parts/AddNewPost/AddNewPost";

const TokenityBtnNavbar = () => {
  // ******* start global state *******//
  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  // language context
  const { isEnglish, english, korean } = useContext(LanguageContext);
  var language = isEnglish ? english : korean;

  // ******* end global state *******//

  // local state
  const [isOpen, setOpen] = useState(false);

  let closeModal = () => setOpen(false);

  let openModal = () => setOpen(true);

  return (
    <Fragment>
      <div className="formSubmitButtonsBox" onClick={openModal}>
        <button
          className="bigButton"
          style={{
            color: "#fff",
            backgroundColor: theme.mainColor,
            borderRadius: variables.radius,
          }}
        >
          {language.home.addPostButton}
        </button>
        <button
          className="smallButton"
          title="add new post"
          style={{
            color: "#fff",
            backgroundColor: theme.mainColor,
          }}
        >
          <AppIcon />
        </button>
      </div>

      <Modal show={isOpen} onHide={closeModal} keyboard={false}>
        <Modal.Header className="formSubmitButtonsBox__modal__header">
          <div
            className="formSubmitButtonsBox__modal__header__iconBox"
            onClick={() => closeModal()}
          >
            <i className="fal fa-times" style={{ color: theme.mainColor }}></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <AddNewPost inputId="modalPart" setOpen={setOpen} />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default TokenityBtnNavbar;
