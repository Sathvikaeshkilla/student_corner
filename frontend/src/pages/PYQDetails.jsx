import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPYQById } from "../api/pyqApi";

function PYQDetails() {
  const { pyqId } = useParams();

  const [pyq, setPyq] = useState(null);

  useEffect(() => {
    const fetchPYQ = async () => {
      try {
        const response = await getPYQById(pyqId);

        setPyq(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPYQ();
  }, []);

  if (!pyq) {
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
            {pyq.title}
          </h1>

          <p className="text-gray-700 mb-6">
            {pyq.description}
          </p>

          <div className="space-y-3 mb-8">

            <p>
              <span className="font-semibold">
                Subject:
              </span>{" "}
              {pyq.subject}
            </p>

            <p>
              <span className="font-semibold">
                Branch:
              </span>{" "}
              {pyq.branch}
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

          <a
            href={pyq.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Open PYQ
          </a>

        </div>

      </div>
    </div>
  );
}

export default PYQDetails;