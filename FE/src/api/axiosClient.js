import axios from "axios";
const axiosClient = axios.create({
    baseURL: "http://13.228.71.235/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;
