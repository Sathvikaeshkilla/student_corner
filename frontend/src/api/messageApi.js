import api from "./axios";

export const sendMessage = (
  itemId,
  otherUserId,
  message
) => {
  const token = localStorage.getItem("token");

  return api.post(
    `/messages/${itemId}/${otherUserId}`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMessages = (
  itemId,
  otherUserId
) => {
  const token = localStorage.getItem("token");

  return api.get(
    `/messages/${itemId}/${otherUserId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMyChats = () => {
  const token = localStorage.getItem("token");

  return api.get("/my-chats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};