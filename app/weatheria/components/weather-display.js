"use client";

import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  CloudLightning,
  Wind,
} from "lucide-react";

export default function WeatherDisplay({ data }) {
  if (!data) return null;

  const { name, main, weather, wind, sys } = data;
  const { temp, feels_like, temp_min, temp_max, humidity } = main;
  const { description, icon } = weather[0];
  const date = new Date();

  // Convert temperature from Kelvin to Celsius
  const celsiusTemp = Math.round(temp - 273.15);
  const feelsLike = Math.round(feels_like - 273.15);
  const minTemp = Math.round(temp_min - 273.15);
  const maxTemp = Math.round(temp_max - 273.15);

  // Format date
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Get weather icon based on OpenWeatherMap icon code
  const getWeatherIcon = (iconCode) => {
    const iconPrefix = iconCode.substring(0, 2);

    switch (iconPrefix) {
      case "01": // clear sky
        return <Sun size={64} className="text-yellow-400" />;
      case "02": // few clouds
      case "03": // scattered clouds
      case "04": // broken clouds
        return <Cloud size={64} className="text-gray-400" />;
      case "09": // shower rain
      case "10": // rain
        return <CloudRain size={64} className="text-blue-400" />;
      case "11": // thunderstorm
        return <CloudLightning size={64} className="text-purple-500" />;
      case "13": // snow
        return <CloudSnow size={64} className="text-blue-200" />;
      case "50": // mist
        return <Wind size={64} className="text-gray-300" />;
      default:
        return <Cloud size={64} className="text-gray-400" />;
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {name}, {sys.country}
            </h2>
            <p className="text-gray-500">{formattedDate}</p>
          </div>
          <div className="flex items-center">{getWeatherIcon(icon)}</div>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-end">
              <span className="text-5xl font-bold text-gray-800">
                {celsiusTemp}°
              </span>
              <span className="text-xl text-gray-500 ml-1">C</span>
            </div>
            <p className="text-gray-600 capitalize">{description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Feels Like</p>
              <p className="text-xl font-semibold text-black">{feelsLike}°C</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-xl font-semibold text-black">{humidity}%</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Wind Speed</p>
              <p className="text-xl font-semibold text-black">
                {wind.speed} m/s
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Min/Max Temp</p>
              <p className="text-xl font-semibold text-black">
                {minTemp}°/{maxTemp}°
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
