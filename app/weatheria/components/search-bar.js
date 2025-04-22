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
          placeholder="Enter city name..."
          className="w-full px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-black bg-gradient-to-br from-sky-400 to-gray-500"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 text-gray-500 hover:text-gray-600"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}
