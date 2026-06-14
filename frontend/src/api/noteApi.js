import api from "./axios";

export const getNotes = () => {
  return api.get("/notes");
};

export const getNoteById = (noteId) => {
  return api.get(`/notes/${noteId}`);
};

export const uploadNote = (formData) => {
  const token = localStorage.getItem("token");

  return api.post("/notes", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMyNotes = () => {
  const token = localStorage.getItem("token");

  return api.get("/my-notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteNote = (noteId) => {
  const token = localStorage.getItem("token");

  return api.delete(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
