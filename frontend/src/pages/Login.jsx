import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { loginUser, getProfile } from "../api/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      const profileResponse = await getProfile();

      setUser(profileResponse.data);

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <div className="space-y-4">

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
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline"
            >
              Signup
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;