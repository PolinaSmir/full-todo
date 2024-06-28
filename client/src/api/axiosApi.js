import axios from "axios";
import CONSTANTS from "../constants";
import history from "../BrowserHistory";

//instance

const httpClient = axios.create({
  baseURL: CONSTANTS.API_BASE,
});

//userApi

export const registerUser = async (userData) => await httpClient.post("/users/sign-up", userData);

export const loginUser = async (userData) => await httpClient.post("/users/sign-in", userData);

export const refreshUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const { data } = await httpClient.post("/users/refresh", { refreshToken });
  return data;
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
      await httpClient(error.config);
    }

    if (error.response.status === 401) {
      history.push("/");
    }

    return Promise.reject(error);
  }
);
