import axios from "axios";

export const instance = axios.create({
  cors: "AllowAll",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  },
});
