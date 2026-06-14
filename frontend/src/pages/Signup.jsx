import { useState } from "react";
import { signupUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signupUser({
        name,
        email,
        password,
      });

      alert("Signup Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Signup
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Signup
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Signup;