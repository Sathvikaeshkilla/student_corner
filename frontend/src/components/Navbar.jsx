import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      <div>
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Student Corner
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        <Link
          to="/marketplace"
          className="hover:text-blue-600"
        >
          Marketplace
        </Link>

        <Link
          to="/notes"
          className="hover:text-blue-600"
        >
          Notes
        </Link>

        <Link
          to="/pyqs"
          className="hover:text-blue-600"
        >
          PYQs
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className="hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className="hover:text-blue-600"
            >
              Profile
            </Link>
            <Link to="/my-chats">My Chats</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;