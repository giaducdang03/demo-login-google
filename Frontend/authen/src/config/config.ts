import axios from "axios";

export const config = axios.create({
  baseURL: "https://localhost:7235",
  headers: {
    method: "POST",
    "Content-Type": "application/json",
  },
});
