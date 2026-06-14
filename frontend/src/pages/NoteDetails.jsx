import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById } from "../api/noteApi";

function NoteDetails() {
  const { noteId } = useParams();

  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await getNoteById(noteId);

        setNote(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNote();
  }, []);

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <h1 className="text-2xl font-semibold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-xl shadow-md p-8">

          <h1 className="text-4xl font-bold mb-6">
            {note.title}
          </h1>

          <p className="text-gray-700 mb-6">
            {note.description}
          </p>

          <div className="space-y-3 mb-8">

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

         <a
  href={note.fileUrl}
  download
  target="_blank"
  rel="noreferrer"
  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  View Notes 
</a>

        </div>

      </div>
    </div>
  );
}

export default NoteDetails;