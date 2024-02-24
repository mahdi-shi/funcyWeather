import { Day } from "./Day";

export const Weather = ({ data, error, location, isLoading }) => {
  const {
    time: days,
    temperature_2m_max: maxTemp,
    temperature_2m_min: minTemp,
    weathercode: weatherCode,
  } = data;

  return (
    <ul className="weather">
      {data &&
        days.map((day, i) => (
          <Day
            time={i === 0 ? "Today" : day}
            maxTemp={maxTemp.at(i)}
            minTemp={minTemp.at(i)}
            weatherCode={weatherCode.at(i)}
            key={day}
          />
        ))}
    </ul>
  );
};
