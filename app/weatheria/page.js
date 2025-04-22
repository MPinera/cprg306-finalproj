"use client";

import SearchBar from "./components/search-bar";

const handleSearch = async (city) => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-sky-400 to-gray-500">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semi-bold text-white text-center mb-8">
          Weatheria
        </h1>

        <SearchBar onSearch={handleSearch} />
      </div>
    </main>
  );
}
