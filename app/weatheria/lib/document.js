const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeatherByCity(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("City not found or API error");
  }

  return response.json();
}

export async function fetchWeatherByCoords(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Location not found or API error");
  }

  return response.json();
}

export async function fetchForecastByCity(city) {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Forecast data not available or API error");
  }

  return response.json();
}

export async function fetchForecastByCoords(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Forecast data not available or API error");
  }

  return response.json();
}
