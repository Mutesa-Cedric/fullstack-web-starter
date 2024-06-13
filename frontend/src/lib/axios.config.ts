import axios from "axios";
import { getCookie } from "./utils";

const token = getCookie("token");

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default axiosInstance;
