import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Make sure to install react-icons: npm install react-icons

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim().toLowerCase());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center w-full max-w-md mx-auto my-8"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter Pokémon name or ID..."
        className="w-full px-5 py-3 text-lg text-gray-700 bg-white border-2 border-transparent rounded-l-full focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <button
        type="submit"
        className="px-6 py-3 text-white bg-red-500 rounded-r-full hover:bg-red-600 focus:outline-none transition duration-300 flex items-center justify-center"
      >
        <FaSearch size="1.2em" />
      </button>
    </form>
  );
};

export default SearchBar;
