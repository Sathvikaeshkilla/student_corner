import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
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
      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-xl shadow-md p-8">

          <h1 className="text-4xl font-bold mb-8">
            My Profile
          </h1>

          <div className="space-y-6">

            <div>
              <p className="text-gray-500 text-sm">
                Name
              </p>

              <p className="text-xl font-semibold">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Email
              </p>

              <p className="text-xl font-semibold">
                {user.email}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;