export const Day = ({ time, maxTemp, minTemp, weatherCode }) => {
  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  function formatDay(dateStr) {
    try{
        return new Intl.DateTimeFormat("en", {
            weekday: "short",
          }).format(new Date(dateStr));
    }
    catch(err){
        return dateStr
    }
  }

  return (
    <li className="day">
      <span>{getWeatherIcon(weatherCode)}</span>
      <p>
        {Math.round(minTemp)}c - {Math.round(maxTemp)}c
      </p>
      <p>{formatDay(time)}</p>
    </li>
  );
};
