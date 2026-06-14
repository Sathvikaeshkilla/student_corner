import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center mb-2">
          Student Corner
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Buy & Sell Items, Share Notes, Access PYQs
        </p>

        {user && (
          <p className="text-center mb-8 text-gray-700">
            Welcome, {user.name}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div
            onClick={() => navigate("/marketplace")}
            className="bg-white rounded-xl shadow-md p-8 cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Marketplace
            </h2>

            <p className="text-gray-600">
              Buy, sell and lend items within the student community.
            </p>
          </div>

          <div
            onClick={() => navigate("/notes")}
            className="bg-white rounded-xl shadow-md p-8 cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Notes
            </h2>

            <p className="text-gray-600">
              Browse and share study notes.
            </p>
          </div>

          <div
            onClick={() => navigate("/pyqs")}
            className="bg-white rounded-xl shadow-md p-8 cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              PYQs
            </h2>

            <p className="text-gray-600">
              Access previous year question papers.
            </p>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="bg-white rounded-xl shadow-md p-8 cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Profile
            </h2>

            <p className="text-gray-600">
              Manage your account and uploads.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;