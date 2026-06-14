import api from "./axios";

export const getPYQs = () => {
  return api.get("/pyqs");
};

export const getPYQById = (pyqId) => {
  return api.get(`/pyqs/${pyqId}`);
};

export const uploadPYQ = (pyqData) => {
  const token = localStorage.getItem("token");

  return api.post("/pyqs", pyqData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyPYQs = () => {
  const token = localStorage.getItem("token");

  return api.get("/my-pyqs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePYQ = (pyqId) => {
  const token = localStorage.getItem("token");

  return api.delete(`/pyqs/${pyqId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};