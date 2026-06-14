import { useEffect, useState } from "react";
import { getMyNotes, deleteNote } from "../api/noteApi";

function MyNotes() {
  const [notes, setNotes] = useState([]);

  const fetchMyNotes = async () => {
    try {
      const response = await getMyNotes();
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);

      alert("Note deleted successfully");

      fetchMyNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Notes
        </h1>

        {notes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            No notes uploaded yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {note.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {note.description}
                </p>

                <div className="space-y-1 mb-4">
                  <p>
                    <span className="font-semibold">
                      Subject:
                    </span>{" "}
                    {note.subject}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Branch:
                    </span>{" "}
                    {note.branch}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      window.open(
                        note.fileUrl,
                        "_blank"
                      )
                    }
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    View PDF
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(note._id)
                    }
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete Note
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyNotes;