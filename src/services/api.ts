import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 8000,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
