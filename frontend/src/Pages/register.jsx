import React from "react";
import { useTheme } from "@mui/material/styles";

function Register() {
  const theme = useTheme();

  return (
    <div className="flex flex-col md:flex-row h-full flex-grow">
      {/* Left Section */}
      <div className="flex-[0.3] bg-[#2d294e] text-white flex flex-col items-center justify-center ">
        <div className="text-3xl mb-5 py-9">WeWorld</div>
        <img
          src="/Light-brown-in-Jacket10.png"
          alt="Handshake"
          className="max-w-full h-auto mb-5"
        />
        <h1 className="text-xl text-center mb-2">
          Partnership for Business Growth
        </h1>
        <p className="text-center text-white/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
      </div>

      {/* Right Section */}
      <div
        className={`flex-[0.7] p-10 flex flex-col ${
          theme.palette.mode === "dark" ? "bg-[#0d0d0d]" : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between mb-5">
          <a href="/" className="text-gray-600 text-sm">
            Return Home
          </a>
          <a href="/login" className="text-gray-600 text-sm">
            Login Now
          </a>
        </div>

        <div className="max-w-md mx-auto">
          <h2 className="text-xl mb-2">BECOME AN EXCLUSIVE MEMBER</h2>
          <p className="text-gray-600 mb-7">SIGN UP AND JOIN THE PARTNERSHIP</p>

          <form className="space-y-5">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Name"
                className={`w-full p-2 border ${
                  theme.palette.mode === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded`}
              />
            </div>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="example@email.com"
                className={`w-full p-2 border ${
                  theme.palette.mode === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded`}
              />
            </div>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="1234567890"
                className={`w-full p-2 border ${
                  theme.palette.mode === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded`}
              />
            </div>
            <div className="space-y-2">
              <input
                type="password"
                placeholder=""
                className={`w-full p-2 border ${
                  theme.palette.mode === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded`}
              />
              <span className="block text-right text-sm text-gray-600 cursor-pointer">
                SHOW
              </span>
            </div>
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Confirm Password"
                className={`w-full p-2 border ${
                  theme.palette.mode === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded`}
              />
              <span className="block text-right text-sm text-gray-600 cursor-pointer">
                SHOW
              </span>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#2d294e] text-white rounded transition duration-300 hover:bg-[#3c385f]"
            >
              Become a Member
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;