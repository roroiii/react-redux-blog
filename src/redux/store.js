import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./reducers/articleReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
  },
});

export default store;
