import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"; // Ensure the path is correct

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <Router>
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  </Provider>,

  document.getElementById("root")
);
