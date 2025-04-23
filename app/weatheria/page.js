"use client";

import { useState, useEffect } from "react";
import SearchBar from "./components/search-bar";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
} from "./lib/document";
import WeatherDisplay from "./components/weather-display";
import ForecastDisplay from "./components/forecast-display";
import Toggle from "./components/toggle";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const [weather, forecast] = await Promise.all([
              fetchWeatherByCoords(
                position.coords.latitude,
                position.coords.longitude
              ),
              fetchForecastByCoords(
                position.coords.latitude,
                position.coords.longitude
              ),
            ]);

            setWeatherData(weather);
            setForecastData(forecast);
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
      const [weather, forecast] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city),
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
      setError(null);
    } catch (err) {
      setError("Location not found. Please try another search.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 dark:from-gray-800 dark:to-gray-900 transition-colors bg-gradient-to-b from-sky-400 to-blue-800">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Weatheria
          </h1>
          <Toggle />
        </div>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}

        {weatherData && !loading && <WeatherDisplay data={weatherData} />}

        {forecastData && !loading && (
          <ForecastDisplay forecastData={forecastData} />
        )}
      </div>
    </main>
  );
}
