import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import reducers from "./reducers/";

const store2 = configureStore({
  reducer: reducers,
  middleware: [thunk],
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store2}>
      <App />
    </Provider>
  </React.StrictMode>
);
