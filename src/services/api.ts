import axios from "axios";

const api = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 8000,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
