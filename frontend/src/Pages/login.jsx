// Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Left Section - Login Form */}
      <div className="flex-[0.3] p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <Link to="/" className="text-gray-400 hover:text-yellow-400 transition duration-300 mb-8 inline-block">
            ← Back to Home
          </Link>
          
          <h2 className="text-2xl text-white mb-2">Login to Your Account</h2>
          <p className="text-gray-400 mb-7">Please enter your credentials</p>

          <form className="space-y-5">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
              />
              <span
                className="absolute right-3 top-3 text-sm text-gray-400 cursor-pointer hover:text-yellow-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg transition duration-300 hover:from-blue-800 hover:to-blue-600"
            >
              Login
            </button>
            <div className="text-gray-400">
              New to our Site?{" "}
              <Link to="/register" className="text-yellow-400 hover:text-yellow-500 transition duration-300">
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="flex-[0.7] hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJvb2t8ZW58MHx8MHx8fDA%3D"
          alt="Login background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;