// Utils/Api.js
import Axios from "axios";
import { Navigate } from "react-router-dom";

const baseURL = "http://localhost:3001/api";

const axios = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function postAPI(url, payload, headers = {}) {
  try {
    const response = await axios.post(url, payload, { headers });

    if (response.status >= 200 && response.status < 300) {
      return {
        message: response.message,
        hasError: false,
        ...response.data,
      };
    }
  } catch (error) {
    console.error("Error during Api request:", error);

    if (error.response && error.response.status === 400) {
      const errorResponse = error.response.data;
      return {
        message: errorResponse.message,
        type: errorResponse.type,
        hasError: true,
      };
    }

    return { message: "Internal server error", hasError: true };
  }
}

export const isAuthenticated = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo !== null;
};

export const handleUnauthorized = () => {
  Navigate("/sign-in");
};

export default postAPI;
