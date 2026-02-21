import axios from "axios";

const API = axios.create({
  baseURL: "hlocalhost:5000/api/",
});

export default API;
