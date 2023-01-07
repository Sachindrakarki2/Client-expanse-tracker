import axios from "axios";
const baseURL = "http://localhost:8000/api/v1";
const userAPI = baseURL + "/user";
const transAPI = baseURL + "/transaction";

// ======== user api

export const postUser = async (obj) => {
  try {
    const { data } = await axios.post(userAPI, obj);
    return data;
  } catch (error) {
    return {
      status: "success",
      message: error.message,
    };
  }
};

//login user
export const loginUser = async (obj) => {
  try {
    const { data } = await axios.post(userAPI + "/login", obj);

    return data;
  } catch (error) {
    return {
      status: "success",
      message: error.message,
    };
  }
};

//return user id
const getUserId = () => {
  const userStr = sessionStorage.getItem("user");
  const userObj = userStr ? JSON.parse(userStr) : null;
  return userObj?._id || null;
};

// ======== transaction api
export const fetchTransactions = async () => {
  try {
    const userId = getUserId();

    if (!userId) {
      return {
        status: "error",
        message: "You need to log in",
      };
    }
    const { data } = await axios.get(transAPI, {
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "success",
      message: error.message,
    };
  }
};

export const postTrans = async (formData) => {
  try {
    const userId = getUserId();

    if (!userId) {
      return {
        status: "error",
        message: "You need to log in",
      };
    }
    const { data } = await axios.post(transAPI, formData, {
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "success",
      message: error.message,
    };
  }
};
