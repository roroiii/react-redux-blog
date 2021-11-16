import { createSlice } from "@reduxjs/toolkit";
import {
  login as loginAPI,
  getMe as getMeAPI,
  register as registerAPI,
} from "../../api/WebAPI";
import { setAuthToken } from "../../utils";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: "",
    registerError: "",
    loginError: "",
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLogout: (state) => {
      state.user = "";
    },
    setRegisterError: (state, action) => {
      state.registerError = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setUser,
  setUserLogout,
  setRegisterError,
  setLoginError,
} = userReducer.actions;

export const selectUser = (state) => state.user.user;

export const login = (history, payload) => (dispatch) => {
  dispatch(setIsLoading(true));
  loginAPI(payload)
    .then((res) => {
      dispatch(setIsLoading(false));
      const data = {
        username: payload.username,
      };
      if (res.ok !== 1) {
        return dispatch(setLoginError(res.message));
      }
      if (res.ok === 1) {
        setAuthToken(res.token);
        dispatch(setUser(data));
        dispatch(getMe());
        history.push("/");
      }
      return res;
    })
    .catch((err) => {
      dispatch(setLoginError(err.message));
    });
};

export const register = (history, payload) => (dispatch) => {
  dispatch(setIsLoading(true));
  registerAPI(payload)
    .then((res) => {
      dispatch(setIsLoading(false));
      const data = {
        username: payload.username,
        nickname: payload.nickname,
      };
      if (res.ok !== 1) {
        return dispatch(setRegisterError(res.message));
      }
      if (res.ok === 1) {
        setAuthToken(res.token);
        dispatch(setUser(data));
        dispatch(getMe());
        history.push("/");
      }
      return res;
    })
    .catch((err) => {
      dispatch(setRegisterError(err.message));
    });
};

export const logout = (history) => (dispatch) => {
  dispatch(setUserLogout());
  setAuthToken("");
  history.push("/");
};

export const getMe = () => async (dispatch) => {
  await getMeAPI().then((res) => {
    if (res.ok) {
      dispatch(setUser(res.data));
    }
  });
};

export default userReducer.reducer;
