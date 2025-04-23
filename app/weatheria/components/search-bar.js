"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}
