// Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Left Section */}
      <div className="flex-[0.4] hidden md:block">
        <img
          src="https://plus.unsplash.com/premium_photo-1695322790437-d27413ea61da?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGFyayUyMGxpYnJhcnl8ZW58MHx8MHx8fDA%3D"
          alt="Register background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="flex-[0.6] p-10 flex flex-col justify-center">
        <div className="flex justify-between mb-5">
          <Link to="/" className="text-gray-400 hover:text-yellow-400 transition duration-300">
            ← Back to Home
          </Link>
          <Link to="/login" className="text-gray-400 hover:text-yellow-400 transition duration-300">
            Login Now
          </Link>
        </div>

        <div className="max-w-lg w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-2 text-center text-white">
            Bring Your Stories to Life
          </h2>
          <p className="text-gray-400 mb-7 text-center">Register Today</p>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
            />

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

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
              />
              <span
                className="absolute right-3 top-3 text-sm text-gray-400 cursor-pointer hover:text-yellow-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "HIDE" : "SHOW"}
              </span>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg transition duration-300 hover:from-blue-800 hover:to-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;