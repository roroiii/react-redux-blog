import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ThemeProvider } from "styled-components";
import "./reset.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = {
  colors: {
    primary_300: "#ff0000",
    primary_600: "#dd0000",
    primary_900: "#yy0000",
  },
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
