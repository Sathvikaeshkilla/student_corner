import { useEffect, useState, useContext } from "react";
import { getNotes } from "../api/noteApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] =
    useState("All");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();

        setNotes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      note.subject
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesBranch =
      selectedBranch === "All" ||
      note.branch === selectedBranch;

    return matchesSearch && matchesBranch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Notes
          </h1>

          {user && (
            <div className="flex gap-4">
              <button
                onClick={() =>
                  navigate("/upload-note")
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Upload Note
              </button>

              <button
                onClick={() =>
                  navigate("/my-notes")
                }
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
              >
                My Notes
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title or subject..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="flex-1 border rounded-lg p-3"
          />

          <select
            value={selectedBranch}
            onChange={(e) =>
              setSelectedBranch(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option value="All">
              All Branches
            </option>
            <option value="General">
              General
            </option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">
              CIVIL
            </option>
            <option value="IT">IT</option>
          </select>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            No notes found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
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

                <button
                  onClick={() =>
                    navigate(`/notes/${note._id}`)
                  }
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Notes;