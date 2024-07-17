import axios from "axios";
import CONSTANTS from "../constants";

const httpClient = axios.create({
  baseURL: `http://${CONSTANTS.API_BASE}`, // http://192.168.1.108:5000/api
});

export const authByQRCode = async (refreshToken) => await httpClient.post("/users/authByQRCode", refreshToken);

export default httpClient;
