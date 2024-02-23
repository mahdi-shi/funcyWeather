import { useState } from "react";
import { Input } from "./Input.js";
import { useFetchWeather } from "../Hooks/useFetchWeather.js";

const App = () => {
  const [location, setLocation] = useState("");
  const { weather, locationDisplay, errorMessage } = useFetchWeather(location);

  return (
    <div className="app">
      <h1>Funcy Weather</h1>
      <Input location={location} onChange={setLocation} />
    </div>
  );
};

export default App;
