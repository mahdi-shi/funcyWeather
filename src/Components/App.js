import { useEffect, useState } from "react";
import { Input } from "./Input.js";
import { useWeatherfetch } from "../Hooks/useWeatherfetch.js";
import { Weather } from "./Weather.js";
import { Loader } from "./Loader.js";

const App = () => {
  const [location, setLocation] = useState(localStorage.getItem("location"));
  const { weather, displayLoc, errorMessage, isLoading } = useWeatherfetch(location);


  return (
    <div className="app">
      <h1>Funcy Weather</h1>
      <Input location={location} onChange={setLocation} />
      {isLoading && <Loader />}
      {!isLoading && weather.time && (
        <Weather
          data={weather}
          location={displayLoc}
          error={errorMessage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default App;
