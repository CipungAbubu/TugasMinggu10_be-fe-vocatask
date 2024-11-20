import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import gambar1 from '../assets/gambar1.jpg';  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, token, isLoading } = useAuthStore((state) => state);
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await login({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-blue-200 via-pink-300 to-yellow-200">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Gambar */}
        <div className="w-full md:w-1/2 h-80 md:h-auto">
          <img
            src={gambar1}
            alt="Login Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Login */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            VOCATASK
          </h1>
          <p className="text-center text-sm text-gray-500 mb-8">
            Login into your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-500 cursor-pointer hover:underline"
                >
                  Create one here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
