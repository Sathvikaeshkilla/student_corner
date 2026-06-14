import { useEffect, useState } from "react";
import { getMyPYQs, deletePYQ } from "../api/pyqApi";

function MyPYQs() {
  const [pyqs, setPyqs] = useState([]);

  const fetchMyPYQs = async () => {
    try {
      const response = await getMyPYQs();
      setPyqs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPYQs();
  }, []);

  const handleDelete = async (pyqId) => {
    try {
      await deletePYQ(pyqId);

      alert("PYQ deleted successfully");

      fetchMyPYQs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My PYQs
        </h1>

        {pyqs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            No PYQs uploaded yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pyqs.map((pyq) => (
              <div
                key={pyq._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {pyq.title}
                </h2>

                <div className="space-y-2 mb-4">

                  <p>
                    <span className="font-semibold">
                      Subject:
                    </span>{" "}
                    {pyq.subject}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Year:
                    </span>{" "}
                    {pyq.year}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Exam Type:
                    </span>{" "}
                    {pyq.examType}
                  </p>

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      window.open(
                        pyq.fileUrl,
                        "_blank"
                      )
                    }
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    View PDF
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(pyq._id)
                    }
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete PYQ
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

export default MyPYQs;