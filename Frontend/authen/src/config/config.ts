import axios from "axios";

export const config = axios.create({
  baseURL: "https://localhost:7235",
  headers: {
    "Content-Type": "application/json",
  },
});
