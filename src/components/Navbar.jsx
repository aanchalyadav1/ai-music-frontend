import React from "react";
import { useTheme } from "../themeContext";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 bg-black bg-opacity-50 backdrop-blur-md rounded-xl m-4 z-10 relative">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
        AI Music System
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
