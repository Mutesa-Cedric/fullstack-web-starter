import _ from "axios";
import { getCookie } from "./utils";

const axios = _.create({
    baseURL: "http://localhost:8000",
    headers: {
        Cookie: `token=${getCookie("token")}`,
    },
});

export default axios;