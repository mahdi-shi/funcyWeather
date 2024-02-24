import { useEffect, useState } from "react";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function useWeatherfetch(location) {
  const [weather, setWeather] = useState({});
  const [displayLoc, setDisplayLoc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getData() {
        try {
          setIsLoading(true);

          if (isLoading.lenght >= 2) return setWeather({});
          // 1) Getting location (geocoding)
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
          );
          const geoData = await geoRes.json();

          if (!geoData.results) throw new Error("Location not found");

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);
          setDisplayLoc(`${name} ${convertToFlag(country_code)}`);

          // 2) Getting actual weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData.daily);
          console.log(weather);
          setIsLoading(false);
        } catch (err) {
          setErrorMessage(err);
        } finally {
          setIsLoading(false);
          setErrorMessage("");
        }
      }

      localStorage.setItem("location", location)

      getData();
    },
    [location]
  );

  return { weather, displayLoc, errorMessage, isLoading };
}
