import { createSlice } from "@reduxjs/toolkit";
import {
  getArticles as getArticlesAPI,
  getTotalArticles as getTotalArticlesAPI,
  getArticle as getArticleAPI,
  createNewArticle as createNewArticleAPI,
  updateArticle as updateArticleAPI,
  deleteArticle as deleteArticleAPI,
} from "../../api/WebAPI";

export const articleReducer = createSlice({
  name: "article",
  initialState: {
    isLoadingArticle: false,
    isLoadingArticles: false,
    article: "",
    articles: [],
    totalArticles: 0,
    newArticleResponse: null,
    editedArticleResponse: null,
    deleteArticleResponse: null,
    articleError: "",
    articlesError: "",
  },
  reducers: {
    setIsLoadingArticle: (state, action) => {
      state.isLoadingArticle = action.payload;
    },
    setIsLoadingArticles: (state, action) => {
      state.isLoadingArticles = action.payload;
    },
    setArticle: (state, action) => {
      state.article = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setTotalArticles: (state, action) => {
      state.totalArticles = action.payload;
    },
    setNewArticleResponse: (state, action) => {
      state.newArticleResponse = action.payload;
    },
    setEditedArticleResponse: (state, action) => {
      state.editedArticleResponse = action.payload;
    },
    setDeleteArticleResponse: (state, action) => {
      state.deleteArticleResponse = action.payload;
    },
    setArticleError: (state, action) => {
      state.articleError = action.payload;
    },
    setArticlesError: (state, action) => {
      state.articlesError = action.payload;
    },
  },
});

export const {
  setIsLoadingArticle,
  setIsLoadingArticles,
  setArticle,
  setArticles,
  setTotalArticles,
  setNewArticleResponse,
  setEditedArticleResponse,
  setDeleteArticleResponse,
  setArticleError,
  setArticlesError,
} = articleReducer.actions;

export const selectUser = (state) => state.user.user;

export const getArticles = (page) => (dispatch) => {
  dispatch(setIsLoadingArticles(true));
  getArticlesAPI(page)
    .then((data) => {
      dispatch(setIsLoadingArticles(false));
      dispatch(setArticles(data));
      return data;
    })
    .catch((err) => {
      dispatch(setArticlesError(err.message));
    });
};

export const getTotalArticles = () => (dispatch) => {
  dispatch(setIsLoadingArticles(true));
  return getTotalArticlesAPI()
    .then((data) => {
      dispatch(setIsLoadingArticles(false));
      dispatch(setTotalArticles(data));
      return data;
    })
    .catch((err) => {
      dispatch(setArticlesError(err.message));
    });
};

export const getArticle = (id) => (dispatch) => {
  dispatch(setIsLoadingArticle(true));
  return getArticleAPI(id)
    .then((data) => {
      dispatch(setIsLoadingArticle(false));
      dispatch(setArticle(data));
      return data;
    })
    .catch((err) => {
      dispatch(setArticleError(err.message));
    });
};

export const createNewArticle = (history, payload) => (dispatch) => {
  dispatch(setIsLoadingArticle(true));
  return createNewArticleAPI(payload)
    .then((res) => {
      const data = {
        title: payload.title,
        body: payload.body,
      };
      dispatch(setIsLoadingArticle(false));
      dispatch(setNewArticleResponse(data));
      if (res.id) {
        dispatch(getArticle(res.id));
        history.push(`/article/${res.id}`);
      }
      if (res.ok === 0) {
        dispatch(setArticleError(res.message));
      }
      return res;
    })
    .catch((err) => {
      dispatch(setArticleError(err.message));
    });
};

export const updateArticle = (history, id, payload) => (dispatch) => {
  dispatch(setIsLoadingArticle(true));
  return updateArticleAPI(id, payload)
    .then((res) => {
      const data = {
        title: payload.title,
        body: payload.body,
      };
      dispatch(setIsLoadingArticle(false));
      dispatch(setEditedArticleResponse(data));
      if (res.id) {
        dispatch(getArticle(res.id));
        history.push(`/article/${res.id}`);
      }
      return res;
    })
    .catch((err) => {
      dispatch(setArticleError(err.message));
    });
};

export const deleteArticle = (history, id) => (dispatch) => {
  dispatch(setIsLoadingArticle(true));
  return deleteArticleAPI(id)
    .then((res) => {
      dispatch(setIsLoadingArticle(false));
      dispatch(setDeleteArticleResponse(res));
      history.push(`/`);
      return res;
    })
    .catch((err) => {
      dispatch(setArticleError(err.message));
    });
};

export default articleReducer.reducer;
