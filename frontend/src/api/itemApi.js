import api from "./axios";

export const getItems = () => {
  return api.get("/items");
};

export const getItemById = (itemId) => {
  return api.get(`/items/${itemId}`);
};

export const createItem = (formData) => {
  const token = localStorage.getItem("token");

  return api.post("/items", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMyItems = () =>{
  const token = localStorage.getItem("token");
  return api.get("my-items",{
    headers:{
      Authorization:`Bearer ${token}`,
    },
  });
};

export const deleteItem = (itemId) => {
  const token = localStorage.getItem("token");

  return api.delete(`/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markItemSold = (itemId) => {
  const token = localStorage.getItem("token");

  return api.patch(
    `/items/${itemId}/sold`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

