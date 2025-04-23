"use client";

export default function ForecastDisplay({ forecastData }) {
  if (!forecastData || !forecastData.list) return null;

  // Group forecast data by day
  const dailyForecasts = groupForecastsByDay(forecastData.list);

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          5-Day Forecast
        </h3>
      </div>
      <div className="overflow-x-auto">
        <div className="flex p-4 min-w-max">
          {Object.entries(dailyForecasts).map(([date, forecasts], index) => {
            // Skip today if we already have current weather
            if (
              index === 0 &&
              new Date(date).getDate() === new Date().getDate()
            ) {
              return null;
            }

            // Only show 5 days
            if (index > 5) return null;

            const dayData = getDaySummary(forecasts);
            return (
              <div
                key={date}
                className="flex-shrink-0 w-36 p-3 mx-1 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <p className="text-center font-medium text-gray-700 dark:text-gray-300">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="flex justify-center my-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${dayData.icon}@2x.png`}
                    alt={dayData.description}
                    className="w-12 h-12"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {dayData.description}
                </p>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {Math.round(dayData.maxTemp)}°
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {Math.round(dayData.minTemp)}°
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Helper function to group forecasts by day
function groupForecastsByDay(forecastList) {
  return forecastList.reduce((days, forecast) => {
    // Get date without time
    const date = forecast.dt_txt.split(" ")[0];
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(forecast);
    return days;
  }, {});
}

// Helper function to get summary data for a day
function getDaySummary(forecasts) {
  // Find min and max temperatures
  let minTemp = Number.POSITIVE_INFINITY;
  let maxTemp = Number.NEGATIVE_INFINITY;
  const weatherCounts = {};

  // Convert from Kelvin to Celsius
  forecasts.forEach((forecast) => {
    const temp = forecast.main.temp - 273.15;
    minTemp = Math.min(minTemp, temp);
    maxTemp = Math.max(maxTemp, temp);

    // Count weather conditions to find most common
    const weatherId = forecast.weather[0].id;
    weatherCounts[weatherId] = (weatherCounts[weatherId] || 0) + 1;
  });

  // Find most frequent weather condition
  let maxCount = 0;
  let mostFrequentId = null;
  Object.entries(weatherCounts).forEach(([id, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentId = id;
    }
  });

  // Find the forecast with this weather id
  const representativeForecast = forecasts.find(
    (f) => f.weather[0].id.toString() === mostFrequentId
  );

  return {
    minTemp,
    maxTemp,
    description: representativeForecast.weather[0].description,
    icon: representativeForecast.weather[0].icon,
  };
}
