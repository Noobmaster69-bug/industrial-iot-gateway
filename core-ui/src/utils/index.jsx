import Axios from "axios";
export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:33333/api",
});
