import { useEffect, useState, useContext } from "react";
import { getPYQs } from "../api/pyqApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function PYQs() {
  const [pyqs, setPyqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] =
    useState("All");
  const [selectedYear, setSelectedYear] =
    useState("All");
  const [selectedExamType, setSelectedExamType] =
    useState("All");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPYQs = async () => {
      try {
        const response = await getPYQs();

        setPyqs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPYQs();
  }, []);

  const filteredPYQs = pyqs.filter((pyq) => {
    const matchesSearch =
      pyq.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      pyq.subject
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesBranch =
      selectedBranch === "All" ||
      pyq.branch === selectedBranch;

    const matchesYear =
      selectedYear === "All" ||
      pyq.year.toString() === selectedYear;

    const matchesExamType =
      selectedExamType === "All" ||
      pyq.examType === selectedExamType;

    return (
      matchesSearch &&
      matchesBranch &&
      matchesYear &&
      matchesExamType
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            PYQs
          </h1>

          {user && (
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/upload-pyq")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Upload PYQ
              </button>

              <button
                onClick={() => navigate("/my-pyqs")}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
              >
                My PYQs
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6 grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search title or subject..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="border rounded-lg p-3"
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

          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option value="All">
              All Years
            </option>

            {[...new Set(pyqs.map((p) => p.year))]
              .sort((a, b) => b - a)
              .map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
          </select>

          <select
            value={selectedExamType}
            onChange={(e) =>
              setSelectedExamType(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option value="All">
              All Exams
            </option>
            <option value="Mid">
              Mid
            </option>
            <option value="Minor">
              Minor
            </option>
            <option value="End Sem">
              End Sem
            </option>
          </select>

        </div>

        {filteredPYQs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            No PYQs found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPYQs.map((pyq) => (
              <div
                key={pyq._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {pyq.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {pyq.description}
                </p>

                <div className="space-y-1 mb-4">

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

                <button
                  onClick={() =>
                    navigate(`/pyqs/${pyq._id}`)
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

export default PYQs;