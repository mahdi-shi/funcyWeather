import { useEffect, useState } from "react";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export const useFetchWeather = async (location) => {
  const [LocatoinDisplay, setLocationDisplay] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetching() {
        try {
          if (location.length <= 2) {
            return setWeather({});
          }

          // 1) Getting location (geocoding)
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
          );
          const geoData = await geoRes.json();
          console.log(geoData);

          if (!geoData.results) throw new Error("Location not found");

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);
          setLocationDisplay(`${name} ${convertToFlag(country_code)}`);

          console.log(LocatoinDisplay);

          // 2) Getting actual weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData.daily);
          console.log(weather);
        } catch (err) {
          setError(err);
          console.log(error);
        }
      }

      fetching();
    },
    [location]
  );

  return { weather, LocatoinDisplay, error };
};
