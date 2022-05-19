import React from "react";

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./style/layouts.scss";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.css';

import "bootstrap/dist/js/bootstrap.bundle.min";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
