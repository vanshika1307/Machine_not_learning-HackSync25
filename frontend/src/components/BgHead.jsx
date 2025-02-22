import React from "react";

export default function BgHead() {
  const theme = useTheme();

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center ${
        theme.palette.mode === "dark" ? "bg-[#0d0d0d]" : "bg-gray-100"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage: `url('/src/assets/bg-image.jpeg')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Optional dark overlay */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to Your Website
        </h1>
        <p className="text-lg md:text-2xl text-white mb-8">
          Discover amazing content and join our community.
        </p>
        <Link
          to="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
}
