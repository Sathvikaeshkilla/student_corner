import { useState } from "react";
import { uploadPYQ } from "../api/pyqApi";
import { useNavigate } from "react-router-dom";

function UploadPYQ() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [year, setYear] = useState("");
  const [examType, setExamType] = useState("Mid");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("subject", subject);
      formData.append("branch", branch);
      formData.append("year", year);
      formData.append("examType", examType);
      formData.append("file", file);

      await uploadPYQ(formData);

      alert("PYQ uploaded successfully");

      navigate("/pyqs");
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold mb-6">
          Upload PYQ
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="PYQ Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 h-28"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="General">General</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
            <option value="IT">IT</option>
          </select>

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="Mid">Mid</option>
            <option value="Minor">Minor</option>
            <option value="End Sem">End Sem</option>
          </select>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Upload PYQ
          </button>

        </div>

      </div>
    </div>
  );
}

export default UploadPYQ;