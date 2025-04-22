"use client";

import { useState, useEffect } from "react";
import SearchBar from "./components/search-bar";
import { fetchWeatherByCity, fetchWeatherByCoords } from "./lib/document";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeatherData(data);
            setError(null);
          } catch (err) {
            setError(
              "Failed to fetch weather data. Please try searching for a location."
            );
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setLoading(false);
          setError("Location access denied. Please search for a location.");
        }
      );
    }
  }, []);

  const handleSearch = async (city) => {
    if (!city) return;

    setLoading(true);
    try {
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError("Location not found. Please try another search.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-sky-400 to-gray-500">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semi-bold text-white text-center mb-8">
          Weatheria
        </h1>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
