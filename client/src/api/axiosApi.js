import axios from "axios";
import CONSTANTS from "../constants";
import history from "../BrowserHistory";
import { io } from "socket.io-client";
import store from "../store";
import { refreshTaskList } from "../actions/actionCreator";

//instance

const httpClient = axios.create({
  baseURL: `http://${CONSTANTS.API_BASE}`, // http://localhost:5000/api
});

const socket = io(`ws://${CONSTANTS.IPv4_ADDRESS}:5000`);

socket.on(CONSTANTS.SOCKET_EVENT_NOTIFICATION, (data) => {
  store.dispatch({ type: "NOTIFICATION", payload: data });
});

socket.on(CONSTANTS.SOCKET_REFRESH_TASK_LIST, () => {
  store.dispatch(refreshTaskList());
});

//userApi

export const registerUser = async (userData) => await httpClient.post("/users/sign-up", userData);

export const loginUser = async (userData) => await httpClient.post("/users/sign-in", userData);

export const refreshUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const { data } = await httpClient.post("/users/refresh", { refreshToken });
  return data;
};

export const authUser = async () => await httpClient.get("/users");

export const logOut = async () => {
  localStorage.clear();
};

// taskApi

export const getTasks = async () => await httpClient.get("/tasks");

export const createTask = async (taskData) => await httpClient.post("/tasks", taskData);

export const deleteTask = async (taskId) => await httpClient.delete(`/tasks/${taskId}`);

// interseptors

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => {
    if (response.data.tokens) {
      const {
        data: { tokens },
      } = response;

      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }
    return response;
  },
  async (error) => {
    if (error.response.status === 403 && localStorage.getItem("refreshToken")) {
      await refreshUser();

      // Povtority zapyt koly stalasya pomylka 403
      return await httpClient(error.config);
    } else if (error.response.status === 401) {
      await logOut();
      history.push("/");
    } else {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
