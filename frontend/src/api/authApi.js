import api from "./axios";

export const signupUser = (userData) => {
  return api.post("/signup", userData);
};

export const loginUser = (userData) => {
  return api.post("/login", userData);
};

export const getProfile = () => {
  const token = localStorage.getItem("token");

  console.log("TOKEN =", token);

  return api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};