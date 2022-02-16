import React from "react";

import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.scss";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/js/bootstrap.bundle.min";
const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();