import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.203:8000",
});

export { api };
