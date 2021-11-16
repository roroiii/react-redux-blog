import { getAuthToken } from "../utils";

const BASE_API = "https://student-json-api.lidemy.me";
const PAGE_LIMIT = 9;

export const getArticles = async (page) => {
  return await fetch(
    `${BASE_API}/posts?&_page=${page}&_limit=${PAGE_LIMIT}&_expand=user&_sort=id&_order=desc`
  ).then((res) => res.json());
};

export const getTotalArticles = async (page) => {
  return await fetch(
    `${BASE_API}/posts?&_page=${page}&_limit=${PAGE_LIMIT}&_expand=user&_sort=id&_order=desc`
  ).then((res) => {
    let totalArticles = res.headers.get("x-total-count");
    return totalArticles;
  });
};

export const getArticle = async (id) => {
  return await fetch(`${BASE_API}/posts?id=${id}`).then((res) => res.json());
};

export const createNewArticle = async (payload) => {
  const token = getAuthToken();
  return await fetch(`${BASE_API}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const updateArticle = async (id, payload) => {
  const token = getAuthToken();
  return await fetch(`${BASE_API}/posts/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const deleteArticle = async (id) => {
  const token = getAuthToken();
  return await fetch(`${BASE_API}/posts/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((res) => res.json());
};

export const login = async (payload) => {
  return await fetch(`${BASE_API}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const register = async (payload) => {
  return await fetch(`${BASE_API}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const getMe = async () => {
  const token = getAuthToken();
  return await fetch(`${BASE_API}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
